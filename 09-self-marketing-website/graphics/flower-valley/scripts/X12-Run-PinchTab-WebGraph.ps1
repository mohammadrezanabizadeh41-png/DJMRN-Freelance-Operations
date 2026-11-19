param(
  [ValidateSet('preflight','start','run','stop')][string]$Mode='preflight',
  [string]$Url='https://www.gladeye.com/',
  [int]$MaxStates=120,
  [int]$MaxVisits=500,
  [int]$MaxDepth=6,
  [switch]$KeepServer
)
$ErrorActionPreference='Stop'
$rt=Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\X12-PinchTab-WebGraph'
$bin=Join-Path $rt 'pinchtab.exe'
$pwg=Join-Path $rt 'venv\Scripts\pwg.exe'
$cfg=Join-Path $rt 'private\pinchtab-config.json'
$sum=Join-Path $rt 'pinchtab-v0.15.2-checksums.txt'
$env:PINCHTAB_CONFIG=$cfg
$env:PATH="$rt;$rt\venv\Scripts;$env:PATH"
$env:PYTHONIOENCODING='utf-8'
$env:PYTHONUTF8='1'
$evid=Join-Path $env:USERPROFILE 'Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION\02-reviewed-derived'
$logdir=Join-Path $rt 'logs'
if(!(Test-Path $bin) -or !(Test-Path $pwg) -or !(Test-Path $cfg)){throw 'X12 executable or private config missing: check handoff before any reinstall'}
$expected=([regex]::Match(((Get-Content $sum|Where-Object {$_ -match 'pinchtab-windows-amd64\.exe'}|Select-Object -First 1)),'[a-fA-F0-9]{64}')).Value.ToLowerInvariant()
if(!$expected -or (Get-FileHash $bin -Algorithm SHA256).Hash.ToLowerInvariant() -ne $expected){throw 'PinchTab checksum mismatch'}
& $bin config validate *> $null
if($LASTEXITCODE -ne 0){throw 'PinchTab configuration invalid'}
function Get-ScopedServer {
  $s=Get-NetTCPConnection -LocalAddress '127.0.0.1' -LocalPort 9871 -State Listen -ErrorAction SilentlyContinue|Select-Object -First 1
  if(!$s){return $null}
  $p=Get-Process -Id $s.OwningProcess -ErrorAction Stop
  if($p.Path -ne $bin){throw 'Port 9871 belongs to a different program; do not stop or override it'}
  return $p
}
function Stop-ScopedServer {
  $p=Get-ScopedServer
  if($p){Stop-Process -Id $p.Id -ErrorAction Stop;Write-Output "X12_SERVER_STOPPED=$($p.Id)"}
  else{Write-Output 'X12_SERVER_ALREADY_STOPPED'}
  # The PinchTab browser can remain after its HTTP service stops. Only close Chrome
  # roots whose command line explicitly belongs to this dedicated X12 profile.
  $profileTag=[regex]::Escape((Join-Path $rt 'profiles'))
  $ownedRoots=@(Get-CimInstance Win32_Process -ErrorAction SilentlyContinue|Where-Object {
    $_.Name -eq 'chrome.exe' -and
    $_.ExecutablePath -like '*ChromeForTesting-157*' -and
    $_.CommandLine -match $profileTag -and
    $_.CommandLine -notmatch ' --type='
  })
  foreach($ch in $ownedRoots){
    $verified=Get-CimInstance Win32_Process -Filter "ProcessId = $($ch.ProcessId)" -ErrorAction SilentlyContinue
    if($verified -and $verified.CommandLine -match $profileTag -and $verified.ExecutablePath -like '*ChromeForTesting-157*'){
      & taskkill.exe /T /F /PID $verified.ProcessId *> $null
      Write-Output "X12_OWN_BROWSER_TREE_CLOSED=$($verified.ProcessId)"
    }
  }
}
function Guarded-Call($file,$arguments,$base) {
  $p=Start-Process -FilePath $file -ArgumentList $arguments -WindowStyle Hidden -PassThru -RedirectStandardOutput "$logdir\$base.out.log" -RedirectStandardError "$logdir\$base.err.log"
  [double]$min=99999
  $triggered=$false
  while(-not $p.HasExited){
    Start-Sleep -Seconds 2
    $p.Refresh()
    $free=[math]::Round((Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory/1024)
    $min=[math]::Min($min,$free)
    if($free -le 100){$triggered=$true;& taskkill.exe /T /F /PID $p.Id *> $null;break}
  }
  if($triggered){throw "100MiB_RAM_EMERGENCY_STOP_$base"}
  return [pscustomobject]@{minFreeMiB=$min;id=$p.Id;log="$logdir\$base.err.log"}
}
if($Mode -eq 'stop'){Stop-ScopedServer;exit 0}
$server=Get-ScopedServer
if(!$server){
  $server=Start-Process -FilePath $bin -ArgumentList @('server','--bind','127.0.0.1','--port','9871','--log-level','warn') -PassThru -WindowStyle Hidden -RedirectStandardOutput "$logdir\server-repeat.out.log" -RedirectStandardError "$logdir\server-repeat.err.log"
  Start-Sleep -Seconds 3
}
$h=(& $bin health --json 2>$null|Out-String|ConvertFrom-Json)
if($h.status -ne 'ok' -or $h.security.bind -ne '127.0.0.1'){throw 'X12 PinchTab server is not healthy and loopback-only'}
Write-Output "PINCHTAB_READY=$($h.version) LOCAL_ONLY=True"
if($Mode -eq 'preflight' -or $Mode -eq 'start'){Write-Output "X12_MODE=$Mode";exit 0}
if($Mode -ne 'run'){throw "Unsupported mode $Mode"}
if(!(Test-Path $evid)){throw 'Canonical Desktop evidence folder missing; do not create a parallel project'}
$run='X12-PINCHTAB-WEBGRAPH-GLADEYE-'+(Get-Date -Format 'yyyy-MM-ddTHH-mm-ss')
$runlog="x12-repeat-$run"
try {
  $nav=Guarded-Call $bin @('nav',$Url,'--timeout','55','--json') ($runlog+'-nav')
  $active=(& $bin eval 'location.href' 2>$null|Out-String).Trim()
  if($active -ne $Url){throw "Failed to navigate to exact target; actual=$active"}
  $out=Join-Path $evid $run
  $args=@('crawl','--start',$Url,'--server','http://127.0.0.1:9871','--out',$out,'--single-url','--max-states',"$MaxStates",'--max-visits',"$MaxVisits",'--max-depth',"$MaxDepth",'--checkpoint-every','3','--dump-controls','--capture-content','--read-forms','--capture-form-states','--max-restarts','0','--render-ms','1500')
  $crawl=Guarded-Call $pwg $args ($runlog+'-crawl')
  if(!(Test-Path "$out.json")){throw "WebGraph did not create output: inspect $($crawl.log)"}
  $graph=Get-Content "$out.json" -Raw|ConvertFrom-Json
  $sha=(Get-FileHash "$out.json" -Algorithm SHA256).Hash.ToLowerInvariant()
  Write-Output "X12_RUN=$run"
  Write-Output "X12_STATES=$(@($graph.states).Count) EDGES=$(@($graph.edges).Count) TRIGGERS=$(@($graph.triggers).Count) STOP=$($graph.meta.stopped)"
  Write-Output "X12_OUTPUT=$out.json SHA256=$sha"
  Write-Output "X12_RAM_MIN_SAMPLED_MIB=$([math]::Min($nav.minFreeMiB,$crawl.minFreeMiB))"
  $diff=Join-Path $rt 'scripts\x12-compare-and-summarize.mjs'
  if(Test-Path $diff){& node $diff $run}
} finally {
  if(!$KeepServer){Stop-ScopedServer}
}
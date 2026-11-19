param([ValidateSet('status','start','stop')][string]$Mode='status')
$ErrorActionPreference='Stop'
$rt=Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\X13-HARViewer'
$src=Join-Path $rt 'harviewer-source\webapp'
$log=Join-Path $rt 'logs'
$port=9876
$base='http://127.0.0.1:9876/index.html'
if(!(Test-Path (Join-Path $src 'index.html'))){throw 'X13 upstream HAR Viewer source missing'}
function Get-ViewerServer {
 $tcp=Get-NetTCPConnection -LocalAddress 127.0.0.1 -LocalPort $port -State Listen -ErrorAction SilentlyContinue|Select-Object -First 1
 if(!$tcp){return $null}
 $proc=Get-CimInstance Win32_Process -Filter "ProcessId = $($tcp.OwningProcess)" -ErrorAction Stop
 if(!$proc -or $proc.Name -notin @('python.exe','pythonw.exe') -or $proc.CommandLine -notmatch 'http\.server 9876'){throw 'Port 9876 is owned by another program; refuse to modify'}
 return $proc
}
if($Mode -eq 'status'){
 $p=Get-ViewerServer
 if($p){"X13_HAR_VIEWER_RUNNING=$($p.ProcessId)";"VIEWER_URL=$base"}else{'X13_HAR_VIEWER_STOPPED'}
 exit
}
if($Mode -eq 'stop'){
 $p=Get-ViewerServer
 if($p){Stop-Process -Id $p.ProcessId -ErrorAction Stop;"X13_HAR_VIEWER_STOPPED_PID=$($p.ProcessId)"}else{'X13_HAR_VIEWER_ALREADY_STOPPED'}
 exit
}
$p=Get-ViewerServer
if(!$p){
 New-Item -ItemType Directory -Force -Path $log|Out-Null
 $py=(Get-Command py.exe -ErrorAction Stop).Source
 $launcher=Start-Process -FilePath $py -ArgumentList @('-3.14','-m','http.server',"$port",'--bind','127.0.0.1','--directory',"$src") -PassThru -WindowStyle Hidden -RedirectStandardOutput (Join-Path $log 'viewer-static-out.log') -RedirectStandardError (Join-Path $log 'viewer-static-err.log')
 Start-Sleep -Seconds 3
}
$p=Get-ViewerServer
if(!$p){throw 'X13 viewer local Python web server did not start'}
$response=Invoke-WebRequest -Uri $base -UseBasicParsing -TimeoutSec 10
if($response.StatusCode -ne 200){throw "Bad HTTP result: $($response.StatusCode)"}
"X13_VIEWER_READY=true|PID=$($p.ProcessId)|URL=$base"
"NOTE=Paste a *sanitized* HAR JSON in Home text area then click Preview. Never upload raw credentials."
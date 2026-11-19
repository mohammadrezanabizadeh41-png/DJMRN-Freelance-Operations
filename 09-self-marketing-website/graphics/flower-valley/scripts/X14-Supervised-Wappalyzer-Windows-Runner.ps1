param(
 [ValidateSet('preflight','run','compare','verify-new-assets')][string]$Mode='preflight',
 [string]$RunId='',
 [int]$RamEmergencyMiB=100
)
$ErrorActionPreference='Stop'
$rt=Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\X14-Wappalyzer'
$src=Join-Path $rt 'wappalyzer-httparchive-source'
$script=Join-Path $rt 'scripts\x14-wappalyzer-live180.mjs'
$compare=Join-Path $rt 'scripts\x14-compare-X01-X13.mjs'
$verify=Join-Path $rt 'scripts\x14-verify-and-store-new-resources.mjs'
$chrome=Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\ArchiveBox-X11\ChromeForTesting-157\chrome-win64\chrome.exe'
$logs=Join-Path $rt 'logs'
$project=Join-Path $env:USERPROFILE 'Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION'
$node=(Get-Command node.exe -ErrorAction Stop).Source
foreach($p in @("$src\.git","$src\node_modules\puppeteer\package.json",$chrome,$script,$compare,$verify,"$project\02-reviewed-derived")){if(!(Test-Path $p)){throw "Missing X14 prerequisite: $p"}}
if($RamEmergencyMiB -ne 100){throw 'Owner-defined emergency threshold must remain 100 MiB'}
foreach($f in @($script,$compare,$verify)){& $node --check $f;if($LASTEXITCODE -ne 0){throw "Syntax failed for $f"}}
$head=(& git -C $src rev-parse HEAD | Out-String).Trim()
"X14_SOURCE_COMMIT=$head"
"X14_NODE_VERSION=$(& $node --version)"
"X14_BASELINE_RAM_FREE_MiB=$([math]::Round((Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory/1024))"
if($Mode -eq 'preflight'){"X14_PREFLIGHT_PASS";exit 0}
if($Mode -eq 'compare'){
 & $node $compare $RunId
 if($LASTEXITCODE -ne 0){throw 'X14 source comparison failed'}
 exit 0
}
if($Mode -eq 'verify-new-assets'){
 & $node $verify $RunId
 if($LASTEXITCODE -ne 0){throw 'X14 new asset body verification failed'}
 exit 0
}
New-Item -ItemType Directory -Force -Path $logs|Out-Null
$runLog=Join-Path $logs ('x14-repeat-'+(Get-Date -Format 'yyyyMMdd-HHmmss'))
$env:CHROMIUM_BIN=$chrome
$env:CHROMIUM_ARGS='--headless=new --disable-extensions --no-first-run --no-default-browser-check'
$env:PUPPETEER_SKIP_DOWNLOAD='1'
$proc=Start-Process -FilePath $node -ArgumentList @($script) -WorkingDirectory $src -PassThru -WindowStyle Hidden -RedirectStandardOutput ($runLog+'.stdout.log') -RedirectStandardError ($runLog+'.stderr.log')
"X14_OBSERVER_PID=$($proc.Id)"
$min=99999;$tripped=$false
while(-not $proc.HasExited){
 Start-Sleep -Seconds 2
 $proc.Refresh()
 $free=[math]::Round((Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory/1024)
 $min=[math]::Min($min,$free)
 if($free -le 100){
   $tripped=$true
   & taskkill.exe /T /F /PID $proc.Id *> $null
   break
 }
}
if($tripped){throw 'X14 supervised live run aborted at RAM emergency threshold'}
$lines=@(Get-Content ($runLog+'.stdout.log') -ErrorAction SilentlyContinue|Where-Object {$_ -like 'DJMRN_X14_DONE *'})
if(!$lines.Count){throw "X14 did not produce verified completion; inspect logs under $runLog"}
$summary=$lines[-1].Substring('DJMRN_X14_DONE '.Length)|ConvertFrom-Json
if($summary.status -ne 'COMPLETE_180_SECONDS'){throw "X14 incomplete status: $($summary.status)"}
"X14_SUPERVISED_LIVE_PASS|RUN=$($summary.run)|LOWEST_WINDOWS_FREE_MiB=$min|SECONDS=$($summary.elapsed)"
& $node $compare $summary.run
if($LASTEXITCODE -ne 0){throw 'X14 post-run crosswalk failed'}
"X14_POST_COMPARE_PASS"
"NOTE=New raw bodies are only saved when verify-new-assets is intentionally invoked on the exact seven candidate paths; never automatically duplicate previous site assets."
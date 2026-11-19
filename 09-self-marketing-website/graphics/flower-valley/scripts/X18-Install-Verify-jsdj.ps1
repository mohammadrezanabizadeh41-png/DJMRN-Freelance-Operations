# DJMRN X18 — isolated and repeatable jsdj preparation; no target crawl
# Official package: https://github.com/ejfkdev/jsdj (MPL-2.0)
param([ValidateSet('Install','Verify')][string]$Mode='Install')
Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'
$ProgressPreference='SilentlyContinue'
$rt=Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\X18-jsdj'
$root=Join-Path $env:USERPROFILE 'Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION'
$out=Join-Path $root '02-reviewed-derived\X18-PREFLIGHT'
$node='C:\Program Files\nodejs\node.exe'
$npm='C:\Program Files\nodejs\npm.cmd'
$cli=Join-Path $rt 'node_modules\@ejfkdev\jsdj\dist\cli\index.js'
$package=Join-Path $rt 'node_modules\@ejfkdev\jsdj\package.json'
if(!(Test-Path $node -PathType Leaf) -or !(Test-Path $npm -PathType Leaf)){throw 'Node/NPM must be installed before X18'}
$nodeVersion=(& $node --version)
if([version]($nodeVersion.TrimStart('v').Split('-')[0]) -lt [version]'20.11.0'){throw "Node 20.11+ required; found $nodeVersion"}
$ram=[math]::Round((Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory/1024)
if($ram -lt 350){throw "LOW_RAM_$ram-MiB: installation/preflight stopped"}
if(!(Test-Path $root -PathType Container)){throw 'Original project directory unavailable'}
New-Item -ItemType Directory -Path $out -Force|Out-Null
$existing=Test-Path $package
$info=$null
if($existing){$info=Get-Content $package -Raw|ConvertFrom-Json}
$installNeeded=(!($existing -and $info.version -eq '0.1.2' -and $info.name -eq '@ejfkdev/jsdj' -and (Test-Path $cli)))
if($Mode -eq 'Verify' -and $installNeeded){throw 'NOT_INSTALLED_VERIFICATION_ONLY'}
if($Mode -eq 'Install' -and $installNeeded){
  $env:npm_config_audit='false'
  $env:npm_config_fund='false'
  $env:npm_config_fetch_retries='1'
  $env:npm_config_fetch_timeout='12000'
  $raw=(& $npm view '@ejfkdev/jsdj@0.1.2' version license dist.integrity --json)
  if($LASTEXITCODE -ne 0){throw 'CANONICAL_NPM_REGISTRY_CHECK_FAILED'}
  $registry=$raw|ConvertFrom-Json
  if($registry.version -ne '0.1.2' -or $registry.license -ne 'MPL-2.0'){throw 'PACKAGE_IDENTITY_OR_LICENSE_MISMATCH'}
  New-Item -ItemType Directory -Path $rt -Force|Out-Null
  & $npm install --prefix $rt --save-exact --omit=dev --ignore-scripts --no-audit --no-fund '@ejfkdev/jsdj@0.1.2'
  if($LASTEXITCODE -ne 0){throw "NPM_INSTALL_FAILED_$LASTEXITCODE"}
}
if(!(Test-Path $cli -PathType Leaf) -or !(Test-Path $package -PathType Leaf)){throw 'CLI_OR_PACKAGE_MISSING'}
$installed=Get-Content $package -Raw|ConvertFrom-Json
if($installed.name -ne '@ejfkdev/jsdj' -or $installed.version -ne '0.1.2' -or $installed.license -ne 'MPL-2.0'){throw 'INSTALLED_PACKAGE_IDENTITY_MISMATCH'}
$version=(& $node $cli version 2>&1 |Out-String)
if($LASTEXITCODE -ne 0 -or $version -notmatch '0\.1\.2'){throw "CLI_VERSION_TEST_FAILED: $version"}
$plugins=(& $node $cli --list-plugins 2>&1 |Out-String)
if($LASTEXITCODE -ne 0 -or $plugins -notmatch 'HTMLScriptPlugin' -or $plugins -notmatch 'NextJSPlugin'){throw 'CLI_PLUGIN_REGISTRY_TEST_FAILED'}
$pluginCount=@($plugins -split "[\r\n]+" |Where-Object {$_ -match 'Plugin'}).Count
$lock=Join-Path $rt 'package-lock.json'
if(!(Test-Path $lock)){throw 'PINNED_LOCKFILE_MISSING'}
$report=[ordered]@{
  stage='X18';scope='INSTALL_VERIFY_ONLY';status='CLI_INSTALLED_AND_PLUGIN_REGISTRY_VERIFIED'
  package='@ejfkdev/jsdj';version='0.1.2';license='MPL-2.0'
  cli=$cli;node=$nodeVersion;installWasNeeded=$installNeeded
  pluginLines=$pluginCount;versionResponse=$version.Trim()
  lockSha256=(Get-FileHash $lock -Algorithm SHA256).Hash
  ramFreeMiBAtPrecheck=$ram
  limitations=@('Localhost functional fixture is a separate acceptance gate',
    'No target public site scanned or original Source Map recovered',
    'No optional native TLS sidecar, credentials, Docker, Bun or paid API installed')
  savedUtc=[DateTime]::UtcNow.ToString('o')
}
$target=Join-Path $out 'X18-INSTALL-ACCEPTANCE.json'
[IO.File]::WriteAllText($target,($report|ConvertTo-Json -Depth 5)+[Environment]::NewLine,[Text.UTF8Encoding]::new($false))
Write-Output ('X18_PREP_STATUS='+$report.status)
Write-Output ('X18_CLI_VERSION='+$version.Trim())
Write-Output ('X18_PLUGIN_LINES='+$pluginCount)
Write-Output ('X18_ACCEPTANCE_FILE='+$target)

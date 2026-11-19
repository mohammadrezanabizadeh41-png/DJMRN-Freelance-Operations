# DJMRN X19 — verified isolated webcrack install / runtime preflight.
# No global packages, no credentials, no UAC or firewall change, no native add-on.
param([ValidateSet('Install','Verify')][string]$Mode='Verify')
Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'
$root=Join-Path $env:USERPROFILE 'Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION'
$out=Join-Path $root '02-reviewed-derived\X19-PREFLIGHT'
$rt=Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\X19-webcrack'
$tar=Join-Path $env:USERPROFILE 'Downloads\DJMRN-Website-Tools\SOURCE_ARCHIVE\webcrack-2.16.0.tgz'
$node='C:\Program Files\nodejs\node.exe'
$npm='C:\Program Files\nodejs\npm.cmd'
$pkgPath=Join-Path $rt 'node_modules\webcrack\package.json'
$cli=Join-Path $rt 'node_modules\webcrack\src\cli-wrapper.js'
$lock=Join-Path $rt 'package-lock.json'
$known='sha512-sQx0otp+7W8MgOWjdpc+5dqGna1GRK4tx55SyRohtq4g4A1aXbqu0TLfqvIsY/PllBZgSfvV5h0nDE0iwC8gbA=='
if(!(Test-Path $root)){throw 'PROJECT_EVIDENCE_ROOT_MISSING'}
if(!(Test-Path $tar)){throw 'LOCAL_CANONICAL_PACKAGE_ARCHIVE_MISSING'}
if(!(Test-Path $node) -or !(Test-Path $npm)){throw 'NODE_NPM_NOT_FOUND'}
if([version]((& $node --version).TrimStart('v')) -lt [version]'24.0.0'){throw 'NODE_24_NOT_AVAILABLE'}
$hex=(Get-FileHash $tar -Algorithm SHA512).Hash
[byte[]]$raw=@(for($i=0;$i -lt $hex.Length;$i+=2){[Convert]::ToByte($hex.Substring($i,2),16)})
$integrity='sha512-'+[Convert]::ToBase64String($raw)
if($integrity -ne $known){throw 'ARCHIVE_INTEGRITY_NOT_EQUAL_OFFICIAL_REGISTRY'}
$memory=[math]::Round((Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory/1024)
if($memory -lt 350){throw ('RAM_EMERGENCY_INSTALL_PRECONDITION_'+$memory+'_MIB')}
$alreadyInstalled=Test-Path $pkgPath
if($alreadyInstalled){
  $existing=Get-Content $pkgPath -Raw |ConvertFrom-Json
  if($existing.name -ne 'webcrack' -or $existing.version -ne '2.16.0'){throw 'DIFFERENT_INSTALLED_VERSION_NEEDS_REVIEW'}
}
if(!$alreadyInstalled){
 if($Mode -eq 'Verify'){throw 'RUNTIME_NOT_INSTALLED'}
 New-Item -ItemType Directory -Path $rt -Force|Out-Null
 $env:npm_config_fetch_retries='1'
 $env:npm_config_fetch_timeout='15000'
 $env:npm_config_fund='false'
 $env:npm_config_audit='false'
 & $npm install --prefix $rt --save-exact --omit=dev --omit=optional --ignore-scripts --no-audit --no-fund $tar
 if($LASTEXITCODE -ne 0){throw 'ISOLATED_NPM_INSTALL_FAILED'}
}
if(!(Test-Path $pkgPath) -or !(Test-Path $lock) -or !(Test-Path $cli)){throw 'RUNTIME_FILES_INCOMPLETE'}
$pkg=Get-Content $pkgPath -Raw|ConvertFrom-Json
if($pkg.name -ne 'webcrack' -or $pkg.version -ne '2.16.0' -or $pkg.license -ne 'MIT'){throw 'RUNTIME_IDENTITY_FAIL'}
$version=((& $node $cli --version) |Out-String).Trim()
if($LASTEXITCODE -ne 0 -or $version -ne '2.16.0'){throw 'CLI_ACTIVATION_FAILED'}
$lockHash=(Get-FileHash $lock -Algorithm SHA256).Hash
$native=Test-Path (Join-Path $rt 'node_modules\isolated-vm-6')
$report=[ordered]@{
 stage='X19';scope='ISOLATED_INSTALL_AND_STATIC_RUNTIME'
 status='WEBCRACK_2_16_STATIC_READY'
 package='webcrack';version=$version;license=$pkg.license
 archiveSri=$integrity;lockSha256=$lockHash
 nodeVersion=((& $node --version)|Out-String).Trim()
 nativeIsolatedVMInstalled=$native
 nativeRequirement='optional for advanced dynamic string decoder; disabled for bounded static analysis'
 mode=$Mode;ramFreeMiBAtCheck=$memory;utc=[DateTime]::UtcNow.ToString('o')
}
New-Item -ItemType Directory -Path $out -Force|Out-Null
$dest=Join-Path $out 'X19-INSTALL-ACCEPTANCE.json'
[IO.File]::WriteAllText($dest,($report|ConvertTo-Json -Depth 8)+[Environment]::NewLine,[Text.UTF8Encoding]::new($false))
Write-Output ('X19_INSTALL_CHECK='+$report.status)
Write-Output ('X19_PACKAGE_SRI='+$integrity)
Write-Output ('X19_LOCK_SHA='+$lockHash)
Write-Output ('X19_OPTIONAL_NATIVE_INSTALLED='+$native)
Write-Output ('X19_REPORT='+$dest)

# DJMRN X19 — verify/install exact isolated-vm 6 alias for Node 24 / Windows x64.
# No global install, elevation, new browser, paid API, or native build tool on happy path.
param([ValidateSet('Install','Verify')][string]$Mode='Verify')
Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'
$rt=Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\X19-webcrack'
$archive=Join-Path $env:USERPROFILE 'Downloads\DJMRN-Website-Tools\SOURCE_ARCHIVE'
$project=Join-Path $env:USERPROFILE 'Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION'
$pre=Join-Path $project '02-reviewed-derived\X19-PREFLIGHT'
$node='C:\Program Files\nodejs\node.exe'
$npm='C:\Program Files\nodejs\npm.cmd'
$pkg=Join-Path $rt 'node_modules\isolated-vm-6\package.json'
$prebuilt=Join-Path $rt 'node_modules\isolated-vm-6\prebuilds\win32-x64\isolated-vm.abi137.node'
$tgz=Join-Path $archive 'isolated-vm-6.1.2.tgz'
$expected='sha512-GGfsHqtlZiiurZaxB/3kY7LLAXR3sgzDul0fom4cSyBjx6ZbjpTrFWiH3z/nUfLJGJ8PIq9LQmQFiAxu24+I7A=='
if(!(Test-Path $node) -or !(Test-Path $npm)){throw 'NODE_OR_NPM_UNAVAILABLE'}
$nodeVersion=(& $node --version).Trim()
$abi=(& $node -p 'process.versions.modules').Trim()
$arch=(& $node -p 'process.arch').Trim()
if(-not $nodeVersion.StartsWith('v24.') -or $abi -ne '137' -or $arch -ne 'x64'){throw ('NODE24_WIN64_ABI_PRECONDITION_FAIL: '+$nodeVersion+' '+$abi+' '+$arch)}
if(!(Test-Path (Join-Path $rt 'node_modules\webcrack\package.json'))){throw 'WEBCRACK_X19_STATIC_RUNTIME_MISSING'}
if(!(Test-Path $pre)){throw 'X19_PREFLIGHT_ROOT_MISSING'}
$free=[math]::Round((Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory/1024)
if($free -lt 350){throw ('LOW_RAM_PRECONDITION_'+$free)}
if(!(Test-Path $pkg)){
 if($Mode -eq 'Verify'){throw 'NATIVE_ADDON_NOT_INSTALLED'}
 if($free -lt 600){throw 'NATIVE_ADDON_INSTALL_NEEDS_600_MIB_FREE_RAM'}
 if(!(Test-Path $tgz)){
   New-Item -ItemType Directory -Force -Path $archive|Out-Null
   $env:npm_config_fetch_timeout='20000'
   $env:npm_config_fetch_retries='1'
   & $npm pack 'isolated-vm@6.1.2' --pack-destination $archive --json|Out-Null
   if($LASTEXITCODE -ne 0){throw 'PACK_DOWNLOAD_FAILED'}
 }
 $hex=(Get-FileHash $tgz -Algorithm SHA512).Hash
 [byte[]]$b=@(for($i=0;$i -lt $hex.Length;$i+=2){[Convert]::ToByte($hex.Substring($i,2),16)})
 $sri='sha512-'+[Convert]::ToBase64String($b)
 if($sri -ne $expected){throw 'OFFICIAL_TARBALL_SRI_MISMATCH'}
 $entries=& tar.exe -tzf $tgz
 if($LASTEXITCODE -ne 0 -or $entries -notcontains 'package/prebuilds/win32-x64/isolated-vm.abi137.node'){throw 'OFFICIAL_WINDOWS_NODE24_PREBUILD_NOT_PRESENT'}
 $env:npm_config_audit='false'
 $env:npm_config_fund='false'
 $env:npm_config_fetch_timeout='20000'
 $env:npm_config_fetch_retries='1'
 & $npm install --prefix $rt --save-exact --omit=dev --omit=optional --foreground-scripts --no-audit --no-fund 'isolated-vm-6@npm:isolated-vm@6.1.2'
 if($LASTEXITCODE -ne 0){throw 'ISOLATED_NATIVE_INSTALL_FAILED'}
}
$p=Get-Content $pkg -Raw|ConvertFrom-Json
if($p.name -ne 'isolated-vm' -or $p.version -ne '6.1.2' -or !(Test-Path $prebuilt)){throw 'INSTALLED_NATIVE_PACKAGE_IDENTITY_FAIL'}
$ownTest=Join-Path $pre 'X19-IsolatedVM-Own-Advanced-Decoder-Check.mjs'
if(!(Test-Path $ownTest)){throw 'OWN_ADVANCED_DECODER_TEST_NOT_PRESENT'}
& $node --no-node-snapshot --max-old-space-size=384 $ownTest
if($LASTEXITCODE -ne 0){throw 'NATIVE_OWN_SANDBOX_TEST_FAILED'}
$accept=Get-Content (Join-Path $pre 'X19-OWN-NATIVE-DEOBFUSCATOR-ACCEPTANCE.json') -Raw|ConvertFrom-Json
if($accept.status -ne 'ADVANCED_NATIVE_DECODER_ACTIVE' -or $accept.actualWebcrackSandboxInvocations -lt 1){throw 'NATIVE_WEBCRACK_DECODER_NOT_USED'}
Write-Output ('X19_NODE24_NATIVE_VERIFY_PASS='+$p.version)
Write-Output ('X19_NODE24_ABI='+$abi+' BINARY_SHA256='+(Get-FileHash $prebuilt -Algorithm SHA256).Hash)
Write-Output ('X19_NATIVE_LOCK_SHA256='+(Get-FileHash (Join-Path $rt 'package-lock.json') -Algorithm SHA256).Hash)
Write-Output ('X19_ADVANCED_DECODER_CALLS='+$accept.actualWebcrackSandboxInvocations)

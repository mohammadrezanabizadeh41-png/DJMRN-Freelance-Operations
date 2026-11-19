param(
  [Parameter(Mandatory=$true)][string]$JavaScript,
  [Parameter(Mandatory=$true)][string]$SourceMap,
  [Parameter(Mandatory=$true)][string]$Output,
  [ValidateSet('json','html')][string]$Format='json',
  [switch]$AllowNoBorderChecks
)
$ErrorActionPreference='Stop'
$runtime=Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\X17-SourceMapExplorer'
$cli=Join-Path $runtime 'node_modules\source-map-explorer\bin\cli.js'
$node='C:\Program Files\nodejs\node.exe'
foreach($p in @($JavaScript,$SourceMap,$cli,$node)) {
  if(-not(Test-Path -LiteralPath $p -PathType Leaf)){ throw ('MISSING_REQUIRED_FILE: '+$p) }
}
if((Get-Item -LiteralPath $JavaScript).Length -gt 200MB){throw 'INPUT_JS_OVER_200MB_REVIEW_REQUIRED'}
if((Get-Item -LiteralPath $SourceMap).Length -gt 50MB){throw 'INPUT_MAP_OVER_50MB_REVIEW_REQUIRED'}
$free=[double](Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory / 1024
if($free -lt 350){throw ('STOP_LOW_RAM_MIB='+[math]::Round($free))}
if(Test-Path -LiteralPath $Output){throw ('OUTPUT_EXISTS_NO_OVERWRITE: '+$Output)}
$args=@($cli,$JavaScript,$SourceMap)
if($AllowNoBorderChecks){$args+='--no-border-checks'}
$args+=('--'+$Format)
$args+=$Output
& $node @args
if($LASTEXITCODE -ne 0){ throw ('SOURCE_MAP_EXPLORER_EXIT='+$LASTEXITCODE) }
if(-not(Test-Path -LiteralPath $Output -PathType Leaf)){throw 'OUTPUT_MISSING_AFTER_SUCCESS'}
Write-Output ('X17_OUTPUT='+$Output)
Write-Output ('X17_FORMAT='+$Format)
Write-Output ('X17_MODE='+$(if($AllowNoBorderChecks){'EXPLICIT_RELAXED_BORDER_CHECKS'}else{'STRICT'}))
Write-Output ('X17_OUTPUT_SHA256='+(Get-FileHash -LiteralPath $Output -Algorithm SHA256).Hash)

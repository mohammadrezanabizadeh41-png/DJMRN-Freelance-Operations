param(
 [string]$Run='X12-PINCHTAB-TRUE180-2026-11-19T12-11-45-554Z',
 [int]$PixelStride=12,
 [double]$DifferenceThreshold=22
)
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$root=Join-Path $env:USERPROFILE 'Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION'
$dir=Join-Path $root "01-private-captures\X12\$Run"
$files=@(Get-ChildItem $dir -Filter '*.jpg' -File|Sort-Object Name)
if($files.Count -lt 2){throw 'At least two privately saved X12 screenshots required.'}
$pairs=@()
for($i=1;$i -lt $files.Count;$i++){
 $a=[System.Drawing.Bitmap]::new($files[$i-1].FullName)
 $b=[System.Drawing.Bitmap]::new($files[$i].FullName)
 try {
  $w=[Math]::Min($a.Width,$b.Width);$h=[Math]::Min($a.Height,$b.Height)
  $samples=0;$changed=0;[double]$total=0
  for($y=0;$y -lt $h;$y+=$PixelStride){
   for($x=0;$x -lt $w;$x+=$PixelStride){
    $p=$a.GetPixel($x,$y);$q=$b.GetPixel($x,$y)
    $d=([Math]::Abs([int]$p.R-[int]$q.R)+[Math]::Abs([int]$p.G-[int]$q.G)+[Math]::Abs([int]$p.B-[int]$q.B))/3
    $samples++;$total+=$d;if($d -gt $DifferenceThreshold){$changed++}
   }
  }
  $pairs += [pscustomobject]@{from=$files[$i-1].Name;to=$files[$i].Name;sampledPoints=$samples;changedPct=[math]::Round(100*$changed/$samples,2);meanAbsoluteRGB=[math]::Round($total/$samples,2);imageDimensions="$($a.Width)x$($a.Height)"}
 } finally {$a.Dispose();$b.Dispose()}
}
$avg=[math]::Round(($pairs|Measure-Object changedPct -Average).Average,2)
$oldPath=Join-Path $root '02-reviewed-derived\X11-temporal-frame-change-visual-qa-2026-11-19.json'
$old=@()
if(Test-Path $oldPath){$oldSource=Get-Content $oldPath -Raw|ConvertFrom-Json;foreach($r in $oldSource.runs){$old += [pscustomobject]@{run=$r.run;meanPct=$r.meanSampledChangedPct;framePairs=$r.comparisonCount}}}
$out=Join-Path $root "02-reviewed-derived\$Run-visual-frame-change-and-X11-comparison.json"
[pscustomobject]@{stage='X12';run=$Run;reference='https://www.gladeye.com/';method='JPEG screenshots; sample every PixelStride px; mean absolute per-channel RGB > DifferenceThreshold; do not equate pixel changes with new 3D assets';pixelStride=$PixelStride;differenceThreshold=$DifferenceThreshold;frames=$files.Count;averageChangedPercent=$avg;pairs=$pairs;comparisonX11=$old;previousRawScreenshotFilesNotCopied=$true}|ConvertTo-Json -Depth 7|Set-Content -Path $out -Encoding UTF8
"X12_VISUAL_QA_PASS=$out"
"FRAMES=$($files.Count)|FRAME_PAIRS=$($pairs.Count)|AVERAGE_CHANGED_PERCENT=$avg"
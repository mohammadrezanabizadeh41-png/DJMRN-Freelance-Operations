$ErrorActionPreference='Stop'
# DJMRN X28: read-only local screenshot comparison; does NOT publish pixels or prove interactions caused dispersal.
Add-Type -AssemblyName System.Drawing
$root=Join-Path $env:USERPROFILE 'Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION'
$out=Join-Path $root '02-reviewed-derived\X28-CURRENT'
$names=@('normal_baseline','hover_left','hover_right','dispersal_candidate_sweep','dispersal_candidate_scroll','return_scroll_up','return_pointer_out','return_idle')
$records=@()
foreach($tool in @('SPECTOR','ISPETTORE')){
 $dir=Join-Path $root ('01-private-captures\X28\'+$tool+'-90S')
 $reference=Join-Path $dir ('X28-'+$tool+'-PRIVATE-normal_baseline.png')
 if(-not(Test-Path $reference)){throw "MISSING_BASELINE_SCREENSHOT $reference"}
 $base=New-Object System.Drawing.Bitmap($reference)
 try{
  foreach($label in $names){
   $file=Join-Path $dir ('X28-'+$tool+'-PRIVATE-'+$label+'.png')
   if(-not(Test-Path $file)){throw "MISSING_PHASE_SCREENSHOT $file"}
   $bm=New-Object System.Drawing.Bitmap($file)
   try{
    if($bm.Width -ne $base.Width -or $bm.Height -ne $base.Height){throw 'INCONSISTENT_VIEWPORT_DIMENSIONS'}
    $total=0.0;$changeCount=0;$pixCount=0;$brightness=0.0
    for($y=8;$y -lt $bm.Height;$y+=24){
     for($x=8;$x -lt $bm.Width;$x+=24){
      $a=$base.GetPixel($x,$y);$b=$bm.GetPixel($x,$y)
      $delta=([math]::Abs([int]$a.R-[int]$b.R)+[math]::Abs([int]$a.G-[int]$b.G)+[math]::Abs([int]$a.B-[int]$b.B))/3.0
      $total+=$delta;$brightness+=([int]$b.R+[int]$b.G+[int]$b.B)/3.0;$pixCount++
      if($delta -ge 24.0){$changeCount++}
     }
    }
    $records+=@{observer=$tool;phaseCandidate=$label;viewport=("$($bm.Width)x$($bm.Height)");sampledPixels=$pixCount;
      meanRGBDifferenceFromSameObserverBaseline=[math]::Round($total/$pixCount,4);
      fractionPixelsWithRGBDifferenceAtLeast24=[math]::Round($changeCount/$pixCount,4);
      meanObservedRGB=[math]::Round($brightness/$pixCount,4);
      screenshotSHA256=(Get-FileHash $file -Algorithm SHA256).Hash.ToLower();screenshotBytes=(Get-Item $file).Length}
   }finally{$bm.Dispose()}
  }
 }finally{$base.Dispose()}
}
$result=[ordered]@{stage='X28';source='8 locally private PNG screenshots per inspector; only sampled RGB difference metadata exported';reference='Each observer normal_baseline capture; separate 90-second sessions at 1280x720';sampleGridStridePx=24;
originalPixelsPublished=$false;causality='NOT_INFERRED_FROM_SCREENSHOT_DIFFERENCE';dispersalVisuallyConfirmed=$false;
warning='Animation and time differences can cause pixel changes independent of mouse/scroll. Return similarity is NOT proof of completed transition.';
snapshots=$records}
$file=Join-Path $out 'X28-SANITIZED-PRIVATE-SCREENSHOT-VISUAL-DELTA.json'
[IO.File]::WriteAllText($file,($result|ConvertTo-Json -Depth 7)+[Environment]::NewLine,[Text.UTF8Encoding]::new($false))
[pscustomobject]@{file=$file;records=$records.Count;baseline=($records|Where-Object {$_.phaseCandidate -eq 'normal_baseline'}|Select-Object observer,meanRGBDifferenceFromSameObserverBaseline);maxMeanDelta=[math]::Round((($records|ForEach-Object {[double]$_['meanRGBDifferenceFromSameObserverBaseline']}|Measure-Object -Maximum).Maximum),3)}|ConvertTo-Json -Depth 4 -Compress

// Six original vector concept kit illustrations for M01 S12.
// Source and generated SVG are owned within the project, without external art/fonts.
import {writeFile} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dir=join(root,'site','assets','img');
const kits=['landing-kit','company-site-kit','portfolio-kit','multilingual-ui-kit','seo-starter-audit','performance-check-pack'];
const tones=['#244766','#305474','#51436a','#1c6368','#305d65','#26506b'];
function rect(x,y,w,h,r,fill,opacity=1){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+fill+'" opacity="'+opacity+'"/>'}
function line(x,y,w,c='#b8cbd4',opacity=.7,h=12){return rect(x,y,w,h,h/2,c,opacity)}
function scene(n){
 let art='';
 // All artwork uses fictional interface patterns: editable vector shapes, no borrowed imagery.
 if(n===0){
  art+=rect(165,136,562,400,25,'#183049')+line(195,169,145,'#edc687',1);
  art+=line(195,227,290,'#f9eee0',1,29)+line(195,272,225)+line(195,304,190);
  art+=rect(195,375,155,54,15,'#ecc37c')+rect(500,208,198,247,23,'#34576e');
  art+='<circle cx="599" cy="330" r="80" fill="#eec584"/><circle cx="599" cy="330" r="34" fill="#28516c"/>';
 }else if(n===1){
  art+=rect(149,145,594,398,25,'#19344c')+rect(170,165,554,78,14,'#32566b')+line(192,194,160,'#f9e5bd',1,24);
  art+=rect(176,268,338,157,17,'#274861')+line(198,304,255,'#f6e6d4',1,25)+line(198,350,204);
  art+=rect(536,268,179,157,17,'#b28379')+'<circle cx="624" cy="346" r="58" fill="#efc888"/>';
  for(let j=0;j<3;j++)art+=rect(176+j*183,449,165,69,12,'#3b6573');
 }else if(n===2){
  art+=rect(155,145,588,400,25,'#1d2e4a')+rect(184,170,194,319,16,'#746995');
  art+='<circle cx="278" cy="310" r="71" fill="#ecc989"/><circle cx="278" cy="310" r="34" fill="#65598a"/>';
  art+=rect(401,170,309,146,16,'#2b7377');
  art+='<path d="M428 282l65-69 70 55 53-43 65 57" stroke="#b0e2d3" stroke-width="19" fill="none" stroke-linecap="round"/>';
  art+=rect(401,340,309,149,16,'#b47480')+'<circle cx="554" cy="410" r="53" fill="#e7bc9e"/>';
 }else if(n===3){
  art+=rect(144,141,276,406,26,'#22445c')+rect(449,141,276,406,26,'#245c63');
  art+=rect(168,164,228,55,13,'#efc480')+rect(473,164,228,55,13,'#efc480');
  for(let j=0;j<4;j++){
   art+=line(170,254+j*42,195-j*25,'#d8e6e4',1,16);
   art+=line(475+j*10,254+j*42,194-j*28,'#d8e6e4',1,16);
  }
  art+='<path d="M395 480h86m-19-17 19 17-19 17m-48-34-19 17 19 17" stroke="#efc480" stroke-width="8" fill="none" stroke-linecap="round"/>';
 }else if(n===4){
  art+=rect(166,139,556,407,27,'#1d3c4c')+line(194,170,274,'#f8e5c7',1,23);
  for(let j=0;j<3;j++){
   const y=225+j*98;art+=rect(195,y,488,78,15,'#2b5861');
   art+='<circle cx="244" cy="'+(y+39)+'" r="21" fill="'+(j<2?'#93d9bb':'#e9bf82')+'"/>';
   if(j<2)art+='<path d="m234 '+(y+39)+' 8 9 15-18" stroke="#214950" stroke-width="7" fill="none"/>';
   art+=line(289,y+31,301-j*48);
  }
 }else{
  art+=rect(155,145,568,396,26,'#203e55')+rect(180,170,517,223,15,'#142f45');
  art+='<path d="M206 354h463M206 354v-148" stroke="#87aaba" stroke-opacity=".4" stroke-width="5"/>';
  art+='<path d="M213 336 283 287 348 312 412 251 489 266 561 215 647 200" stroke="#efc587" fill="none" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/>';
  for(let j=0;j<4;j++)art+=rect(190+j*128,422,110,88,15,['#498b8b','#64a9a0','#7ec3ae','#b4ddbe'][j]);
 }
 return art;
}
function svg(id,index){
 let body=scene(index);
 return '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="690" viewBox="0 0 1200 690" role="img" aria-labelledby="title desc">'+
 '<title id="title">NOVA Atelier original kit concept: '+id+'</title><desc id="desc">An original abstract design study of a fictional digital kit. Not a saleable product.</desc>'+
 '<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+tones[index]+'"/><stop offset="1" stop-color="#0c182b"/></linearGradient>'+
 '<radialGradient id="glow"><stop stop-color="#f0c489" stop-opacity=".22"/><stop offset="1" stop-color="#f0c489" stop-opacity="0"/></radialGradient></defs>'+
 rect(0,0,1200,690,20,'url(#bg)')+'<circle cx="1005" cy="270" r="300" fill="url(#glow)"/>'+
 body+'<g fill="none" stroke="#efc588" opacity=".37"><circle cx="970" cy="344" r="190"/><circle cx="970" cy="344" r="140" stroke-dasharray="7 13"/></g>'+
 '<g stroke="#efc588" stroke-linecap="round" stroke-width="8"><path d="M970 286v116M912 344h116M928 302l84 84M928 386l84-84"/></g>'+
 '<path d="M133 598h955" stroke="#f1c788" stroke-opacity=".32" stroke-width="3"/>'+
 '<circle cx="145" cy="599" r="9" fill="#f1c788"/><circle cx="1076" cy="599" r="9" fill="#a8d6d0"/></svg>\n';
}
for(const [i,id] of kits.entries()){
 await writeFile(join(dir,'s12-'+id+'.svg'),svg(id,i),'utf8');
 console.log('S12_ORIGINAL_VECTOR '+id);
}

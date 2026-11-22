// S12 progressive-enhancement catalog controls. Native details and all six cards remain without JS.
// No storage, requests, HTML injection, checkout/payment or user identity.
export function initCatalog(){
 const form=document.getElementById('catalog-filters');
 const input=document.getElementById('kit-search');
 const select=document.getElementById('kit-category');
 const grid=document.getElementById('kit-grid');
 const total=document.getElementById('kit-count');
 const empty=document.getElementById('kit-empty');
 const resetEmpty=document.getElementById('kit-empty-reset');
 if(!form||!input||!select||!grid||!total||!empty||!resetEmpty)return;
 const count=total.querySelector('bdi');
 const cards=[...grid.querySelectorAll('[data-kit][data-category][data-search]')];
 if(cards.length!==6||!count)return;
 const fold=s=>String(s||'').normalize('NFKC').toLocaleLowerCase().replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/\s+/g,' ').trim();
 const searchText=new Map(cards.map(card=>[card,fold(card.dataset.search)]));
 function update(){
  const q=fold(input.value),filter=select.value;
  let number=0;
  for(const card of cards){
   const match=(!q||searchText.get(card).includes(q))&&(filter==='all'||card.dataset.category===filter);
   card.hidden=!match;
   if(match)number++;
  }
  count.textContent=String(number);
  empty.hidden=number!==0;
 }
 function clearAndFocus(){
  form.reset();
  update();
  input.focus();
 }
 form.hidden=false; // JS-gated; with JS disabled all six HTML cards remain visible.
 form.addEventListener('submit',event=>{event.preventDefault();update();});
 input.addEventListener('input',update);
 select.addEventListener('change',update);
 form.addEventListener('reset',event=>{
  event.preventDefault();
  input.value='';
  select.value='all';
  update();
 }); // Synchronous, deterministic visible reset for buttons and keyboard.
 resetEmpty.addEventListener('click',clearAndFocus);
 update();
}

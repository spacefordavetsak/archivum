const visualLabels={
  ru:{tree:'Схема-дерево',svg:'Схема',map:'Карта',expand:'Развернуть',close:'Закрыть',fit:'Вместить',zoomIn:'Увеличить',zoomOut:'Уменьшить',natural:'Натуральный размер',hint:'Сдвигайте схему влево и вправо или разверните её.',mapHint:'Разверните карту, чтобы рассмотреть детали.',viewerHint:'Масштаб — кнопками + и −. Перемещение — пальцем или мышью.',table:'Таблица: можно сдвигать влево и вправо.'},
  en:{tree:'Tree diagram',svg:'Diagram',map:'Map',expand:'Expand',close:'Close',fit:'Fit',zoomIn:'Zoom in',zoomOut:'Zoom out',natural:'Natural size',hint:'Scroll the diagram sideways or expand it.',mapHint:'Expand the map to explore the details.',viewerHint:'Use + and − to zoom. Drag or swipe to move.',table:'Table: scroll sideways to see all columns.'}
};
const visualText=key=>visualLabels[document.documentElement.lang==='en'?'en':'ru'][key];
let visualViewer=null,visualState=null;
const expandIcon='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M3 3l6 6m12-6-6 6M3 21l6-6m12 6-6-6"/></svg>';
function closeReaderOverlays(){document.querySelectorAll('dialog.reader-overlay[open]').forEach(dialog=>dialog.close())}
function escapeVisual(value){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
function visualTitle(article,element,fallback){
  const preceding=[...article.querySelectorAll('h2,h3,h4')].filter(heading=>heading.compareDocumentPosition(element)&Node.DOCUMENT_POSITION_FOLLOWING);
  return preceding.length?preceding[preceding.length-1].textContent.trim():fallback;
}
function enhanceNoteVisuals(article){
  [...article.querySelectorAll('.note-tree,.note-diagram,img')].forEach(element=>{
    if(element.closest('.archive-visual'))return;
    const kind=element.matches('.note-tree')?'tree':element.tagName==='IMG'?'map':'svg';
    const title=visualTitle(article,element,visualText(kind));
    const figure=document.createElement('figure');figure.className='archive-visual';figure.dataset.visualKind=kind;
    figure.innerHTML=`<figcaption class="visual-bar"><span>${visualText(kind)}</span><button type="button" class="visual-expand" aria-label="${visualText('expand')}: ${escapeVisual(title)}">${expandIcon}<span>${visualText('expand')}</span></button></figcaption><div class="visual-scroll" tabindex="0" role="region" aria-label="${escapeVisual(title)}"><div class="visual-canvas"></div></div><p class="visual-hint">${visualText(kind==='map'?'mapHint':'hint')}</p>`;
    element.replaceWith(figure);figure.querySelector('.visual-canvas').append(element);
    figure.querySelector('.visual-expand').addEventListener('click',()=>openVisualViewer(element,title));
    if(kind==='tree'){
      const center=()=>{const scroll=figure.querySelector('.visual-scroll');scroll.scrollLeft=Math.max(0,(scroll.scrollWidth-scroll.clientWidth)/2)};
      requestAnimationFrame(center);document.fonts.ready.then(center);
    }
  });
  article.querySelectorAll('.note-table-scroll').forEach(wrapper=>{
    wrapper.setAttribute('role','region');wrapper.setAttribute('aria-label',visualText('table'));
    const hint=document.createElement('div');hint.className='table-scroll-hint';hint.textContent=visualText('table');wrapper.before(hint);
  });
}
function createVisualViewer(){
  const dialog=document.createElement('dialog');dialog.id='visual-viewer';dialog.className='visual-viewer reader-overlay';dialog.setAttribute('aria-labelledby','visual-viewer-title');
  dialog.innerHTML='<header class="visual-viewer-header"><h2 id="visual-viewer-title"></h2><button type="button" class="visual-viewer-close" autofocus>×</button></header><div class="visual-viewer-controls"><button type="button" data-visual-action="out">−</button><output aria-live="polite">100%</output><button type="button" data-visual-action="in">+</button><button type="button" data-visual-action="fit"></button><button type="button" data-visual-action="natural">100%</button></div><div class="visual-viewer-scroll" tabindex="0"><div class="visual-viewer-stage"><div class="visual-viewer-content note-body"></div></div></div><div class="visual-viewer-footer"></div>';
  document.body.append(dialog);
  dialog.querySelector('.visual-viewer-close').addEventListener('click',()=>dialog.close());
  dialog.querySelector('[data-visual-action="in"]').addEventListener('click',()=>setVisualScale(visualState.scale*1.35));
  dialog.querySelector('[data-visual-action="out"]').addEventListener('click',()=>setVisualScale(visualState.scale/1.35));
  dialog.querySelector('[data-visual-action="natural"]').addEventListener('click',()=>setVisualScale(1));
  dialog.querySelector('[data-visual-action="fit"]').addEventListener('click',fitVisualViewer);
  dialog.addEventListener('close',()=>{dialog.querySelector('.visual-viewer-content').replaceChildren();visualState=null});
  dialog.querySelector('.visual-viewer-content').addEventListener('click',event=>{if(event.target.closest('a'))event.preventDefault()});
  const scroll=dialog.querySelector('.visual-viewer-scroll');let drag=null;
  scroll.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse'||event.button!==0)return;drag={x:event.clientX,y:event.clientY,left:scroll.scrollLeft,top:scroll.scrollTop};scroll.setPointerCapture(event.pointerId);scroll.style.cursor='grabbing'});
  scroll.addEventListener('pointermove',event=>{if(!drag)return;scroll.scrollLeft=drag.left+drag.x-event.clientX;scroll.scrollTop=drag.top+drag.y-event.clientY});
  ['pointerup','pointercancel'].forEach(type=>scroll.addEventListener(type,()=>{drag=null;scroll.style.cursor=''}));
  window.addEventListener('resize',()=>{if(dialog.open&&visualState)fitVisualViewer()});
  return dialog;
}
function setVisualScale(value,center=true){
  if(!visualState||!visualViewer?.open)return;
  const scroll=visualViewer.querySelector('.visual-viewer-scroll'),content=visualViewer.querySelector('.visual-viewer-content'),stage=visualViewer.querySelector('.visual-viewer-stage');
  const previous=visualState.scale||1;
  const point={x:(scroll.scrollLeft+scroll.clientWidth/2)/previous,y:(scroll.scrollTop+scroll.clientHeight/2)/previous};
  visualState.scale=Math.max(.025,Math.min(4,value));
  content.style.transform=`scale(${visualState.scale})`;
  stage.style.width=`${Math.ceil(visualState.width*visualState.scale)}px`;stage.style.height=`${Math.ceil(visualState.height*visualState.scale)}px`;
  visualViewer.querySelector('output').textContent=`${Math.round(visualState.scale*100)}%`;
  if(center){scroll.scrollLeft=point.x*visualState.scale-scroll.clientWidth/2;scroll.scrollTop=point.y*visualState.scale-scroll.clientHeight/2}else{scroll.scrollLeft=0;scroll.scrollTop=0}
}
function fitVisualViewer(){
  if(!visualState)return;
  const scroll=visualViewer.querySelector('.visual-viewer-scroll');
  setVisualScale(Math.min((scroll.clientWidth-40)/visualState.width,(scroll.clientHeight-40)/visualState.height,1),false);
}
async function openVisualViewer(element,title){
  if(!visualViewer)visualViewer=createVisualViewer();
  const dialog=visualViewer,content=dialog.querySelector('.visual-viewer-content');
  dialog.querySelector('h2').textContent=title;
  dialog.querySelector('.visual-viewer-close').setAttribute('aria-label',visualText('close'));
  dialog.querySelector('[data-visual-action="in"]').setAttribute('aria-label',visualText('zoomIn'));
  dialog.querySelector('[data-visual-action="out"]').setAttribute('aria-label',visualText('zoomOut'));
  dialog.querySelector('[data-visual-action="fit"]').textContent=visualText('fit');
  dialog.querySelector('[data-visual-action="natural"]').setAttribute('aria-label',visualText('natural'));
  dialog.querySelector('.visual-viewer-footer').textContent=visualText('viewerHint');
  const clone=element.cloneNode(true);if(clone.id)clone.id='viewer-'+clone.id;clone.querySelectorAll('[id]').forEach(node=>node.id='viewer-'+node.id);
  clone.querySelectorAll('*').forEach(node=>{for(const attr of [...node.attributes])if(attr.value.includes('url(#'))node.setAttribute(attr.name,attr.value.replace(/url\(#/g,'url(#viewer-'))});
  if(clone.tagName==='IMG')clone.draggable=false;
  visualState=null;dialog.querySelector('output').textContent='…';dialog.querySelectorAll('.visual-viewer-controls button').forEach(button=>button.disabled=true);
  content.style.transform='none';content.replaceChildren(clone);dialog.showModal();
  const images=clone.tagName==='IMG'?[clone]:[...clone.querySelectorAll('img')];
  await Promise.allSettled(images.map(image=>image.decode()));
  await document.fonts.ready;
  if(!dialog.open||content.firstElementChild!==clone)return;
  const rect=content.getBoundingClientRect();visualState={width:rect.width,height:rect.height,scale:1};fitVisualViewer();
  if(clone.matches('.note-tree')&&matchMedia('(max-width:600px)').matches){setVisualScale(.9,false);const scroll=dialog.querySelector('.visual-viewer-scroll');scroll.scrollLeft=Math.max(0,(scroll.scrollWidth-scroll.clientWidth)/2)}
  dialog.querySelectorAll('.visual-viewer-controls button').forEach(button=>button.disabled=false);
}

const localNoteIds = new Set(['95870a2a-ae02-4622-8287-2e677c46fdad','e7839d1e-9989-4fd2-b7c0-9ad1b2e1b215','64cf4f3d-13e9-47a3-9911-9f92e5b2a57e','platonism-roadmap','machiavelli-discourses','plato-crito-analysis','plato-euthyphro-analysis','plato-parmenides-analysis','plato-sophist-analysis','plato-philebus-analysis','plato-republic-1-analysis','plato-republic-2-analysis','plato-republic-3-analysis','plato-republic-4-analysis','plato-apology-analysis','plato-alcibiades-ii-analysis','plato-theages-analysis']);
const readingCache = new Map();
let readerRenderNumber = 0;
const readerCopy = {
  ru:{read:'Читать конспект',contents:'Содержание',findChapter:'Найти главу или имя…',chapterSearch:'Поиск в оглавлении',nothing:'Совпадений в оглавлении нет',loading:'Загружаем конспект…',error:'Не удалось загрузить текст',tryAgain:'Повторить загрузку',minutes:'мин чтения',parts:'разделов',fullText:'Полный текст',start:'В начало конспекта',back:'Вернуться в раздел',previous:'Предыдущий материал',next:'Следующий материал',originalLanguage:'Текст на русском языке'},
  en:{read:'Read the notes',contents:'Contents',findChapter:'Find a chapter or name…',chapterSearch:'Search contents',nothing:'No matching headings',loading:'Loading the notes…',error:'The text could not be loaded',tryAgain:'Try again',minutes:'min read',parts:'sections',fullText:'Full text',start:'Back to the beginning',back:'Back to the section',previous:'Previous material',next:'Next material',originalLanguage:'Text in Russian'}
};
const readerText=key=>readerCopy[language][key];
function readerPartCount(count){if(language==='en')return `${count} sections`;const end=count%10,lastTwo=count%100;return `${count} ${end===1&&lastTwo!==11?'раздел':end>=2&&end<=4&&(lastTwo<12||lastTwo>14)?'раздела':'разделов'}`}
function noteLinkAttributes(note){return localNoteIds.has(note.id)?`href="#/note/${note.id}"`:`href="${SOURCE}/note/${note.id}" target="_blank" rel="noopener noreferrer"`}
function noteAction(note){return localNoteIds.has(note.id)?readerText('read'):text('source')}
function noteArrow(note){return localNoteIds.has(note.id)?'→':'↗'}
function readerRoute(){const parts=location.hash.replace(/^#\/?/,'').split('/');return {type:parts[0],id:parts[1],anchor:parts[2]}}

function drawContents(note,data,query='',target='reader-toc-links'){
  const normalized=normalize(query);
  const entries=data.toc.filter(entry=>normalized?normalize(entry.title).includes(normalized):entry.level===2);
  const current=readerRoute().anchor;
  document.getElementById(target).innerHTML=entries.length?entries.map(entry=>`<li${entry.level===3?' class="toc-subheading"':''}><a href="#/note/${note.id}/${entry.id}"${current===entry.id?' aria-current="location"':''}>${escapeHTML(entry.title)}</a></li>`).join(''):`<li class="toc-empty">${readerText('nothing')}</li>`;
}
function scrollReaderAnchor(){
  const route=readerRoute();
  if(route.type!=='note'||main.dataset.noteId!==route.id||!document.getElementById('reader-body'))return false;
  if(!route.anchor){window.scrollTo({top:0,behavior:'instant'});return true}
  if(!/^s-\d+$/.test(route.anchor))return false;
  const heading=document.getElementById(route.anchor);
  if(!heading)return false;
  if(document.getElementById('roadmap-search')?.value&&resetRoadmapSearch)resetRoadmapSearch();
  if(heading.tagName==='DETAILS')heading.open=true;
  const details=[];
  for(let parent=heading.parentElement;parent;parent=parent.parentElement)if(parent.tagName==='DETAILS')details.push(parent);
  details.forEach(detail=>detail.open=true);
  heading.setAttribute('tabindex','-1');heading.scrollIntoView({block:'start',behavior:'instant'});heading.focus({preventScroll:true});
  document.querySelectorAll('#reader-toc-links a').forEach(link=>{if(link.getAttribute('href')===`#/note/${route.id}/${route.anchor}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
  return true;
}
async function getNoteContent(id){
  if(!readingCache.has(id)){
    const request=fetch(`notes/${id}.json`).then(response=>{if(!response.ok)throw new Error('Note unavailable');return response.json()}).catch(error=>{readingCache.delete(id);throw error});
    readingCache.set(id,request);
  }
  return readingCache.get(id);
}
async function notePage(id){
  const note=notes.find(item=>item.id===id&&localNoteIds.has(id));
  if(!note){delete main.dataset.noteId;main.innerHTML=`<section class="subpage"><h1>${text('notFound')}</h1><a class="underlined-link" href="#/">${text('back')}</a></section>`;return}
  const renderNumber=++readerRenderNumber;
  main.dataset.noteId=id;
  const section=sections.find(item=>item.id===note.section);
  const collection=noteCollection(note);
  const siblings=notes.filter(item=>item.section===note.section&&item.philosopher===note.philosopher&&item.dialogue===note.dialogue&&item.collection===note.collection&&item.historian===note.historian&&localNoteIds.has(item.id));
  const noteIndex=siblings.indexOf(note),previous=siblings[noteIndex-1],next=siblings[noteIndex+1];
  main.innerHTML=`<section class="reader-page"><header class="reader-header"><a class="back-link" href="${collection.href}"><span aria-hidden="true">←</span>${collection.name}</a><div class="eyebrow">${label(section)} <span aria-hidden="true">·</span> RU <span aria-hidden="true">·</span> <span>${readerText('fullText')}</span></div><h1>${label(note)}</h1><p class="reader-description">${desc(note)}</p><div class="reader-meta" id="reader-meta"><span>${readerText('originalLanguage')}</span></div></header><div id="reader-content" aria-live="polite"><p class="reader-status">${readerText('loading')}</p></div><nav class="reader-end" aria-label="${text('materials')}">${previous?`<a ${noteLinkAttributes(previous)}><span class="nav-caption">${readerText('previous')}</span>← ${label(previous)}</a>`:`<a href="${collection.href}"><span class="nav-caption">${readerText('back')}</span>← ${collection.name}</a>`}${next?`<a ${noteLinkAttributes(next)}><span class="nav-caption">${readerText('next')}</span>${label(next)} →</a>`:`<a href="#/note/${id}">${readerText('start')} ↑</a>`}</nav></section>`;
  document.title=`${label(note)} — ARCHIVUM`;
  try{
    const data=await getNoteContent(id);
    if(renderNumber!==readerRenderNumber||readerRoute().type!=='note'||readerRoute().id!==id)return;
    const parts=data.toc.filter(entry=>entry.level===2).length;
    document.getElementById('reader-meta').innerHTML=`<span>${readerText('originalLanguage')}</span><span>${Math.ceil(data.words/200)} ${readerText('minutes')}</span><span>${readerPartCount(parts)}</span>`;
    document.getElementById('reader-content').innerHTML=`<div class="reader-layout"><aside class="reader-sidebar"><details class="reader-contents"${matchMedia('(min-width: 901px)').matches?' open':''}><summary>${readerText('contents')}<span aria-hidden="true">＋</span></summary><div class="reader-contents-inner"><input type="search" id="reader-toc-search" placeholder="${readerText('findChapter')}" aria-label="${readerText('chapterSearch')}" autocomplete="off"><nav aria-label="${readerText('contents')}"><ul id="reader-toc-links"></ul></nav></div></details><a class="reader-top-link" href="#/note/${id}">${readerText('start')} ↑</a></aside><article id="reader-body" class="note-body" lang="ru" aria-label="${escapeHTML(note.ru)}">${data.html}</article></div>`;
    drawContents(note,data);
    enhanceNoteVisuals(document.getElementById('reader-body'));
    installRoadmapSearch(document.getElementById('reader-body'));
    installReaderMobileTools(note,data);
    document.getElementById('reader-toc-search').addEventListener('input',event=>drawContents(note,data,event.target.value));
    scrollReaderAnchor();
  }catch{
    if(renderNumber!==readerRenderNumber||readerRoute().id!==id)return;
    document.getElementById('reader-content').innerHTML=`<div class="reader-load-error"><p>${readerText('error')}</p><button class="underlined-link" id="reader-retry">${readerText('tryAgain')}</button></div>`;
    document.getElementById('reader-retry').addEventListener('click',()=>notePage(id));
  }
}

let mobileContentsDialog=null;
function installReaderMobileTools(note,data){
  const tools=document.createElement('nav');tools.className='reader-mobile-tools';tools.setAttribute('aria-label',readerText('contents'));
  tools.innerHTML=`<button type="button" data-reader-contents><span aria-hidden="true">☷</span>${readerText('contents')}</button><button type="button" data-reader-top>${language==='ru'?'Наверх':'Top'}<span aria-hidden="true">↑</span></button>`;
  main.querySelector('.reader-page').append(tools);
  tools.querySelector('[data-reader-contents]').addEventListener('click',()=>openMobileContents(note,data));
  tools.querySelector('[data-reader-top]').addEventListener('click',()=>{if(readerRoute().anchor)location.hash=`#/note/${note.id}`;window.scrollTo({top:0,behavior:'instant'})});
}
function openMobileContents(note,data){
  if(!mobileContentsDialog){mobileContentsDialog=document.createElement('dialog');mobileContentsDialog.className='reader-toc-dialog reader-overlay';mobileContentsDialog.setAttribute('aria-labelledby','mobile-contents-title');document.body.append(mobileContentsDialog)}
  const dialog=mobileContentsDialog;
  dialog.innerHTML=`<div class="dialog-top"><h2 class="eyebrow" id="mobile-contents-title">${readerText('contents')}</h2><button class="icon-button" aria-label="${text('close')}" autofocus>×</button></div><div class="reader-contents-inner"><input type="search" id="mobile-contents-search" placeholder="${readerText('findChapter')}" aria-label="${readerText('chapterSearch')}" autocomplete="off"><nav aria-label="${readerText('contents')}"><ul id="mobile-reader-toc"></ul></nav></div>`;
  dialog.querySelector('.icon-button').addEventListener('click',()=>dialog.close());
  dialog.querySelector('input').addEventListener('input',event=>drawContents(note,data,event.target.value,'mobile-reader-toc'));
  dialog.querySelector('nav').addEventListener('click',event=>{if(event.target.closest('a'))dialog.close()});
  drawContents(note,data,'','mobile-reader-toc');dialog.showModal();
}

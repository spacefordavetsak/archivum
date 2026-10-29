const philosophyCollections=[{id:'roadmap',noteId:'platonism-roadmap',ru:'Дорожная карта',en:'Roadmap',image:'assets/roadmap-busts.jpeg',imagePosition:'center 46%',ruDesc:'Маршруты чтения и изучения философии.',enDesc:'Routes through philosophical reading and study.'}];
const religionCollections=[
  {id:'christianity',section:'religion',ru:'Христианство',en:'Christianity',image:'assets/christianity-cover.jpeg',imagePosition:'center 28%',ruDesc:'Тексты, конспекты и заметки по христианству.',enDesc:'Texts, reading notes, and reflections on Christianity.'},
  {id:'islam',section:'religion',ru:'Ислам',en:'Islam',ruDesc:'Тексты, конспекты и заметки по исламу.',enDesc:'Texts, reading notes, and reflections on Islam.'},
  {id:'judaism',section:'religion',ru:'Иудаизм',en:'Judaism',ruDesc:'Тексты, конспекты и заметки по иудаизму.',enDesc:'Texts, reading notes, and reflections on Judaism.'},
  {id:'buddhism',section:'religion',ru:'Буддизм',en:'Buddhism',ruDesc:'Тексты, конспекты и заметки по буддизму.',enDesc:'Texts, reading notes, and reflections on Buddhism.'},
  {id:'confucianism',section:'religion',ru:'Конфуцианство',en:'Confucianism',ruDesc:'Тексты, конспекты и заметки по конфуцианству.',enDesc:'Texts, reading notes, and reflections on Confucianism.'},
  {id:'taoism',section:'religion',ru:'Даосизм',en:'Taoism',ruDesc:'Тексты, конспекты и заметки по даосизму.',enDesc:'Texts, reading notes, and reflections on Taoism.'},
  {id:'shinto',section:'religion',ru:'Синтоизм',en:'Shinto',ruDesc:'Тексты, конспекты и заметки по синтоизму.',enDesc:'Texts, reading notes, and reflections on Shinto.'}
];
const archiveCollections=()=>[...philosophyCollections,...historyCollections,...religionCollections];
const collectionHref=collection=>collection.noteId?`#/note/${collection.noteId}`:`#/collection/${collection.id}`;
const platoDialogues=[
  {id:'apology',ru:'Апология Сократа',en:'Apology of Socrates'},
  {id:'crito',ru:'Критон',en:'Crito'},
  {id:'theages',ru:'Феаг',en:'Theages'},
  {id:'alcibiades-ii',ru:'Алкивиад II',en:'Alcibiades II'},
  {id:'menexenus',ru:'Менексен',en:'Menexenus'},
  {id:'euthydemus',ru:'Евтидем',en:'Euthydemus'},
  {id:'lesser-hippias',ru:'Гиппий Меньший',en:'Lesser Hippias'},
  {id:'alcibiades-i',ru:'Алкивиад I',en:'Alcibiades I'},
  {id:'laches',ru:'Лахет',en:'Laches'},
  {id:'euthyphro',ru:'Евтифрон',en:'Euthyphro'},
  {id:'lysis',ru:'Лисид',en:'Lysis'},
  {id:'charmides',ru:'Хармид',en:'Charmides'},
  {id:'ion',ru:'Ион',en:'Ion'},
  {id:'greater-hippias',ru:'Гиппий Больший',en:'Greater Hippias'},
  {id:'protagoras',ru:'Протагор',en:'Protagoras'},
  {id:'gorgias',ru:'Горгий',en:'Gorgias'},
  {id:'meno',ru:'Менон',en:'Meno'},
  {id:'cratylus',ru:'Кратил',en:'Cratylus'},
  {id:'phaedo',ru:'Федон',en:'Phaedo'},
  {id:'symposium',ru:'Пир',en:'Symposium'},
  {id:'phaedrus',ru:'Федр',en:'Phaedrus'},
  {id:'theaetetus',ru:'Теэтет',en:'Theaetetus'},
  {id:'sophist',ru:'Софист',en:'Sophist'},
  {id:'parmenides',ru:'Парменид',en:'Parmenides'},
  {id:'philebus',ru:'Филеб',en:'Philebus'},
  {id:'republic',ru:'Государство',en:'Republic'},
  {id:'timaeus',ru:'Тимей',en:'Timaeus'},
  {id:'critias',ru:'Критий',en:'Critias'},
  {id:'statesman',ru:'Политик',en:'Statesman'},
  {id:'laws',ru:'Законы',en:'Laws'},
  {id:'epinomis',ru:'Послезаконие',en:'Epinomis'}
];
const republicBooks=['I','II','III','IV','V','VI','VII','VIII','IX','X'];
const libraryCopy={
  ru:{collections:'Подразделы',dialogues:'Диалоги Платона',dialogueShort:'ДИАЛ.',books:'Книги',bookShort:'КНИГ',book:'Книга',allDialogues:'Все диалоги',allBooks:'Все книги',dialogueEmpty:'Здесь появятся конспекты и заметки по этому диалогу.',bookEmpty:'Здесь появятся конспекты и заметки по этой книге.',previous:'Предыдущий диалог',next:'Следующий диалог',search:'Поиск по дорожной карте',placeholder:'Автор, труд, термин или школа…',found:'Найдено разделов'},
  en:{collections:'Collections',dialogues:'Plato’s dialogues',dialogueShort:'DIALOGUES',books:'Books',bookShort:'BOOKS',book:'Book',allDialogues:'All dialogues',allBooks:'All books',dialogueEmpty:'Notes on this dialogue will appear here.',bookEmpty:'Notes on this book will appear here.',previous:'Previous dialogue',next:'Next dialogue',search:'Search the roadmap',placeholder:'Author, work, term, or school…',found:'Matching sections'}
};
const libraryText=key=>libraryCopy[language][key];
function materialList(items){return renderArchiveBlocks(items.map(note=>({...note,note,meta:`RU · ${noteArrow(note)}`})))}
function religionPage(section){
  const cards=religionCollections.map(collection=>({...collection,href:collectionHref(collection),meta:`${notes.filter(note=>note.collection===collection.id).length} ${text('materialShort')}`}));
  main.innerHTML=`<section class="subpage religion-page"><a class="back-link" href="#/"><span aria-hidden="true">←</span>${text('home')}</a><div class="eyebrow">${text('sections')} — ${String(sections.indexOf(section)+1).padStart(2,'0')} / ${sections.length} · ${count(section.id)} ${text('materialShort')}</div><h1>${label(section)}</h1><p class="section-description">${desc(section)}</p>${renderArchiveBlocks(cards)}${sectionNavigation(section)}</section>`;
  document.title=`${label(section)} — ARCHIVUM`;
}
function collectionPage(id){
  const collection=archiveCollections().find(item=>item.id===id);
  if(!collection){main.innerHTML=`<section class="subpage"><h1>${text('notFound')}</h1><a class="underlined-link" href="#/">${text('home')}</a></section>`;return}
  if(collection.noteId){location.replace(collectionHref(collection));return}
  const section=sections.find(item=>item.id===(collection.section||'philosophy'));
  const authors=historians.filter(item=>item.collection===id),items=notes.filter(note=>note.collection===id&&!note.historian);
  const cards=[...items.map(note=>({...note,note,meta:`RU · ${noteArrow(note)}`})),...authors.map(author=>({...author,href:`#/historian/${author.id}`,meta:`${historianNotes(author.id).length} ${text('materialShort')}`}))];
  main.innerHTML=`<section class="subpage collection-page"><a class="back-link" href="#/section/${section.id}"><span aria-hidden="true">←</span>${label(section)}</a><div class="eyebrow">${label(section)} · ${notes.filter(note=>note.collection===id).length} ${text('materialShort')}</div><h1>${label(collection)}</h1><p class="section-description">${desc(collection)}</p>${cards.length?renderArchiveBlocks(cards):`<div class="empty-section"><span class="diamond" aria-hidden="true">◆</span><h2>${philosophyText('emptyTitle')}</h2><p>${text('emptyText')}</p><a class="underlined-link" href="#/section/${section.id}">${label(section)}</a></div>`}</section>`;
  document.title=`${label(collection)} — ARCHIVUM`;
}
const dialogueNotes=id=>notes.filter(note=>note.dialogue===id);
function platoPage(){
  const plato=philosophers.find(item=>item.id==='plato'),index=philosophers.indexOf(plato);
  const previous=philosophers[(index+philosophers.length-1)%philosophers.length],next=philosophers[(index+1)%philosophers.length];
  const cards=platoDialogues.map(dialogue=>{const items=dialogueNotes(dialogue.id);return {...dialogue,href:dialogue.id!=='republic'&&items.length===1&&localNoteIds.has(items[0].id)?`#/note/${items[0].id}`:`#/dialogue/${dialogue.id}`,meta:dialogue.id==='republic'?`10 ${libraryText('bookShort')}`:`${items.length} ${text('materialShort')}`}});
  main.innerHTML=`<section class="subpage philosopher-page"><a class="back-link" href="#/section/philosophy"><span aria-hidden="true">←</span>${label(sections.find(item=>item.id==='philosophy'))}</a><div class="eyebrow">${philosophyText('philosophers')} — ${String(index+1).padStart(2,'0')} / ${philosophers.length} · ${platoDialogues.length} ${libraryText('dialogueShort')}</div><h1>${label(plato)}</h1><p class="section-description">${libraryText('dialogues')}</p>${renderArchiveBlocks(cards)}<nav class="section-navigation" aria-label="${philosophyText('philosophers')}"><a href="#/philosopher/${previous.id}"><span class="nav-caption">${philosophyText('previous')}</span>← ${label(previous)}</a><a href="#/philosopher/${next.id}"><span class="nav-caption">${philosophyText('next')}</span>${label(next)} →</a></nav></section>`;
  document.title=`${label(plato)} — ARCHIVUM`;
}
function dialoguePage(id,bookNumber){
  const dialogue=platoDialogues.find(item=>item.id===id),number=Number(bookNumber);
  if(!dialogue||(bookNumber&&(id!=='republic'||!Number.isInteger(number)||number<1||number>10))){main.innerHTML=`<section class="subpage"><h1>${text('notFound')}</h1><a class="underlined-link" href="#/philosopher/plato">${libraryText('allDialogues')}</a></section>`;return}
  const index=platoDialogues.indexOf(dialogue),isBook=!!bookNumber;
  const title=isBook?`${label(dialogue)} — ${libraryText('book')} ${republicBooks[number-1]}`:label(dialogue);
  const parent=isBook?'#/dialogue/republic':'#/philosopher/plato',parentName=isBook?label(dialogue):label(philosophers.find(item=>item.id==='plato'));
  const books=id==='republic'&&!isBook,items=isBook?[]:dialogueNotes(id);
  const previous=platoDialogues[(index+platoDialogues.length-1)%platoDialogues.length],next=platoDialogues[(index+1)%platoDialogues.length];
  main.innerHTML=`<section class="subpage dialogue-page"><a class="back-link" href="${parent}"><span aria-hidden="true">←</span>${parentName}</a><div class="eyebrow">${libraryText('dialogues')} · ${isBook?`${libraryText('book')} ${republicBooks[number-1]}`:`${String(index+1).padStart(2,'0')} / ${platoDialogues.length}`}</div><h1>${title}</h1>${books?`<p class="section-description">${libraryText('books')} I–X</p>${renderArchiveBlocks(republicBooks.map((roman,i)=>{const item=notes.find(note=>note.dialogue==='republic'&&note.book===i+1&&localNoteIds.has(note.id));return {ru:`Книга ${roman}`,en:`Book ${roman}`,href:item?`#/note/${item.id}`:`#/dialogue/republic/${i+1}`,meta:`${item?1:0} ${text('materialShort')}`}}))}`:items.length?materialList(items):`<div class="empty-section"><span class="diamond" aria-hidden="true">◆</span><h2>${philosophyText('emptyTitle')}</h2><p>${libraryText(isBook?'bookEmpty':'dialogueEmpty')}</p><a class="underlined-link" href="${parent}">${libraryText(isBook?'allBooks':'allDialogues')}</a></div>`}${isBook?'':`<nav class="section-navigation" aria-label="${libraryText('dialogues')}"><a href="#/dialogue/${previous.id}"><span class="nav-caption">${libraryText('previous')}</span>← ${label(previous)}</a><a href="#/dialogue/${next.id}"><span class="nav-caption">${libraryText('next')}</span>${label(next)} →</a></nav>`}</section>`;
  document.title=`${title} — ARCHIVUM`;
}
let resetRoadmapSearch=null;
function installRoadmapSearch(article){
  if(!article.querySelector('.roadmap-card'))return;
  const toolbar=document.createElement('div');toolbar.className='roadmap-search';
  toolbar.innerHTML=`<label for="roadmap-search">${libraryText('search')}</label><input id="roadmap-search" type="search" placeholder="${libraryText('placeholder')}" autocomplete="off"><p class="roadmap-search-status" aria-live="polite"></p>`;
  article.prepend(toolbar);const input=toolbar.querySelector('input'),status=toolbar.querySelector('p'),cards=[...article.querySelectorAll('.roadmap-card')];let timer;
  function clear(card){card.querySelectorAll('mark.roadmap-hit').forEach(mark=>{const parent=mark.parentNode;mark.replaceWith(document.createTextNode(mark.textContent));parent.normalize()})}
  function apply(){
    const term=input.value.trim().toLocaleLowerCase(),query=normalize(term);let found=0;
    for(const card of cards){
      clear(card);card.hidden=!!query&&!normalize(card.textContent).includes(query);if(card.hidden)continue;++found;
      if(query){
        const walker=document.createTreeWalker(card,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
        for(const node of nodes){const value=node.textContent,lower=normalize(value);if(!lower.includes(query))continue;const text=node.textContent.toLocaleLowerCase().replace(/ё/g,'е'),needle=term.replace(/ё/g,'е');let start=0,index;const fragment=document.createDocumentFragment();while((index=text.indexOf(needle,start))!==-1){fragment.append(document.createTextNode(value.slice(start,index)));const mark=document.createElement('mark');mark.className='roadmap-hit';mark.textContent=value.slice(index,index+needle.length);fragment.append(mark);start=index+needle.length}fragment.append(document.createTextNode(value.slice(start)));node.replaceWith(fragment)}
        card.querySelectorAll('details').forEach(detail=>{if(normalize(detail.textContent).includes(query)&&!detail.open){detail.dataset.roadmapSearchOpened='true';detail.open=true}});
      }else card.querySelectorAll('details[data-roadmap-search-opened]').forEach(detail=>{detail.open=false;delete detail.dataset.roadmapSearchOpened});
    }
    if(!query)article.querySelectorAll('details[data-roadmap-search-opened]').forEach(detail=>{detail.open=false;delete detail.dataset.roadmapSearchOpened});
    status.textContent=query?`${libraryText('found')}: ${found} / ${cards.length}`:'';
  }
  input.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(apply,120)});
  resetRoadmapSearch=()=>{clearTimeout(timer);input.value='';apply()};
}


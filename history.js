const historyCollections=[
  {id:'ancient-greece',section:'history',ru:'Античная Греция',en:'Ancient Greece',image:'assets/ancient-greece-parthenon.jpeg',imagePosition:'center 42%',ruDesc:'Конспекты и справочники по истории Древней Греции.',enDesc:'Notes and references on the history of ancient Greece.'},
  {id:'rome',section:'history',ru:'Рим',en:'Rome',image:'assets/rome-laurel.jpeg',imagePosition:'center 93%',ruDesc:'Историки, сочинения и конспекты по истории Рима.',enDesc:'Historians, works, and notes on the history of Rome.'}
];
const historians=[
  {id:'livy',collection:'rome',ru:'Тит Ливий',en:'Livy'},
  {id:'mommsen',collection:'rome',ru:'Теодор Момзен',en:'Theodor Mommsen'},
  {id:'suetonius',collection:'rome',ru:'Гай Светоний Транквилл',en:'Gaius Suetonius Tranquillus'},
  {id:'polybius',collection:'rome',ru:'Полибий',en:'Polybius'},
  {id:'thucydides',collection:'ancient-greece',ru:'Фукидид',en:'Thucydides'},
  {id:'herodotus',collection:'ancient-greece',ru:'Геродот',en:'Herodotus'},
  {id:'bruce-clark',collection:'ancient-greece',ru:'Брюс Кларк',en:'Bruce Clark'}
];
const historyCopy={
  ru:{authors:'Историки',all:'Все историки',previous:'Предыдущий историк',next:'Следующий историк'},
  en:{authors:'Historians',all:'All historians',previous:'Previous historian',next:'Next historian'}
};
const historyText=key=>historyCopy[language][key];
const historianNotes=id=>notes.filter(note=>note.historian===id);
function historyPage(section){
  const cards=historyCollections.map(collection=>({...collection,href:`#/collection/${collection.id}`,meta:`${notes.filter(note=>note.collection===collection.id).length} ${text('materialShort')}`}));
  main.innerHTML=`<section class="subpage history-page"><a class="back-link" href="#/"><span aria-hidden="true">←</span>${text('home')}</a><div class="eyebrow">${text('sections')} — 02 / ${sections.length} · ${count(section.id)} ${text('materialShort')}</div><h1>${label(section)}</h1><p class="section-description">${desc(section)}</p>${renderArchiveBlocks(cards)}${sectionNavigation(section)}</section>`;
  document.title=`${label(section)} — ARCHIVUM`;
}
function historianPage(id){
  const author=historians.find(item=>item.id===id);
  if(!author){main.innerHTML=`<section class="subpage"><h1>${text('notFound')}</h1><a class="underlined-link" href="#/collection/rome">${label(historyCollections[1])}</a></section>`;return}
  const siblings=historians.filter(item=>item.collection===author.collection),index=siblings.indexOf(author),items=historianNotes(id),parent=historyCollections.find(item=>item.id===author.collection);
  const previous=siblings[(index+siblings.length-1)%siblings.length],next=siblings[(index+1)%siblings.length];
  main.innerHTML=`<section class="subpage historian-page"><a class="back-link" href="#/collection/${parent.id}"><span aria-hidden="true">←</span>${label(parent)}</a><div class="eyebrow">${historyText('authors')} — ${String(index+1).padStart(2,'0')} / ${siblings.length} · ${items.length} ${text('materialShort')}</div><h1>${label(author)}</h1><p class="section-description">${philosophyText('collection')}</p>${items.length?materialList(items):`<div class="empty-section"><span class="diamond" aria-hidden="true">◆</span><h2>${philosophyText('emptyTitle')}</h2><p>${philosophyText('emptyText')}</p><a class="underlined-link" href="#/collection/${parent.id}">${historyText('all')}</a></div>`}<nav class="section-navigation" aria-label="${historyText('authors')}"><a href="#/historian/${previous.id}"><span class="nav-caption">${historyText('previous')}</span>← ${label(previous)}</a><a href="#/historian/${next.id}"><span class="nav-caption">${historyText('next')}</span>${label(next)} →</a></nav></section>`;
  document.title=`${label(author)} — ARCHIVUM`;
}

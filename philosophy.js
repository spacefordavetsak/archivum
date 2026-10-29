const philosophers = [
  {id:'machiavelli',ru:'Никколо Макиавелли',en:'Niccolò Machiavelli',image:'assets/machiavelli-statue.jpeg',imagePosition:'center 28%'},
  {id:'seneca',ru:'Сенека',en:'Seneca',image:'assets/seneca-bust.jpeg',imagePosition:'center 32%'},
  {id:'aristotle',ru:'Аристотель',en:'Aristotle',image:'assets/aristotle-bust.jpeg',imagePosition:'center 22%'},
  {id:'plato',ru:'Платон',en:'Plato',image:'assets/plato-socrates.jpeg',imagePosition:'center 42%'},
  {id:'marcus-aurelius',ru:'Марк Аврелий',en:'Marcus Aurelius',image:'assets/marcus-aurelius-bust.jpeg',imagePosition:'center 20%'},
  {id:'epictetus',ru:'Эпиктет',en:'Epictetus',image:'assets/epictetus-bust.jpeg',imagePosition:'center 4%'}
];
const philosophyCopy = {
  ru:{philosophers:'Философы',all:'Все философы',previous:'Предыдущий философ',next:'Следующий философ',collection:'Конспекты и заметки',emptyTitle:'Материалы появятся позже',emptyText:'Здесь будут собраны конспекты и заметки этого автора.'},
  en:{philosophers:'Philosophers',all:'All philosophers',previous:'Previous philosopher',next:'Next philosopher',collection:'Notes and reading',emptyTitle:'Materials will appear here',emptyText:'Notes and reading on this author will be collected here.'}
};
const philosophyText=key=>philosophyCopy[language][key];
const philosopherNotes=id=>notes.filter(note=>note.philosopher===id);
function noteCollection(note){
  const dialogue=platoDialogues.find(item=>item.id===note.dialogue);
  if(dialogue)return {href:`#/dialogue/${dialogue.id}`,name:label(dialogue)};
  const historian=historians.find(item=>item.id===note.historian);
  if(historian)return {href:`#/historian/${historian.id}`,name:label(historian)};
  const collection=archiveCollections().find(item=>item.id===note.collection);
  if(collection&&!collection.noteId)return {href:collectionHref(collection),name:label(collection)};
  const philosopher=philosophers.find(item=>item.id===note.philosopher);
  const section=sections.find(item=>item.id===note.section);
  return philosopher?{href:`#/philosopher/${philosopher.id}`,name:label(philosopher)}:{href:`#/section/${section.id}`,name:label(section)};
}
function philosophyPage(section){
  const cards=[
    ...philosophyCollections.map(collection=>({...collection,href:collectionHref(collection),meta:`${notes.filter(note=>note.collection===collection.id).length} ${text('materialShort')}`})),
    ...philosophers.map(philosopher=>({...philosopher,href:`#/philosopher/${philosopher.id}`,meta:philosopher.id==='plato'?`${platoDialogues.length} ${libraryText('dialogueShort')}`:`${philosopherNotes(philosopher.id).length} ${text('materialShort')}`}))
  ];
  main.innerHTML=`<section class="subpage philosophy-page"><a class="back-link" href="#/"><span aria-hidden="true">←</span>${text('home')}</a><div class="eyebrow">${text('sections')} — 01 / ${sections.length} · ${count(section.id)} ${text('materialShort')}</div><h1>${label(section)}</h1><p class="section-description">${desc(section)}</p>${renderArchiveBlocks(cards)}${sectionNavigation(section)}</section>`;
  document.title=`${label(section)} — ARCHIVUM`;
}
function philosopherPage(id){
  if(id==='plato'){platoPage();return}
  const philosopher=philosophers.find(item=>item.id===id);
  if(!philosopher){main.innerHTML=`<section class="subpage"><h1>${text('notFound')}</h1><a class="underlined-link" href="#/section/philosophy">${philosophyText('all')}</a></section>`;return}
  const index=philosophers.indexOf(philosopher),items=philosopherNotes(id);
  const previous=philosophers[(index+philosophers.length-1)%philosophers.length],next=philosophers[(index+1)%philosophers.length];
  main.innerHTML=`<section class="subpage philosopher-page"><a class="back-link" href="#/section/philosophy"><span aria-hidden="true">←</span>${label(sections[0])}</a><div class="eyebrow">${philosophyText('philosophers')} — ${String(index+1).padStart(2,'0')} / ${philosophers.length} · ${items.length} ${text('materialShort')}</div><h1>${label(philosopher)}</h1><p class="section-description">${philosophyText('collection')}</p>${items.length?materialList(items):`<div class="empty-section"><span class="diamond" aria-hidden="true">◆</span><h2>${philosophyText('emptyTitle')}</h2><p>${philosophyText('emptyText')}</p><a class="underlined-link" href="#/section/philosophy">${philosophyText('all')}</a></div>`}<nav class="section-navigation" aria-label="${philosophyText('philosophers')}"><a href="#/philosopher/${previous.id}"><span class="nav-caption">${philosophyText('previous')}</span>← ${label(previous)}</a><a href="#/philosopher/${next.id}"><span class="nav-caption">${philosophyText('next')}</span>${label(next)} →</a></nav></section>`;
  document.title=`${label(philosopher)} — ARCHIVUM`;
}

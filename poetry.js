const poets=[
  {id:'horace',ru:'Квинт Гораций Флак',en:'Quintus Horatius Flaccus',image:'assets/horace-portrait.png',imagePosition:'center 30%'},
  {id:'akhmatova',ru:'Ахматова Анна Андреевна',en:'Anna Andreyevna Akhmatova'},
  {id:'balmont',ru:'Бальмонт Константин Дмитриевич',en:'Konstantin Dmitriyevich Balmont'},
  {id:'batyushkov',ru:'Батюшков Константин Николаевич',en:'Konstantin Nikolayevich Batyushkov'},
  {id:'boratynsky',ru:'Боратынский Евгений Абрамович',en:'Yevgeny Abramovich Boratynsky'},
  {id:'bryusov',ru:'Брюсов Валерий Яковлевич',en:'Valery Yakovlevich Bryusov'},
  {id:'bunin',ru:'Бунин Иван Алексеевич',en:'Ivan Alekseyevich Bunin'},
  {id:'gamzatov',ru:'Гамзатов Расул Гамзатович',en:'Rasul Gamzatovich Gamzatov'},
  {id:'gaft',ru:'Гафт Валентин Иосифович',en:'Valentin Iosifovich Gaft'},
  {id:'derzhavin',ru:'Державин Гавриил Романович',en:'Gavriil Romanovich Derzhavin',image:'assets/derzhavin-portrait.jpg',imagePosition:'center 30%'},
  {id:'yevtushenko',ru:'Евтушенко Евгений Александрович',en:'Yevgeny Aleksandrovich Yevtushenko'},
  {id:'yesenin',ru:'Есенин Сергей Александрович',en:'Sergey Aleksandrovich Yesenin'},
  {id:'zhukovsky',ru:'Жуковский Василий Андреевич',en:'Vasily Andreyevich Zhukovsky'},
  {id:'kipling',ru:'Киплинг Редьярд',en:'Rudyard Kipling'},
  {id:'nekrasov',ru:'Некрасов Николай Алексеевич',en:'Nikolay Alekseyevich Nekrasov'},
  {id:'pasternak',ru:'Пастернак Борис Леонидович',en:'Boris Leonidovich Pasternak'},
  {id:'severyanin',ru:'Северянин Константин Васильевич',en:'Konstantin Vasilyevich Severyanin'},
  {id:'tyutchev',ru:'Тютчев Фёдор Иванович',en:'Fyodor Ivanovich Tyutchev'},
  {id:'lorca',ru:'Федерико Гарсия Лорка',en:'Federico García Lorca'}
];
const poetryCopy={
  ru:{poets:'Поэты',poetShort:'ПОЭТОВ',all:'Все поэты',collection:'Стихотворения и заметки',empty:'Здесь появятся стихотворения, конспекты и заметки этого автора.',previous:'Предыдущий поэт',next:'Следующий поэт'},
  en:{poets:'Poets',poetShort:'POETS',all:'All poets',collection:'Poems and notes',empty:'Poems, reading notes, and other material on this author will appear here.',previous:'Previous poet',next:'Next poet'}
};
const poetryText=key=>poetryCopy[language][key];
const poetNotes=id=>notes.filter(note=>note.poet===id);
const derzhavinWorks=[{id:'velmozha',ru:'Вельможа',en:'The Grandee'},{id:'meshchersky',ru:'На смерть князя Мещерского',en:'On the Death of Prince Meshchersky'},{id:'plamide',ru:'Пламиде',en:'To Plamida'}];
const poetCount=id=>id==='derzhavin'?derzhavinWorks.length:poetNotes(id).length;
function poetryPage(section){
  const cards=poets.map(poet=>({...poet,href:`#/poet/${poet.id}`,meta:`${poetCount(poet.id)} ${text('materialShort')}`}));
  main.innerHTML=`<section class="subpage poetry-page"><a class="back-link" href="#/"><span aria-hidden="true">←</span>${text('home')}</a><div class="eyebrow">${text('sections')} — 03 / ${sections.length} · ${poets.length} ${poetryText('poetShort')}</div><h1>${label(section)}</h1><p class="section-description">${desc(section)}</p>${renderArchiveBlocks(cards)}${sectionNavigation(section)}</section>`;
  document.title=`${label(section)} — ARCHIVUM`;
}
function poetPage(id){
  const author=poets.find(item=>item.id===id);
  if(!author){main.innerHTML=`<section class="subpage"><h1>${text('notFound')}</h1><a class="underlined-link" href="#/section/poetry">${poetryText('all')}</a></section>`;return}
  const index=poets.indexOf(author),items=poetNotes(id),section=sections.find(item=>item.id==='poetry');
  const previous=poets[(index+poets.length-1)%poets.length],next=poets[(index+1)%poets.length];
  main.innerHTML=`<section class="subpage poet-page"><a class="back-link" href="#/section/poetry"><span aria-hidden="true">←</span>${label(section)}</a><div class="eyebrow">${poetryText('poets')} — ${String(index+1).padStart(2,'0')} / ${poets.length} · ${poetCount(id)} ${text('materialShort')}</div><h1>${label(author)}</h1><p class="section-description">${poetryText('collection')}</p>${id==='horace'?`<div class="horace-feature"><figure><img src="assets/horace-portrait.png" alt="Художественное изображение бюста Горация" loading="eager"><figcaption>${language==='ru'?'Художественная интерпретация':'Artistic interpretation'}</figcaption></figure><blockquote><span class="horace-ornament" aria-hidden="true">◆</span><p>Какая польза в напрасных законах там, где нет нравов? Что значат пустые законы без обычаев?</p><cite>Квинт Гораций Флак</cite></blockquote></div>`:''}${id==='derzhavin'?`<div class="horace-feature derzhavin-feature"><figure><img src="assets/derzhavin-portrait.jpg" alt="Портрет Гавриила Романовича Державина" loading="eager"></figure><blockquote><span class="horace-ornament" aria-hidden="true">◆</span><p lang="ru">Жизнь есть небес мгновенный дар;<br>Устрой ее себе к покою<br>И с чистою твоей душою<br>Благословляй судеб удар.</p><cite>Гавриил Романович Державин</cite></blockquote></div>${renderArchiveBlocks(derzhavinWorks.map(work=>({...work,href:`#/note/derzhavin-${work.id}`,meta:`1 ${text('materialShort')}`})))}`:items.length?materialList(items):`<div class="empty-section"><span class="diamond" aria-hidden="true">◆</span><h2>${philosophyText('emptyTitle')}</h2><p>${poetryText('empty')}</p><a class="underlined-link" href="#/section/poetry">${poetryText('all')}</a></div>`}<nav class="section-navigation" aria-label="${poetryText('poets')}"><a href="#/poet/${previous.id}"><span class="nav-caption">${poetryText('previous')}</span>← ${label(previous)}</a><a href="#/poet/${next.id}"><span class="nav-caption">${poetryText('next')}</span>${label(next)} →</a></nav></section>`;
  document.title=`${label(author)} — ARCHIVUM`;
}

function derzhavinWorkPage(id){
  if(['meshchersky','velmozha','plamide'].includes(id)){location.replace(`#/note/derzhavin-${id}`);return}
  const work=derzhavinWorks.find(item=>item.id===id);
  if(!work){poetPage('derzhavin');return}
  main.innerHTML=`<section class="subpage"><a class="back-link" href="#/poet/derzhavin"><span aria-hidden="true">←</span>${language==='ru'?'Державин Гавриил Романович':'Gavriil Romanovich Derzhavin'}</a><div class="eyebrow">${poetryText('poets')} · 0 ${text('materialShort')}</div><h1>${label(work)}</h1><div class="empty-section"><span class="diamond" aria-hidden="true">◆</span><h2>${philosophyText('emptyTitle')}</h2><p>${language==='ru'?'Здесь появится текст произведения.':'The text will appear here.'}</p><a class="underlined-link" href="#/poet/derzhavin">${language==='ru'?'К Державину':'Back to Derzhavin'}</a></div></section>`;
  document.title=`${label(work)} — ARCHIVUM`;
}

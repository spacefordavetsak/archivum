const SOURCE = 'https://reference-library.preview.emergentagent.com';
const sections = [
  { id:'philosophy',ru:'Философия',en:'Philosophy',image:true,ruDesc:'Идеи, формирующие взгляд на мир. Трактаты, мыслители и конспекты философских трудов.',enDesc:'Ideas that shape our view of the world. Treatises, thinkers, and notes on philosophical works.' },
  { id:'religion',ru:'Религия',en:'Religion',image:true,ruDesc:'Религии, традиции и тексты. Конспекты и заметки о духовной культуре.',enDesc:'Religions, traditions, and texts. Notes on spiritual culture.' },
  { id:'history',ru:'История',en:'History',image:true,ruDesc:'События, эпохи и личности. Академические справочники и исторические сочинения.',enDesc:'Events, eras, and people. Academic references and historical writings.' },
  { id:'literature',ru:'Художественная литература',en:'Literature',image:true,ruDesc:'Произведения, к которым хочется возвращаться. Заметки о книгах, авторах и литературных мирах.',enDesc:'Works worth returning to. Notes on books, authors, and literary worlds.' },
  { id:'essays',ru:'Рассуждения',en:'Reflections',image:true,ruDesc:'Мысли на полях прочитанного. Наблюдения, вопросы и личные размышления.',enDesc:'Thoughts in the margins. Observations, questions, and personal reflections.' },
  { id:'architecture',ru:'Архитектура',en:'Architecture',image:true,ruDesc:'Искусство пространства. Архитектурные стили, памятники и история зодчества.',enDesc:'The art of space. Architectural styles, monuments, and the history of building.' },
  { id:'painting',ru:'Живопись',en:'Painting',image:true,ruDesc:'Взгляд сквозь цвет и форму. Художники, полотна и направления изобразительного искусства.',enDesc:'A view through colour and form. Artists, paintings, and movements in visual art.' },
  { id:'sculpture',ru:'Скульптура',en:'Sculpture',image:true,ruDesc:'Искусство объёма и пластики. Скульпторы, произведения и история скульптуры.',enDesc:'The art of volume and form. Sculptors, works, and the history of sculpture.' },
  { id:'poetry',ru:'Поэзия',en:'Poetry',image:true,ruDesc:'Слово, ритм и образ. Стихотворения, поэты и размышления о поэтическом искусстве.',enDesc:'Word, rhythm, and imagery. Poems, poets, and reflections on the poetic art.' },
  { id:'music',ru:'Музыка',en:'Music',image:true,ruDesc:'Искусство звука. Композиторы, произведения и музыкальные открытия.',enDesc:'The art of sound. Composers, works, and musical discoveries.' },
  { id:'films',ru:'Фильмы',en:'Films',image:true,ruDesc:'Истории на экране. Фильмы, режиссёры и заметки о языке кино.',enDesc:'Stories on screen. Films, directors, and notes on the language of cinema.' },
  { id:'anime',ru:'Аниме',en:'Anime',image:true,ruDesc:'Миры японской анимации. Истории, авторы и впечатления от просмотра.',enDesc:'Worlds of Japanese animation. Stories, creators, and viewing notes.' },
  { id:'alania',ru:'Алания',en:'Alania',image:true,ruDesc:'Материалы, заметки и исследования об Алании.',enDesc:'Materials, notes, and studies on Alania.' },
  { id:'science',ru:'Наука',en:'Science',image:true,ruDesc:'Научные идеи, открытия и направления. Конспекты и материалы об устройстве мира.',enDesc:'Scientific ideas, discoveries, and fields. Notes on how the world works.' },
  { id:'my-poems',ru:'Мои стихотворения',en:'My poems',ruDesc:'Личная поэтическая тетрадь. Слова, которые обретают собственный ритм.',enDesc:'A personal poetry notebook. Words finding a rhythm of their own.' }
];
const notes = [
  {section:'philosophy',philosopher:'plato',dialogue:'republic',book:1,id:'plato-republic-1-analysis',ru:'Государство — Книга I. Критический анализ',en:'Republic — Book I. Critical analysis',ruDesc:'Критический анализ первой книги «Государства» Платона.',enDesc:'A critical analysis of Book I of Plato’s Republic.'},
  {section:'philosophy',philosopher:'plato',dialogue:'republic',book:2,id:'plato-republic-2-analysis',ru:'Государство — Книга II. Критический анализ',en:'Republic — Book II. Critical analysis',ruDesc:'Критический анализ второй книги «Государства» Платона.',enDesc:'A critical analysis of Book II of Plato’s Republic.'},
  {section:'philosophy',philosopher:'plato',dialogue:'republic',book:3,id:'plato-republic-3-analysis',ru:'Государство — Книга III. Критический анализ',en:'Republic — Book III. Critical analysis',ruDesc:'Критический анализ третьей книги «Государства» Платона.',enDesc:'A critical analysis of Book III of Plato’s Republic.'},
  {section:'philosophy',philosopher:'plato',dialogue:'republic',book:4,id:'plato-republic-4-analysis',ru:'Государство — Книга IV. Критический анализ',en:'Republic — Book IV. Critical analysis',ruDesc:'Критический анализ четвёртой книги «Государства» Платона.',enDesc:'A critical analysis of Book IV of Plato’s Republic.'},
  {section:'philosophy',philosopher:'plato',dialogue:'parmenides',id:'plato-parmenides-analysis',ru:'Парменид — Критический анализ',en:'Parmenides — Critical analysis',ruDesc:'Идеи, единое и многое. Полный анализ диалога с апориями, гипотезами и схемами.',enDesc:'Forms, the one and the many. Complete analysis with aporias, hypotheses, and diagrams.'},
  {section:'philosophy',philosopher:'plato',dialogue:'sophist',id:'plato-sophist-analysis',ru:'Софист — Критический анализ',en:'Sophist — Critical analysis',ruDesc:'Бытие, небытие и речь. Полный анализ диалога с диэрезами, таблицами и схемами.',enDesc:'Being, non-being, and discourse. Complete analysis with divisions, tables, and diagrams.'},
  {section:'philosophy',philosopher:'plato',dialogue:'philebus',id:'plato-philebus-analysis',ru:'Филеб — Критический анализ',en:'Philebus — Critical analysis',ruDesc:'Наслаждение, разум и благо. Аналитическая карта 42 глав с пояснениями и схемами.',enDesc:'Pleasure, reason, and the good. An analytical map of 42 chapters with explanations and diagrams.'},
  {section:'philosophy',philosopher:'plato',dialogue:'crito',id:'plato-crito-analysis',ru:'Критон — Критический анализ',en:'Crito — Critical analysis',ruDesc:'Справедливость, законы и решение Сократа. Полный разбор диалога, греческий лексикон, апории и источники.',enDesc:'Justice, laws, and Socrates’ decision. Complete dialogue analysis, Greek lexicon, aporias, and sources.'},
  {section:'philosophy',philosopher:'plato',dialogue:'euthyphro',id:'plato-euthyphro-analysis',ru:'Евтифрон — Критический анализ',en:'Euthyphro — Critical analysis',ruDesc:'Благочестие, божественное одобрение и основания поступка. Полный разбор диалога, греческий лексикон, апории и источники.',enDesc:'Piety, divine approval, and reasons for action. Complete dialogue analysis, Greek lexicon, aporias, and sources.'},
  {section:'philosophy',collection:'roadmap',id:'platonism-roadmap',ru:'Платонизм и неоплатонизм. Исправленная дорожная карта',en:'Platonism and Neoplatonism. Revised roadmap',ruDesc:'От Платона к Симпликию. Вводный круг, углублённое изучение и исследовательские ответвления.',enDesc:'From Plato to Simplicius. Introductory reading, advanced study, and research routes.'},
  {section:'philosophy',philosopher:'machiavelli',id:'95870a2a-ae02-4622-8287-2e677c46fdad',ru:'Никколо Макиавелли. Государь. Полный конспект',en:'Niccolò Machiavelli. The Prince. Complete notes',ruDesc:'Полный конспект трактата «Государь» Никколо Макиавелли.',enDesc:'Complete notes on Niccolò Machiavelli’s treatise The Prince.'},
  {section:'philosophy',philosopher:'machiavelli',id:'machiavelli-discourses',ru:'Никколо Макиавелли. Рассуждения о первой декаде Тита Ливия. Полный конспект',en:'Niccolò Machiavelli. Discourses on Livy. Complete notes',ruDesc:'Конспект книг I–III: республика, свобода, римская история и политическая доблесть.',enDesc:'Notes on Books I–III: republics, liberty, Roman history, and political virtue.'},
  {section:'history',collection:'ancient-greece',id:'e7839d1e-9989-4fd2-b7c0-9ad1b2e1b215',ru:'Выдающиеся личности античной Греции. Академический справочник',en:'Notable figures of ancient Greece. An academic reference',ruDesc:'Академический справочник о выдающихся деятелях Древней Греции.',enDesc:'An academic reference on notable figures of ancient Greece.'},
  {section:'history',collection:'rome',historian:'livy',id:'64cf4f3d-13e9-47a3-9911-9f92e5b2a57e',ru:'Тит Ливий. Полное собрание. Декады I–VI, Книги I–LX',en:'Livy. Collected works. Decades I–VI, Books I–LX',ruDesc:'Полное собрание сочинений Тита Ливия — фундаментальный труд по истории Древнего Рима.',enDesc:'The collected works of Livy, a foundational account of ancient Rome.'},
  {section:'painting',id:'cae10cce-235a-44d4-b9c5-e45605d1dcb3',ru:'Художники и искусство',en:'Artists and art',ruDesc:'Справочник о художниках и их произведениях.',enDesc:'A reference on artists and their works.'}
];
const copy = {
ru:{search:'Поиск',login:'Вход',footer:'Личный архив знаний',eyebrow:'Личный архив знаний — MMXXVI',intro:'Собрание конспектов и академических справочников по направлениям развития',sections:'Разделы',materialShort:'МАТ.',home:'Главная',countLabel:'материалов',emptyTitle:'Этот раздел ещё впереди',emptyText:'Здесь появятся новые материалы и заметки.',allSections:'Все разделы',previous:'Предыдущий раздел',next:'Следующий раздел',source:'Читать в исходном архиве ↗',searchArchive:'Поиск по архиву',searchPlaceholder:'Раздел, автор или название…',searchHint:'Поиск по разделам, авторам и материалам',materials:'Материалы',noResults:'Ничего не найдено. Попробуйте другой запрос.',loginTitle:'Вход в архив',loginText:'Управление существующими материалами доступно в исходном архиве. Вход откроется в новой вкладке.',loginAction:'Перейти к входу',close:'Закрыть',back:'На главную',notFound:'Раздел не найден'},
en:{search:'Search',login:'Sign in',footer:'A personal archive of knowledge',eyebrow:'A personal archive of knowledge — MMXXVI',intro:'A collection of notes and academic references across fields of knowledge',sections:'Sections',materialShort:'ITEMS',home:'Home',countLabel:'materials',emptyTitle:'A chapter yet to be written',emptyText:'New materials and notes will appear here.',allSections:'All sections',previous:'Previous section',next:'Next section',source:'Read in the original archive ↗',searchArchive:'Search the archive',searchPlaceholder:'Section, author, or title…',searchHint:'Search sections, authors, and materials',materials:'Materials',noResults:'No results. Try another search.',loginTitle:'Sign in to the archive',loginText:'Existing materials are managed in the original archive. Sign-in will open in a new tab.',loginAction:'Continue to sign in',close:'Close',back:'Back home',notFound:'Section not found'}
};
function readLanguage(){try{return localStorage.getItem('archivum-language')==='en'?'en':'ru'}catch{return 'ru'}}
let language=readLanguage();
const text=(key)=>copy[language][key];
const label=(item)=>item[language];
const desc=(item)=>item[language+'Desc'];
const count=(id)=>notes.filter(note=>note.section===id).length;
const escapeHTML=(value)=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const main=document.getElementById('main-content');
const searchDialog=document.getElementById('search-dialog');
const searchInput=document.getElementById('search-input');

function homePrologue(){
  const ru=language==='ru';
  const opening=ru?'Проект являет собою последовательную и структурированную карту для человека, осмелившегося пойти самой тернистой и непредсказуемой, но оттого и прекрасной дорогой, перманентным состоянием которой служит':'The project offers a coherent, structured map for a person who has dared to take the most thorny and unpredictable, yet all the more beautiful road, whose abiding state is';
  const wonder=ru?'Изумление':'Wonder';
  const closing=ru?'Именно оно есть начало философии, начало формирования индивидуальной вселенной в глубинах души путника.':'It is the beginning of philosophy, the beginning of an individual universe taking shape in the depths of the traveller’s soul.';
  return `<section class="home-prologue" id="project-prologue" aria-label="${ru?'О проекте':'About the project'}" lang="${language}"><div class="prologue-ornament" aria-hidden="true"><span>◆</span></div><div class="prologue-copy"><p>${opening} <em>${wonder}</em>.</p><p class="prologue-closing">${closing}</p></div></section>`;
}
function home(){
  main.innerHTML=`${archiveIntro.html()}${homePrologue()}<section class="home-library" aria-labelledby="sections-heading"><h2 id="sections-heading" class="section-rule">${text('sections')}</h2><div class="archive-grid mosaic-grid">${sections.map((section,index)=>`<a class="section-card card-${section.id}${section.image?' has-image':''}" href="#/section/${section.id}" style="${archiveBlockLayout(index)}" aria-label="${escapeHTML(label(section))}">${section.image?`<img src="assets/${section.id}.jpg" alt="" ${index>3?'loading="lazy"':'fetchpriority="high"'} width="900" height="600">`:''}<div class="card-meta"><span>${String(index+1).padStart(2,'0')}</span><span>${count(section.id)} ${text('materialShort')}</span></div><h2>${label(section)}</h2></a>`).join('')}</div></section>`;
  archiveIntro.mount();
  archivePrologue.mount();
  document.title=language==='ru'?'ARCHIVUM — личный архив знаний':'ARCHIVUM — a personal archive of knowledge';
}
function sectionPage(id){
  const section=sections.find(item=>item.id===id);
  if(!section){main.innerHTML=`<section class="subpage"><h1>${text('notFound')}</h1><a class="underlined-link" href="#/">${text('back')}</a></section>`;return}
  if(id==='philosophy'){philosophyPage(section);return}
  if(id==='history'){historyPage(section);return}
  if(id==='poetry'){poetryPage(section);return}
  if(id==='religion'){religionPage(section);return}
  const index=sections.indexOf(section),items=notes.filter(note=>note.section===id);
  const science=id==='science';
  const previous=sections[(index+sections.length-1)%sections.length],next=sections[(index+1)%sections.length];
  main.innerHTML=`${science?archiveScience.html():''}<section class="subpage${science?' science-page':''}"><a class="back-link" href="#/"><span aria-hidden="true">←</span>${text('home')}</a><div class="eyebrow">${text('sections')} — ${String(index+1).padStart(2,'0')} / ${String(sections.length)} · ${items.length} ${text('materialShort')}</div><h1>${label(section)}</h1><p class="section-description">${desc(section)}</p>${items.length?materialList(items):`<div class="empty-section"><span class="diamond" aria-hidden="true">◆</span><h2>${text('emptyTitle')}</h2><p>${text('emptyText')}</p><a class="underlined-link" href="#/">${text('allSections')}</a></div>`}<nav class="section-navigation" aria-label="${text('sections')}"><a href="#/section/${previous.id}"><span class="nav-caption">${text('previous')}</span>← ${label(previous)}</a><a href="#/section/${next.id}"><span class="nav-caption">${text('next')}</span>${label(next)} →</a></nav></section>`;
  document.title=`${label(section)} — ARCHIVUM`;
  if(science)archiveScience.mount();
}
function render(){
  archiveIntro.stop();
  archivePrologue.stop();
  archiveScience.stop();
  closeReaderOverlays();
  document.documentElement.lang=language;
  document.querySelectorAll('[data-i18n]').forEach(element=>element.textContent=text(element.dataset.i18n));
  document.querySelectorAll('[data-close]').forEach(button=>button.setAttribute('aria-label',text('close')));
  document.querySelector('.brand').setAttribute('aria-label',`ARCHIVUM — ${text('home')}`);
  document.querySelector('.header-inner').setAttribute('aria-label',language==='ru'?'Основная навигация':'Main navigation');
  document.getElementById('open-search').setAttribute('aria-label',text('search'));
  const toggle=document.getElementById('language-toggle');toggle.textContent=language==='ru'?'EN':'RU';toggle.setAttribute('aria-label',language==='ru'?'Switch to English':'Переключить на русский');
  searchInput.placeholder=text('searchPlaceholder');searchInput.setAttribute('aria-label',text('search'));
  const route=location.hash.replace(/^#\/?/,'').split('/');
  document.body.classList.toggle('is-reading',route[0]==='note');
  document.body.classList.toggle('is-science',route[0]==='section'&&route[1]==='science');
  document.body.classList.toggle('is-home',!['note','section','philosopher','collection','dialogue','historian','poet'].includes(route[0]));
  if(route[0]==='note')notePage(route[1]);else {delete main.dataset.noteId;if(route[0]==='section')sectionPage(route[1]);else if(route[0]==='philosopher')philosopherPage(route[1]);else if(route[0]==='collection')collectionPage(route[1]);else if(route[0]==='dialogue')dialoguePage(route[1],route[2]);else if(route[0]==='historian')historianPage(route[1]);else if(route[0]==='poet')poetPage(route[1]);else home();}
  if(searchDialog.open)renderSearch();
}
function normalize(value){return value.toLocaleLowerCase().replace(/ё/g,'е').normalize('NFKC').trim()}
function matches(item,query){return normalize([item.ru,item.en,item.ruDesc||'',item.enDesc||''].join(' ')).includes(query)}
function renderSearch(){
  const query=normalize(searchInput.value);
  const foundSections=sections.filter(item=>!query||matches(item,query));
  const foundCollections=query?archiveCollections().filter(item=>matches(item,query)):[];
  const foundPhilosophers=query?philosophers.filter(item=>matches(item,query)):[];
  const foundDialogues=query?platoDialogues.filter(item=>matches(item,query)):[];
  const foundNotes=query?notes.filter(item=>matches(item,query)):[];
  const foundHistorians=query?historians.filter(item=>matches(item,query)):[];
  const foundPoets=query?poets.filter(item=>matches(item,query)):[];
  const group=(title,items,renderItem)=>items.length?`<div class="result-group-title">${title} · ${items.length}</div>${items.map(renderItem).join('')}`:'';
  const results=[
    group(text('sections'),foundSections,item=>`<a class="search-result" href="#/section/${item.id}"><span>${label(item)}</span><small>${count(item.id)} ${text('materialShort')} →</small></a>`),
    group(libraryText('collections'),foundCollections,item=>`<a class="search-result" href="${collectionHref(item)}"><span>${label(item)}</span><small>→</small></a>`),
    group(philosophyText('philosophers'),foundPhilosophers,item=>`<a class="search-result" href="#/philosopher/${item.id}"><span>${label(item)}</span><small>${item.id==='plato'?`${platoDialogues.length} ${libraryText('dialogueShort')}`:`${philosopherNotes(item.id).length} ${text('materialShort')}`} →</small></a>`),
    group(historyText('authors'),foundHistorians,item=>`<a class="search-result" href="#/historian/${item.id}"><span>${label(item)}</span><small>${historianNotes(item.id).length} ${text('materialShort')} →</small></a>`),
    group(poetryText('poets'),foundPoets,item=>`<a class="search-result" href="#/poet/${item.id}"><span>${label(item)}</span><small>${poetNotes(item.id).length} ${text('materialShort')} →</small></a>`),
    group(libraryText('dialogues'),foundDialogues,item=>`<a class="search-result" href="#/dialogue/${item.id}"><span>${label(item)}</span><small>→</small></a>`),
    group(text('materials'),foundNotes,item=>`<a class="search-result" ${noteLinkAttributes(item)}><span>${label(item)}</span><small>${noteArrow(item)}</small></a>`)
  ].join('');
  document.getElementById('search-results').innerHTML=results||`<p class="no-results">${text('noResults')}</p>`;
}

document.getElementById('open-search').addEventListener('click',()=>{searchInput.value='';renderSearch();searchDialog.showModal();searchInput.focus()});
document.getElementById('open-login').addEventListener('click',()=>document.getElementById('login-dialog').showModal());
searchInput.addEventListener('input',renderSearch);
document.getElementById('search-results').addEventListener('click',event=>{if(event.target.closest('a'))searchDialog.close()});
document.getElementById('language-toggle').addEventListener('click',()=>{language=language==='ru'?'en':'ru';try{localStorage.setItem('archivum-language',language)}catch{}render()});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close()})});
window.addEventListener('hashchange',()=>{closeReaderOverlays();if(scrollReaderAnchor())return;render();window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true})});
document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if(!searchDialog.open){searchInput.value='';renderSearch();searchDialog.showModal();searchInput.focus()}}});
render();

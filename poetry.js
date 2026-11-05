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
const derzhavinWorks=[{id:'velmozha',ru:'Вельможа',en:'The Grandee'},{id:'meshchersky',ru:'На смерть князя Мещерского',en:'On the Death of Prince Meshchersky'},{id:'plamide',ru:'Пламиде',en:'To Plamida'},{id:'river-of-time',ru:'Река времён в своём стремленьи',en:'The River of Time'},{id:'separation',ru:'Разлука',en:'Separation'},{id:'philosophers',ru:'Философы, пьяный и трезвый',en:'The Philosophers, Drunk and Sober'},{id:'gift',ru:'Дар',en:'The Gift'},{id:'crown-of-immortality',ru:'Венец бессмертия',en:'The Crown of Immortality'},{id:'sappho',ru:'Сафо',en:'Sappho'}];
const poetCount=id=>id==='derzhavin'?derzhavinWorks.length:poetNotes(id).length;
function poetryPage(section){
  const cards=poets.map(poet=>({...poet,href:`#/poet/${poet.id}`,meta:`${poetCount(poet.id)} ${text('materialShort')}`}));
  main.innerHTML=`<section class="subpage poetry-page"><a class="back-link" href="#/"><span aria-hidden="true">←</span>${text('home')}</a><div class="eyebrow">${text('sections')} — 03 / ${sections.length} · ${poets.length} ${poetryText('poetShort')}</div><h1>${label(section)}</h1><p class="section-description">${desc(section)}</p>${renderArchiveBlocks(cards)}${sectionNavigation(section)}</section>`;
  document.title=`${label(section)} — ARCHIVUM`;
}
const poetProfiles = {
  horace: {
    ru: {
      dates: '65–8 до н. э.',
      biography: [
        'Квинт Гораций Флак родился в Венузии на юге Италии. Его отец, вольноотпущенник, дал сыну образование в Риме. Гораций продолжил учёбу в Афинах, затем служил военным трибуном в войске Брута и участвовал в битве при Филиппах в 42 году до н. э.',
        'Вернувшись в Рим, Гораций сблизился с Вергилием и вошёл в круг Мецената. На годы правления Августа пришлась зрелая пора его творчества. Для Секулярных игр 17 года до н. э. он написал «Юбилейный гимн».'
      ],
      traits: [
        ['Греческая форма, латинская речь', 'В «Одах» Гораций приспособил к латинскому стиху размеры Алкея и Сапфо. В оде «К Мельпомене» он связывает надежду на бессмертие со своим вкладом в римскую поэзию.'],
        ['Мера и быстротечность жизни', 'Размышляя о дружбе, вине и старости, поэт возвращается к мысли о мере. Призыв carpe diem в оде к Левконое напоминает, что будущим человек не распоряжается.'],
        ['Сатира как беседа', 'В «Сатирах» разговорная интонация и самоирония помогают говорить о жадности, тщеславии и зависимости от чужого мнения. В «Посланиях» та же манера служит размышлениям о том, как жить и писать.'],
        ['Гражданская лирика', 'Рядом с дружескими и любовными стихами стоят «Римские оды». В них Гораций говорит о долге и нравах, от которых, по его мысли, зависит прочность государства.']
      ]
    },
    en: {
      dates: '65–8 BCE',
      biography: [
        'Quintus Horatius Flaccus was born in Venusia in southern Italy. His father, a freedman, secured an education for him in Rome. Horace continued his studies in Athens, then served as a military tribune under Brutus and fought at Philippi in 42 BCE.',
        'Back in Rome, Horace became friends with Virgil and joined the circle of Maecenas. His mature work belongs to the age of Augustus. For the Secular Games of 17 BCE, he wrote the Carmen Saeculare.'
      ],
      traits: [
        ['Greek metres in Latin', 'In the Odes, Horace adapted the metres of Alcaeus and Sappho to Latin verse. In To Melpomene, he connects his hope of outliving his death with that contribution to Roman poetry.'],
        ['Moderation and the passing of time', 'Friendship, wine and ageing lead Horace back to the idea of moderation. The call to carpe diem in his ode to Leuconoe reminds the reader how little control anyone has over the future.'],
        ['Satire as conversation', 'In the Satires, a conversational voice and self-mockery make room for reflections on greed, vanity and the need for approval. In the Epistles, that voice considers how to live and how to write.'],
        ['Civic poetry', 'Alongside poems of friendship and love stand the Roman Odes. They ask how duty and public morals sustain the state.']
      ]
    },
    sources: [
      {ru:'Академия американских поэтов',en:'Academy of American Poets',url:'https://poets.org/poet/horace'},
      {ru:'Национальная электронная библиотека',en:'National Electronic Library',url:'https://kp.rusneb.ru/item/material/opera-21'},
      {ru:'Cambridge University Press',en:'Cambridge University Press',url:'https://assets.cambridge.org/97805217/57461/excerpt/9780521757461_excerpt.pdf'}
    ]
  },
  derzhavin: {
    ru: {
      dates: '1743–1816',
      biography: [
        'Гавриил Романович Державин родился под Казанью в небогатой дворянской семье. В Казанской гимназии он читал Ломоносова и Сумарокова и пробовал сочинять стихи. В 1762 году поступил рядовым в Преображенский полк, а во время Пугачёвского восстания работал в следственной комиссии на Волге.',
        'Известность принесла ему ода «Фелица», посвящённая Екатерине II. Державин управлял Олонецким и Тамбовским наместничествами. При нём в Тамбове открылись театр и типография. Позднее он стал кабинет-секретарём Екатерины II, а при Александре I возглавил Министерство юстиции. Его стихотворение «Гром победы, раздавайся!» на музыку Осипа Козловского стало неофициальным гимном.',
        'После отставки в 1803 году Державин подолгу жил в Званке. Он писал пьесы и басни, работал над трактатом об оде и участвовал в создании «Беседы любителей русского слова». В 1815 году на лицейском экзамене он услышал стихи юного Пушкина. В Званке поэт умер в 1816 году, оставив незавершённым стихотворение «Река времён в своём стремленьи…».'
      ],
      traits: [
        ['Ода и сатира в одном стихотворении', 'В «Фелице» хвала Екатерине соседствует с иронией над придворными и самим рассказчиком. Разговорные обороты и бытовые сцены придают торжественной оде живой голос.'],
        ['Время, смерть и достоинство', 'В оде «Бог» Державин размышляет о месте человека во Вселенной. В стихотворении «На смерть князя Мещерского» звон часов превращает отвлечённую мысль о смерти в личное переживание.'],
        ['Гражданская сатира и частная жизнь', 'В «Вельможе» честь человека измеряется его служением общему благу. В «Евгению. Жизнь Званская» сами подробности усадебного дня становятся предметом поэзии.'],
        ['Разговор с античностью', 'В «Венце бессмертия» Державин воображает встречу с Анакреоном, а в «Памятнике» обращается к оде Горация «К Мельпомене», чтобы сказать о собственном поэтическом пути.']
      ]
    },
    en: {
      dates: '1743–1816',
      biography: [
        'Gavriil Romanovich Derzhavin was born near Kazan into a noble family of modest means. At the Kazan Gymnasium he read Lomonosov and Sumarokov and began writing verse. He enlisted as a private in the Preobrazhensky Regiment in 1762 and served on an investigative commission on the Volga during Pugachev’s rebellion.',
        'Felitsa, an ode to Catherine II, made him widely known. Derzhavin governed Olonets and Tambov. A theatre and printing press opened in Tambov during his tenure. He later served as Catherine’s cabinet secretary and headed the Ministry of Justice under Alexander I. His poem Let the Thunder of Victory Sound!, set to music by Osip Kozlovsky, became an unofficial anthem.',
        'After retiring in 1803, Derzhavin spent much of his time at Zvanka. He wrote plays and fables, worked on a treatise on the ode and helped found the literary society known as the Colloquy of Lovers of the Russian Word. In 1815 he heard the young Pushkin recite at a Lyceum examination. He died at Zvanka in 1816, leaving The River of Time unfinished.'
      ],
      traits: [
        ['Ode and satire in the same poem', 'In Felitsa, praise of Catherine sits alongside jokes at the expense of courtiers and the speaker himself. Everyday scenes and turns of phrase give the ceremonial ode a lively voice.'],
        ['Time, death and dignity', 'In God, Derzhavin considers humanity’s place in the universe. In On the Death of Prince Meshchersky, the striking of a clock makes the thought of mortality immediate and personal.'],
        ['Civic satire and private life', 'In The Grandee, public service is the measure of honour. In To Evgeny: Life at Zvanka, the details of an ordinary day on the estate become the substance of the poem.'],
        ['A conversation with antiquity', 'In The Crown of Immortality, Derzhavin imagines meeting Anacreon. In Monument, he draws on Horace’s To Melpomene to reflect on his own achievements as a poet.']
      ]
    },
    sources: [
      {ru:'Культура.РФ — биография Державина',en:'Culture.ru — Derzhavin’s biography',url:'https://www.culture.ru/persons/8946/gavriil-derzhavin'},
      {ru:'Президентская библиотека',en:'Presidential Library',url:'https://www.prlib.ru/Great_Russia/cultural_XVIII/Derzhavin'},
      {ru:'Татарская энциклопедия',en:'Tatar Encyclopedia',url:'https://tatarica.org/ru/razdely/kultura/literatura/personalii/derzhavin-gavriil'},
      {ru:'Серия «Литературные памятники»',en:'Literary Monuments series',url:'https://litpamyatniki.ru/library/368'}
    ]
  }
};

function renderPoetProfile(id){
  const profile=poetProfiles[id];
  if(!profile)return '';
  const copy=profile[language];
  const labels=language==='ru'
    ? {title:'Биография и творчество',biography:'Биография',traits:'Основные черты творчества',sources:'Источники'}
    : {title:'Life and work',biography:'Biography',traits:'Key features',sources:'Sources'};
  return `<details class="poet-profile">
    <summary>
      <span class="poet-profile-diamond" aria-hidden="true">◆</span>
      <span class="poet-profile-title">${labels.title}</span>
      <span class="poet-profile-dates">${escapeHTML(copy.dates)}</span>
      <span class="poet-profile-chevron" aria-hidden="true"></span>
    </summary>
    <div class="poet-profile-body">
      <div class="poet-profile-columns">
        <section>
          <h2>${labels.biography}</h2>
          ${copy.biography.map(paragraph=>`<p>${escapeHTML(paragraph)}</p>`).join('')}
        </section>
        <section>
          <h2>${labels.traits}</h2>
          <dl>${copy.traits.map(([name,description])=>`<dt>${escapeHTML(name)}</dt><dd>${escapeHTML(description)}</dd>`).join('')}</dl>
        </section>
      </div>
      <div class="poet-profile-sources">
        <h3>${labels.sources}</h3>
        <ul>${profile.sources.map(source=>`<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label(source))}</a></li>`).join('')}</ul>
      </div>
    </div>
  </details>`;
}

function poetPage(id){
  const author=poets.find(item=>item.id===id);
  if(!author){main.innerHTML=`<section class="subpage"><h1>${text('notFound')}</h1><a class="underlined-link" href="#/section/poetry">${poetryText('all')}</a></section>`;return}
  const index=poets.indexOf(author),items=poetNotes(id),section=sections.find(item=>item.id==='poetry');
  const previous=poets[(index+poets.length-1)%poets.length],next=poets[(index+1)%poets.length];
  main.innerHTML=`<section class="subpage poet-page"><a class="back-link" href="#/section/poetry"><span aria-hidden="true">←</span>${label(section)}</a><div class="eyebrow">${poetryText('poets')} — ${String(index+1).padStart(2,'0')} / ${poets.length} · ${poetCount(id)} ${text('materialShort')}</div><h1>${label(author)}</h1><p class="section-description">${poetryText('collection')}</p>${id==='horace'?`<div class="horace-feature"><figure><img src="assets/horace-portrait.png" alt="Художественное изображение бюста Горация" loading="eager"><figcaption>${language==='ru'?'Художественная интерпретация':'Artistic interpretation'}</figcaption></figure><blockquote><span class="horace-ornament" aria-hidden="true">◆</span><p>Какая польза в напрасных законах там, где нет нравов? Что значат пустые законы без обычаев?</p><cite>Квинт Гораций Флак</cite></blockquote></div>`:''}${id==='derzhavin'?`<div class="horace-feature derzhavin-feature"><figure><img src="assets/derzhavin-portrait.jpg" alt="Портрет Гавриила Романовича Державина" loading="eager"></figure><blockquote><span class="horace-ornament" aria-hidden="true">◆</span><p lang="ru">Жизнь есть небес мгновенный дар;<br>Устрой ее себе к покою<br>И с чистою твоей душою<br>Благословляй судеб удар.</p><cite>Гавриил Романович Державин</cite></blockquote></div>`:''}
    ${renderPoetProfile(id)}
    ${id==='derzhavin'?`${renderArchiveBlocks(derzhavinWorks.map(work=>({...work,href:`#/note/derzhavin-${work.id}`,meta:`1 ${text('materialShort')}`})))}`:items.length?materialList(items):`<div class="empty-section"><span class="diamond" aria-hidden="true">◆</span><h2>${philosophyText('emptyTitle')}</h2><p>${poetryText('empty')}</p><a class="underlined-link" href="#/section/poetry">${poetryText('all')}</a></div>`}<nav class="section-navigation" aria-label="${poetryText('poets')}"><a href="#/poet/${previous.id}"><span class="nav-caption">${poetryText('previous')}</span>← ${label(previous)}</a><a href="#/poet/${next.id}"><span class="nav-caption">${poetryText('next')}</span>${label(next)} →</a></nav></section>`;
  document.title=`${label(author)} — ARCHIVUM`;
}

function derzhavinWorkPage(id){
  if(['meshchersky','velmozha','plamide','river-of-time','separation','philosophers','gift','crown-of-immortality','sappho'].includes(id)){location.replace(`#/note/derzhavin-${id}`);return}
  const work=derzhavinWorks.find(item=>item.id===id);
  if(!work){poetPage('derzhavin');return}
  main.innerHTML=`<section class="subpage"><a class="back-link" href="#/poet/derzhavin"><span aria-hidden="true">←</span>${language==='ru'?'Державин Гавриил Романович':'Gavriil Romanovich Derzhavin'}</a><div class="eyebrow">${poetryText('poets')} · 0 ${text('materialShort')}</div><h1>${label(work)}</h1><div class="empty-section"><span class="diamond" aria-hidden="true">◆</span><h2>${philosophyText('emptyTitle')}</h2><p>${language==='ru'?'Здесь появится текст произведения.':'The text will appear here.'}</p><a class="underlined-link" href="#/poet/derzhavin">${language==='ru'?'К Державину':'Back to Derzhavin'}</a></div></section>`;
  document.title=`${label(work)} — ARCHIVUM`;
}

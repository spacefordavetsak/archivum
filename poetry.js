const poets=[
  {id:'horace',ru:'Квинт Гораций Флак',en:'Quintus Horatius Flaccus',image:'assets/horace-portrait.png',imagePosition:'center 30%'},
  {id:'akhmatova',ru:'Ахматова Анна Андреевна',en:'Anna Andreyevna Akhmatova',image:'assets/akhmatova-portrait.jpeg',imagePosition:'center 36%'},
  {id:'balmont',ru:'Бальмонт Константин Дмитриевич',en:'Konstantin Dmitriyevich Balmont',image:'assets/balmont-portrait.jpeg',imagePosition:'center 17%'},
  {id:'batyushkov',ru:'Батюшков Константин Николаевич',en:'Konstantin Nikolayevich Batyushkov',image:'assets/batyushkov-portrait.jpg',imagePosition:'center 25%'},
  {id:'boratynsky',ru:'Боратынский Евгений Абрамович',en:'Yevgeny Abramovich Boratynsky',image:'assets/boratynsky-portrait.jpg',imagePosition:'center 38%'},
  {id:'bryusov',ru:'Брюсов Валерий Яковлевич',en:'Valery Yakovlevich Bryusov',image:'assets/bryusov-portrait.jpeg',imagePosition:'center 34%'},
  {id:'bunin',ru:'Бунин Иван Алексеевич',en:'Ivan Alekseyevich Bunin',image:'assets/bunin-portrait.jpeg',imagePosition:'center 18%'},
  {id:'gamzatov',ru:'Гамзатов Расул Гамзатович',en:'Rasul Gamzatovich Gamzatov',image:'assets/gamzatov-portrait.jpeg',imagePosition:'center 41%'},
  {id:'gaft',ru:'Гафт Валентин Иосифович',en:'Valentin Iosifovich Gaft',image:'assets/gaft-portrait.jpeg',imagePosition:'center top'},
  {id:'derzhavin',ru:'Державин Гавриил Романович',en:'Gavriil Romanovich Derzhavin',image:'assets/derzhavin-portrait.jpg',imagePosition:'center 30%'},
  {id:'yevtushenko',ru:'Евтушенко Евгений Александрович',en:'Yevgeny Aleksandrovich Yevtushenko',image:'assets/yevtushenko-portrait.jpeg',imagePosition:'38% center'},
  {id:'yesenin',ru:'Есенин Сергей Александрович',en:'Sergey Aleksandrovich Yesenin',image:'assets/yesenin-portrait.jpeg',imagePosition:'center 32%'},
  {id:'zhukovsky',ru:'Жуковский Василий Андреевич',en:'Vasily Andreyevich Zhukovsky',image:'assets/zhukovsky-portrait.jpg',imagePosition:'center 22%'},
  {id:'kipling',ru:'Киплинг Редьярд',en:'Rudyard Kipling',image:'assets/kipling-portrait.jpeg',imagePosition:'center 20%'},
  {id:'nekrasov',ru:'Некрасов Николай Алексеевич',en:'Nikolay Alekseyevich Nekrasov',image:'assets/nekrasov-portrait.jpg',imagePosition:'center 29%'},
  {id:'pasternak',ru:'Пастернак Борис Леонидович',en:'Boris Leonidovich Pasternak',image:'assets/pasternak-portrait.jpeg',imagePosition:'center 23%'},
  {id:'pushkin',ru:'Пушкин Александр Сергеевич',en:'Alexander Sergeyevich Pushkin',image:'assets/pushkin-portrait.jpeg',imagePosition:'center 20%'},
  {id:'severyanin',ru:'Игорь Северянин',en:'Igor Severyanin',image:'assets/severyanin-portrait.jpeg',imagePosition:'center 13%'},
  {id:'tyutchev',ru:'Тютчев Фёдор Иванович',en:'Fyodor Ivanovich Tyutchev',image:'assets/tyutchev-portrait.jpg',imagePosition:'center 22%'},
  {id:'lorca',ru:'Федерико Гарсия Лорка',en:'Federico García Lorca',image:'assets/lorca-cover.jpeg',imagePosition:'60% center'}
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
      lifeSections: [
        ['Венузия, Рим и Афины', [
          'Квинт Гораций Флак родился 8 декабря 65 года до н. э. в Венузии, римской колонии на границе Апулии и Лукании. Его отец был вольноотпущенником и, по сведениям Светония, работал на аукционах. Сам Гораций родился свободным, но происхождение отца могло стать поводом для упрёков. В шестой сатире первой книги поэт открыто говорит о своём происхождении и с благодарностью вспоминает, как отец отвёз его учиться в Рим и сам сопровождал на занятия. Он приписывает отцу и первые уроки нравственного суждения: тот объяснял ему последствия поступков на примерах знакомых людей. Впоследствии этот способ рассуждения пригодился Горацию в сатирах.',
          'В Риме он учился у Орбилия, которого в одном из поздних посланий вспоминает как сурового наставника. Затем Гораций отправился в Афины. В «Послании к Флору» он говорит, что искал там ответ на вопрос о различии между прямым и кривым, то есть о верном и ошибочном в человеческих поступках. Афинские годы дали ему возможность близко познакомиться с греческой литературой и философией. Их след заметен и в размерах его будущих од, и в том, как его стихотворные собеседники спорят о хорошей жизни.'
        ]],
        ['Гражданская война и возвращение в Италию', [
          'После убийства Юлия Цезаря в 44 году до н. э. в Афины прибыл Марк Юний Брут. Гораций вступил в его войско и получил должность военного трибуна. В 42 году до н. э. при Филиппах силы Брута и Кассия потерпели поражение от армий Антония и Октавиана. Много лет спустя, в оде к Помпею Вару (II, 7), Гораций вспоминает Филиппы и оставленный на поле боя щит. Этот эпизод напоминает о греческой лирической традиции, в которой о потерянном щите писал Архилох. В самой оде воспоминание о разгроме переходит в радость от встречи двух людей, переживших войну.',
          'После поражения республиканцев Гораций получил помилование и вернулся к гражданской жизни. Семейное имущество было утрачено. В послании к Флору поэт связывает начало своей литературной работы с нуждой после войны. Светоний сообщает, что Гораций приобрёл должность квесторского писца. Работа при ведомстве, ведавшем государственными финансами, дала ему средства жить в Риме и заниматься стихами. К этому периоду относятся ранние опыты в двух разных жанрах: гекзаметрические «Сатиры» и ямбические стихотворения, впоследствии собранные в «Эподы».'
        ]],
        ['Меценат и сабинское имение', [
          'Вергилий и Луций Варий Руф представили Горация Гаю Цильнию Меценату, близкому соратнику Октавиана. По рассказу самого Горация, после первой, довольно неловкой встречи Меценат позвал его к себе лишь через девять месяцев. Спустя годы поэт обратится к нему в оде, открывающей первую книгу лирики. А в сатире о поездке в Брундизий (I, 5) Гораций вспоминает общую дорогу. За переговорами влиятельных римлян стихотворение почти не следит. Из поездки поэт выносит совсем другие подробности: дурную воду, бессонную ночь из-за лягушек и комаров и радость от встречи с Вергилием и Варием.',
          'Первая книга «Сатир» появилась в середине 30-х годов до н. э., а вторая и сборник «Эподы» — около 30 года до н. э., когда война Октавиана с Антонием уже подошла к концу. У современников Горация вопрос о том, как снова жить вместе после гражданских войн, был частью повседневности. У него он возникает и в резких ямбах о римских распрях, и в разговорах о том, сколько власти над человеком имеют деньги, связи и честолюбие.',
          'У Горация появилось имение в Сабинских горах. Его часто считают подарком Мецената, хотя прямого подтверждения этому нет ни у поэта, ни у Светония. Во второй книге «Сатир» (II, 6) загородный дом становится местом, где можно распоряжаться своим временем, беседовать за простым столом и читать. В седьмом послании первой книги Гораций пишет Меценату о своём нежелании спешить обратно в Рим. В этих стихах благодарность за дружбу сочетается с попыткой защитить право на уединение и собственный распорядок.'
        ]],
        ['Август и последние годы', [
          'Первые три книги «Од» вышли в 23 году до н. э., уже при Августе. К этому времени Гораций прошёл путь от офицера проигравшей стороны до поэта, к которому обращался сам правитель. Светоний приводит письмо Августа с предложением взять Горация к себе секретарём. Поэт отклонил предложение, и их отношения продолжились. В 17 году до н. э. по поручению Августа он написал «Юбилейный гимн» для Секулярных игр. Его исполняли юноши и девушки, обращаясь к Аполлону и Диане с просьбами о благополучии Рима. Личная лирика Горация получила здесь форму публичной молитвы от имени общины.',
          'Около 13 года до н. э. появилась четвёртая книга «Од». В ней соседствуют стихи о победах Друза и Тиберия, поздняя любовная лирика и размышления о смерти. В оде IV, 7 весна возвращается к земле, тогда как человек проживает своё время лишь однажды. Гораций умер 27 ноября 8 года до н. э., вскоре после Мецената. По свидетельству Светония, его похоронили рядом с другом на Эсквилине. Рассказ о последних годах сохранился в античном жизнеописании, а о собственных тревогах и повседневном укладе поэта больше всего говорят его послания и оды.'
        ]]
      ],
      traits: [
        ['«Сатиры» и «Эподы»', 'Гекзаметрические «Сатиры» устроены как беседы. Поэт даёт собеседникам возражать, вводит бытовые сценки и позволяет читателю смеяться над рассказчиком. В «Эподах» интонация резче. Здесь слышна ямбическая традиция Архилоха, а пережитая гражданская война становится поводом спрашивать, почему римляне снова обращают оружие друг против друга.'],
        ['Оды и искусство меры', 'Гораций освоил строфы Алкея и Сапфо и другие греческие размеры, чтобы писать на латыни о дружбе, любви, вине, долге и старости. В оде к Левконое (I, 11) призыв carpe diem возникает в разговоре о границах знания: будущее нам неизвестно, и откладывать жизнь на потом рискованно. В оде к Лицинию (II, 10) образ золотой середины связан с умением менять поведение вместе с обстоятельствами.'],
        ['Римские оды и «К Мельпомене»', 'Шесть первых стихотворений третьей книги принято называть «Римскими одами». В оде «К римлянам» (III, 6) поэт связывает судьбу государства с нравами его граждан. «К Мельпомене» (III, 30), завершающая книгу, обращена к будущему самого поэта. Свой вклад он видит в том, что дал эолийской лирике латинский голос. Образ поэтического памятника получил самостоятельную жизнь у Державина и Пушкина. Оба текста Горация в архиве представлены в переводе Афанасия Фета.'],
        ['«Послания» и «Наука поэзии»', 'В стихотворных письмах Гораций размышляет о привычках, свободе и работе над собой, обращаясь к конкретным собеседникам. «Послание к Пизонам», известное как «Наука поэзии», переносит разговор на ремесло автора. Горация занимают цельность произведения, уместность речи, труд правки и способность стиха одновременно доставлять удовольствие и приносить пользу. Позднее к этому тексту обращались европейские авторы, когда формулировали правила поэтики.']
      ]
    },
    en: {
      dates: '65–8 BCE',
      lifeSections: [
        ['Venusia, Rome and Athens', [
          'Quintus Horatius Flaccus was born on 8 December 65 BCE in Venusia, a Roman colony on the border of Apulia and Lucania. His father was a freedman and, according to Suetonius, worked at auctions. Horace was freeborn, but his father’s origins could still be held against him. In Satires 1.6 he speaks openly about his family and remembers with gratitude how his father took him to Rome to study and accompanied him to his lessons. He also credits his father with teaching him to judge conduct by considering the consequences of actions he saw in people around him. This way of reasoning later served him well in his satires.',
          'In Rome he studied under Orbilius, whom he remembers as a stern teacher in a late epistle. He then went to Athens. In his letter to Florus, he recalls looking for a way to distinguish the straight from the crooked, an image for deciding what is right in human conduct. His years in Athens brought him into close contact with Greek literature and philosophy. Their influence appears in the metres of his later odes and in the way speakers in his poems argue about how to live well.'
        ]],
        ['Civil war and the return to Italy', [
          'After Julius Caesar was killed in 44 BCE, Marcus Junius Brutus came to Athens. Horace joined his army as a military tribune. In 42 BCE the forces of Brutus and Cassius were defeated at Philippi by the armies of Antony and Octavian. Many years later, in his ode to Pompeius Varus (2.7), Horace remembers Philippi and the shield he left behind. The episode recalls the Greek lyric tradition in which Archilochus wrote about losing his shield. In Horace’s ode, the memory of defeat gives way to the joy of a reunion between two survivors.',
          'Horace was pardoned after the defeat and returned to civilian life. The family property was lost. In his epistle to Florus he attributes his beginnings as a poet to the poverty that followed the war. Suetonius reports that Horace bought a position as a quaestor’s clerk. Working in public finance gave him a means of living in Rome and writing. His early work took two forms, the hexameter poems later collected as the Satires and the iambic poems later collected as the Epodes.'
        ]],
        ['Maecenas and the Sabine estate', [
          'Virgil and Lucius Varius Rufus introduced Horace to Gaius Cilnius Maecenas, a close ally of Octavian. In Horace’s account, their first meeting was awkward, and Maecenas waited nine months before sending for him again. Their lasting friendship appears in the poems addressed to Maecenas, including the ode that opens the first three books of lyrics. In the satire about the journey to Brundisium (1.5), Horace remembers the trip they took together. Members of a diplomatic mission appear alongside friends putting up with the discomforts of the road and making fun of one another.',
          'The first book of Satires appeared in the mid-30s BCE. The second book and the Epodes followed around 30 BCE, as the war between Octavian and Antony came to an end. For Horace’s contemporaries, learning how to live together after the civil wars was an everyday concern. It surfaces in his sharp iambics on Roman strife and in his conversations about the power of money, connections and ambition over a person’s life.',
          'Horace acquired an estate in the Sabine hills. It is often described as a gift from Maecenas, although neither Horace nor Suetonius directly confirms that. In Satires 2.6 the country house offers a place to spend time as he wishes, talk over a simple meal and read. In Epistles 1.7 he writes to Maecenas about his reluctance to hurry back to Rome. In these poems, gratitude for friendship accompanies a desire for solitude and control of his own time.'
        ]],
        ['Augustus and the last years', [
          'The first three books of Odes appeared in 23 BCE, during the rule of Augustus. By then Horace had gone from serving as an officer on the losing side to being approached by the ruler himself. Suetonius quotes a letter in which Augustus offers to make Horace his secretary. Horace declined, and cordial relations continued. In 17 BCE he wrote the Secular Hymn for the Secular Games at Augustus’s request. A choir of boys and girls appealed to Apollo and Diana for Rome’s prosperity. The lyric voice Horace used for personal themes here became a public prayer on behalf of the community.',
          'A fourth book of Odes followed around 13 BCE. It includes poems on the victories of Drusus and Tiberius as well as late love poetry and reflections on death. In Ode 4.7 the spring returns to the earth while each person’s time passes only once. Horace died on 27 November 8 BCE, shortly after Maecenas. Suetonius says he was buried near his friend on the Esquiline Hill. The ancient biography records his last years, while his epistles and odes tell us more about his preoccupations and the routines of his life.'
        ]]
      ],
      traits: [
        ['Satires and Epodes', 'The hexameter Satires work like conversations. Horace gives speakers room to object, introduces scenes from ordinary life and lets readers laugh at the narrator. The Epodes are sharper in tone. The iambic tradition of Archilochus comes through in these poems, while the experience of civil war leads Horace to ask why Romans have again turned their weapons on one another.'],
        ['The Odes and the art of moderation', 'Horace adapted the stanzas of Alcaeus and Sappho and other Greek metres to write in Latin about friendship, love, wine, duty and age. In the ode to Leuconoe (1.11), carpe diem follows a reflection on what we can know. The future is uncertain, and putting off life carries a risk. In the ode to Licinius (2.10), the golden mean involves adapting our conduct as circumstances change.'],
        ['The Roman Odes and To Melpomene', 'The first six poems of Book III are commonly known as the Roman Odes. In To the Romans (3.6), Horace links the fate of the state to the character of its citizens. To Melpomene (3.30), at the close of the book, looks toward the poet’s own future. Horace sees his achievement in giving Aeolian lyric a Latin voice. The image of the poetic monument took on a life of its own in the work of Derzhavin and Pushkin. Both of Horace’s odes are available here in Afanasy Fet’s Russian translation.'],
        ['Epistles and the Art of Poetry', 'In his verse letters, Horace addresses particular people as he considers habits, freedom and self-discipline. The Epistle to the Pisos, known as the Art of Poetry, takes up the writer’s craft. Horace considers the unity of a work, the right language for each speaker, the labour of revision and the ability of verse to give pleasure and offer instruction. Later European authors drew on the poem when formulating principles of literary composition.']
      ]
    },
    sources: [
      {ru:'Руниверсалис — Гораций',en:'Runiversalis — Horace (in Russian)',url:'https://руни.рф/Гораций'},
      {ru:'Светоний — Жизнеописание Горация',en:'Suetonius — Life of Horace',url:'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/de_Poetis/Horace*.html'},
      {ru:'Сочинения Горация — Perseus Digital Library',en:'Works of Horace — Perseus Digital Library',url:'https://atlas.perseus.tufts.edu/library/urn:cts:latinLit:phi0893/'},
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
  const profile=poetProfiles[id] ?? additionalPoetProfiles[id];
  if(!profile)return '';
  const copy=profile[language];
  const longBiography=Boolean(copy.lifeSections?.length);
  const renderParagraphs=paragraphs=>paragraphs.map(paragraph=>`<p>${escapeHTML(paragraph)}</p>`).join('');
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
    <div class="poet-profile-body${longBiography?' poet-profile-body--long':''}">
      <div class="poet-profile-columns">
        <section>
          <h2>${labels.biography}</h2>
          ${longBiography ? copy.lifeSections.map(([heading,paragraphs])=>`<div class="poet-life-section"><h3>${escapeHTML(heading)}</h3>${renderParagraphs(paragraphs)}</div>`).join('') : renderParagraphs(copy.biography)}
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

// Background footage: Dan Cristian Pădureț, Pexels, video 3051492.
const inkMotionQuery=matchMedia('(prefers-reduced-motion: no-preference)');
let inkBackgroundPaused=false;

function renderInkBackground(animated=false){
  const video=animated?'<video muted loop playsinline preload="none" tabindex="-1"></video>':'';
  const toggle=animated?'<button type="button" class="ink-background-toggle"></button>':'';
  return `<div class="ink-background" aria-hidden="true"><img src="assets/poetry-ink-monochrome.jpg" alt="" decoding="async">${video}</div>${toggle}`;
}

function syncInkBackground(){
  const video=main.querySelector('.ink-background video');
  if(!video)return;
  if(!inkMotionQuery.matches||inkBackgroundPaused){video.pause();return}
  if(!video.hasAttribute('src'))video.src='assets/poetry-ink-monochrome.mp4';
  video.play().catch(()=>{});
}

inkMotionQuery.addEventListener('change',syncInkBackground);

function mountInkBackground(){
  const video=main.querySelector('.ink-background video');
  const toggle=main.querySelector('.ink-background-toggle');
  video.muted=true;
  video.defaultPlaybackRate=1.5;
  video.playbackRate=1.5;
  const updateLabel=()=>{
    toggle.textContent=language==='ru'
      ? (video.paused?'Оживить фон':'Остановить фон')
      : (video.paused?'Play background':'Pause background');
  };
  video.addEventListener('playing',()=>video.parentElement?.setAttribute('data-video-ready',''));
  video.addEventListener('play',updateLabel);
  video.addEventListener('pause',updateLabel);
  video.addEventListener('error',()=>{toggle.hidden=true});
  toggle.addEventListener('click',()=>{
    inkBackgroundPaused=!video.paused;
    syncInkBackground();
  });
  updateLabel();
  syncInkBackground();
}

function poetPage(id){
  const author=poets.find(item=>item.id===id);
  if(!author){main.innerHTML=`<section class="subpage"><h1>${text('notFound')}</h1><a class="underlined-link" href="#/section/poetry">${poetryText('all')}</a></section>`;return}
  const index=poets.indexOf(author),items=poetNotes(id),section=sections.find(item=>item.id==='poetry');
  const previous=poets[(index+poets.length-1)%poets.length],next=poets[(index+1)%poets.length];
  main.innerHTML=`<section class="subpage poet-page ink-page">
    ${renderInkBackground(true)}
    <a class="back-link" href="#/section/poetry"><span aria-hidden="true">←</span>${label(section)}</a><div class="eyebrow">${poetryText('poets')} — ${String(index+1).padStart(2,'0')} / ${poets.length} · ${poetCount(id)} ${text('materialShort')}</div><h1>${label(author)}</h1><p class="section-description">${poetryText('collection')}</p>${id==='horace'?`<div class="horace-feature"><figure><img src="assets/horace-portrait.png" alt="Художественное изображение бюста Горация" loading="eager"><figcaption>${language==='ru'?'Художественная интерпретация':'Artistic interpretation'}</figcaption></figure><blockquote><span class="horace-ornament" aria-hidden="true">◆</span><p>Какая польза в напрасных законах там, где нет нравов? Что значат пустые законы без обычаев?</p><cite>Квинт Гораций Флак</cite></blockquote></div>`:''}${id==='derzhavin'?`<div class="horace-feature derzhavin-feature"><figure><img src="assets/derzhavin-portrait.jpg" alt="Портрет Гавриила Романовича Державина" loading="eager"></figure><blockquote><span class="horace-ornament" aria-hidden="true">◆</span><p lang="ru">Жизнь есть небес мгновенный дар;<br>Устрой ее себе к покою<br>И с чистою твоей душою<br>Благословляй судеб удар.</p><cite>Гавриил Романович Державин</cite></blockquote></div>`:''}
    ${id==='balmont'?`
      <div class="horace-feature">
        <figure>
          <img src="${escapeHTML(author.image)}" alt="${language==='ru'?'Портрет Константина Бальмонта':'Portrait of Konstantin Balmont'}" loading="eager">
        </figure>
        <blockquote lang="ru">
          <span class="horace-ornament" aria-hidden="true">◆</span>
          <p>И да, и нет — здесь все мое,<br>
             Приемлю боль — как благостыню,<br>
             Благославляю бытие,<br>
             И если создал я пустыню,<br>
             Ее величие — мое!</p>
          <cite>Константин Бальмонт</cite>
        </blockquote>
      </div>`:''}
    ${!['horace','derzhavin','balmont'].includes(id)?`
      <div class="horace-feature poet-portrait-feature">
        <figure>
          <img src="${escapeHTML(id==='lorca'?'assets/lorca-portrait-1933.jpg':author.image)}" alt="${escapeHTML(label(author))}" loading="eager">
          ${id==='lorca'?`<figcaption><a href="https://commons.wikimedia.org/wiki/File:Federico_Garc%C3%ADa_Lorca,_dedicada_a_Xavier_B%C3%B3veda,_1933.jpg">${language==='ru'?'Буэнос-Айрес, 1933':'Buenos Aires, 1933'}</a></figcaption>`:''}
        </figure>
      </div>`:''}
    ${renderPoetProfile(id)}
    ${id==='derzhavin'?`${renderArchiveBlocks(derzhavinWorks.map(work=>({...work,href:`#/note/derzhavin-${work.id}`,meta:`1 ${text('materialShort')}`})))}`:items.length?materialList(items):`<div class="empty-section"><span class="diamond" aria-hidden="true">◆</span><h2>${philosophyText('emptyTitle')}</h2><p>${poetryText('empty')}</p><a class="underlined-link" href="#/section/poetry">${poetryText('all')}</a></div>`}<nav class="section-navigation" aria-label="${poetryText('poets')}"><a href="#/poet/${previous.id}"><span class="nav-caption">${poetryText('previous')}</span>← ${label(previous)}</a><a href="#/poet/${next.id}"><span class="nav-caption">${poetryText('next')}</span>${label(next)} →</a></nav></section>`;
  mountInkBackground();
  document.title=`${label(author)} — ARCHIVUM`;
}

function derzhavinWorkPage(id){
  if(['meshchersky','velmozha','plamide','river-of-time','separation','philosophers','gift','crown-of-immortality','sappho'].includes(id)){location.replace(`#/note/derzhavin-${id}`);return}
  const work=derzhavinWorks.find(item=>item.id===id);
  if(!work){poetPage('derzhavin');return}
  main.innerHTML=`<section class="subpage"><a class="back-link" href="#/poet/derzhavin"><span aria-hidden="true">←</span>${language==='ru'?'Державин Гавриил Романович':'Gavriil Romanovich Derzhavin'}</a><div class="eyebrow">${poetryText('poets')} · 0 ${text('materialShort')}</div><h1>${label(work)}</h1><div class="empty-section"><span class="diamond" aria-hidden="true">◆</span><h2>${philosophyText('emptyTitle')}</h2><p>${language==='ru'?'Здесь появится текст произведения.':'The text will appear here.'}</p><a class="underlined-link" href="#/poet/derzhavin">${language==='ru'?'К Державину':'Back to Derzhavin'}</a></div></section>`;
  document.title=`${label(work)} — ARCHIVUM`;
}

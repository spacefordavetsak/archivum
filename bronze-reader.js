const bronzeReferenceId='bronze-age-reference';

function bronzeReferenceChapter(anchor){
  const match=/^s-(\d+)$/.exec(anchor||'');
  return match?Math.floor(Number(match[1])/1000):0;
}

async function getBronzeReference(anchor){
  const index=await getNoteContent(bronzeReferenceId);
  const chapter=bronzeReferenceChapter(anchor);
  const entry=index.documents[chapter-1];
  if(!entry)return {...index,chapter:0};
  const data=await getNoteContent(`${bronzeReferenceId}-${String(chapter).padStart(2,'0')}`);
  return {...data,chapter,searchToc:index.searchToc,documents:index.documents};
}

function bronzeReferenceNavigation(data){
  const route=`#/note/${bronzeReferenceId}`;
  const overview=language==='ru'?'Все главы справочника':'All chapters';
  const link=(entry,caption,arrow)=>`<a href="${route}/${entry.id}"><span class="nav-caption">${caption}</span>${arrow==='←'?'← ':''}${escapeHTML(entry.title)}${arrow==='→'?' →':''}</a>`;
  const previous=data.documents[data.chapter-2];
  const next=data.documents[data.chapter];
  return `${previous?link(previous,readerText('previous'),'←'):`<a href="${route}">← ${overview}</a>`}${next?link(next,readerText('next'),'→'):`<a href="${route}">${overview} ↑</a>`}`;
}

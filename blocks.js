function archiveBlockLayout(index){
  const role=index%5,reference=sections[index%sections.length];
  const mobileHeight=role===0?403:role===2?319:reference.image?247:189;
  return `--group:${Math.floor(index/5)};--mobile-card-height:${mobileHeight}px`;
}
function renderArchiveBlocks(items){
  return `<div class="archive-grid mosaic-grid internal-grid">${items.map((item,index)=>`<a class="section-card collection-card${item.id==='roadmap'?' roadmap-cover-card':''}${item.image?' has-image':''}" ${item.note?noteLinkAttributes(item.note):`href="${item.href}"`} style="${archiveBlockLayout(index)}" aria-label="${escapeHTML(label(item))}">${item.image?`<img src="${escapeHTML(item.image)}" alt="" loading="lazy" decoding="async" style="object-position:${escapeHTML(item.imagePosition||'center')}">`:''}<div class="card-meta"><span>${String(index+1).padStart(2,'0')}</span><span>${escapeHTML(item.meta||'')}</span></div><h2>${escapeHTML(label(item))}</h2></a>`).join('')}</div>`;
}
function sectionNavigation(section){
  const index=sections.indexOf(section),previous=sections[(index+sections.length-1)%sections.length],next=sections[(index+1)%sections.length];
  return `<nav class="section-navigation" aria-label="${text('sections')}"><a href="#/section/${previous.id}"><span class="nav-caption">${text('previous')}</span>← ${label(previous)}</a><a href="#/section/${next.id}"><span class="nav-caption">${text('next')}</span>${label(next)} →</a></nav>`;
}

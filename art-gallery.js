let artImageDialog;
function installArtGallery(body,note,data){
  if(note.id!=='painting-favourites')return;
  const page=body.closest('.reader-page');page.classList.add('art-gallery-page');
  document.getElementById('reader-meta').innerHTML=`<span>${language==='ru'?'Личная коллекция':'Personal collection'}</span><span>14 ${language==='ru'?'художников':'artists'}</span><span>${data.images} ${language==='ru'?'картин':'paintings'}</span>`;
  const collection=body.querySelector('.art-collection');
  const toolbar=document.createElement('div');toolbar.className='art-search';
  toolbar.innerHTML=`<label for="art-search-input">${language==='ru'?'Поиск по коллекции':'Search the collection'}</label><div><input id="art-search-input" type="search" placeholder="${language==='ru'?'Художник, картина или тема…':'Artist, painting, or subject…'}"><button type="button">${language==='ru'?'Сбросить':'Clear'}</button></div><p role="status" aria-live="polite"></p>`;
  collection.prepend(toolbar);
  const input=toolbar.querySelector('input'),status=toolbar.querySelector('[role=status]');
  const norm=t=>t.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const artists=[...collection.querySelectorAll('.art-artist-section')].map(el=>({el,name:norm(el.querySelector('.art-artist-header').textContent),paintings:[...el.querySelectorAll('.art-painting-section')].map(el=>({el,text:norm(el.textContent)}))}));
  const search=()=>{
    const q=norm(input.value.trim());let count=0;
    artists.forEach(artist=>{const nameHit=artist.name.includes(q);let visible=0;artist.paintings.forEach(p=>{p.el.hidden=!!q&&!nameHit&&!p.text.includes(q);if(!p.el.hidden){visible++;count++}});artist.el.hidden=!!q&&!visible&&!nameHit});
    status.textContent=q?(language==='ru'?`Найдено картин: ${count}`:`Paintings found: ${count}`):'';
  };
  input.addEventListener('input',search);
  toolbar.querySelector('button').addEventListener('click',()=>{input.value='';search();input.focus()});
  page.querySelectorAll('#reader-toc-links a').forEach(link=>link.addEventListener('click',()=>{if(input.value){input.value='';search()}}));
  collection.querySelectorAll('a[href^="#/note/"]').forEach(link=>link.addEventListener('click',()=>{if(input.value){input.value='';search()}}));
  collection.querySelectorAll('img').forEach(img=>{
    const button=document.createElement('button');button.type='button';button.className='art-zoom-trigger';button.setAttribute('aria-label',`${language==='ru'?'Увеличить':'Enlarge'}: ${img.alt}`);
    img.replaceWith(button);button.append(img);
    button.addEventListener('click',()=>{
      if(!artImageDialog){artImageDialog=document.createElement('dialog');artImageDialog.className='art-image-dialog';document.body.append(artImageDialog)}
      artImageDialog.replaceChildren();
      const bar=document.createElement('div');bar.className='art-image-bar';
      const title=document.createElement('p');title.textContent=img.alt;title.id='art-image-title';
      const original=document.createElement('a');original.href=img.src;original.textContent=language==='ru'?'Оригинал ↗':'Original ↗';
      const close=document.createElement('button');close.type='button';close.textContent='×';close.setAttribute('aria-label',language==='ru'?'Закрыть':'Close');close.addEventListener('click',()=>artImageDialog.close());
      bar.append(title,original,close);
      const image=img.cloneNode();image.removeAttribute('loading');image.className='art-full-image';
      const stage=document.createElement('div');stage.className='art-image-stage';stage.append(image);
      artImageDialog.append(bar,stage);artImageDialog.setAttribute('aria-labelledby','art-image-title');
      image.addEventListener('click',()=>stage.classList.toggle('art-native-size'));
      artImageDialog.showModal();close.focus();
    });
  });
}

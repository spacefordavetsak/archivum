const archiveIntro=(()=>{
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,timer=0,generation=0,seen=false,contours=null;
  const copy=()=>language==='en'?{kicker:'A personal archive of knowledge',caption:'Know thyself.',alt:'A scholar in a golden wreath among books'}:{kicker:'Личный архив знаний',caption:'Познай самого себя',alt:'Учёный в золотом венке среди книг'};
  function html(){const t=copy();return `<section class="home-intro intro-scene" aria-labelledby="archive-title" data-phase="preparing"><div class="intro-frame" aria-hidden="true"></div><div class="intro-topline">◆ ARCHIVUM · MMXXVI</div><figure class="intro-artwork"><img src="assets/archive-portrait.webp" width="1122" height="1402" alt="${t.alt}" fetchpriority="high"><canvas class="intro-contours" aria-hidden="true"></canvas></figure><div class="intro-veil" aria-hidden="true"></div><div class="intro-copy"><p class="intro-kicker">${t.kicker}</p><h1 class="intro-wordmark" id="archive-title" aria-label="ARCHIVUM">${archiveWordmarkSVG}</h1><p class="intro-caption">${t.caption}</p></div></section>`}
  function stop(){++generation;cancelAnimationFrame(frame);clearTimeout(timer)}
  function ready(root){root.dataset.phase='ready'}
  function getContours(){if(!contours)contours=fetch('assets/archive-contours.json').then(r=>{if(!r.ok)throw Error('Contours unavailable');return r.json()}).catch(error=>{contours=null;throw error});return contours}
  function trace(root,data,token,started){
    const canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d');if(!ctx)return;
    const ratio=Math.min(devicePixelRatio||1,1.75),scale=Math.min(canvas.clientWidth*ratio/data.width,1.5);
    canvas.width=Math.round(data.width*scale);canvas.height=Math.round(data.height*scale);ctx.scale(scale,scale);ctx.lineCap='round';ctx.lineJoin='round';
    const factor=2.2/Math.max(...data.paths.map(path=>path[0]+path[1]));
    const paths=data.paths.map(([start,duration,gold,points])=>{let total=0;const lengths=[0];for(let i=2;i<points.length;i+=2){total+=Math.hypot(points[i]-points[i-2],points[i+1]-points[i-1]);lengths.push(total)}return {start:.12+start*factor,duration:duration*factor,gold,points,lengths,total,drawn:0}});
    function draw(now){
      if(token!==generation||!root.isConnected||motion.matches)return;
      const elapsed=(now-started)/1000;
      for(const path of paths){
        const distance=Math.min(1,Math.max(0,(elapsed-path.start)/path.duration))*path.total;
        if(distance<=path.drawn)continue;
        ctx.strokeStyle=path.gold?'rgba(222,169,75,.83)':'rgba(160,148,125,.62)';ctx.lineWidth=path.gold?.85:.65;ctx.beginPath();let begun=false;
        for(let i=1;i<path.lengths.length;i++){
          const a=path.lengths[i-1],b=path.lengths[i];if(b<=path.drawn||a>=distance)continue;
          const from=(Math.max(a,path.drawn)-a)/(b-a),to=(Math.min(b,distance)-a)/(b-a),j=i*2;
          const x0=path.points[j-2],y0=path.points[j-1],dx=path.points[j]-x0,dy=path.points[j+1]-y0;
          if(!begun){ctx.moveTo(x0+dx*from,y0+dy*from);begun=true}ctx.lineTo(x0+dx*to,y0+dy*to);
        }
        ctx.stroke();path.drawn=distance;
      }
      if(elapsed<2.4)frame=requestAnimationFrame(draw);
    }
    frame=requestAnimationFrame(draw);
  }
  function mount(){
    stop();const root=document.querySelector('.home-intro');if(!root)return;
    if(seen||motion.matches){root.classList.add('intro-static');ready(root);return}
    seen=true;const token=generation,started=performance.now();root.classList.add('intro-running');root.dataset.phase='drawing';
    timer=setTimeout(()=>{if(token===generation&&root.isConnected)ready(root)},2800);
    getContours().then(data=>{if(token===generation&&root.isConnected&&performance.now()-started<2400)trace(root,data,token,started)}).catch(()=>{});
  }
  motion.addEventListener('change',()=>{if(motion.matches){stop();const root=document.querySelector('.home-intro');if(root){root.classList.add('intro-static');ready(root)}}});
  return {html,mount,stop};
})();

const archivePrologue=(()=>{
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let observer=null;
  function stop(){
    observer?.disconnect();observer=null;
    document.querySelectorAll('.home-prologue .prologue-reveal-pending').forEach(item=>item.classList.remove('prologue-reveal-pending'));
  }
  function mount(){
    stop();
    const root=document.querySelector('.home-prologue');
    if(!root||motion.matches||typeof IntersectionObserver==='undefined')return;
    observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        entry.target.classList.remove('prologue-reveal-pending');
        entry.target.classList.add('prologue-revealed');
        observer?.unobserve(entry.target);
      });
    },{rootMargin:'0px 0px -56px 0px',threshold:.08});
    root.querySelectorAll('.prologue-ornament,.prologue-copy>p').forEach(item=>{
      item.classList.add('prologue-reveal-pending');observer.observe(item);
    });
  }
  motion.addEventListener('change',()=>{if(motion.matches)stop()});
  return {mount,stop};
})();

// Adapted from the owner's LightningBackground shader for ARCHIVUM's buildless site.
const archiveScience=(()=>{
  let cleanup=null;
  function html(){return `<div class="science-atmosphere" aria-hidden="true" data-mode="fallback"><svg class="science-still" viewBox="0 0 900 1100" preserveAspectRatio="xMidYMid slice" focusable="false"><defs><radialGradient id="science-halo"><stop stop-color="#a47c34" stop-opacity=".12"/><stop offset="1" stop-color="#050504" stop-opacity="0"/></radialGradient></defs><ellipse cx="690" cy="500" rx="290" ry="560" fill="url(#science-halo)"/><g fill="none" stroke="#b89a61" stroke-linecap="round"><path d="M680 -20 650 75 704 138 662 206 708 284 650 353 693 415 640 491 679 575 633 654 676 728 620 802 653 889 608 969 642 1120" stroke-width="1.3" opacity=".48"/><path d="m662 206-74 90 22 74-80 70 20 76-82 112m172-137 78 55-12 86 69 82-16 70m-83-56-82 61 18 77-65 62" opacity=".23"/><path d="M765 0 731 112 777 195 733 282 770 360 724 454 759 544 712 627 751 719 706 824 737 919 694 1100" opacity=".17"/></g></svg><canvas class="science-canvas" tabindex="-1"></canvas></div>`}
  function stop(){if(cleanup){const dispose=cleanup;cleanup=null;dispose()}}
  function mount(){
    stop();
    const root=document.querySelector('.science-atmosphere');if(!root)return;
    const canvas=root.querySelector('canvas'),motion=matchMedia('(prefers-reduced-motion: reduce)');
    let gl;
    try{gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'low-power'})}catch{return}
    if(!gl)return;
    let program=null,buffer=null,frame=0,resizeObserver=null,disposed=false,lost=false,elapsed=0,lastFrame=0;
    const shaders=[],listeners=[];
    function listen(target,type,handler){target.addEventListener(type,handler);listeners.push(()=>target.removeEventListener(type,handler))}
    cleanup=()=>{
      disposed=true;cancelAnimationFrame(frame);resizeObserver?.disconnect();listeners.forEach(remove=>remove());
      if(buffer)gl.deleteBuffer(buffer);if(program)gl.deleteProgram(program);shaders.forEach(shader=>gl.deleteShader(shader));
      if(!gl.isContextLost())gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    function compile(source,type){
      const shader=gl.createShader(type);if(!shader)throw Error('Shader unavailable');shaders.push(shader);
      gl.shaderSource(shader,source);gl.compileShader(shader);
      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error('Shader compilation failed');
      return shader;
    }
    try{
      const vertex=compile(`attribute vec2 aPosition;void main(){gl_Position=vec4(aPosition,0.0,1.0);}`,gl.VERTEX_SHADER);
      const fragment=compile(`
        precision mediump float;
        uniform vec2 iResolution;
        uniform float iTime;
        float hash12(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}
        mat2 rotate2d(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
        float noise(vec2 p){vec2 ip=floor(p),fp=fract(p),t=smoothstep(0.0,1.0,fp);return mix(mix(hash12(ip),hash12(ip+vec2(1.,0.)),t.x),mix(hash12(ip+vec2(0.,1.)),hash12(ip+vec2(1.,1.)),t.x),t.y);}
        float fbm(vec2 p){float value=0.,amplitude=.5;for(int i=0;i<6;++i){value+=amplitude*noise(p);p=rotate2d(.45)*p*2.;amplitude*=.5;}return value;}
        void main(){
          vec2 uv=gl_FragCoord.xy/iResolution.xy;
          float aspect=iResolution.x/iResolution.y;
          vec2 p=(uv-.5)*vec2(aspect,1.);p.x-=aspect*.28;
          float time=iTime*.252;
          vec2 flow=vec2(time*.36,time*.62);
          float warp=2.*fbm(p*2.1+flow)-1.;
          float dist=abs(p.x+warp*.48);
          float branch=abs(p.x+.19+(2.*fbm(p*3.3+flow+vec2(8.1,3.7))-1.)*.31);
          float core=.005/(dist+.006);
          float secondary=.0018/(branch+.008);
          float glow=.045*exp(-dist*6.);
          float breathe=.76+.12*sin(iTime*.48)+.05*sin(iTime*.91);
          float energy=(core+secondary+glow)*breathe*.68;
          vec3 gold=vec3(.78,.62,.36);
          vec3 color=vec3(.0196,.0196,.0157)+gold*min(energy,.8);
          color+=vec3(.004)*hash12(gl_FragCoord.xy);
          gl_FragColor=vec4(color,1.);
        }
      `,gl.FRAGMENT_SHADER);
      program=gl.createProgram();if(!program)throw Error('Program unavailable');
      gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
      if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Program linking failed');
      gl.useProgram(program);
      buffer=gl.createBuffer();if(!buffer)throw Error('Buffer unavailable');
      gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      const position=gl.getAttribLocation(program,'aPosition');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
      const resolution=gl.getUniformLocation(program,'iResolution'),time=gl.getUniformLocation(program,'iTime');
      function draw(){if(disposed||lost)return;gl.uniform2f(resolution,canvas.width,canvas.height);gl.uniform1f(time,elapsed);gl.drawArrays(gl.TRIANGLES,0,6)}
      function resize(){
        const width=Math.max(1,root.clientWidth),height=Math.max(1,root.clientHeight);
        const scale=Math.min(devicePixelRatio||1,1.25,Math.sqrt(700000/(width*height)));
        canvas.width=Math.max(1,Math.round(width*scale));canvas.height=Math.max(1,Math.round(height*scale));gl.viewport(0,0,canvas.width,canvas.height);draw();
      }
      function tick(now){
        if(disposed||lost||document.hidden||motion.matches)return;
        frame=requestAnimationFrame(tick);
        if(lastFrame&&now-lastFrame<1000/30)return;
        elapsed+=lastFrame?Math.min((now-lastFrame)/1000,.1):0;lastFrame=now;draw();
      }
      function updatePlayback(){
        cancelAnimationFrame(frame);lastFrame=0;
        root.dataset.motion=motion.matches?'still':'animated';
        if(motion.matches){draw();return}
        if(!document.hidden&&!lost)frame=requestAnimationFrame(tick);
      }
      listen(canvas,'webglcontextlost',()=>{lost=true;cancelAnimationFrame(frame);root.dataset.mode='fallback'});
      listen(document,'visibilitychange',updatePlayback);listen(motion,'change',updatePlayback);
      if(typeof ResizeObserver!=='undefined'){resizeObserver=new ResizeObserver(resize);resizeObserver.observe(root)}else listen(window,'resize',resize);
      resize();root.dataset.mode='webgl';updatePlayback();
    }catch{stop();root.dataset.mode='fallback'}
  }
  return {html,mount,stop};
})();

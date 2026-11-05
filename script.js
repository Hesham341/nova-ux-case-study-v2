(() => {
  const button=document.querySelector('#menuButton');
  const menu=document.querySelector('#mobileNav');
  const progress=document.querySelector('#progress');
  const navLinks=[...document.querySelectorAll('.desktop-nav a')];
  const sections=[...document.querySelectorAll('main section[id]')];

  function closeMenu(){
    if(!button||!menu)return;
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-label','Open navigation');
    menu.classList.remove('open');
  }

  if(button && menu){
    button.addEventListener('click',()=>{
      const opened=button.getAttribute('aria-expanded')==='true';
      button.setAttribute('aria-expanded',String(!opened));
      button.setAttribute('aria-label',opened?'Open navigation':'Close navigation');
      menu.classList.toggle('open',!opened);
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
    document.addEventListener('click',event=>{
      if(!event.target.closest('.site-header'))closeMenu();
    });
  }



  // On narrow screens, show one legible wireframe or final screen at a time.
  document.querySelectorAll('.wireframe-panel').forEach(panel=>{
    const stageButtons=[...panel.querySelectorAll('[data-wireframe-stage]')];
    const showcase=panel.querySelector('.wireframe-showcase');
    stageButtons.forEach(button=>button.addEventListener('click',()=>{
      const stage=button.dataset.wireframeStage;
      if(showcase)showcase.dataset.mobileStage=stage;
      stageButtons.forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
    }));
  });

  // Keyboard-accessible wireframe comparisons.
  const frameTabs=[...document.querySelectorAll('[data-wireframe-tab]')];
  function selectFrameTab(tab,focus=false){
    if(!tab)return;
    frameTabs.forEach(item=>{
      const active=item===tab;
      item.setAttribute('aria-selected',String(active));
      item.tabIndex=active?0:-1;
      const panel=document.getElementById('wireframe-panel-'+item.dataset.wireframeTab);
      if(panel)panel.hidden=!active;
    });
    if(focus)tab.focus();
  }
  frameTabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>selectFrameTab(tab));
    tab.addEventListener('keydown',e=>{
      let next=index;
      if(e.key==='ArrowRight')next=(index+1)%frameTabs.length;
      else if(e.key==='ArrowLeft')next=(index-1+frameTabs.length)%frameTabs.length;
      else if(e.key==='Home')next=0;
      else if(e.key==='End')next=frameTabs.length-1;
      else return;
      e.preventDefault();
      selectFrameTab(frameTabs[next],true);
    });
  });

  function updateReadingProgress(){
    const total=document.documentElement.scrollHeight-window.innerHeight;
    if(progress)progress.style.width=(total>0?Math.max(0,Math.min(100,window.scrollY/total*100)):0)+'%';
  }
  updateReadingProgress();
  window.addEventListener('scroll',updateReadingProgress,{passive:true});
  window.addEventListener('resize',updateReadingProgress,{passive:true});

  if('IntersectionObserver' in window && navLinks.length){
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(!entry.isIntersecting)continue;
        navLinks.forEach(a=>{
          const active=a.getAttribute('href')==='#'+entry.target.id;
          a.classList.toggle('active',active);
          if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
        });
      }
    },{rootMargin:'-18% 0px -68% 0px',threshold:0});
    sections.forEach(section=>observer.observe(section));
  }
})();
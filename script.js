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
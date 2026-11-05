const navButton = document.querySelector('#menuButton');
const navMenu = document.querySelector('#mobileNav');
const header = document.querySelector('#siteHeader');
const progress = document.querySelector('#progress');
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
function closeMenu(){navButton.setAttribute('aria-expanded','false');navButton.setAttribute('aria-label','Open navigation');navMenu.classList.remove('open');}
navButton.addEventListener('click',()=>{const open=navButton.getAttribute('aria-expanded')==='true';navButton.setAttribute('aria-expanded',String(!open));navButton.setAttribute('aria-label',open?'Open navigation':'Close navigation');navMenu.classList.toggle('open',!open);});
navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{if(!header.contains(e.target))closeMenu();});
function syncScroll(){const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);progress.style.transform=`scaleX(${window.scrollY/max})`;header.classList.toggle('scrolled',window.scrollY>16);let active='';for(const s of sections)if(s.getBoundingClientRect().top<180)active=s.id;navLinks.forEach(a=>{if(a.getAttribute('href')==='#'+active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
window.addEventListener('scroll',syncScroll,{passive:true});window.addEventListener('resize',syncScroll);syncScroll();
if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){const o=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('entered');o.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.problem-card,.persona-card,.feature-panel,.iteration-card,.finding,.process-step').forEach(e=>{e.classList.add('to-reveal');o.observe(e);});}
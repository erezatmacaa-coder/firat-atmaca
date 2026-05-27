const words = [
  'Fikirleri ve hikayeleri inşa ediyorum',
  'Özgürlük, farkındalık, dönüşüm',
  'Girişimci & Yazar',
  'İlham veren hikayeler'
];

const typewriterEl = document.getElementById('typewriter');
let wordIdx = 0, charIdx = 0, isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIdx % words.length];
  if (!currentWord) { setTimeout(typeEffect, 500); return; }

  if (!isDeleting) {
    typewriterEl.textContent = currentWord.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2500);
      return;
    }
  } else {
    typewriterEl.textContent = currentWord.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 30 : 60);
}

typeEffect();

window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.classList.toggle('scrolled', window.scrollY > 80);

  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress.style.width = ((scrollTop / scrollHeight) * 100) + '%';
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const heroContent = document.querySelector('.hero-content');
document.addEventListener('mousemove', (e) => {
  if (window.innerWidth > 768) {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroContent.style.transform = `translate(${x}px, ${y}px)`;
  }
});

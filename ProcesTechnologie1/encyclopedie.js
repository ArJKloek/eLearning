// Small script: filter index and highlight active section (scrollspy)
const search = document.getElementById('search');
// Collect all index navs (multiple groups)
const indexNavs = Array.from(document.querySelectorAll('.index'));
const indexLinks = indexNavs.flatMap(nav => Array.from(nav.querySelectorAll('a')));
const sections = indexLinks.map(a => document.getElementById(a.getAttribute('href').substring(1))).filter(Boolean);

search.addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  indexLinks.forEach(a => {
    const term = (a.dataset.term || a.textContent).toLowerCase();
    const li = a.parentElement;
    if (!q || term.includes(q)) li.style.display = '';
    else li.style.display = 'none';
  });
});

// Scrollspy using IntersectionObserver across sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector(`.index a[href="#${id}"]`);
    if (entry.isIntersecting) {
      indexLinks.forEach(a => a.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0 });

sections.forEach(s => observer.observe(s));

// Improve keyboard access: focus content when any link activated
indexLinks.forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.getElementById(a.getAttribute('href').substring(1));
    if (target) target.setAttribute('tabindex','-1');
    setTimeout(() => target && target.focus(), 300);
  });
});

// Focus an article by id and mark the corresponding index link active
function focusArticleById(id) {
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  // ensure focusable
  el.setAttribute('tabindex', '-1');
  // remove active from all links then add to the matching one
  indexLinks.forEach(a => a.classList.remove('active'));
  const link = document.querySelector(`.index a[href="#${id}"]`);
  if (link) link.classList.add('active');
  // focus after a short delay to allow native scrolling
  setTimeout(() => el.focus(), 200);
}

// When the page loads with a hash, focus that article
document.addEventListener('DOMContentLoaded', () => {
  if (location.hash) {
    const id = location.hash.substring(1);
    setTimeout(() => focusArticleById(id), 150);
  }
});

// Respond to hash changes (e.g., clicking an in-page link)
window.addEventListener('hashchange', () => {
  const id = location.hash.substring(1);
  focusArticleById(id);
});

// Delegate clicks inside the content area for in-article anchors
const content = document.getElementById('content');
if (content) {
  content.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#')) {
      const id = href.substring(1);
      // allow native scroll to happen then focus and highlight
      setTimeout(() => focusArticleById(id), 150);
    }
  });
}

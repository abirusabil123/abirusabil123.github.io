
// Log user
const params = new URLSearchParams({
    user_agent: navigator.userAgent,
    origin: document.referrer || window.location.origin || 'personal website',
    platform: navigator.userAgent,
    path: window.location.pathname,
    product: 'abirusabil123.github.io'
});
const img = new Image();
img.src = `https://backenddiscover.duckdns.org:8443/api/log-visitor-pixel?${params}`;
img.onload = () => console.log('✅ Visitor logged successfully');
img.onerror = () => console.log('✅ Visitor could not be logged');

// Scroll progress bar
const progressBar = document.getElementById('scrollProgressBar');
function updateProgressBar() {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const maxScroll = scrollHeight - clientHeight;
    // If page is not scrollable, show full green bar
    if (maxScroll <= 0) {
        progressBar.style.width = '100%';
        return;
    }
    const scrollPercent = (scrollTop / maxScroll) * 100;
    progressBar.style.width = scrollPercent + '%';
}
// Run on load and on scroll
window.addEventListener('scroll', updateProgressBar);
window.addEventListener('resize', updateProgressBar);
updateProgressBar(); // initial call

// Toggle shayari language
function toggleTranslation(element) {
    const hinglish = element.querySelector('.hinglish-version');
    const hindi = element.querySelector('.hindi-version');
    const english = element.querySelector('.english-version');

    if (hinglish.style.display === 'block') {
        hinglish.style.display = 'none';
        hindi.style.display = 'block';
        english.style.display = 'none';
    } else if (hindi.style.display === 'block') {
        hinglish.style.display = 'none';
        hindi.style.display = 'none';
        english.style.display = 'block';
    } else if (english.style.display === 'block') {
        hinglish.style.display = 'block';
        hindi.style.display = 'none';
        english.style.display = 'none';
    } else {
        console.log('Error in switching.');
    }
}

/*
  Behavior:
  - First click: swap static -> animated GIF and restart it
  - Second click: swap back to the static thumbnail
  - Works even if src becomes absolute URL
*/
document.querySelectorAll('.gif-on-click').forEach(img => {
    const previewSrc = img.getAttribute('src');         // original thumbnail
    const gifSrcBase = img.dataset.gif;                 // base gif path (no cache param)
    let playing = false;

    img.style.cursor = 'pointer';

    img.addEventListener('click', () => {
        if (!playing) {
            // Force reload of GIF to restart it (append timestamp)
            const gifSrc = gifSrcBase + (gifSrcBase.includes('?') ? '&' : '?') + 't=' + Date.now();
            img.src = gifSrc;
            img.setAttribute('data-playing', 'true');
            playing = true;
        } else {
            // swap back to preview
            img.src = previewSrc;
            img.removeAttribute('data-playing');
            playing = false;
        }
    });
    // Optional: if you want clicking anywhere else to stop playing, you can add handlers
});
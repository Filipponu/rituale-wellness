const escapeHtml = value => String(value || '').replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
async function loadLiveContent() {
  try {
    const [offers, articles] = await Promise.all([
      fetch('/api/public/offers').then(r => r.ok ? r.json() : Promise.reject()),
      fetch('/api/public/articles').then(r => r.ok ? r.json() : Promise.reject())
    ]);
    const offersBox = document.querySelector('#offers');
    if (offers.length && offersBox) offersBox.innerHTML = offers.map(item => `<article class="offer" data-category="${escapeHtml((item.categories || []).join(' ').toLowerCase())}"><span class="tag">${escapeHtml((item.categories || []).join(' · '))}</span><h3>${escapeHtml(item.brand)}</h3><p>${escapeHtml(item.description || item.detail)}</p><footer><span class="code">${escapeHtml(item.code)}</span><button class="copy live-copy" data-code="${escapeHtml(item.code)}" data-id="${item.id}" data-brand="${escapeHtml(item.brand)}">Copia</button></footer></article>`).join('');
    const journal = document.querySelector('.journal');
    if (articles.length && journal) journal.innerHTML = articles.slice(0, 4).map(item => `<article class="article"><img src="${escapeHtml(item.image_url || '/assets/articles/wellness-rituale-serale.png')}" alt="${escapeHtml(item.title)}"><div><span class="tag">${escapeHtml(item.category)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.excerpt || item.meta_description)}</p><a href="/article.html?id=${item.id}">Leggi l'articolo →</a></div></article>`).join('');
    document.querySelectorAll('.live-copy').forEach(button => button.addEventListener('click', async () => { try { await navigator.clipboard.writeText(button.dataset.code); await fetch('/api/track/click', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ offerId:Number(button.dataset.id), brand:button.dataset.brand }) }); } catch {} }));
  } catch (_) { /* La pagina conserva i contenuti dimostrativi se il database non e' ancora configurato. */ }
}
loadLiveContent();

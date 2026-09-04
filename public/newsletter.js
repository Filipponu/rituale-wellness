const newsletterStyle=document.createElement('style');
newsletterStyle.textContent=`#newsletter-form{display:flex;flex-wrap:wrap;gap:10px;max-width:520px;margin-top:22px}#newsletter-form input{flex:1;min-width:210px;border:1px solid #cdd9d2;background:#fff;color:#153b35;padding:15px 16px;font:16px Arial}#newsletter-form button{border:0;background:#c98b68;color:#fff;padding:15px 22px;font:700 15px Arial;cursor:pointer;white-space:nowrap}#newsletter-form button:hover{background:#e6a882}#newsletter-message{flex-basis:100%;color:#d9eee0;font:14px Arial}`;
document.head.append(newsletterStyle);
const block=document.querySelector('#newsletter .wrap');
if(block){
  const old=block.querySelector('.mail');
  if(old)old.outerHTML='<form id="newsletter-form"><input required type="email" placeholder="Inserisci la tua email" aria-label="La tua email"><button type="submit">Ricevi le offerte →</button><small id="newsletter-message"></small></form>';
  const form=document.querySelector('#newsletter-form');
  form?.addEventListener('submit',async e=>{e.preventDefault();const message=document.querySelector('#newsletter-message');try{const r=await fetch('/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:form.querySelector('input').value})});const d=await r.json();if(!r.ok)throw Error(d.error);message.textContent='Grazie, sei iscritta/o!';form.reset()}catch(x){message.textContent=x.message}})
}
const articleSlugs=['yoga-tappetino','pilates-accessori','activewear-comfort','wellness-serale'];
document.querySelectorAll('#journal a').forEach((link,index)=>{if(link.textContent.includes('Leggi presto')){link.href=`/article.html?slug=${articleSlugs[index]}`;link.textContent='Leggi l’articolo →'}});

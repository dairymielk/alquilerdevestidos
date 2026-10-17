/* Dark red / gold theme: remove black artifacts, stronger accents, visible animations */

/* Element refs */
const navBtns = document.querySelectorAll('.nav-btn');
const scrollBtns = document.querySelectorAll('[data-scroll]');
const panels = document.querySelectorAll('.panel');
const products = document.querySelectorAll('.product');
const productDetail = document.getElementById('productDetail');
const closeDetail = document.getElementById('closeDetail');
const detailImg = document.getElementById('detailImg');
const detailTitle = document.getElementById('detailTitle');
const detailDesc = document.getElementById('detailDesc');
const detailPrice = document.getElementById('detailPrice');
const detailStock =
document.getElementById('detailStock');
const buyNow = document.getElementById('buyNow');
const rentOverlay = document.getElementById('rentOverlay');
const closeRent = document.getElementById('closeRent');
const rentForm = document.getElementById('rentForm');
const rentStatus = document.getElementById('rentStatus');
let selectedProduct = '';
let selectedPrice = 0;
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const mailtoFallback = document.getElementById('mailtoFallback');
const switchOverlay = document.getElementById('sectionSwitchOverlay');
const globalGradient = document.getElementById('globalGradient');
const loginBtn =
document.getElementById('loginBtn');
 
const logoutBtn =
document.getElementById('logoutBtn');
 
const loginStatus =
document.getElementById('loginStatus');
 
let currentUser = null;

currentUser =
localStorage.getItem(
'currentUser'
);

if(currentUser){

    loginStatus.textContent =
    "Logged in as " + currentUser;

}

/* Ensure any canvas used is transparent (no black fill) */
function makeCanvasTransparent(canvas){
  if(!canvas) return;
  canvas.style.background = 'transparent';
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

/* Smooth animated section switch */
function animatedScrollTo(selector){
  const el = document.querySelector(selector);
  if(!el) return;
  switchOverlay.classList.add('show');
  switchOverlay.setAttribute('aria-hidden','false');
  setTimeout(() => {
    el.scrollIntoView({behavior:'smooth', block:'start'});
    setTimeout(() => {
      switchOverlay.classList.remove('show');
      switchOverlay.setAttribute('aria-hidden','true');
    }, 700);
  }, 120);
}
navBtns.forEach(b => b.addEventListener('click', () => {
  const target = b.dataset.target;
  if(target) animatedScrollTo(`#${target}`);
}));
scrollBtns.forEach(b => b.addEventListener('click', () => {
  const sel = b.dataset.scroll;
  if(sel) animatedScrollTo(sel);
}));

/* Section activation observer (triggers per-section anim overlays) */
const panelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const panel = entry.target;
    if(entry.isIntersecting){
      panel.classList.add('active');
      // stronger accent: set header border color when ember sections active
      const g = panel.dataset.gradient;
      if(g && g.includes('ember')) document.documentElement.style.setProperty('--header-accent', 'rgba(122,31,31,0.08)');
      else document.documentElement.style.setProperty('--header-accent', 'rgba(212,160,23,0.06)');
    } else {
      panel.classList.remove('active');
    }
  });
}, {threshold: 0.35});
panels.forEach(p => panelObserver.observe(p));

/* Reveal on scroll */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal, .reveal-card, .card').forEach(el => revealObserver.observe(el));

/* Product data */
const productData = {
  p1: {
    id: 'p1',
    title: 'Noir Fleur Gala Gown',
    price: '₱1,250',
    stock: 10,
    img: 'images/gown1.png',
    desc: 'A dramatic black evening gown that balances bold structure with delicate detail. The deep V-neck and sculpted bodice create a flattering, hourglass silhouette while the hand-sewn beadwork and embroidered floral motifs add luminous texture. A full tulle skirt scatters matching floral appliqués for movement and romance, making the gown ideal for galas, red-carpet events, and formal weddings.'
  },
  p2: {
    id: 'p2',
    title: 'Aurelia Teal Ball Gown',
    price: '₱1,500',
    stock: 10,
    img: 'images/gown2.png',
    desc: 'A luminous teal ball gown that blends romantic florals with regal structure. The corset-style bodice sculpts the waist while delicate pink and beige floral appliqués and beadwork add soft contrast. Off-the-shoulder draped sleeves introduce ethereal movement, and the layered tulle skirt blooms into a full silhouette accented with cascading golden floral embroidery for a couture finish. Ideal for proms, debutante balls, quinceañeras, and fairy-tale weddings.'
  },
  p3: {
    id: 'p3',
    title: 'Rosé Aureate Ball Gown',
    price: '₱1,500',
    stock: 10,
    img: 'images/gown3.png',
    desc: 'A show‑stopping pink ball gown that reads like a modern fairytale. The sculpted corset bodice is richly embellished with hand‑appliquéd pink florals and delicate gold embroidery, while sheer off‑the‑shoulder tulle sleeves soften the shoulders and add ethereal movement. Layers of voluminous tulle form the skirt, where gilded floral motifs rise from the hem and catch the light with every step. Designed for milestone moments, this gown blends couture craftsmanship with romantic drama.'
  },
  p4: {
    id: 'p4',
    title: 'Lavender Lumen Gown',
    price: '₱1,800',
    stock: 10,
    img: 'images/gown5.png',
    desc: 'A timeless champagne evening gown that marries understated luxury with couture detail. The sweetheart neckline and slender straps frame the shoulders while a fitted, lace‑embellished bodice sculpts the waist. Layers of sheer tulle fall into a soft, flowing skirt with a gentle train, and delicate beadwork and lace motifs add subtle shimmer and texture. Designed for refined occasions, this gown reads elegant in person and photographs beautifully under soft lighting.'
  },
  p5: {
    id: 'p5',
    title: 'Champagne Reverie Gown',
    price: '₱1,500',
    stock: 10,
    img: 'images/gown3.png',
    desc: 'A show‑stopping pink ball gown that reads like a modern fairytale. The sculpted corset bodice is richly embellished with hand‑appliquéd pink florals and delicate gold embroidery, while sheer off‑the‑shoulder tulle sleeves soften the shoulders and add ethereal movement. Layers of voluminous tulle form the skirt, where gilded floral motifs rise from the hem and catch the light with every step. Designed for milestone moments, this gown blends couture craftsmanship with romantic drama.'
  },
  p6: {
    id: 'p6',
    title: 'Lace Reverie Mini Gown',
    price: '₱1,200',
    stock: 10,
    img: 'images/gown6.png',
    desc: 'A modern, romantic short lace dress that blends structured tailoring with delicate detailing. The strapless sweetheart bodice features visible boning for a sculpted fit, while layered lace and floral embroidery cascade across a flared skirt for playful movement. Lightweight tulle underlayers add volume without weight, making this piece ideal for rehearsal dinners, civil ceremonies, cocktail receptions, and styled photoshoots.'
  }
};

/* Open product detail overlay */
function openProductDetail(id){
  const p = productData[id];

  selectedProduct = p.title;

selectedPrice =
Number(
    p.price.replace(/[₱,]/g,'')
);

  if(!p) return;
  detailImg.src = p.img;
  detailImg.alt = p.title;
  detailTitle.textContent = p.title;
  detailDesc.textContent = p.desc;
  detailPrice.textContent = p.price;
  const currentStock =
localStorage.getItem(id + "_stock");

if(currentStock === null){

    localStorage.setItem(
        id + "_stock",
        p.stock
    );

}

detailStock.textContent =
"Available: " +
localStorage.getItem(id + "_stock") +
" dress(es)";
  productDetail.setAttribute('aria-hidden','false');
  productDetail.querySelector('.overlay-close').focus();
  // particle burst (gold)
  const prodEl = document.querySelector(`.product[data-id="${id}"] img`);
  if(prodEl){
    const rect = prodEl.getBoundingClientRect();
    particleBurst(rect.left + rect.width/2, rect.top + rect.height/2, '212,160,23');
  }
}
products.forEach(prod => {
  prod.addEventListener('click', () => openProductDetail(prod.dataset.id));
  prod.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') openProductDetail(prod.dataset.id); });
});
closeDetail.addEventListener('click', () => productDetail.setAttribute('aria-hidden','true'));

/* Particle burst helper (temporary canvas) */
function particleBurst(x,y, color='212,160,23'){
  const c = document.createElement('canvas');
  c.style.position = 'fixed';
  c.style.left = '0';
  c.style.top = '0';
  c.style.pointerEvents = 'none';
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  c.style.background = 'transparent';
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  ctx.clearRect(0,0,c.width,c.height);
  const particles = [];
  for(let i=0;i<26;i++){
    particles.push({
      x, y,
      vx: (Math.random()-0.5)*10,
      vy: (Math.random()-0.9)*10,
      r: 1 + Math.random()*4,
      a: 1
    });
  }
  let t = 0;
  function frame(){
    ctx.clearRect(0,0,c.width,c.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.a -= 0.02;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${color},${Math.max(p.a,0)})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    });
    t++;
    if(t < 80) requestAnimationFrame(frame); else c.remove();
  }
  frame();
}

/* Typing glow + burst on focus */
document.querySelectorAll('.field input, .field textarea').forEach(inp => {
  inp.addEventListener('focus', (e) => {
    const rect = e.target.getBoundingClientRect();
    particleBurst(rect.left + rect.width/2, rect.top + rect.height/2, '212,160,23');
  });
});

/* Products particles animation (transparent canvas) */
(function productsParticles(){
  const canvas = document.getElementById('productsParticles');
  if(!canvas) return;
  makeCanvasTransparent(canvas);
  const ctx = canvas.getContext('2d');
  function resize(){ const rect = canvas.parentElement.getBoundingClientRect(); canvas.width = rect.width; canvas.height = rect.height; }
  resize(); window.addEventListener('resize', resize);
  const dots = [];
  for(let i=0;i<40;i++){
    dots.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:1+Math.random()*2.5, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3, a:0.06+Math.random()*0.12});
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if(d.x < -20) d.x = canvas.width + 20;
      if(d.x > canvas.width + 20) d.x = -20;
      if(d.y < -20) d.y = canvas.height + 20;
      if(d.y > canvas.height + 20) d.y = -20;
      ctx.beginPath();
      ctx.fillStyle = `rgba(212,160,23,${d.a})`;
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* Ripple effect for buttons */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.ripple');
  if(!btn) return;
  const rect = btn.getBoundingClientRect();
  const ink = document.createElement('span');
  ink.className = 'ripple-ink';
  const size = Math.max(rect.width, rect.height) * 1.2;
  ink.style.width = ink.style.height = `${size}px`;
  ink.style.left = `${e.clientX - rect.left - size/2}px`;
  ink.style.top = `${e.clientY - rect.top - size/2}px`;
  btn.appendChild(ink);
  setTimeout(()=> ink.remove(), 700);
});

/* Contact form: mailto fallback (EmailJS optional) */
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.textContent = '';
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name || !email || !subject || !message){
    formStatus.textContent = 'Please fill all fields.';
    return;
  }
  if(window.emailjs && typeof emailjs.send === 'function'){
    formStatus.textContent = 'Sending…';
    emailjs.send('service_xxx','template_xxx',{from_name:name, from_email:email, subject, message})
      .then(()=> { formStatus.textContent = 'Message sent — thank you!'; contactForm.reset(); })
      .catch(()=> { formStatus.textContent = 'Send failed — opening mail app.'; openMailto(); });
  } else {
    openMailto();
  }
  function openMailto(){
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:replace@yourdomain.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  }
});
mailtoFallback.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim() || 'Message from website';
  const message = document.getElementById('message').value.trim();
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:replace@yourdomain.com?subject=${encodeURIComponent(subject)}&body=${body}`;
});

/* Close overlay with Escape */
document.addEventListener('keydown', (e) => {

    if(e.key === 'Escape'){

        productDetail.setAttribute(
            'aria-hidden',
            'true'
        );

        rentOverlay.setAttribute(
            'aria-hidden',
            'true'
        );

    }

});

productDetail.addEventListener('click', (e) => {

    if(e.target === productDetail){

        productDetail.setAttribute(
            'aria-hidden',
            'true'
        );

    }

});

buyNow.addEventListener('click', () => {
 
productDetail.setAttribute('aria-hidden', 'true');
rentOverlay.setAttribute('aria-hidden', 'false');
updateTotal();
 
});
 
closeRent.addEventListener('click', () => {
 
rentOverlay.setAttribute('aria-hidden', 'true');
 
});
 
rentForm.addEventListener('submit', (e) => {

    e.preventDefault();

    if(!currentUser){

    alert(
        'Please login before renting.'
    );

    return;

}

    const qty =
    Number(document.getElementById('rentQty').value);

    const productId =
Object.keys(productData)
.find(key =>
productData[key].title === selectedProduct
);

const currentStock =
Number(
localStorage.getItem(
productId + "_stock"
)
);

if(qty > currentStock){

    alert(
        "Only " +
        currentStock +
        " dress(es) available."
    );

    return;
}

    const name =
    document.getElementById('customerName').value;

    const address =
    document.getElementById('customerAddress').value;

    const number =
    document.getElementById('customerNumber').value;

    const payment =
    document.getElementById('paymentMethod').value;

    const account =
    document.getElementById('accountNumber').value;

    const total =
    qty * selectedPrice;

    let stock =
Number(
localStorage.getItem(
productId + "_stock"
)
);

stock -= qty;

localStorage.setItem(
productId + "_stock",
stock
);

    rentStatus.innerHTML = `
        ✅ Rental Confirmed!<br><br>

        Product: ${selectedProduct}<br>
        Quantity: ${qty}<br>
        Total Amount: ₱${total.toLocaleString()}<br>
        Name: ${name}<br>
        Address: ${address}<br>
        Contact Number: ${number}<br>
        Payment Method: ${payment}<br>
        ${account ? 'Account Number: ' + account + '<br>' : ''}
    `;

    const rental = {

    product: selectedProduct,
    quantity: qty,
    total: total,
    customer: name,
    payment: payment,
    date: new Date().toLocaleString()

};

let history =

JSON.parse(
localStorage.getItem(
currentUser + "_history"
)
) || [];

history.push(rental);

localStorage.setItem(
currentUser + "_history",
JSON.stringify(history)
);

displayHistory();

});
const qtyInput =
document.getElementById('rentQty');

const totalAmount =
document.getElementById('totalAmount');

function updateTotal(){

    const qty =
    Number(qtyInput.value) || 0;

    const total =
    qty * selectedPrice;

    totalAmount.value =
    '₱' + total.toLocaleString();

}

qtyInput.addEventListener(
    'input',
    updateTotal
);

const paymentMethod =
document.getElementById('paymentMethod');

const accountField =
document.getElementById('accountField');

paymentMethod.addEventListener(
'change',
() => {

    if(
        paymentMethod.value === 'GCash' ||
        paymentMethod.value === 'Maya' ||
        paymentMethod.value === 'Bank Transfer'
    ){

        accountField.style.display =
        'block';

    }else{

        accountField.style.display =
        'none';

    }

});

function displayHistory(){

    const container =
    document.getElementById(
    'historyContainer'
    );

    if(!container) return;

    const history =

    JSON.parse(
    localStorage.getItem(
    'rentHistory'
    )
    ) || [];

    if(history.length === 0){

        container.innerHTML =
        'No rentals yet.';

        return;
    }

    container.innerHTML = '';

    history.forEach(item => {

        container.innerHTML += `

        <div class="card">

            <h3>${item.product}</h3>

            <p>
                Quantity:
                ${item.quantity}
            </p>

            <p>
                Total:
                ₱${item.total}
            </p>

            <p>
                Customer:
                ${item.customer}
            </p>

            <p>
                Payment:
                ${item.payment}
            </p>

            <p>
                Date:
                ${item.date}
            </p>

        </div>

        `;

    });

}

displayHistory();

loginBtn.addEventListener('click', () => {

    const username =
    document.getElementById('username').value.trim();

    const password =
    document.getElementById('password').value.trim();

    if(!username || !password){

        alert(
            'Please enter username and password.'
        );

        return;
    }

    currentUser = username;

    localStorage.setItem(
        'currentUser',
        username
    );

    loginStatus.textContent =
    'Logged in as ' + username;

});

const resetData =
document.getElementById('resetData');

resetData.addEventListener('click', () => {

    localStorage.clear();

    alert('All saved data has been reset.');

    location.reload();

});

/* Respect reduced motion */
if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.body.classList.add('reduced-motion');
}

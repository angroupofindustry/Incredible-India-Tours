// Home & Premium pages logic
(function(){
  const user = storage.read().user;
  if(location.pathname.endsWith('home.html') || location.pathname.endsWith('premium.html')){
    if(!user){ toast('Please login first'); go('index.html'); return; }
  }

  const STATE_OPTIONS = STATES.map(s=>`<option value="${s}">${s}</option>`).join('');

  function renderList(scope='all'){
    const grid = byId('tourGrid'); if(!grid) return;
    // populate filters
    const sf = byId('stateFilter'); if(sf) sf.innerHTML = STATE_OPTIONS;
    if(sf) sf.value = 'All';

    const daysFilter = byId('daysFilter');
    const search = byId('q');

    const draw = ()=>{
      const q = (search?.value||'').toLowerCase();
      const st = sf ? sf.value : 'All';
      const minDays = daysFilter && daysFilter.value!=='All' ? parseInt(daysFilter.value,10) : 0;
      const list = TOURS.filter(t=>
        (scope==='premium' ? t.premium === true : true) &&
        (st==='All' || t.state===st) &&
        (t.days >= minDays) &&
        (!q || (t.title+" "+t.city+" "+t.state).toLowerCase().includes(q))
      );
      grid.innerHTML = list.map(cardHTML).join('') || `<p class="muted">No tours match your filters.</p>`;
      list.forEach(t=> on(`#book-${t.id}`,'click', ()=> openPayment(t)) );
    };

    if(search) search.addEventListener('input', debounce(draw, 150));
    if(sf) sf.addEventListener('change', draw);
    if(daysFilter) daysFilter.addEventListener('change', draw);
    on('#clearFilters','click', ()=>{ if(search) search.value=''; if(sf) sf.value='All'; if(daysFilter) daysFilter.value='All'; draw(); });

    draw();
  }

  function cardHTML(t){
    return `<article class="card" role="listitem" aria-label="${t.title}">
      <div class="img" style="background-image:url('${t.img}')"></div>
      <div class="content">
        <div class="title">${t.title}</div>
        <div class="meta">${t.city}, ${t.state} • ${t.days} days</div>
        <div class="row">
          <strong>${inr(t.price)}</strong>
          <button class="btn" id="book-${t.id}">Book Now</button>
        </div>
      </div>
    </article>`
  }

  // ---------- Payment / Booking (fake gateway) ----------
  const payModal = byId('payModal') || createModal();
  const paySummary = byId('paySummary');
  let pending = null;

  function openPayment(tour){
    const phone = prompt('Enter mobile number for updates (10 digits):')||'';
    pending = {
      id: 'BK'+Date.now().toString().slice(-8),
      user: storage.read().user,
      phone,
      tourId: tour.id,
      destination: tour.title,
      city: tour.city,
      state: tour.state,
      days: tour.days,
      amount: tour.price,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    paySummary.innerHTML = `<strong>${tour.title}</strong><br>${tour.city}, ${tour.state} • ${tour.days} days • Amount: ${inr(tour.price)}<br><span class='muted'>Booking ID: ${pending.id}</span>`;
    payModal.classList.add('show');
  }

  on('#closePay','click', ()=> payModal.classList.remove('show'));
  on('#cancelPay','click', ()=> payModal.classList.remove('show'));
  on('#confirmPay','click', ()=>{
    if(!pending) return;
    const b = { ...pending, status:'PAID' };
    const all = storage.read().bookings || [];
    all.unshift(b);
    storage.patch({ bookings: all });
    pending = null;
    payModal.classList.remove('show');
    toast('Payment Successful! Booking Confirmed.');
  });

  function createModal(){
    // Create shared modal if page doesn't have one (premium page)
    const modal = document.createElement('div');
    modal.className = 'modal'; modal.id='payModal'; modal.innerHTML = `
      <div class="window">
        <header class="row between center"><strong>Complete Payment</strong><button class="btn ghost" id="closePay">Close</button></header>
        <div id="paySummary" class="muted" style="margin:6px 0 14px"></div>
        <div class="form-grid">
          <label><span>Cardholder Name</span><input id="cardName" placeholder="e.g. A. Sharma" /></label>
          <label><span>Card Number</span><input id="cardNum" inputmode="numeric" placeholder="1111 2222 3333 4444" /></label>
          <div class="row gap">
            <label class="w-50"><span>Expiry</span><input id="cardExp" placeholder="MM/YY" /></label>
            <label class="w-50"><span>CVV</span><input id="cardCvv" placeholder="***" /></label>
          </div>
        </div>
        <p class="muted small">Demo only — clicking <b>Pay Now</b> will mark the booking as <span class="pill">PAID</span>.</p>
        <div class="row end gap">
          <button class="btn ghost" id="cancelPay">Cancel</button>
          <button class="btn" id="confirmPay">Pay Now</button>
        </div>`;
    document.body.appendChild(modal);
    // attach buttons
    on('#closePay','click', ()=> modal.classList.remove('show'));
    on('#cancelPay','click', ()=> modal.classList.remove('show'));
    return modal;
  }

  // Init on DOM ready
  window.addEventListener('DOMContentLoaded', ()=>{
    const scope = window.IIT_SCOPE==='premium' ? 'premium' : 'all';
    renderList(scope);
  });
})();

(function(){
  const admin = storage.read().admin;
  if(location.pathname.endsWith('admin-dashboard.html')){
    if(!admin){ toast('Admin login required'); go('admin.html'); return; }
  }

  function rows(){ return storage.read().bookings || [] }

  function draw(){
    const tbody = byId('bkTbody'); if(!tbody) return;
    const q = (byId('bkSearch')?.value||'').toLowerCase();
    const st = byId('bkState')?.value || 'All';
    const status = byId('bkStatus')?.value || 'All';

    const list = rows().filter(r=>
      (!q || [r.id, r.user?.name, r.user?.email, r.destination, r.city, r.state].join(' ').toLowerCase().includes(q)) &&
      (st==='All' || r.state===st) &&
      (status==='All' || r.status===status)
    );

    tbody.innerHTML = list.map(r=>`
      <tr>
        <td><code>${r.id}</code></td>
        <td>${esc(r.user?.name)}</td>
        <td>${esc(r.user?.email)}</td>
        <td>${esc(r.phone||'')}</td>
        <td>${esc(r.destination)}<br><small class="muted">${r.city}, ${r.state}</small></td>
        <td>${r.days}</td>
        <td>${inr(r.amount)}</td>
        <td>${r.status==='PAID'?'<span class="pill">PAID</span>':'<span class="pill" style="color:#ffd6a2;border-color:#5a4420;background:rgba(245,158,11,.08)">PENDING</span>'}</td>
        <td>${new Date(r.createdAt).toLocaleString('en-IN')}</td>
        <td class="row gap">
          <button class="btn secondary" data-act="paid" data-id="${r.id}">Mark Paid</button>
          <button class="btn ghost" data-act="copy" data-id="${r.id}">Copy</button>
          <button class="btn danger" data-act="del" data-id="${r.id}">Delete</button>
        </td>
      </tr>
    `).join('') || `<tr><td colspan="10" class="muted">No bookings yet.</td></tr>`;
  }

  function esc(s){ return String(s||'').replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m])) }

  // Events
  window.addEventListener('DOMContentLoaded', ()=>{
    const stSel = byId('bkState'); if(stSel){ stSel.innerHTML = STATES.map(s=>`<option>${s}</option>`).join(''); stSel.value='All'; }
    on('#bkSearch','input', debounce(draw, 120));
    on('#bkState','change', draw);
    on('#bkStatus','change', draw);
    on('#exportCsv','click', ()=> exportCSV(rows()));
    on('#seedBtn','click', ()=>{ seed(); draw(); });

    const tbody = byId('bkTbody');
    tbody?.addEventListener('click', (e)=>{
      const btn = e.target.closest('button[data-act]');
      if(!btn) return;
      const id = btn.getAttribute('data-id');
      const act = btn.getAttribute('data-act');
      const all = rows();
      const i = all.findIndex(b=>b.id===id);
      if(i<0) return;
      if(act==='paid'){ all[i].status='PAID'; storage.patch({bookings:all}); toast('Marked as PAID'); draw(); }
      if(act==='del'){ if(confirm('Delete this booking?')){ storage.patch({bookings: all.filter(b=>b.id!==id)}); toast('Deleted'); draw(); } }
      if(act==='copy'){
        const b = all[i];
        const text = `Booking ${b.id}\nName: ${b.user?.name}\nEmail: ${b.user?.email}\nPhone: ${b.phone}\nDestination: ${b.destination} (${b.city}, ${b.state})\nDays: ${b.days}\nAmount: ${b.amount}\nStatus: ${b.status}\nCreated: ${new Date(b.createdAt).toLocaleString('en-IN')}`;
        navigator.clipboard.writeText(text).then(()=>toast('Copied booking to clipboard'))
      }
    });

    draw();
  });

  function seed(){
    const now = Date.now();
    const picks = TOURS.slice(0,8);
    const seed = picks.map((t,i)=>({
      id:'BK'+(now-i).toString().slice(-8), user:{name:'Guest '+(i+1), email:`guest${i+1}@mail.com`}, phone:'98xxxxxx0'+i,
      tourId:t.id,destination:t.title,city:t.city,state:t.state,days:t.days,amount:t.price,status: i%2? 'PENDING':'PAID', createdAt:new Date(now-(i*86400000)).toISOString()
    }));
    const all = seed.concat(rows());
    storage.patch({ bookings: all });
  }
})();

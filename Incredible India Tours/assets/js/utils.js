// ---------- DOM helpers ----------
const byId = (id) => document.getElementById(id);
const qs = (sel, root=document) => root.querySelector(sel);
const qsa = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const on = (sel, ev, fn) => qs(sel)?.addEventListener(ev, fn);
const val = (id) => byId(id)?.value?.trim() || '';
const go  = (path) => { window.location.href = path };

// ---------- Storage ----------
const storage = {
  key: 'iitours-pro-v1',
  read(){ try { return JSON.parse(localStorage.getItem(this.key)) || {} } catch { return {} } },
  write(obj){ localStorage.setItem(this.key, JSON.stringify(obj)) },
  patch(p){ this.write({ ...this.read(), ...p }) }
};

// ---------- Utils ----------
const inr = (n) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n||0);
const csvEscape = (v='') => '"' + String(v).replaceAll('"','""') + '"';
const debounce = (fn, ms=200)=>{ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms) } };

// ---------- Toast ----------
(function(){
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;right:16px;bottom:16px;display:grid;gap:8px;z-index:100';
  document.addEventListener('DOMContentLoaded',()=>document.body.appendChild(host));
  window.toast = (msg)=>{
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.cssText = 'background:#0b1a2e;color:#e6f2ff;border:1px solid #1c2a44;padding:10px 12px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.35)';
    host.appendChild(el);
    setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .4s'; setTimeout(()=>el.remove(),400) }, 2200);
  }
})();

// ---------- Auth controls (logout everywhere) ----------
window.addEventListener('DOMContentLoaded',()=>{
  const y = byId('yr'); if(y) y.textContent = new Date().getFullYear();
  on('#btnLogout','click', ()=>{ storage.patch({ user:null, admin:null }); go('index.html'); });
});

// ---------- CSV Export ----------
function exportCSV(rows){
  const headers = ['BookingID','Name','Email','Phone','Destination','City','State','Days','Amount','Status','CreatedAt'];
  const csv = [headers.join(',')].concat(rows.map(b=>[
    b.id, csvEscape(b.user?.name), csvEscape(b.user?.email), csvEscape(b.phone), csvEscape(b.destination), csvEscape(b.city), csvEscape(b.state), b.days, b.amount, b.status, b.createdAt
  ].join(','))).join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'bookings.csv'; a.click(); URL.revokeObjectURL(url);
}

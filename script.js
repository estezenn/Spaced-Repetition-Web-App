const INTERVALS = [1, 3, 7, 16, 35, 70];
const DAYS_TR = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const MONTHS_TR = ['January','February','March','April','May','June','July','August','September','October','November','December'];

let lessons = [];
let doneSet = new Set();

function today() {
  return new Date().toISOString().split('T')[0];
}

function addDays(d,n){
  const dt = new Date(d);
  dt.setDate(dt.getDate()+n);
  return dt.toISOString().split('T')[0];
}

/* ---------------- NAV ---------------- */

function setNav(el,page){
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  el.classList.add('active');

  document.getElementById('view-bugün').classList.toggle('hidden',page!=='bugün');
  document.getElementById('view-takvim').classList.toggle('hidden',page!=='takvim');
  document.getElementById('view-dersler').classList.toggle('hidden',page!=='dersler');
}

/* ---------------- MODAL ---------------- */

function showModal(){
  document.getElementById('modal-area').innerHTML = `
    <div class="modal-backdrop">
      <div class="modal">
        <input id="m-name" placeholder="Lesson name">
        <input id="m-date" type="date" value="${today()}">
        <button onclick="saveLesson()">Save</button>
      </div>
    </div>
  `;
}

function saveLesson(){
  const name = document.getElementById('m-name').value;
  const date = document.getElementById('m-date').value;

  lessons.push({
    id: Date.now(),
    name,
    date,
    overrides: {}
  });

  document.getElementById('modal-area').innerHTML = '';
}

/* ---------------- RESET FIX (KRİTİK) ---------------- */
function loadLS(){
  const l = localStorage.getItem('tekrar_lessons');
  const d = localStorage.getItem('tekrar_done');

  if(l) lessons = JSON.parse(l);
  if(d) doneSet = new Set(JSON.parse(d));
}

function saveLS(){
  localStorage.setItem('tekrar_lessons',JSON.stringify(lessons));
  localStorage.setItem('tekrar_done',JSON.stringify([...doneSet]));
}

/* ---------------- START ---------------- */
loadLS();
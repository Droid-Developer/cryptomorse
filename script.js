const i18n = {
en:{set:"Settings",text:"Text",morse:"Morse",lang:"Language",clear:"Clear",restore:"Restore",copy:"Copy"},
ru:{set:"Настройки",text:"Текст",morse:"Морзе",lang:"Язык",clear:"Сброс",restore:"Вернуть",copy:"Копировать"}
};

const dict = {
A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",
I:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",
Q:"--.-",R:".-.",S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",
Y:"-.--",Z:"--..",
1:".----",2:"..---",3:"...--",4:"....-",5:".....",
6:"-....",7:"--...",8:"---..",9:"----.",0:"-----",
А:".-",Б:"-...",В:".--",Г:"--.",Д:"-..",Е:".",Ё:".",
Ж:"...-",З:"--..",И:"..",Й:".---",К:"-.-",Л:".-..",
М:"--",Н:"-.",О:"---",П:".--.",Р:".-.",С:"...",Т:"-",
У:"..-",Ф:"..-.",Х:"....",Ц:"-.-.",Ч:"---.",Ш:"----",
Щ:"--.-",Ъ:"--.--",Ы:"-.--",Ь:"-..-",Э:"..-..",
Ю:"..--",Я:".-.-"," ":"/"
};

const rev = Object.fromEntries(Object.entries(dict).map(([k,v])=>[v,k]));

const t=document.getElementById('txt');
const m=document.getElementById('mrs');

t.oninput=()=>m.value=t.value.toUpperCase().split('').map(c=>dict[c]||'').join(' ');
m.oninput=()=>t.value=m.value.split(' ').map(c=>rev[c]||'').join('');

function copyText(id,btn){
navigator.clipboard.writeText(document.getElementById(id).value);

const lang=document.getElementById('langSelect').value;
btn.innerText = lang==="ru" ? "Скопировано" : "Copied";

setTimeout(()=>{
btn.innerText = i18n[lang].copy;
},1000);
}

function toggleSettings(){
document.getElementById('settingsPanel').classList.toggle('show');
}

function toggleTheme(){
document.body.dataset.theme =
document.body.dataset.theme==='light'?'dark':'light';
}

function clearText(){
localStorage.setItem('backup',t.value);
t.value=""; m.value="";
}

function restoreText(){
const b=localStorage.getItem('backup');
if(b){t.value=b; t.oninput();}
}

function updateLang(){
const l=document.getElementById('langSelect').value;
const r=i18n[l];

document.getElementById('btn-set-main').innerText=r.set;
document.getElementById('l-text').innerText=r.text;
document.getElementById('l-morse').innerText=r.morse;
document.getElementById('l-lang').innerText=r.lang;
document.getElementById('btn-clear').innerText=r.clear;
document.getElementById('btn-restore').innerText=r.restore;

document.querySelectorAll('.copy-btn').forEach(b=>{
b.innerText=r.copy;
});

localStorage.setItem('lang',l);
}

window.onload=()=>{
const saved=localStorage.getItem('morse_save');
const lang=localStorage.getItem('lang')||'ru';

if(saved){t.value=saved; t.oninput();}

document.getElementById('langSelect').value=lang;
updateLang();
};
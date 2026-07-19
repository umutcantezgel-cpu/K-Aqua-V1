/* K Aqua Kontakt Suite — globale, wiederverwendbare Lead-Komponenten.
   Einbindung: <div data-kaqua-kontakt data-variant="block|band|hero|inline|row|sidebar|tile|sticky|fab" data-page="rohr" data-tone="primary|glass|inverse"></div>
   <script src="kaqua-kontakt.js"></script>
   API: KAquaKontakt.mount(el) . setPage(el,key) . openModal(key) . closeModal() */
(function(){
var CONTENT={
rohr:{kicker:"Rohrleitungen",head:"Dimensionierung und Lieferzeit fuer Ihr Leitungsprojekt.",short:"Fragen zu Rohrleitungen fuer Ihr Projekt",text:"Nennen Sie uns Druckstufe, Medium und Trassenlaenge grob per Telefon. Unsere Ingenieure pruefen Dimensionierung und Verfuegbarkeit ab Werk und nennen Ihnen einen belastbaren Liefertermin.",interest:"Rohrsysteme",done:"Ein Ingenieur aus dem Leitungsbau meldet sich innerhalb eines Arbeitstages."},
netz:{kicker:"Null Leckage Netze",head:"Jedes verlorene Prozent Trinkwasser kostet Ihr Netz bares Geld.",short:"Verlustrechnung fuer Ihr Trinkwassernetz",text:"Schildern Sie uns kurz Netzgroesse und Klimazone. Wir rechnen Ihnen vor, wie viel Wasser und Budget ein K Aqua Feld gegenueber dem Bestand sichert, inklusive Betriebsjahren.",interest:"Trinkwassernetze",done:"Ein Netzplaner meldet sich innerhalb eines Arbeitstages mit einer ersten Verlustrechnung."},
bim:{kicker:"BIM Scanner",head:"Ihre Planung verdient pruffaehige BIM Daten ab Tag eins.",short:"Revit und IFC Daten fuer Ihre Planung",text:"Hinterlassen Sie Kontakt und Projektphase. Sie erhalten Zugang zu unseren Revit und IFC Bibliotheken sowie einen Ansprechpartner fuer die Modellpruefung Ihres Projekts.",interest:"BIM Daten",done:"Unser BIM Team meldet sich innerhalb eines Arbeitstages mit Ihren Bibliothekszugaengen."},
fallback:{kicker:"Kontakt",head:"Sprechen Sie direkt mit unseren Ingenieuren.",short:"Direkter Draht zu unseren Ingenieuren",text:"Telefonnummer, Email, ein Klick auf Ihr Thema. Mehr braucht es nicht, den Rest klaeren wir im Gespraech.",interest:"Beratung",done:"Ein Fachberater meldet sich innerhalb eines Arbeitstages bei Ihnen."}};
var INTERESTS=["Rohrsysteme","Trinkwassernetze","BIM Daten","Ersatzteile","Beratung"];
var PHONE="+49 6085 999 99 99";
var CSS=""
+".kqk{position:relative;border:1px solid var(--card-border);border-radius:var(--radius-lg);background:linear-gradient(180deg,var(--card-tint),var(--card));box-shadow:var(--shadow-lift);padding:clamp(24px,3.5vw,44px);overflow:hidden;font-family:var(--font-body);color:var(--foreground)}"
+".kqk::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(700px 300px at 85% -20%,oklch(0.55 0.1 302 / .16),transparent 65%)}"
+".kqk>*{position:relative}"
+".kqk-k{font:700 11px var(--font-heading);letter-spacing:.16em;text-transform:uppercase;color:var(--accent);margin-bottom:10px}"
+".kqk-h{font:600 clamp(20px,2.4vw,28px)/1.2 var(--font-heading);letter-spacing:-.01em}"
+".kqk-t{color:var(--muted-foreground);font-size:14.5px;margin-top:10px;text-wrap:pretty}"
+".kqk-ctx{transition:opacity 250ms var(--ease),transform 250ms var(--ease)}.kqk-ctx.fade{opacity:0;transform:translateY(8px)}"
+".kqk-promise{display:flex;align-items:center;gap:9px;font:600 12px var(--font-body);color:var(--faint-foreground);margin-top:18px}"
+".kqk-promise i{width:8px;height:8px;border-radius:50%;background:var(--accent);flex:none;animation:kqk-pulse 2.4s var(--ease) infinite}"
+"@keyframes kqk-pulse{0%,100%{box-shadow:0 0 0 0 oklch(0.77 0.11 215 / .5)}50%{box-shadow:0 0 0 7px oklch(0.77 0.11 215 / 0)}}"
+".kqk-right{display:grid;min-width:0}.kqk-right>*{grid-area:1/1}"
+".kqk-form{display:grid;gap:16px;transition:opacity 350ms var(--ease),transform 350ms var(--ease)}"
+".kqk.success .kqk-form{opacity:0;transform:translateY(-12px) scale(.985);pointer-events:none}"
+".kqk-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}"
+".kqk-fld label{display:block;font:600 11.5px var(--font-body);color:var(--muted-foreground);margin-bottom:6px}"
+".kqk-in{display:flex;align-items:center;border:1px solid var(--card-border);border-radius:11px;background:var(--background);transition:border-color 150ms var(--ease),box-shadow 250ms var(--ease)}"
+".kqk-in:focus-within{border-color:var(--ring);box-shadow:0 0 0 3px oklch(0.62 0.16 303 / .18)}"
+".kqk-in select{border:0;background:transparent;color:var(--muted-foreground);font:600 13.5px var(--font-body);padding:11px 2px 11px 12px;outline:none;cursor:pointer}"
+".kqk-in input{flex:1;min-width:0;border:0;background:transparent;color:inherit;font:500 14.5px var(--font-body);padding:11px 12px;outline:none}"
+".kqk-in input::placeholder{color:var(--faint-foreground)}"
+".kqk-fld.err .kqk-in{border-color:oklch(0.62 0.19 25);animation:kqk-shake 350ms var(--ease)}"
+"@keyframes kqk-shake{20%{transform:translateX(-5px)}45%{transform:translateX(4px)}70%{transform:translateX(-2px)}}"
+".kqk-fld .emsg{display:none;font:600 11px var(--font-body);color:oklch(0.68 0.17 25);margin-top:5px}.kqk-fld.err .emsg{display:block}"
+".kqk-chips{display:flex;flex-wrap:wrap;gap:7px}"
+".kqk-chip{border:1px solid var(--card-border);background:var(--background);color:var(--muted-foreground);font:600 12.5px var(--font-body);padding:8px 13px;border-radius:var(--radius-full);cursor:pointer;transition:border-color 150ms var(--ease),background 150ms var(--ease),color 150ms var(--ease),transform 150ms var(--ease)}"
+".kqk-chip:hover{border-color:var(--ring);color:var(--foreground);transform:translateY(-1px)}"
+".kqk-chip[aria-pressed=true]{background:var(--primary-soft);border-color:var(--primary);color:var(--foreground);animation:kqk-pop 250ms var(--ease-out)}"
+"@keyframes kqk-pop{40%{transform:scale(1.07)}}"
+".kqk-actions{display:flex;align-items:center;gap:14px;flex-wrap:wrap}"
+".kqk-send{position:relative;border:0;border-radius:var(--radius-full);background:var(--primary);color:var(--primary-foreground);font:700 14.5px var(--font-heading);padding:13px 30px;cursor:pointer;transition:background 150ms var(--ease),transform 150ms var(--ease),box-shadow 250ms var(--ease);white-space:nowrap}"
+".kqk-send:hover{background:var(--primary-hover);transform:translateY(-1px);box-shadow:0 8px 24px -8px oklch(0.51 0.18 302 / .55)}"
+".kqk-send:active{transform:translateY(0) scale(.98)}.kqk-send:disabled{cursor:default;transform:none}"
+".kqk-send .sp{display:none;position:absolute;left:50%;top:50%;width:17px;height:17px;margin:-8.5px 0 0 -8.5px;border:2.5px solid oklch(1 0 0 / .35);border-top-color:var(--primary-foreground);border-radius:50%;animation:kqk-spin .7s linear infinite}"
+"@keyframes kqk-spin{to{transform:rotate(360deg)}}.kqk-send.loading .tx{visibility:hidden}.kqk-send.loading .sp{display:block}"
+".kqk-legal{font:500 11px var(--font-body);color:var(--faint-foreground)}.kqk-legal a{color:var(--muted-foreground)}"
+".kqk a{color:var(--accent)}.kqk a:hover{color:var(--accent-strong)}"
+".kqk-done{opacity:0;transform:translateY(16px);pointer-events:none;display:grid;gap:6px;align-content:center;transition:opacity 450ms 200ms var(--ease-out),transform 450ms 200ms var(--ease-out)}"
+".kqk.success .kqk-done{opacity:1;transform:none;pointer-events:auto}"
+".kqk-done .ring{width:52px;height:52px;border-radius:50%;background:var(--primary-soft);border:1px solid var(--primary);display:grid;place-items:center;margin-bottom:8px;flex:none}"
+".kqk.success .kqk-done .ring{animation:kqk-ring 700ms 250ms var(--ease-out) backwards}"
+"@keyframes kqk-ring{0%{transform:scale(.5);box-shadow:0 0 0 0 oklch(0.77 0.11 215 / .5)}60%{transform:scale(1.06)}100%{transform:scale(1);box-shadow:0 0 0 16px oklch(0.77 0.11 215 / 0)}}"
+".kqk-done svg{width:24px;height:24px;stroke:var(--accent);stroke-width:3;fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:30;stroke-dashoffset:30}"
+".kqk.success .kqk-done svg{animation:kqk-draw .6s .45s var(--ease-out) forwards}"
+"@keyframes kqk-draw{to{stroke-dashoffset:0}}"
+".kqk-done h3{font:600 20px var(--font-heading)}.kqk-done p{color:var(--muted-foreground);font-size:14px;max-width:46ch}"
+".kqk-done .alt{margin-top:8px;font:600 13.5px var(--font-body)}"
+".kqk-done.slim{grid-auto-flow:column;justify-content:start;align-items:center;gap:14px}"
+".kqk-done.slim .ring{width:40px;height:40px;margin:0}.kqk-done.slim svg{width:18px;height:18px}.kqk-done.slim h3{font-size:15px}.kqk-done.slim p{font-size:12.5px}"
+".kqk-hp{position:absolute;left:-9999px}"
+"html.anim-ok .kqk .rv{opacity:0;transform:translateY(18px)}"
+"html.anim-ok .kqk.inview .rv{opacity:1;transform:none;transition:opacity 600ms var(--ease-out),transform 600ms var(--ease-out);transition-delay:var(--d,0ms)}"
+"@media(prefers-reduced-motion:reduce){.kqk .rv{opacity:1!important;transform:none!important}}"
/* layouts */
+".kqk-grid{display:grid;grid-template-columns:minmax(260px,5fr) 7fr;gap:clamp(24px,4vw,52px);align-items:start}"
+"@media(max-width:820px){.kqk-grid{grid-template-columns:1fr}.kqk-row2{grid-template-columns:1fr}}"
+".kqk-lrow{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.kqk-lrow .kqk-fld{flex:1;min-width:170px}.kqk-lrow .kqk-fld label{position:absolute;left:-9999px}"
+".kqk-stack .kqk-in,.kqk-stack .kqk-send{width:100%}"
/* variants */
+".v-band{border-radius:0;border-left:0;border-right:0}.v-band .kqk-ctr{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:minmax(240px,2fr) 3fr;gap:clamp(20px,4vw,48px);align-items:center}@media(max-width:820px){.v-band .kqk-ctr{grid-template-columns:1fr}}"
+".v-hero{padding:clamp(18px,2.5vw,26px)}.v-hero .kqk-h{font-size:clamp(17px,1.8vw,20px)}"
+".v-inline{padding:clamp(18px,2.5vw,28px)}.v-inline .kqk-h{font-size:clamp(17px,1.9vw,21px)}.v-inline .kqk-ctr{display:grid;grid-template-columns:minmax(220px,2fr) 3fr;gap:clamp(18px,3vw,36px);align-items:center}@media(max-width:820px){.v-inline .kqk-ctr{grid-template-columns:1fr}}"
+".v-row{padding:18px 22px;border-radius:var(--radius)}"
+".v-sidebar,.v-tile{padding:clamp(20px,2.5vw,26px)}.v-sidebar .kqk-h,.v-tile .kqk-h{font-size:19px}.v-tile{height:100%}"
+".v-sticky{position:fixed;left:0;right:0;bottom:0;z-index:900;border-radius:0;border:0;border-top:1px solid var(--card-border);background:var(--nav-glass);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 -12px 40px -12px oklch(0 0 0 / .45);padding:12px clamp(16px,4vw,40px) 14px;animation:kqk-rise .6s var(--ease-out)}"
+"@keyframes kqk-rise{from{transform:translateY(100%)}to{transform:none}}"
+".v-sticky::before{display:none}.v-sticky .kqk-ctr{max-width:1180px;margin:0 auto;display:flex;gap:16px;align-items:center;flex-wrap:wrap}.v-sticky .kqk-h{font-size:15px;flex:1;min-width:200px}.v-sticky .kqk-form{flex:2.2}.v-sticky.hidden{display:none}"
+".kqk-close{position:absolute;top:8px;right:10px;z-index:5;width:26px;height:26px;border-radius:50%;border:1px solid var(--card-border);background:var(--background);color:var(--muted-foreground);font:600 13px/1 var(--font-body);cursor:pointer;transition:color 150ms var(--ease),border-color 150ms var(--ease)}"
+".kqk-close:hover{color:var(--foreground);border-color:var(--ring)}"
+".v-fabwrap{position:fixed;right:22px;bottom:22px;z-index:900;display:flex;flex-direction:column;align-items:flex-end;gap:12px;font-family:var(--font-body);pointer-events:none}"
+".kqk-fab{pointer-events:auto;width:54px;height:54px;border-radius:50%;border:0;background:var(--primary);color:var(--primary-foreground);font:700 20px var(--font-heading);cursor:pointer;box-shadow:var(--shadow-lift);display:grid;place-items:center;transition:transform 250ms cubic-bezier(.34,1.56,.64,1),background 150ms var(--ease)}"
+".kqk-fab:hover{transform:scale(1.08);background:var(--primary-hover)}.kqk-fab:active{transform:scale(.95)}"
+".kqk-fab .x1,.kqk-fab .x2{position:absolute;width:16px;height:2px;border-radius:1px;background:var(--primary-foreground);opacity:0;transition:transform 300ms var(--ease-out),opacity 200ms}"
+".kqk-fab .kk{transition:transform 300ms var(--ease-out),opacity 200ms}"
+".v-fabwrap.open .kqk-fab .kk{opacity:0;transform:rotate(90deg) scale(.5)}"
+".v-fabwrap.open .kqk-fab .x1{opacity:1;transform:rotate(45deg)}.v-fabwrap.open .kqk-fab .x2{opacity:1;transform:rotate(-45deg)}"
+".v-pop{width:min(360px,calc(100vw - 44px));max-height:calc(100vh - 130px);overflow:auto;transform-origin:100% calc(100% + 66px);transform:scale(.55) translateY(20px);opacity:0;pointer-events:none;transition:transform 380ms cubic-bezier(.34,1.45,.64,1),opacity 250ms var(--ease)}"
+".v-fabwrap.open .v-pop{transform:none;opacity:1;pointer-events:auto}"
+".kqk-ovl{position:fixed;inset:0;z-index:950;display:grid;place-items:center;padding:20px;font-family:var(--font-body)}"
+".kqk-ovl .bg{position:absolute;inset:0;background:oklch(0.05 0.01 300 / .55);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);opacity:0;transition:opacity 300ms var(--ease)}"
+".kqk-ovl .kqk{position:relative;width:min(500px,100%);transform:translateY(26px) scale(.95);opacity:0;transition:transform 400ms var(--ease-out),opacity 300ms var(--ease)}"
+".kqk-ovl.on .bg{opacity:1}.kqk-ovl.on .kqk{transform:none;opacity:1}"
/* tones */
+".kqk.t-primary{background:linear-gradient(135deg,var(--brand-600),var(--brand-800));border-color:transparent;color:oklch(0.97 0.01 300)}"
+".kqk.t-primary::before{background:radial-gradient(700px 300px at 85% -20%,oklch(1 0 0 / .12),transparent 65%)}"
+".kqk.t-primary .kqk-k{color:var(--aqua-300)}.kqk.t-primary .kqk-t,.kqk.t-primary .kqk-promise,.kqk.t-primary .kqk-legal,.kqk.t-primary .kqk-done p{color:oklch(0.88 0.03 302)}"
+".kqk.t-primary .kqk-in{background:oklch(1 0 0 / .1);border-color:oklch(1 0 0 / .24)}.kqk.t-primary .kqk-in select{color:oklch(0.9 0.02 302)}.kqk.t-primary .kqk-in input::placeholder{color:oklch(1 0 0 / .5)}"
+".kqk.t-primary .kqk-send{background:white;color:var(--brand-700)}.kqk.t-primary .kqk-send:hover{background:oklch(0.94 0.02 305)}"
+".kqk.t-primary .kqk-chip{background:transparent;border-color:oklch(1 0 0 / .3);color:oklch(0.92 0.02 302)}.kqk.t-primary .kqk-chip[aria-pressed=true]{background:oklch(1 0 0 / .18);border-color:white;color:white}"
+".kqk.t-primary .kqk-done .ring{background:oklch(1 0 0 / .14);border-color:oklch(1 0 0 / .4)}.kqk.t-primary .kqk-done svg{stroke:var(--aqua-300)}.kqk.t-primary a{color:var(--aqua-300)}"
+".kqk.t-glass{background:var(--nav-glass);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-color:var(--nav-border)}"
+".kqk.t-inverse{background:oklch(0.965 0.006 300);border-color:transparent;color:oklch(0.22 0.03 300)}"
+".kqk.t-inverse .kqk-t,.kqk.t-inverse .kqk-legal,.kqk.t-inverse .kqk-done p{color:oklch(0.45 0.02 300)}"
+".kqk.t-inverse .kqk-in{background:white;border-color:oklch(0.88 0.01 300)}.kqk.t-inverse .kqk-in input{color:oklch(0.25 0.03 300)}"
+".kqk.t-inverse .kqk-chip{background:white;border-color:oklch(0.86 0.01 300);color:oklch(0.45 0.02 300)}.kqk.t-inverse .kqk-chip[aria-pressed=true]{background:oklch(0.93 0.03 305);border-color:var(--brand-500);color:oklch(0.3 0.06 302)}"
+".kqk.t-inverse .kqk-send{background:var(--brand-600);color:white}.kqk.t-inverse .kqk-send:hover{background:var(--brand-700)}"
+"@media(max-width:640px){.v-fabwrap{right:14px;bottom:14px}.v-sticky .kqk-h{display:none}}";
function ensureCss(){if(!document.getElementById("kqk-css")){var s=document.createElement("style");s.id="kqk-css";s.textContent=CSS;document.head.appendChild(s)}}
function h(html){var t=document.createElement("template");t.innerHTML=html.trim();return t.content.firstChild}
function fldPhone(){return '<div class="kqk-fld fp"><label>Telefon</label><div class="kqk-in"><select aria-label="Landesvorwahl"><option>+49</option><option>+41</option><option>+43</option><option>+971</option><option>+1</option></select><input type="tel" placeholder="160 1234567" autocomplete="tel"></div><span class="emsg">Bitte Telefonnummer angeben</span></div>'}
function fldMail(){return '<div class="kqk-fld fm"><label>Email</label><div class="kqk-in"><input type="email" placeholder="einkauf@firma.com" autocomplete="email"></div><span class="emsg">Bitte gueltige Email angeben</span></div>'}
function chipsHtml(n){return '<div class="kqk-fld"><label>Was benoetigen Sie</label><div class="kqk-chips">'+INTERESTS.slice(0,n||INTERESTS.length).map(function(x){return '<button type="button" class="kqk-chip" aria-pressed="false">'+x+'</button>'}).join("")+'</div></div>'}
function sendBtn(t){return '<button class="kqk-send" type="submit"><span class="tx">'+(t||"Anfrage senden")+'</span><span class="sp"></span></button>'}
var HP='<input class="kqk-hp" type="text" name="firma2" tabindex="-1" autocomplete="off" aria-hidden="true">';
var LEGAL='<span class="kqk-legal">Keine Werbung, keine Weitergabe. <a href="#">Datenschutz</a></span>';
function formHTML(layout){
if(layout==="row")return '<form class="kqk-form kqk-lrow" novalidate>'+fldPhone()+fldMail()+HP+sendBtn()+'</form>';
if(layout==="compact")return '<form class="kqk-form kqk-lrow" novalidate>'+fldPhone()+HP+sendBtn("Rueckruf anfordern")+'</form>';
if(layout==="stack")return '<form class="kqk-form kqk-stack" novalidate>'+fldPhone()+fldMail()+chipsHtml(3)+HP+'<div class="kqk-actions">'+sendBtn()+'</div>'+LEGAL+'</form>';
return '<form class="kqk-form" novalidate><div class="kqk-row2">'+fldPhone()+fldMail()+'</div>'+chipsHtml()+HP+'<div class="kqk-actions">'+sendBtn()+LEGAL+'</div></form>';}
function doneHTML(slim){
var ring='<div class="ring"><svg viewBox="0 0 24 24"><polyline points="4 12.5 10 18 20 6"></polyline></svg></div>';
if(slim)return '<div class="kqk-done slim">'+ring+'<div><h3>Danke, Anfrage ist da.</h3><p class="dt"></p></div></div>';
return '<div class="kqk-done">'+ring+'<h3>Danke, Ihre Anfrage ist da.</h3><p class="dt"></p><div class="alt">Eilig? Direktwahl <a href="tel:'+PHONE.replace(/ /g,"")+'">'+PHONE+'</a></div></div>';}
function ctxFull(){return '<div class="kqk-ctx"><div class="kqk-k rv"></div><h2 class="kqk-h rv" style="--d:60ms"></h2><p class="kqk-t rv" style="--d:120ms"></p><div class="kqk-promise rv" style="--d:180ms"><i></i><span>Antwort innerhalb eines Arbeitstages</span></div></div>'}
function ctxShort(withPromise){return '<div class="kqk-ctx"><div class="kqk-k"></div><h2 class="kqk-h sh"></h2>'+(withPromise?'<div class="kqk-promise"><i></i><span>Antwort innerhalb eines Arbeitstages</span></div>':"")+'</div>'}
function right(layout,slim){return '<div class="kqk-right">'+formHTML(layout)+doneHTML(slim)+'</div>'}
var VARIANTS={
block:{cls:"v-block",html:function(){return '<div class="kqk-grid">'+ctxFull()+right("full")+'</div>'}},
band:{cls:"v-band",tone:"t-primary",html:function(){return '<div class="kqk-ctr">'+ctxShort(true)+right("row",true)+'</div>'}},
hero:{cls:"v-hero",tone:"t-glass",html:function(){return '<div class="kqk-ctr" style="display:flex;flex-wrap:wrap;gap:14px;align-items:center"><h2 class="kqk-h sh kqk-ctx" style="flex:1;min-width:220px"></h2><div class="kqk-right" style="flex:2">'+formHTML("row")+doneHTML(true)+'</div></div>'}},
inline:{cls:"v-inline",html:function(){return '<div class="kqk-ctr">'+ctxShort()+right("row",true)+'</div>'}},
row:{cls:"v-row",html:function(){return '<div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><div class="kqk-promise kqk-ctx" style="margin:0;flex:none"><i></i><span class="sh2"></span></div><div class="kqk-right" style="flex:1">'+formHTML("row")+doneHTML(true)+'</div></div>'}},
sidebar:{cls:"v-sidebar",html:function(){return ctxShort(true)+'<div style="height:14px"></div>'+right("stack",true)}},
tile:{cls:"v-tile",html:function(){return ctxShort()+'<div style="height:12px"></div>'+right("stack",true)}},
sticky:{cls:"v-sticky",html:function(){return '<button class="kqk-close" type="button" aria-label="Schliessen">x</button><div class="kqk-ctr"><h2 class="kqk-h sh kqk-ctx"></h2><div class="kqk-right" style="flex:2.2;min-width:min(100%,460px)">'+formHTML("row")+doneHTML(true)+'</div></div>'}},
fab:{cls:"v-pop",html:function(){return '<button class="kqk-close" type="button" aria-label="Schliessen">x</button>'+ctxShort()+'<div style="height:12px"></div>'+right("stack",true)}},
modal:{cls:"v-modal",html:function(){return '<button class="kqk-close" type="button" aria-label="Schliessen">x</button>'+ctxFull()+'<div style="height:16px"></div>'+right("stack")}}};
function apply(node,c){
var q=function(s){return node.querySelector(s)},e;
(e=q(".kqk-k"))&&(e.textContent=c.kicker);
(e=q(".kqk-h"))&&(e.textContent=e.classList.contains("sh")?c.short:c.head);
(e=q(".kqk-t"))&&(e.textContent=c.text);
(e=q(".sh2"))&&(e.textContent=c.short);
(e=q(".dt"))&&(e.textContent=c.done);
node.querySelectorAll(".kqk-chip").forEach(function(x){x.setAttribute("aria-pressed",x.textContent===c.interest?"true":"false")});}
function wire(node,el){
node.querySelectorAll(".kqk-chip").forEach(function(ch){ch.addEventListener("click",function(){node.querySelectorAll(".kqk-chip").forEach(function(x){x.setAttribute("aria-pressed","false")});ch.setAttribute("aria-pressed","true")})});
var form=node.querySelector(".kqk-form"),send=node.querySelector(".kqk-send");
var fp=node.querySelector(".fp"),fm=node.querySelector(".fm");
var pin=fp&&fp.querySelector("input"),min=fm&&fm.querySelector("input");
[pin,min].forEach(function(i){i&&i.addEventListener("input",function(){i.closest(".kqk-fld").classList.remove("err")})});
form.addEventListener("submit",function(e){e.preventDefault();
var okP=pin?!!pin.value.trim():true,okM=min?/.+@.+\..+/.test(min.value):true;
fp&&fp.classList.toggle("err",!okP);fm&&fm.classList.toggle("err",!okM);
if(!okP||!okM)return;
send.classList.add("loading");send.disabled=true;
form.querySelectorAll("input,select,button").forEach(function(x){if(x!==send)x.disabled=true});
setTimeout(function(){node.classList.add("success")},900)});
var close=node.querySelector(".kqk-close");
close&&close.addEventListener("click",function(){
if(el&&el._kqkOnClose)el._kqkOnClose();else node.classList.add("hidden")});
return {node:node,
reset:function(clear){node.classList.remove("success");send.classList.remove("loading");send.disabled=false;
form.querySelectorAll("input,select,button").forEach(function(x){x.disabled=false});
if(clear){pin&&(pin.value="");min&&(min.value="")}
node.querySelectorAll(".kqk-fld.err").forEach(function(f){f.classList.remove("err")})}};}
function buildRoot(variant,tone,c){
var v=VARIANTS[variant]||VARIANTS.block;
var cls="kqk "+v.cls+" "+(tone?"t-"+tone:(v.tone||""));
var node=h('<section class="'+cls+'" aria-label="Kontakt" data-screen-label="Kontaktmodul"></section>');
node.innerHTML=v.html();
apply(node,c);
return node;}
function mount(el){
ensureCss();
var variant=el.getAttribute("data-variant")||"block";
var key=el.getAttribute("data-page")||"fallback";
var tone=el.getAttribute("data-tone")||"";
var c=CONTENT[key]||CONTENT.fallback;
el.textContent="";
var node,api;
if(variant==="fab"){
var wrap=h('<div class="v-fabwrap"></div>');
node=buildRoot("fab",tone,c);
var fab=h('<button class="kqk-fab" type="button" aria-label="Kontakt"><span class="kk">K</span><span class="x1"></span><span class="x2"></span></button>');
wrap.appendChild(node);wrap.appendChild(fab);el.appendChild(wrap);
fab.addEventListener("click",function(){wrap.classList.toggle("open")});
el._kqkOnClose=function(){wrap.classList.remove("open")};
}else{
node=buildRoot(variant,tone,c);
el.appendChild(node);
}
api=wire(node,el);
if(variant==="block"&&"IntersectionObserver" in window){
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){node.classList.add("inview");io.disconnect()}})},{threshold:.2});io.observe(node);
}else node.classList.add("inview");
api.apply=function(cc){apply(node,cc)};
el._kqk=api;
return api;}
function setPage(el,key){
if(!el._kqk)return;
var c=CONTENT[key]||CONTENT.fallback;
el.setAttribute("data-page",key);
var ctxs=el.querySelectorAll(".kqk-ctx");
ctxs.forEach(function(x){x.classList.add("fade")});
setTimeout(function(){el._kqk.apply(c);ctxs.forEach(function(x){x.classList.remove("fade")})},250);
el._kqk.reset(false);}
var ovl=null;
function openModal(key){
ensureCss();
closeModal(true);
var c=CONTENT[key]||CONTENT.fallback;
ovl=h('<div class="kqk-ovl"><div class="bg"></div></div>');
var node=buildRoot("modal","",c);
ovl.appendChild(node);
document.body.appendChild(ovl);
wire(node,{_kqkOnClose:closeModal});
ovl.querySelector(".bg").addEventListener("click",function(){closeModal()});
requestAnimationFrame(function(){requestAnimationFrame(function(){ovl.classList.add("on")})});
document.addEventListener("keydown",escClose);}
function escClose(e){if(e.key==="Escape")closeModal()}
function closeModal(now){
if(!ovl)return;
var o=ovl;ovl=null;
document.removeEventListener("keydown",escClose);
if(now){o.remove();return}
o.classList.remove("on");
setTimeout(function(){o.remove()},320);}
function boot(){
if(!document.documentElement.classList.contains("anim-ok"))requestAnimationFrame(function(){document.documentElement.classList.add("anim-ok")});
document.querySelectorAll("[data-kaqua-kontakt]").forEach(mount);
document.querySelectorAll("[data-kaqua-open]").forEach(function(b){b.addEventListener("click",function(){openModal(b.getAttribute("data-kaqua-open")||"fallback")})});}
window.KAquaKontakt={mount:mount,setPage:setPage,openModal:openModal,closeModal:closeModal,content:CONTENT,variants:Object.keys(VARIANTS)};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();

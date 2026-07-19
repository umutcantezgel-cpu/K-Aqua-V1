/* K Aqua Theme Toggle — drop-in: <script src="kaqua-theme.js"></script> */
(function(){
var KEY="kaqua-theme",root=document.documentElement;
var saved=null;try{saved=localStorage.getItem(KEY)}catch(e){}
if(saved==="light"||saved==="dark")root.setAttribute("data-theme",saved);
else if(!root.getAttribute("data-theme"))root.setAttribute("data-theme","dark");
var css=".kq-theme{position:fixed;top:18px;right:18px;z-index:999;width:44px;height:44px;border-radius:50%;border:1px solid var(--card-border);background:var(--nav-glass);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);cursor:pointer;display:grid;place-items:center;box-shadow:var(--shadow-diffuse);transition:transform 150ms var(--ease),border-color 150ms var(--ease)}.kq-theme:hover{transform:scale(1.08);border-color:var(--ring)}.kq-theme:active{transform:scale(.94)}.kq-theme .ic{position:relative;width:20px;height:20px;transition:transform 500ms var(--ease-out)}.kq-theme.spin .ic{transform:rotate(360deg)}.kq-theme .sun,.kq-theme .moon{position:absolute;inset:0;transition:opacity 250ms var(--ease),transform 400ms var(--ease-out)}.kq-theme .sun{opacity:0;transform:scale(.4) rotate(-90deg)}.kq-theme .moon{opacity:1;transform:scale(1)}[data-theme=light] .kq-theme .sun{opacity:1;transform:scale(1) rotate(0)}[data-theme=light] .kq-theme .moon{opacity:0;transform:scale(.4) rotate(90deg)}.kq-theme svg{width:20px;height:20px;stroke:var(--foreground);fill:none;stroke-width:2;stroke-linecap:round}";
function init(){
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
var b=document.createElement("button");b.className="kq-theme";b.type="button";b.setAttribute("aria-label","Theme wechseln");
b.innerHTML='<span class="ic"><svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"></path></svg><svg class="moon" viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 6.8 6.8 0 0 0 20 14.5z"></path></svg></span>';
b.addEventListener("click",function(){
var next=root.getAttribute("data-theme")==="dark"?"light":"dark";
root.setAttribute("data-theme",next);
try{localStorage.setItem(KEY,next)}catch(e){}
b.classList.add("spin");setTimeout(function(){b.classList.remove("spin")},520);
});
document.body.appendChild(b);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();

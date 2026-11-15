var SHEET_URL="https://script.google.com/macros/s/AKfycbyAX99oT-QvebeNKGWvG44lUoP1hRZNxO3hxchXMd49LNpAFYcTc-bcgiQREIeITQsMsg/exec"; // paste your Google Apps Script web app URL here
var EMAIL="jevvelle@gmail.com"; 
document.getElementById("copy").textContent="Copy email: "+EMAIL;
var nav=document.getElementById("nav"),bg=document.querySelector(".burger");
bg.onclick=function(){var o=nav.classList.toggle("open");bg.setAttribute("aria-expanded",o)};
nav.querySelectorAll("a").forEach(function(a){a.onclick=function(){nav.classList.remove("open");bg.setAttribute("aria-expanded","false")}});
document.querySelectorAll(".acc button").forEach(function(b){b.onclick=function(){
 var open=b.getAttribute("aria-expanded")==="true";
 document.querySelectorAll(".acc button").forEach(function(x){x.setAttribute("aria-expanded","false");x.nextElementSibling.classList.remove("open")});
 if(!open){b.setAttribute("aria-expanded","true");b.nextElementSibling.classList.add("open")}}});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll(".rv").forEach(function(el){io.observe(el)});
document.getElementById("copy").onclick=function(){var b=this;
 function done(){var t=b.textContent;b.textContent="Email copied";setTimeout(function(){b.textContent=t},1800)}
 try{navigator.clipboard.writeText(EMAIL).then(done,done)}catch(e){done()}};
document.getElementById("f").onsubmit=function(e){e.preventDefault();var f=this,b=f.querySelector("button"),n=document.getElementById("note");
 n.textContent="";
 if(!validate(f))return;
 if(!SHEET_URL){n.textContent="Form is not connected to your sheet yet.";return}
 b.disabled=true;b.textContent="Sending";
 fetch(SHEET_URL,{method:"POST",mode:"no-cors",body:new URLSearchParams(new FormData(f))})
 .then(function(){f.reset();document.getElementById("sent").showModal()})
 .catch(function(){n.textContent="Could not send. Please email "+EMAIL+" instead."})
 .finally(function(){b.disabled=false;b.textContent="Send inquiry"})};

/* ===== enhancements ===== */
function validate(f){var ok=true;
 Array.prototype.forEach.call(f.querySelectorAll("[required]"),function(el){
  var old=el.parentNode.querySelector(".msg-err");if(old)old.remove();el.classList.remove("err");
  var v=el.value.trim(),bad=!v||(el.type==="email"&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v))||(el.name==="msg"&&v.length<10);
  if(bad){ok=false;el.classList.add("err");var s=document.createElement("span");s.className="msg-err";
   s.textContent=el.type==="email"?"Enter a valid email.":el.name==="msg"?"Tell me a bit more (10+ characters).":"This field is required.";el.parentNode.appendChild(s)}});
 if(f.hp.value)return false;
 return ok}
(function(){
var $=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
var bar=$("#progress"),hdr=$("header"),totop=$("#totop");
function onScroll(){var h=document.documentElement,max=h.scrollHeight-h.clientHeight,y=h.scrollTop;
 bar.style.transform="scaleX("+(max>0?y/max:0)+")";hdr.classList.toggle("scrolled",y>10);totop.classList.toggle("show",y>600)}
addEventListener("scroll",onScroll,{passive:true});onScroll();
totop.onclick=function(){scrollTo({top:0,behavior:reduce?"auto":"smooth"})};
$$(".demos .rv,.crow .rv").forEach(function(el,i){el.style.setProperty("--d",(i%2)*.12+"s")});
var links=$$("nav a.l");
var spy=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id)})}})},{rootMargin:"-45% 0px -50% 0px"});
links.forEach(function(a){var s=$(a.getAttribute("href"));if(s)spy.observe(s)});
var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);
 var el=e.target,to=+el.dataset.to,t0=null;
 function step(t){t0=t0||t;var p=Math.min((t-t0)/1100,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)}
 if(reduce)el.textContent=to;else requestAnimationFrame(step)})},{threshold:.6});
$$("[data-to]").forEach(function(el){cio.observe(el)});
if(!reduce&&matchMedia("(hover:hover)").matches){
 $$(".card").forEach(function(c){
  c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
   c.style.transform="perspective(900px) rotateX("+(-y*5)+"deg) rotateY("+(x*6)+"deg) translateY(-4px)"});
  c.addEventListener("pointerleave",function(){c.style.transform=""})});
 $$(".btn.solid,.btn.soft").forEach(function(b){
  b.addEventListener("pointermove",function(e){var r=b.getBoundingClientRect();b.style.translate=((e.clientX-r.left-r.width/2)*.18)+"px "+((e.clientY-r.top-r.height/2)*.25)+"px"});
  b.addEventListener("pointerleave",function(){b.style.translate=""})});
 var pt=$(".portrait");
 addEventListener("scroll",function(){pt.style.transform="translateY("+Math.min(scrollY*.06,30)+"px)"},{passive:true});
}
var root=document.documentElement;
try{var sv=localStorage.getItem("theme");if(sv)root.setAttribute("data-theme",sv)}catch(e){}
$("#theme").onclick=function(){
 var cur=root.getAttribute("data-theme"),dark=cur?cur==="dark":matchMedia("(prefers-color-scheme:dark)").matches,n=dark?"light":"dark";
 root.setAttribute("data-theme",n);try{localStorage.setItem("theme",n)}catch(e){}};
$$("#f input,#f textarea").forEach(function(el){el.addEventListener("input",function(){
 el.classList.remove("err");var m=el.parentNode.querySelector(".msg-err");if(m)m.remove()})});
})();

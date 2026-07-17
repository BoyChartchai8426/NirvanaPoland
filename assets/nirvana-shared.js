/* ===========================================================
   Nirvana Thai Massage — shared behaviour
   - language toggle (PL/EN) with persistence
   - mobile hamburger overlay
   - sticky condensed header reveal on scroll
   A page may define:
     window.PAGE_I18N = { pl:{key:val,...}, en:{...} }
     window.onLangChange = function(lang, dict){ ... }
   =========================================================== */
(function(){
  const NAV = {
    pl:{ nav_about:"O nas", nav_services:"Usługi", nav_voucher:"Bon podarunkowy", nav_team:"Nasz zespół", nav_contact:"Kontakt", footer_sub:"Bielsko-Biała · POLAND", back:"Wstecz" },
    en:{ nav_about:"About us", nav_services:"Services", nav_voucher:"Gift voucher", nav_team:"Our team", nav_contact:"Contact", footer_sub:"Bielsko-Biała · POLAND", back:"Back" }
  };
  function dictFor(lang){
    const page = (window.PAGE_I18N && window.PAGE_I18N[lang]) || {};
    return Object.assign({}, NAV[lang], page);
  }
  window.setLang = function(lang){
    const dict = dictFor(lang);
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(n=>{
      const k = n.getAttribute("data-i18n");
      if(dict[k] !== undefined) n.textContent = dict[k];
    });
    document.querySelectorAll(".langbtn").forEach(b=>b.classList.toggle("on", b.dataset.lang===lang));
    if(typeof window.onLangChange === "function") window.onLangChange(lang, dict);
    try{ localStorage.setItem("nirvana_lang", lang); }catch(e){}
  };

  document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll(".langbtn").forEach(b=>b.addEventListener("click",()=>window.setLang(b.dataset.lang)));

    const mobileNav = document.getElementById("mobileNav");
    if(mobileNav){
      document.querySelectorAll(".burger").forEach(b=>b.addEventListener("click",()=>mobileNav.classList.add("open")));
      const mc = document.getElementById("mobileClose");
      if(mc) mc.addEventListener("click",()=>mobileNav.classList.remove("open"));
      document.querySelectorAll(".mobile-nav a.m-link").forEach(a=>a.addEventListener("click",()=>mobileNav.classList.remove("open")));
    }

    let saved = "pl";
    try{ saved = localStorage.getItem("nirvana_lang") || "pl"; }catch(e){}
    window.setLang(saved);

    const sticky = document.getElementById("stickybar");
    if(sticky){
      const onScroll = ()=>sticky.classList.toggle("show", window.scrollY > 170);
      window.addEventListener("scroll", onScroll, {passive:true});
      onScroll();
    }
  });
})();

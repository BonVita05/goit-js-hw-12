/* empty css                      */import{a as S,i as u,S as x}from"./assets/vendor-DXaSJupm.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();S.defaults.baseURL="https://pixabay.com";const M="53047751-cea4bcad23f1cdb0ee3074407",m=15;async function w(a,t){try{const{data:r}=await S("/api/",{params:{key:M,q:a,per_page:m,page:t,image_type:"photo",orientation:"horizontal"}});return r}catch(r){u.error({message:`${r.message??String(err)}`,position:"topCenter",timeout:3e3,backgroundColor:"#EF4040",messageColor:"white",close:!1})}}const h=document.querySelector(".gallery"),p=document.querySelector(".loading"),f=document.querySelector(".load-more-button");function C(a=[]){return a.map(({tags:t,previewURL:r,largeImageURL:i,views:e,downloads:o,likes:n,comments:b})=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${i}">
                <img class="gallery-image" src="${r}" alt="${t}" loading="lazy" 
                title="Title: ${t.split(",")[0].trim()}  |  
                Views: ${e.toLocaleString()}  | 
                Likes: ${n.toLocaleString()}  |  
                Comments: ${b.toLocaleString()}  |
                Downloads: ${o.toLocaleString()}"/>
            </a>
            <ul class="info-container">
                <li class="info-box">
                    <p class="info-title">Views</p>
                    <p class="info-value">${e.toLocaleString()}</p>
                </li>
                 <li class="info-box">
                    <p class="info-title">Likes</p>
                    <p class="info-value">${n.toLocaleString()}</p>
                </li>
                 <li class="info-box">
                    <p class="info-title">Comments</p>
                    <p class="info-value">${b.toLocaleString()}</p>
                </li>
                 <li class="info-box">
                    <p class="info-title">Downloads</p>
                    <p class="info-value">${o.toLocaleString()}</p>
                </li>
            </ul>
        </li>
    `).join("")}function E(){h.innerHTML=""}function $(){p.hidden=!1}function g(){p.hidden=!0}function v(){f.hidden=!1}function s(){f.hidden=!0}const q=new x(".gallery a",{caption:!0,captionDelay:250,captionPosition:"bottom",nav:!0,showCounter:!0,loop:!0}),P="search-queries",y=document.querySelector(".form"),L=y.querySelector(".search-button");let d="",l=0,c=0;y.addEventListener("submit",A);async function A(a){a.preventDefault(),L.disabled=!0;try{if(s(),$(),E(),l=1,c=0,d=a.target.elements["search-text"].value.trim(),!d)throw s(),new Error("Please, type query!");localStorage.setItem(P,d);const{hits:t,totalHits:r}=await w(d,l);if(!t.length)throw s(),new Error("Sorry, there are no images matching your search query. Please try again!");if(c=Math.ceil(r/m),h.insertAdjacentHTML("beforeend",C(t)),q.refresh(),l<c)v();else{s(),u.info({message:"We are sorry, but you have reached the end of search results!",position:"topCenter",timeout:4e3,backgroundColor:"#009b18",messageColor:"white",close:!1});return}}catch(t){u.error({message:`${t.message??String(err)}`,position:"topCenter",timeout:4e3,backgroundColor:"#EF4040",messageColor:"white",close:!1})}finally{g(),a.target.reset(),L.disabled=!1}}f.addEventListener("click",B);async function B(){s(),f.insertAdjacentElement("afterend",p),$();let a=y.elements["search-text"].value.trim(),t=localStorage.getItem(P);if(a!==""&&a!==t){u.info({message:"Please make a new search before loading next page!",position:"topCenter",timeout:4e3,backgroundColor:"#009b18",messageColor:"white",close:!1}),g(),E(),s(),f.disabled=!1;return}try{l++;const{hits:r,totalHits:i}=await w(t,l);c=Math.ceil(i/m),h.insertAdjacentHTML("beforeend",C(r)),q.refresh();const e=document.querySelector(".gallery-item"),o=e.getBoundingClientRect().height;if(e&&window.scrollBy({left:0,top:o*2,behavior:"smooth"}),l<c)v();else throw s(),new Error("We are sorry, but you have reached the end of search results!")}catch(r){u.error({message:`${r.message??String(r)}`,position:"topCenter",timeout:4e3,backgroundColor:"#EF4040",messageColor:"white",close:!1})}finally{g()}}
//# sourceMappingURL=index.js.map

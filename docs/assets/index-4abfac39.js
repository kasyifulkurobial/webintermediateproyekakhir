var M=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)};var d=(i,e,t)=>(M(i,e,"read from private field"),t?t.call(i):e.get(i)),u=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},B=(i,e,t,n)=>(M(i,e,"write to private field"),n?n.call(i,t):e.set(i,t),t);var f=(i,e,t)=>(M(i,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();var T,J;class Q{constructor(){u(this,T);this.container=document.querySelector("#main-content")}renderSkeletons(){return f(this,T,J).call(this)}renderStories(e){return e.map(t=>`
      <article class="story-card">
        <a href="#/detail/${t.id}" class="story-link" aria-label="View story by ${t.name}">
          <div class="story-image-container">
            <img 
              src="${t.photoUrl}" 
              alt="Story by ${t.name}" 
              class="story-image"
              loading="lazy"
            />
          </div>
          <div class="story-content">
            <h2 class="story-name">${t.name}</h2>
            <p class="story-date">${this._formatDate(t.createdAt)}</p>
            <p class="story-description">${this._truncateText(t.description,100)}</p>
          </div>
        </a>
      </article>
    `).join("")}renderAuthRequired(){return`
      <div class="auth-required">
        <h2>Login Required</h2>
        <p>Please login to view stories from the Dicoding community.</p>
        <div class="auth-actions">
          <a href="#/login" class="button button-primary">Login</a>
          <a href="#/register" class="button button-secondary">Register</a>
        </div>
      </div>
    `}renderEmptyState(){return`
      <div class="empty-state">
        <p>No stories found. Be the first to share your story!</p>
      </div>
    `}render(){return`
      <div class="skip-link">
        <a href="#content" class="skip-to-content">Skip to content</a>
      </div>
      <section id="content" class="container stories-container">
        <h1 class="page-title">Dicoding Stories</h1>
        <p class="page-description">Share your moments with the Dicoding community</p>
        
        <a href="#/add" class="add-story-button">
          <span class="add-icon">+</span>
          <span>Add New Story</span>
        </a>
        
        <div id="stories-list" class="stories-list">
          ${this.renderSkeletons()}
        </div>
      </section>
    `}updateStoriesList(e){const t=document.getElementById("stories-list");t&&(t.innerHTML=e)}applyViewTransition(){document.documentElement.classList.add("view-transition")}_formatDate(e){return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}_truncateText(e,t){return e.length<=t?e:e.substring(0,t)+"..."}}T=new WeakSet,J=function(){let e="";for(let t=0;t<6;t++)e+=`
        <div class="skeleton-card">
          <div class="skeleton skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-date"></div>
            <div class="skeleton skeleton-description"></div>
            <div class="skeleton skeleton-description"></div>
          </div>
        </div>
      `;return e};const y={BASE_URL:"https://story-api.dicoding.dev/v1"},X=(i,e)=>e.some(t=>i instanceof t);let q,W;function ee(){return q||(q=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function te(){return W||(W=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const G=new WeakMap,x=new WeakMap,z=new WeakMap,R=new WeakMap,V=new WeakMap;function ie(i){const e=new Promise((t,n)=>{const s=()=>{i.removeEventListener("success",a),i.removeEventListener("error",r)},a=()=>{t(g(i.result)),s()},r=()=>{n(i.error),s()};i.addEventListener("success",a),i.addEventListener("error",r)});return e.then(t=>{t instanceof IDBCursor&&G.set(t,i)}).catch(()=>{}),V.set(e,i),e}function ne(i){if(x.has(i))return;const e=new Promise((t,n)=>{const s=()=>{i.removeEventListener("complete",a),i.removeEventListener("error",r),i.removeEventListener("abort",r)},a=()=>{t(),s()},r=()=>{n(i.error||new DOMException("AbortError","AbortError")),s()};i.addEventListener("complete",a),i.addEventListener("error",r),i.addEventListener("abort",r)});x.set(i,e)}let N={get(i,e,t){if(i instanceof IDBTransaction){if(e==="done")return x.get(i);if(e==="objectStoreNames")return i.objectStoreNames||z.get(i);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return g(i[e])},set(i,e,t){return i[e]=t,!0},has(i,e){return i instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in i}};function se(i){N=i(N)}function ae(i){return i===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=i.call(_(this),e,...t);return z.set(n,e.sort?e.sort():[e]),g(n)}:te().includes(i)?function(...e){return i.apply(_(this),e),g(G.get(this))}:function(...e){return g(i.apply(_(this),e))}}function re(i){return typeof i=="function"?ae(i):(i instanceof IDBTransaction&&ne(i),X(i,ee())?new Proxy(i,N):i)}function g(i){if(i instanceof IDBRequest)return ie(i);if(R.has(i))return R.get(i);const e=re(i);return e!==i&&(R.set(i,e),V.set(e,i)),e}const _=i=>V.get(i);function oe(i,e,{blocked:t,upgrade:n,blocking:s,terminated:a}={}){const r=indexedDB.open(i,e),l=g(r);return n&&r.addEventListener("upgradeneeded",o=>{n(g(r.result),o.oldVersion,o.newVersion,g(r.transaction),o)}),t&&r.addEventListener("blocked",o=>t(o.oldVersion,o.newVersion,o)),l.then(o=>{a&&o.addEventListener("close",()=>a()),s&&o.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const le=["get","getKey","getAll","getAllKeys","count"],ce=["put","add","delete","clear"],C=new Map;function H(i,e){if(!(i instanceof IDBDatabase&&!(e in i)&&typeof e=="string"))return;if(C.get(e))return C.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=ce.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||le.includes(t)))return;const a=async function(r,...l){const o=this.transaction(r,s?"readwrite":"readonly");let c=o.store;return n&&(c=c.index(l.shift())),(await Promise.all([c[t](...l),s&&o.done]))[0]};return C.set(e,a),a}se(i=>({...i,get:(e,t,n)=>H(e,t)||i.get(e,t,n),has:(e,t)=>!!H(e,t)||i.has(e,t)}));const de="dicoding-stories-db",ue=1,v="stories",w=oe(de,ue,{upgrade(i){i.createObjectStore(v,{keyPath:"id"})}}),m={async getStories(){return(await w).getAll(v)},async getStoryById(i){return i?(await w).get(v,i):null},async saveStory(i){if(i.id)return(await w).put(v,i)},async saveStories(i){const t=(await w).transaction(v,"readwrite");return i.forEach(n=>{t.store.put(n)}),t.done},async deleteStory(i){return(await w).delete(v,i)},async clearStories(){return(await w).clear(v)}},A={isOnline(){return navigator.onLine},listenToNetworkChanges(i,e){window.addEventListener("online",()=>{typeof i=="function"&&i()}),window.addEventListener("offline",()=>{typeof e=="function"&&e()})}},S={REGISTER:`${y.BASE_URL}/register`,LOGIN:`${y.BASE_URL}/login`,GET_STORIES:`${y.BASE_URL}/stories`,GET_STORY_DETAIL:i=>`${y.BASE_URL}/stories/${i}`,POST_STORY:`${y.BASE_URL}/stories/guest`,SUBSCRIBE_NOTIFICATION:`${y.BASE_URL}/notifications/subscribe`,UNSUBSCRIBE_NOTIFICATION:`${y.BASE_URL}/notifications/subscribe`},E=()=>localStorage.getItem("token"),me=i=>localStorage.setItem("token",i);async function he(i,e,t){try{const s=await(await fetch(S.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i,email:e,password:t})})).json();if(s.error)throw new Error(s.message);return{success:!0,message:s.message}}catch(n){return console.error("Error registering:",n),{success:!1,message:n.message}}}async function pe(i,e){try{const n=await(await fetch(S.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:i,password:e})})).json();if(n.error)throw new Error(n.message);return me(n.loginResult.token),{success:!0,user:{userId:n.loginResult.userId,name:n.loginResult.name}}}catch(t){return console.error("Error logging in:",t),{success:!1,message:t.message}}}async function ge(i=1,e=10){try{const t=E(),n=A.isOnline();if(!t)return{needsAuth:!0,stories:[]};if(!n)return{needsAuth:!1,stories:await m.getStories(),fromCache:!0};const a=await(await fetch(`${S.GET_STORIES}?page=${i}&size=${e}&location=1`,{method:"GET",headers:{Authorization:`Bearer ${t}`}})).json();if(a.error)throw new Error(a.message);return await m.saveStories(a.listStory),{needsAuth:!1,stories:a.listStory}}catch(t){console.error("Error getting stories:",t);try{return{needsAuth:!1,stories:await m.getStories(),fromCache:!0}}catch(n){return console.error("Error getting stories from IndexedDB:",n),{needsAuth:!1,stories:[],error:t.message}}}}async function ye(i){try{const e=E(),t=A.isOnline();if(!e)return{needsAuth:!0,story:null};if(!t){const a=await m.getStoryById(i);if(a)return{needsAuth:!1,story:a,fromCache:!0}}const s=await(await fetch(S.GET_STORY_DETAIL(i),{method:"GET",headers:{Authorization:`Bearer ${e}`}})).json();if(s.error)throw new Error(s.message);return await m.saveStory(s.story),{needsAuth:!1,story:s.story}}catch(e){console.error("Error getting story detail:",e);try{const t=await m.getStoryById(i);if(t)return{needsAuth:!1,story:t,fromCache:!0}}catch(t){console.error("Error getting story from IndexedDB:",t)}return{needsAuth:!1,story:null,error:e.message}}}async function ve(i){try{const e=E(),t=e?S.GET_STORIES:S.POST_STORY,n=e?{Authorization:`Bearer ${e}`}:{},a=await(await fetch(t,{method:"POST",headers:n,body:i})).json();if(a.error)throw new Error(a.message);return{success:!0,message:a.message}}catch(e){return console.error("Error adding story:",e),{success:!1,message:e.message}}}class fe{constructor({view:e}){this.view=e,this.stories=[],this.needsAuth=!1,this.isLoading=!0}async init(){this.isLoading=!0,this.view.updateStoriesList(this.view.renderSkeletons());const e=await ge();this.stories=e.stories,this.needsAuth=e.needsAuth,this.isLoading=!1,this._updateUI()}_updateUI(){let e="";this.needsAuth?e=this.view.renderAuthRequired():this.stories.length?e=this.view.renderStories(this.stories):e=this.view.renderEmptyState(),this.view.updateStoriesList(e),this.view.applyViewTransition()}}var F,$,j;class we{constructor(){u(this,F,[]);u(this,$,!1);u(this,j,!0)}async render(){return this.view=new Q,this.view.render()}async afterRender(){this.presenter=new fe({view:this.view}),await this.presenter.init()}}F=new WeakMap,$=new WeakMap,j=new WeakMap;class be{constructor(){this.container=document.querySelector("#main-content")}render(){return`
      <div class="skip-link">
        <a href="#content" class="skip-to-content">Skip to content</a>
      </div>
      <section id="content" class="container">
        <h1 class="page-title">About Dicoding Submission</h1>
        
        <div class="about-content">
          <p>
            Dalam mengerjakan proyek ini, ada beberapa kriteria yang perlu Anda penuhi. Kriteria-kriteria ini diperlukan agar Anda dapat lulus dari tugas ini.
            <span>Berikut adalah daftar kriteria utama yang harus Anda penuhi.</span>
          </p>
          
          <h2>Kriteria Wajib 1: Memanfaatkan Satu API sebagai Sumber Data</h2>
          <p>
            Anda WAJIB mengambil satu API sebagai sumber datanya. Pemilihan ini juga akan menentukan topik aplikasi yang akan Anda kembangkan. Oleh karena itu, silakan manfaatkan API yang telah kami sediakan. <a href="https://story-api.dicoding.dev/v1/">Story API Documentation</a>
          </p>
          
          <h2>Kriteria Wajib 2: Menggunakan Arsitektur Single-Page Application</h2>
          <p>
            Aplikasi yang Anda buat harus mengadopsi arsitektur Single-Page Application (SPA) seperti yang kami contohkan pada proyek latihan. Berikut adalah ketentuan yang WAJIB diterapkan.
          </p>
          <ul>
            <li>Menggunakan teknik hash (#) dalam menangani routing di browser.</li>
            <li>Menerapkan pola model-view-presenter (MVP) dalam pengelolaan data ke user interface.</li>
          </ul>

          <h2>Kriteria Wajib 3: Menampilkan Data</h2>
          <p>
            Aplikasi memiliki halaman yang menampilkan data dari API. Berikut adalah beberapa ketentuan yang WAJIB diterapkan.
          </p>
          <ul>
            <li>Data ditampilkan dalam bentuk daftar dan bersumber dari API pilihan Anda.</li>
            <li>Pada setiap item daftarnya, tampilkan minimal satu data gambar dan tiga data teks.</li>
            <li>Tambahkan peta digital untuk menunjukkan lokasi data.</li>
            <li>Pastikan peta memiliki marker dan menampilkan popup saat diklik.</li>
          </ul>
          <p>Hal yang perlu dicatat adalah SERTAKAN API key dari map service yang digunakan dalam STUDENT.txt jika memang aplikasi Anda membutuhkannya. Bila tidak memiliki berkas tersebut, silakan buat baru dalam root project, ya.</p>

          <h2>Kriteria Wajib 4:Memiliki Fitur Tambah Data Baru</h2>
          <p>Selain menampilkan data ke halaman, aplikasi WAJIB punya kemampuan menambahkan data baru ke API. Tentunya, ini berpotensi membutuhkan halaman baru untuk menampilkan formulir. Pastikan halaman tersebut berisi kolom-kolom input yang dibutuhkan untuk mendapatkan data dari user.</p>
          <p>Meskipun masing-masing API memiliki kebutuhan yang berbeda, ada kemiripan data. Berikut adalah beberapa ketentuan WAJIBNYA.</p>

          <ul>
            <li>Mengambil data gambar dengan kamera. Pastikan stream yang dibuat telah nonaktif jika tidak diperlukan lagi.</li>
            <li>Gunakan peta digital dan event klik untuk mengambil data latitude dan longitude. Anda diperkenankan memanfaatkan library apa pun selain yang diajarkan di kelas.</li>
          </ul>

          <h2>Kriteria Wajib 5: Menerapkan Aksesibilitas sesuai dengan Standar</h2>
          <p>
           Ada beberapa aspek dalam meningkatkan aksesibilitas aplikasi. Perhatikan ketentuan-ketentuan WAJIBNYA.
          </p>

          <ul>
            <li>Menerapkan skip to content.</li>
            <li>Memiliki teks alternatif pada konten-konten gambar yang esensial.</li>
            <li>Pastikan setiap form control, seperti input, berasosiasi dengan label agar mudah diakses.</li>
            <li>Menggunakan semantic element dalam menyusun struktur halaman dan landmarking HTML.</li>
          </ul>

          <h2>Kriteria Wajib 6: Merancang Transisi Halaman yang Halus</h2>
          <p>
            Untuk pengalaman pengguna yang makin baik, aplikasi Anda WAJIB mengimplementasikan gaya transisi halaman secara halus menggunakan View Transition API.
          </p>
        </div>
      </section>
    `}applyViewTransition(){document.documentElement.classList.add("view-transition")}}class ke{constructor({view:e}){this.view=e}async init(){this.view.applyViewTransition()}}class Se{constructor(){this.view=null,this.presenter=null}async render(){return this.view=new be,this.view.render()}async afterRender(){this.presenter=new ke({view:this.view}),await this.presenter.init()}}class Ee{constructor(){this.container=document.querySelector("#main-content"),this.map=null}renderLoadingSkeleton(){return`
      <div class="story-detail-content">
        <div class="story-detail-header">
          <div class="skeleton skeleton-title" style="height: 32px; width: 60%; margin-bottom: 0.5rem;"></div>
          <div class="skeleton skeleton-date" style="height: 16px; width: 30%;"></div>
        </div>
        
        <div class="story-detail-image-container">
          <div class="skeleton" style="height: 400px; width: 100%;"></div>
        </div>
        
        <div class="story-detail-description">
          <div class="skeleton" style="height: 16px; width: 100%; margin-bottom: 0.5rem;"></div>
          <div class="skeleton" style="height: 16px; width: 100%; margin-bottom: 0.5rem;"></div>
          <div class="skeleton" style="height: 16px; width: 80%; margin-bottom: 0.5rem;"></div>
          <div class="skeleton" style="height: 16px; width: 90%;"></div>
        </div>
        
        <div class="story-detail-location">
          <div class="skeleton" style="height: 24px; width: 30%; margin-bottom: 1rem;"></div>
          <div class="skeleton" style="height: 300px; width: 100%;"></div>
        </div>
      </div>
    `}renderStoryDetail(e,t){return`
      <div class="story-detail-content">
        <div class="story-detail-header">
          <h1 class="story-detail-name">${e.name}'s Story</h1>
          <p class="story-detail-date">${this._formatDate(e.createdAt)}</p>
        </div>
        
        <div class="story-detail-image-container">
          <img 
            src="${e.photoUrl}" 
            alt="Story by ${e.name}" 
            class="story-detail-image"
          />
        </div>
        
        <div class="story-detail-description">
          <p>${e.description}</p>
        </div>
        
        <div class="story-detail-actions">
          <button id="favorite-button" class="button ${t?"button-danger":"button-primary"}">
            ${t?"Hapus dari Favorit":"Simpan ke Favorit"}
          </button>
        </div>
        
        <div class="story-detail-location">
          <h2>Location</h2>
          <div id="map" class="story-map"></div>
        </div>
      </div>
    `}renderError(e){return`
      <div class="error-state">
        <p>${e}</p>
        <a href="#/" class="button">Back to Home</a>
      </div>
    `}renderAuthRequired(){return`
      <div class="auth-required">
        <h2>Login Required</h2>
        <p>Please login to view story details.</p>
        <div class="auth-actions">
          <a href="#/login" class="button button-primary">Login</a>
          <a href="#/register" class="button button-secondary">Register</a>
        </div>
      </div>
    `}render(){return`
      <div class="skip-link">
        <a href="#content" class="skip-to-content">Skip to content</a>
      </div>
      <section id="content" class="container story-detail-container">
        <a href="#/" class="back-button" aria-label="Back to stories">
          ← Back to stories
        </a>
        
        <div id="story-detail" class="story-detail">
          ${this.renderLoadingSkeleton()}
        </div>
      </section>
    `}updateStoryDetail(e){const t=document.getElementById("story-detail");t&&(t.innerHTML=e)}setupFavoriteButton(e){const t=document.getElementById("favorite-button");t&&t.addEventListener("click",e)}initMap(e){if(!e.lat||!e.lon){const n=document.getElementById("map");n&&(n.innerHTML="<p>No location data available for this story</p>");return}const t=document.createElement("script");if(t.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",t.integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=",t.crossOrigin="",!document.querySelector('link[href*="leaflet.css"]')){const n=document.createElement("link");n.rel="stylesheet",n.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",n.integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",n.crossOrigin="",document.head.appendChild(n)}document.head.appendChild(t),t.onload=()=>{const n=document.getElementById("map");if(!n)return;const s=window.L;this.map=s.map(n).setView([e.lat,e.lon],13),s.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this.map),s.marker([e.lat,e.lon]).addTo(this.map).bindPopup(`<b>${e.name}'s story location</b>`).openPopup()}}cleanupResources(){this.map&&(this.map.remove(),this.map=null)}applyViewTransition(){document.documentElement.classList.add("view-transition")}_formatDate(e){return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}}class Be{constructor({view:e,id:t}){this.view=e,this.id=t,this.story=null,this.needsAuth=!1,this.error=null,this.isLoading=!0,this.isFavorite=!1}async init(){this.isLoading=!0,this.view.updateStoryDetail(this.view.renderLoadingSkeleton());try{const t=await m.getStoryById(this.id);this.isFavorite=!!t}catch(t){console.error("Error checking favorite status:",t),this.isFavorite=!1}const e=await ye(this.id);this.story=e.story,this.needsAuth=e.needsAuth,this.error=e.error,this.isLoading=!1,this._updateUI(),window.addEventListener("hashchange",this._cleanup.bind(this))}_updateUI(){let e="";this.needsAuth?e=this.view.renderAuthRequired():this.story?(e=this.view.renderStoryDetail(this.story,this.isFavorite),setTimeout(()=>{this.view.setupFavoriteButton(this._handleFavoriteToggle.bind(this)),this.view.initMap(this.story)},100)):e=this.view.renderError(this.error||"Failed to load story"),this.view.updateStoryDetail(e),this.view.applyViewTransition()}async _handleFavoriteToggle(){if(this.story)try{this.isFavorite?(await m.deleteStory(this.id),this.isFavorite=!1):(await m.saveStory(this.story),this.isFavorite=!0),this._updateUI()}catch(e){console.error("Error toggling favorite status:",e),alert("Gagal mengubah status favorit")}}_cleanup(){this.view.cleanupResources(),window.removeEventListener("hashchange",this._cleanup.bind(this))}}function K(i){const e=i.split("/");return{resource:e[1]||null,id:e[2]||null}}function Le(i){let e="";return i.resource&&(e=e.concat(`/${i.resource}`)),i.id&&(e=e.concat("/:id")),e||"/"}function Z(){return location.hash.replace("#","")||"/"}function Ie(){const i=Z(),e=K(i);return Le(e)}function Ae(){const i=Z();return K(i)}class Te{constructor(){this.view=null,this.presenter=null}async render(){return this.view=new Ee,this.view.render()}async afterRender(){const{id:e}=Ae();if(!e){this.view.updateStoryDetail(this.view.renderError("Story not found"));return}this.presenter=new Be({view:this.view,id:e}),await this.presenter.init()}async beforeUnload(){this.view&&this.view.cleanupResources()}}class Pe{constructor(){this.container=document.querySelector("#main-content"),this.map=null,this.marker=null,this.mediaStream=null,this.selectedPosition=null,this.isSubmitting=!1}renderAuthRequired(){return`
      <div class="auth-required">
        <h2>Login Required</h2>
        <p>Please login to add your story.</p>
        <div class="auth-actions">
          <a href="#/login" class="button button-primary">Login</a>
          <a href="#/register" class="button button-secondary">Register</a>
        </div>
      </div>
    `}renderAddStoryForm(){return`
      <form id="add-story-form" class="add-story-form">
        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <textarea 
            id="description" 
            name="description" 
            class="form-input form-textarea" 
            placeholder="Tell your story..." 
            required
          ></textarea>
        </div>
        
        <div class="form-group">
          <label class="form-label">Photo</label>
          <div class="camera-container">
            <video id="camera-preview" class="camera-preview" autoplay playsinline></video>
            <canvas id="camera-canvas" class="camera-canvas" style="display: none;"></canvas>
            <div class="camera-controls">
              <button type="button" id="camera-capture" class="camera-button">
                Take Photo
              </button>
              <button type="button" id="camera-retake" class="camera-button" style="display: none;">
                Retake
              </button>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Location</label>
          <p class="form-help-text">Click on the map to set your story location</p>
          <div id="location-map" class="location-map"></div>
          <div id="selected-location" class="selected-location">
            <p>No location selected</p>
          </div>
        </div>
        
        <div class="form-actions">
          <a href="#/" class="button button-secondary">Cancel</a>
          <button type="submit" id="submit-button" class="button button-primary" disabled>
            Submit Story
          </button>
        </div>
      </form>
    `}render(){return`
      <div class="skip-link">
        <a href="#content" class="skip-to-content">Skip to content</a>
      </div>
      <section id="content" class="container add-story-container">
        <h1 class="page-title">Add New Story</h1>
        
        <div id="add-story-content">
          ${E()?this.renderAddStoryForm():this.renderAuthRequired()}
        </div>
      </section>
    `}initCamera(){const e=document.getElementById("camera-preview"),t=document.getElementById("camera-capture"),n=document.getElementById("camera-retake"),s=document.getElementById("camera-canvas"),a=document.getElementById("submit-button");return!e||!t||!n||!s||!a?Promise.resolve(null):navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}).then(r=>(this.mediaStream=r,e.srcObject=r,t.addEventListener("click",()=>{s.style.display="block",e.style.display="none";const l=s.getContext("2d");s.width=e.videoWidth,s.height=e.videoHeight,l.drawImage(e,0,0,s.width,s.height),t.style.display="none",n.style.display="inline-block",this.selectedPosition&&(a.disabled=!1)}),n.addEventListener("click",()=>{s.style.display="none",e.style.display="block",t.style.display="inline-block",n.style.display="none",a.disabled=!0}),r)).catch(r=>{console.error("Error accessing camera:",r);const l=document.querySelector(".camera-container");if(l){l.innerHTML=`
            <div class="error-state">
              <p>Failed to access camera. Please make sure you have granted camera permissions.</p>
              <input type="file" id="photo-upload" accept="image/*" class="form-input">
              <label for="photo-upload" class="button">Upload Photo Instead</label>
            </div>
          `;const o=document.getElementById("photo-upload");o&&o.addEventListener("change",c=>{c.target.files&&c.target.files[0]&&this.selectedPosition&&(a.disabled=!1)})}return null})}initMap(){const e=document.createElement("script");if(e.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",e.integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=",e.crossOrigin="",!document.querySelector('link[href*="leaflet.css"]')){const t=document.createElement("link");t.rel="stylesheet",t.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",t.integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",t.crossOrigin="",document.head.appendChild(t)}return document.head.appendChild(e),new Promise(t=>{e.onload=()=>{const n=document.getElementById("location-map"),s=document.getElementById("selected-location"),a=document.getElementById("submit-button");if(!n||!s||!a){t();return}const r=window.L;this.map=r.map(n).setView([-2.5489,118.0149],5),r.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this.map),this.map.on("click",l=>{const{lat:o,lng:c}=l.latlng;this.selectedPosition={lat:o,lon:c},this.marker?this.marker.setLatLng([o,c]):this.marker=r.marker([o,c]).addTo(this.map),s.innerHTML=`
            <p>Selected location: ${o.toFixed(6)}, ${c.toFixed(6)}</p>
          `;const U=document.getElementById("camera-canvas"),D=document.getElementById("photo-upload");(U&&U.style.display!=="none"||D&&D.files&&D.files.length>0)&&(a.disabled=!1)}),t()}})}setupFormSubmit(e){const t=document.getElementById("add-story-form");t&&t.addEventListener("submit",async n=>{n.preventDefault();const s=document.getElementById("description").value,a=document.getElementById("camera-canvas"),r=document.getElementById("photo-upload");if(!s){alert("Please enter a description");return}if(!this.selectedPosition){alert("Please select a location on the map");return}const l=new FormData;l.append("description",s),a&&a.style.display!=="none"?a.toBlob(async o=>{l.append("photo",o,"photo.jpg"),l.append("lat",this.selectedPosition.lat),l.append("lon",this.selectedPosition.lon),e(l)},"image/jpeg",.8):r&&r.files&&r.files.length>0?(l.append("photo",r.files[0]),l.append("lat",this.selectedPosition.lat),l.append("lon",this.selectedPosition.lon),e(l)):alert("Please take a photo or upload an image")})}showLoadingOverlay(e){if(document.getElementById("loading-overlay"))document.getElementById("loading-message").textContent=e,document.getElementById("loading-overlay").style.display="flex";else{const t=document.createElement("div");t.id="loading-overlay",t.className="loading-overlay",t.innerHTML=`
        <div class="loading-overlay-content">
          <div class="loading-spinner"></div>
          <p id="loading-message" class="loading-text">${e}</p>
        </div>
      `,document.body.appendChild(t)}}hideLoadingOverlay(){const e=document.getElementById("loading-overlay");e&&(e.style.display="none")}cleanupResources(){this.mediaStream&&(this.mediaStream.getTracks().forEach(e=>e.stop()),this.mediaStream=null),this.map&&(this.map.remove(),this.map=null)}applyViewTransition(){document.documentElement.classList.add("view-transition")}}class De{constructor({view:e}){this.view=e,this.isSubmitting=!1}async init(){if(!E()){this.view.applyViewTransition();return}await this.view.initCamera(),await this.view.initMap(),this.view.setupFormSubmit(this._handleSubmit.bind(this)),this.view.applyViewTransition(),window.addEventListener("hashchange",this._cleanup.bind(this))}async _handleSubmit(e){this.isSubmitting=!0,this.view.showLoadingOverlay("Submitting your story...");const t=await ve(e);this.view.hideLoadingOverlay(),this.isSubmitting=!1,t.success?(alert("Story added successfully!"),this._cleanup(),window.location.hash="#/"):alert(`Failed to add story: ${t.message}`)}_cleanup(){this.view.cleanupResources(),window.removeEventListener("hashchange",this._cleanup.bind(this))}}class Me{constructor(){this.view=null,this.presenter=null}async render(){return this.view=new Pe,this.view.render()}async afterRender(){this.presenter=new De({view:this.view}),await this.presenter.init()}async beforeUnload(){this.view&&this.view.cleanupResources()}}class Re{constructor(){this.container=document.querySelector("#main-content")}render(){return`
      <div class="skip-link">
        <a href="#content" class="skip-to-content">Skip to content</a>
      </div>
      <section id="content" class="container login-container">
        <h1 class="page-title">Login</h1>
        
        <div class="auth-card">
          <form id="login-form" class="auth-form">
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                class="form-input" 
                placeholder="Masukkan email Anda" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-input" 
                placeholder="Masukkan password Anda" 
                required
              />
            </div>
            
            <div id="login-error" class="error-message" style="display: none;"></div>
            
            <div class="form-actions">
              <button type="submit" id="login-button" class="button button-primary">Login</button>
            </div>
          </form>
          
          <div class="auth-alternative">
            <p>Belum punya akun? <a href="#/register">Daftar di sini</a></p>
            <p>Atau</p>
            <a href="#/" class="button button-secondary">Lanjutkan sebagai Tamu</a>
          </div>
        </div>
      </section>
    `}setupFormSubmit(e){const t=document.getElementById("login-form");t&&t.addEventListener("submit",async n=>{n.preventDefault();const s=document.getElementById("email").value,a=document.getElementById("password").value;e(s,a)})}showLoadingButton(){const e=document.getElementById("login-button");e&&(e.disabled=!0,e.innerHTML=`
        <span class="loading-spinner" style="width: 20px; height: 20px; border-width: 3px; margin-right: 8px;"></span>
        Logging in...
      `)}resetButton(){const e=document.getElementById("login-button");e&&(e.disabled=!1,e.textContent="Login")}showError(e){const t=document.getElementById("login-error");t&&(t.textContent=e||"Login gagal. Silakan coba lagi.",t.style.display="block")}hideError(){const e=document.getElementById("login-error");e&&(e.style.display="none")}showLoadingOverlay(e){if(document.getElementById("loading-overlay"))document.getElementById("loading-message").textContent=e,document.getElementById("loading-overlay").style.display="flex";else{const t=document.createElement("div");t.id="loading-overlay",t.className="loading-overlay",t.innerHTML=`
        <div class="loading-overlay-content">
          <div class="loading-spinner"></div>
          <p id="loading-message" class="loading-text">${e}</p>
        </div>
      `,document.body.appendChild(t)}}applyViewTransition(){document.documentElement.classList.add("view-transition")}}class _e{constructor({view:e}){this.view=e,this.isLoading=!1}async init(){this.view.setupFormSubmit(this._handleSubmit.bind(this)),this.view.applyViewTransition()}async _handleSubmit(e,t){this.isLoading=!0,this.view.showLoadingButton(),this.view.hideError();const n=await pe(e,t);this.isLoading=!1,this.view.resetButton(),n.success?(this.view.showLoadingOverlay("Login successful! Redirecting..."),setTimeout(()=>{window.location.hash="#/"},1e3)):this.view.showError(n.message)}}class Ce{async render(){return this.view=new Re,this.view.render()}async afterRender(){this.presenter=new _e({view:this.view}),await this.presenter.init()}}class Oe{constructor(){this.container=document.querySelector("#main-content")}render(){return`
      <div class="skip-link">
        <a href="#content" class="skip-to-content">Skip to content</a>
      </div>
      <section id="content" class="container register-container">
        <h1 class="page-title">Daftar Akun</h1>
        
        <div class="auth-card">
          <form id="register-form" class="auth-form">
            <div class="form-group">
              <label for="name" class="form-label">Nama</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                class="form-input" 
                placeholder="Masukkan nama Anda" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                class="form-input" 
                placeholder="Masukkan email Anda" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-input" 
                placeholder="Minimal 8 karakter" 
                minlength="8"
                required
              />
            </div>
            
            <div id="register-error" class="error-message" style="display: none;"></div>
            
            <div class="form-actions">
              <button type="submit" id="register-button" class="button button-primary">Daftar</button>
            </div>
          </form>
          
          <div class="auth-alternative">
            <p>Sudah punya akun? <a href="#/login">Login di sini</a></p>
            <p>Atau</p>
            <a href="#/" class="button button-secondary">Lanjutkan sebagai Tamu</a>
          </div>
        </div>
      </section>
    `}setupFormSubmit(e){const t=document.getElementById("register-form");t&&t.addEventListener("submit",async n=>{n.preventDefault();const s=document.getElementById("name").value,a=document.getElementById("email").value,r=document.getElementById("password").value;e(s,a,r)})}showLoadingButton(){const e=document.getElementById("register-button");e&&(e.disabled=!0,e.innerHTML=`
        <span class="loading-spinner" style="width: 20px; height: 20px; border-width: 3px; margin-right: 8px;"></span>
        Mendaftar...
      `)}resetButton(){const e=document.getElementById("register-button");e&&(e.disabled=!1,e.textContent="Daftar")}showError(e){const t=document.getElementById("register-error");t&&(t.textContent=e||"Pendaftaran gagal. Silakan coba lagi.",t.style.display="block")}hideError(){const e=document.getElementById("register-error");e&&(e.style.display="none")}showLoadingOverlay(e){if(document.getElementById("loading-overlay"))document.getElementById("loading-message").textContent=e,document.getElementById("loading-overlay").style.display="flex";else{const t=document.createElement("div");t.id="loading-overlay",t.className="loading-overlay",t.innerHTML=`
        <div class="loading-overlay-content">
          <div class="loading-spinner"></div>
          <p id="loading-message" class="loading-text">${e}</p>
        </div>
      `,document.body.appendChild(t)}}applyViewTransition(){document.documentElement.classList.add("view-transition")}}class xe{constructor({view:e}){this.view=e,this.isLoading=!1}async init(){this.view.setupFormSubmit(this._handleSubmit.bind(this)),this.view.applyViewTransition()}async _handleSubmit(e,t,n){this.isLoading=!0,this.view.showLoadingButton(),this.view.hideError();const s=await he(e,t,n);this.isLoading=!1,this.view.resetButton(),s.success?(this.view.showLoadingOverlay("Pendaftaran berhasil! Mengalihkan ke halaman login..."),setTimeout(()=>{window.location.hash="#/login"},1500)):this.view.showError(s.message)}}class Ne{async render(){return this.view=new Oe,this.view.render()}async afterRender(){this.presenter=new xe({view:this.view}),await this.presenter.init()}}class Fe{constructor(){this.container=document.querySelector("#main-content")}renderStories(e){return e.length?e.map(t=>`
      <article class="story-card">
        <a href="#/detail/${t.id}" class="story-link" aria-label="View story by ${t.name}">
          <div class="story-image-container">
            <img 
              src="${t.photoUrl}" 
              alt="Story by ${t.name}" 
              class="story-image"
              loading="lazy"
            />
          </div>
          <div class="story-content">
            <h2 class="story-name">${t.name}</h2>
            <p class="story-date">${this._formatDate(t.createdAt)}</p>
            <p class="story-description">${this._truncateText(t.description,100)}</p>
            <button class="button button-danger remove-favorite" data-id="${t.id}">
              Hapus dari Favorit
            </button>
          </div>
        </a>
      </article>
    `).join(""):this.renderEmptyState()}renderEmptyState(){return`
      <div class="empty-state">
        <p>Belum ada cerita yang disimpan sebagai favorit.</p>
        <a href="#/" class="button button-primary">Jelajahi Cerita</a>
      </div>
    `}render(){return`
      <div class="skip-link">
        <a href="#content" class="skip-to-content">Skip to content</a>
      </div>
      <section id="content" class="container stories-container">
        <h1 class="page-title">Cerita Favorit</h1>
        <p class="page-description">Cerita yang Anda simpan untuk dibaca nanti</p>
        
        <div id="stories-list" class="stories-list">
          <div class="loading-indicator">
            <div class="loading-spinner"></div>
            <p class="loading-text">Memuat cerita favorit...</p>
          </div>
        </div>
      </section>
    `}updateStoriesList(e){const t=document.getElementById("stories-list");t&&(t.innerHTML=e)}setupRemoveFavoriteButtons(e){document.querySelectorAll(".remove-favorite").forEach(n=>{n.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation();const a=n.dataset.id;e(a)})})}applyViewTransition(){document.documentElement.classList.add("view-transition")}_formatDate(e){return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}_truncateText(e,t){return e.length<=t?e:e.substring(0,t)+"..."}}class $e{constructor({view:e}){this.view=e,this.stories=[]}async init(){await this._loadFavorites(),this.view.applyViewTransition(),this.view.setupRemoveFavoriteButtons(this._handleRemoveFavorite.bind(this))}async _loadFavorites(){try{this.stories=await m.getStories();const e=this.view.renderStories(this.stories);this.view.updateStoriesList(e),this.view.setupRemoveFavoriteButtons(this._handleRemoveFavorite.bind(this))}catch(e){console.error("Error loading favorites:",e),this.view.updateStoriesList(this.view.renderEmptyState())}}async _handleRemoveFavorite(e){try{await m.deleteStory(e),await this._loadFavorites()}catch(t){console.error("Error removing favorite:",t),alert("Gagal menghapus cerita dari favorit")}}}class je{constructor(){this.view=null,this.presenter=null}async render(){return this.view=new Fe,this.view.render()}async afterRender(){this.presenter=new $e({view:this.view}),await this.presenter.init()}}const Ve={"/":new we,"/about":new Se,"/detail/:id":new Te,"/add":new Me,"/login":new Ce,"/register":new Ne,"/favorites":new je};var L,b,h,p,P,Y,k,I;class Ue{constructor({navigationDrawer:e,drawerButton:t,content:n}){u(this,P);u(this,k);u(this,L,null);u(this,b,null);u(this,h,null);u(this,p,null);B(this,L,n),B(this,b,t),B(this,h,e),f(this,P,Y).call(this),f(this,k,I).call(this)}async renderPage(){d(this,p)&&typeof d(this,p).beforeUnload=="function"&&await d(this,p).beforeUnload();const e=Ie();B(this,p,Ve[e]),d(this,L).innerHTML=await d(this,p).render(),await d(this,p).afterRender(),f(this,k,I).call(this)}}L=new WeakMap,b=new WeakMap,h=new WeakMap,p=new WeakMap,P=new WeakSet,Y=function(){d(this,b).addEventListener("click",()=>{d(this,h).classList.toggle("open")}),document.body.addEventListener("click",e=>{!d(this,h).contains(e.target)&&!d(this,b).contains(e.target)&&d(this,h).classList.remove("open"),d(this,h).querySelectorAll("a").forEach(t=>{t.contains(e.target)&&d(this,h).classList.remove("open")})})},k=new WeakSet,I=function(){const e=document.getElementById("login-menu");localStorage.getItem("token")?(e.textContent="Logout",e.href="#/logout",e.addEventListener("click",n=>{n.preventDefault(),localStorage.removeItem("token"),window.location.hash="#/",f(this,k,I).call(this)})):(e.textContent="Login",e.href="#/login")};const qe={async requestPermission(){return"Notification"in window?await Notification.requestPermission()!=="granted"?(console.error("Izin notifikasi tidak diberikan"),!1):!0:(console.error("Browser tidak mendukung notifikasi"),!1)},async showNotification(i,e){if(!this.requestPermission())return;if(!("serviceWorker"in navigator)){console.error("Service Worker tidak didukung browser ini");return}(await navigator.serviceWorker.ready).showNotification(i,e)},async subscribePushNotification(i){if(!await this.requestPermission())return{success:!1,message:"Izin notifikasi tidak diberikan"};if(!("PushManager"in window))return{success:!1,message:"Push notification tidak didukung browser ini"};try{const t=await navigator.serviceWorker.ready,n=await t.pushManager.getSubscription();if(n)return{success:!0,subscription:n};const s=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:this._urlBase64ToUint8Array("BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk")});return await this._sendSubscriptionToServer(s,i),{success:!0,subscription:s}}catch(t){return console.error("Error subscribing to push notifications:",t),{success:!1,message:t.message}}},async unsubscribePushNotification(i){if(!("serviceWorker"in navigator))return{success:!1,message:"Service Worker tidak didukung browser ini"};try{const t=await(await navigator.serviceWorker.ready).pushManager.getSubscription();return t?(await this._sendUnsubscriptionToServer(t,i),await t.unsubscribe(),{success:!0}):{success:!0,message:"Tidak ada langganan yang perlu dibatalkan"}}catch(e){return console.error("Error unsubscribing from push notifications:",e),{success:!1,message:e.message}}},async _sendSubscriptionToServer(i,e){const t=i.toJSON(),s=await(await fetch("https://story-api.dicoding.dev/v1/notifications/subscribe",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({endpoint:t.endpoint,keys:{p256dh:t.keys.p256dh,auth:t.keys.auth}})})).json();if(s.error)throw new Error(s.message);return s},async _sendUnsubscriptionToServer(i,e){const t=i.toJSON(),s=await(await fetch("https://story-api.dicoding.dev/v1/notifications/subscribe",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({endpoint:t.endpoint})})).json();if(s.error)throw new Error(s.message);return s},_urlBase64ToUint8Array(i){const e="=".repeat((4-i.length%4)%4),t=(i+e).replace(/-/g,"+").replace(/_/g,"/"),n=window.atob(t),s=new Uint8Array(n.length);for(let a=0;a<n.length;++a)s[a]=n.charCodeAt(a);return s}},We=!!document.startViewTransition,He=async()=>{if("serviceWorker"in navigator)try{const i=await navigator.serviceWorker.register("/webintermediateproyekakhir/sw.js");console.log("Service Worker registered with scope:",i.scope);const e=E();e&&await qe.subscribePushNotification(e)}catch(i){console.error("Service Worker registration failed:",i)}},O=i=>{const e=document.getElementById("notification-container"),t=document.getElementById("notification-message"),n=document.getElementById("notification-close");!e||!t||!n||(i?(t.textContent="Anda kembali online! Konten telah diperbarui.",e.classList.add("online")):(t.textContent="Anda sedang offline. Beberapa fitur mungkin tidak tersedia.",e.classList.add("offline")),e.classList.add("show"),n.addEventListener("click",()=>{e.classList.remove("show"),setTimeout(()=>{e.classList.remove("online","offline")},300)}),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>{e.classList.remove("online","offline")},300)},5e3))};document.addEventListener("DOMContentLoaded",async()=>{await He();const i=new Ue({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")});await i.renderPage(),window.addEventListener("hashchange",async()=>{We?document.startViewTransition(()=>i.renderPage()):await i.renderPage()}),A.listenToNetworkChanges(()=>O(!0),()=>O(!1)),A.isOnline()||O(!1)});

var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},e.parcelRequired7c6=n),n("fzPCc");var i=n("2shzp");function a(e){let t=JSON.parse(localStorage.getItem(e));return console.log(t),t}function o(e){return!(!e||"Array"!=e.constructor.name)}function s(e){return renderFavoritesPerPage="",e.filter(((e,t)=>{let r=(currentPage-1)*pageSize,n=currentPage*pageSize;if(t>=r&&t<n)return!0})).forEach((e=>{renderFavoritesPerPage+=`<li class="favor-item">\n    <img\n      src=${e.preview}\n      class="img-favor"\n      alt="preview"\n      width="335"\n      height="335"\n    />\n    <div class="card-favor">\n      <h2 class="title-favor">${e.title}</h2>\n      <p class="desc-favor">${e.description}</p>\n      <div class="rating-btn-favor">\n        <p class="rating-favor">Rating: ${function(e){let t=[];e=Math.round(e/100),console.log(e);for(let r=e;r>=1;r--)t.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');return t=t.join(" "),t}(e.popularity)}</p>\n        <btn class="btn-favor">See recipe</btn>\n      </div>\n    </div>\n  </li>`})),renderFavoritesPerPage}async function l(e=1){u(e),f(e);const t=a("favorites");o(t)?(renderedFavoritesPerPage=s(t),document.getElementById("favorList").innerHTML=renderedFavoritesPerPage):document.getElementById("favorList").innerHTML="<li>LocalStorage is empty</li>"}function c(){if(favorites=a("favorites"),!o(favorites))return 0;try{return Math.ceil(favorites.length/pageSize)}catch(e){return console.log(e),0}}function u(e){prevButton.style.visibility=1===e?"hidden":"visible"}function f(e){0===c()||e===c()?nextButton.style.visibility="hidden":nextButton.style.visibility="visible"}mobile=!0,BASE_URL="https://tasty-treats-backend.p.goit.global/api",currentPage=1,pageSize=1,async function(){var e,t;favoriteRecipes=await async function(){const e=await i.default.get(`${BASE_URL}/recipes/popular`);return console.log(e.data),e.data}(),e="favorites",t=favoriteRecipes,localStorage.setItem(e,JSON.stringify(t))}(),l(),document.querySelector("#prevButton").addEventListener("click",(function(){currentPage>1&&(currentPage--,l(currentPage))}),!1),document.querySelector("#nextButton").addEventListener("click",(function(){favorites=a("favorites"),currentPage*pageSize<favorites.length&&(currentPage++,l(currentPage))}),!1);
//# sourceMappingURL=favorites.c9694ea1.js.map

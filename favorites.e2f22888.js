!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},t.parcelRequired7c6=i),i("4CyeO");var a=i("bpxeT"),o=i("2TvXO"),c=i("dIxxU");function s(){return u.apply(this,arguments)}function u(){return(u=e(a)(e(o).mark((function t(){var n;return e(o).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.default.get("".concat(BASE_URL,"/recipes/popular"));case 2:return n=e.sent,console.log(n.data),e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function l(){return(l=e(a)(e(o).mark((function t(){return e(o).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s();case 2:favoriteRecipes=e.sent,f("favorites",favoriteRecipes);case 4:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function f(e,t){localStorage.setItem(e,JSON.stringify(t))}function p(e){var t=JSON.parse(localStorage.getItem(e));return console.log(t),t}function d(e){return!(!e||"Array"!=e.constructor.name)}a=i("bpxeT"),o=i("2TvXO");function v(e){return renderFavoritesPerPage="",e.filter((function(e,t){var n=(currentPage-1)*pageSize,r=currentPage*pageSize;if(t>=n&&t<r)return!0})).forEach((function(e){renderFavoritesPerPage+='<li class="favor-item">\n    <img\n      src='.concat(e.preview,'\n      class="img-favor"\n      alt="preview"\n      width="335"\n      height="335"\n    />\n    <div class="card-favor">\n      <h2 class="title-favor">').concat(e.title,'</h2>\n      <p class="desc-favor">').concat(e.description,'</p>\n      <div class="rating-btn-favor">\n        <p class="rating-favor">Rating: ').concat(function(e){var t=[];e=Math.round(e/100),console.log(e);for(var n=e;n>=1;n--)t.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');return t.join(" ")}(e.popularity),'</p>\n        <btn class="btn-favor">See recipe</btn>\n      </div>\n    </div>\n  </li>')})),renderFavoritesPerPage}function g(){return h.apply(this,arguments)}function h(){return h=e(a)(e(o).mark((function t(){var n,r,i=arguments;return e(o).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:b(n=i.length>0&&void 0!==i[0]?i[0]:1),m(n),d(r=p("favorites"))?(renderedFavoritesPerPage=v(r),document.getElementById("favorList").innerHTML=renderedFavoritesPerPage):document.getElementById("favorList").innerHTML="<li>LocalStorage is empty</li>";case 5:case"end":return e.stop()}}),t)}))),h.apply(this,arguments)}function y(){if(favorites=p("favorites"),!d(favorites))return 0;try{return Math.ceil(favorites.length/pageSize)}catch(e){return console.log(e),0}}function b(e){prevButton.style.visibility=1===e?"hidden":"visible"}function m(e){0===y()||e===y()?nextButton.style.visibility="hidden":nextButton.style.visibility="visible"}mobile=!0,BASE_URL="https://tasty-treats-backend.p.goit.global/api",currentPage=1,pageSize=mobile?1:12,function(){l.apply(this,arguments)}(),g(),document.querySelector("#prevButton").addEventListener("click",(function(){currentPage>1&&(currentPage--,g(currentPage))}),!1),document.querySelector("#nextButton").addEventListener("click",(function(){favorites=p("favorites"),currentPage*pageSize<favorites.length&&(currentPage++,g(currentPage))}),!1)}();
//# sourceMappingURL=favorites.e2f22888.js.map
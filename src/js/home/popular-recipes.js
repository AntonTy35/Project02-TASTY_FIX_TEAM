import axios from 'axios';
import "simplelightbox/dist/simple-lightbox.min.css"; 
import SimpleLightbox from 'simplelightbox'; 


const lightbox = new SimpleLightbox('.popular a', {
  captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250 , scaleImageToRatio: true , heightRatio: 0.8 , widthRatio: 0.9
});
const popularList = document.querySelector(".popular-list");
console.log(0, popularList); 
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/popular';

//  https://tasty-treats-backend.p.goit.global/api/recipes?page=1&limit=6  - всі рецепти
// https://tasty-treats-backend.p.goit.global/api/recipes/popular - popular


const getPopular = () => axios.get(`${BASE_URL}`);

getPopular()
    .then(response => renderPopularList(response))
    .catch(console.warn);

function renderPopularList(response) {   
    console.log("1 - response", response); 
    console.log("1.1 - popularList", popularList);
  popularList.innerHTML = createPopularGalleryCards(response);
  lightbox.refresh();
//   btnLoadMore.style.display = 'block';
    
}

function createPopularGalleryCards(response) {
  console.log(`2-  response: `, response.data[0].title);
//   let totalImages = users.total;
//   onFetchSuccess(totalImages); щоб показать скільки карток ...
  const markup = response.data
      .map((whatnot) => {
        // console.log(`3-  response: `, whatnot.preview);
        return `<div class="popular_gallery_card">
          <a class="popular_gallery_info" href="${whatnot.preview}">
            <img class="popular_gallery_image" src="${whatnot.preview}" alt="${whatnot.title}" width="64" height="64">
          </a>
              <div class="popular_gallery_list">                 
                 <p class="popular_gallery_list_item popular_gallery_list_item_title">${whatnot.title}</p>
                 <p class="popular_gallery_list_item popular_gallery_list_item_description">${whatnot.description}</p>          
              </div>          
        </div>`;
    })
        .join("");
    // console.log(`4 - markup: `, markup);
  return markup;
}

//  <p class="gallery_list_item"><b class="gallery_list_item_info">#id </b>${whatnot._id}</p>

// ----------------------- **************        -------------------

// const lightbox_rec = new SimpleLightbox('.popular_on_recipes a', {
//   captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250 , scaleImageToRatio: true , heightRatio: 0.8 , widthRatio: 0.9
// });
// const popularAllRecipes = document.querySelector(".popular_all_recipes");
// console.log(2.0, popularAllRecipes); 
// const BASE_URL_ALL = 'https://tasty-treats-backend.p.goit.global/api/recipes?page=1&limit=9';

// const getRecipesAll = () => axios.get(`${BASE_URL_ALL}`);

// getRecipesAll()
//     .then(response => renderPopularAllRecipes(response))
//     .catch(console.warn);

// function renderPopularAllRecipes(response) {   
//     console.log("2.1 - response", response); 
//     console.log("2.2 - popularList", popularList);
//   popularAllRecipes.innerHTML = createAllRecipesGalleryCards(response);
//   lightbox_rec.refresh();

    
// }

// function createAllRecipesGalleryCards(response) {
//   console.log(`2.3-  response: `, response.data.results);

//   const markup = response.data.results
//       .map((whatnot) => {
//         // console.log(`3-  response: `, whatnot.preview);
//         return `<div class="all_gallery_card">
//           <a class="all_gallery_info" href="${whatnot.preview}">
//             <img class="all_gallery_image" src="${whatnot.preview}" alt="${whatnot.title}" width="132" height="132">
//           </a>
//               <div class="all_gallery_list">                 
//                  <p class="all_gallery_list_item_title">${whatnot.title}</p>
//                  <p class="popular_gallery_list_item_description">${whatnot.category}</p>          
//               </div>          
//         </div>`;
//     })
//         .join("");
//     console.log(`2.4 - markup: `, markup);
//   return markup;
// }
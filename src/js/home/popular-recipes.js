import axios from 'axios';

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
//   lightbox.refresh();
//   btnLoadMore.style.display = 'block';
    
}

function createPopularGalleryCards(response) {
  console.log(`2-  response: `, response.data[0].title);
//   let totalImages = users.total;
//   onFetchSuccess(totalImages); щоб показать скільки карток ...
  const markup = response.data
      .map((whatnot) => {
        // console.log(`3-  response: `, whatnot.preview);
        return `<div class="gallery_card">
          <a class="gallery_info" href="${whatnot.preview}">
            <img class="gallery_image" src="${whatnot.preview}"" alt="" width="48" height="48">
          </a>
              <div class="gallery_list">
                 <p class="gallery_item"><b class="gallery_item_info">#id </b>${whatnot._id}"</p>
                 <p class="gallery_item"><b class="gallery_item_info">Title </b>${whatnot.title}"</p>
                 <p class="gallery_item"><b class="gallery_item_info">Popularity </b>${whatnot.popularity}"</p>          
              </div>          
        </div>`;
    })
        .join("");
    // console.log(`4 - markup: `, markup);
  return markup;
}
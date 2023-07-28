import axios from 'axios';
import "simplelightbox/dist/simple-lightbox.min.css"; 
import SimpleLightbox from 'simplelightbox'; 

const lightbox = new SimpleLightbox('.popular a', {
  captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250 , scaleImageToRatio: true , heightRatio: 0.8 , widthRatio: 0.9
});
const popularList = document.querySelector(".popular-list");
// console.log(0, popularList); 
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/popular';



const getPopular = () => axios.get(`${BASE_URL}`);

getPopular()
    .then(response => renderPopularList(response))
    .catch(console.warn);

function renderPopularList(response) {   
    // console.log("1 - response", response); 
    // console.log("1.1 - popularList", popularList);
  popularList.innerHTML = createPopularGalleryCards(response);
  lightbox.refresh();

    
}

function createPopularGalleryCards(response) {
  console.log(`2-  response: `, response.data[0].title);

  const markup = response.data
      .map((whatnot) => {
        
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
    
  return markup;
}
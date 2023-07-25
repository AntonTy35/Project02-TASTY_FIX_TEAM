let $ = require('jquery');

// slider from library

function sliderStart() {
  $(document).ready(function () {
    $('.slider').slick({
      variableWidth: true,
      arrows: false,
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 5000,
    });
  });
}

// eles from DOM
const refs = {
  slider: document.querySelector('.slider'),
};

// request to and response from backend
async function fetchEvents() {
  try {
    let response = await fetch('https://tasty-treats-backend.p.goit.global/api/events');
    let arrEvents = await response.json();
    return arrEvents;
  } catch (error) {
    console.error(error);
  }
}

// markup of card for slider

function renderSlider(arrEvents) {
  const markup = arrEvents
    .map(event => {
      return `

      
      <div class="slider-item-cook" >
      <img src="${event.cook.imgUrl}" loading="lazy" alt="${event.cook.name}">
      </div>
      
      <div class="slider-item-topic bcg">
        <img src="${event.topic.imgUrl}" loading="lazy" alt="${event.topic.name}">
        <p class="description">${event.topic.name}</p>
        <p class="country">${event.topic.area}</p>
      </div>
      
      <div class="slider-item-finally">
        <img src="${event.topic.imgUrl}" loading="lazy" alt="${event.topic.name}">
      </div>
      
   
    
       
        `;
    })
    .join('');

  refs.slider.insertAdjacentHTML('beforeend', markup);
}

//starting all functions

async function start() {
  try {
    const data = await fetchEvents();
    sliderStart();
    renderSlider(data);
  } catch (error) {
    console.error(error);
  }
}
start();
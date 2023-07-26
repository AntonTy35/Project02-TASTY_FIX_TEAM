// import { patchRating } from "./API";

const rafs ={
    backdropModalRating : document.querySelector('.backdrop-rating'),
    modalRating : document.querySelector('.modal-rating'),
    closeModalRating : document.querySelector('.close-rating-modal'),
    modalRatingList : document.querySelector('.modal-rating-list'),
    modalRatingValue : document.querySelector('.modal-rating-span'),
    modalRatingForm :document.querySelector('.modal-rating-form'),
    ratingRangeInput : document.querySelector('.rating-range-input'),
    ratingEmailInput : document.querySelector('.rating-email-input'),
   modalRatingSend : document.querySelector('.modal-rating-send-btn'),
}

refs.modalRatingList.addEventListener('click', fetchRate); 
refs.closeModalRating.addEventListener('click', closeModalRating)



function fetchRate(evt){
    const target = evt.target.closest('.modal-rating-star-item');

    if (target) {
      const rate = [...evt.currentTarget.children].indexOf(target) + 1;
      [...evt.currentTarget.children].forEach((el, i) => i <= rate - 1 ? el.classList.add('is-rated') : el.classList.remove('is-rated')
      );
      refs.modalRatingValue.textContent = rate.toFixed(1);
      refs.ratingRangeInput.value = rate;
    }
}
// async function SubmitRatingStar(evt) {
//     evt.preventDefault();
//     const data = {
//       rate: Number(evt.target.elements['raiting-star'].value),
//       email: evt.target.elements['email'].value,
//     };
//     const id = refs.modalRatingForm.dataset.id;
  
//     await patchRating(id, data);
//     Notiflix.Notify.success('Thank you for appreciating the recipe.');
  
//     // CloseModal();
//   }




  

function valiDateEmail(email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  }

function checkMailInputs() {
    if (!valiDateEmail(refs.ratingEmailInput.value)) {
      refs.ratingEmailInput.style.borderColor = '#b83245';
      refs.modalRatingSend.disabled = true;
    } else {
      refs.ratingEmailInput.style.borderColor = '#9bb537';
      refs.modalRatingSend.disabled = false;
    }
  }
  function restoreForm() {
    [...refs.modalRatingList.children].forEach(el =>
      el.classList.remove('is-rated')
    );
    refs.rateEmail.style.borderColor = '';
    refs.modalRatingSend.disabled = true;
    refs.modalRatingValue.textContent = '0.0';
    refs.modalRatingForm.dataset.id = '';
    refs.modalRatingForm.reset();
  }

//   ============================
refs.modalRating.classList.remove('is-hidden-modal');

refs.closeModalRating.addEventListener('click', CloseRateModal); //1
refs.modalRatingList.addEventListener('click', GiveRate); //2
refs.ratingEmailInput.addEventListener('input', checkRateInputs); //3
refs.modalRatingForm.addEventListener('submit', SubmitRate); //4
const refs = {
  openModalBtn: document.querySelector('[data-modal-order-now-open]'),
  closeModalBtn: document.querySelector('[data-modal-order-now-close]'),
  modal: document.querySelector('[data-modal-order-now]'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.modal.classList.toggle('is-hidden-modal-order-now');
}

// Відкриття та закриття модального вікна:
const refs = {
  openModalBtn: document.querySelector('[data-modal-order-now-open]'),
  closeModalBtn: document.querySelector('[data-modal-order-now-close]'),
  modal: document.querySelector('[data-modal-order-now]'),
};

// refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.modal.classList.toggle('is-hidden-modal-order-now');
}
// Відправка даних з форми на сервер:
document
  .getElementById('contactFormOrderNow')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    // Збираємо дані з форми
    const name = document.querySelector("input[name='user_name']").value;
    const phone = document.querySelector("input[name='user-phone']").value;
    const email = document.querySelector("input[name='user-email']").value;
    const message = document.querySelector(
      "textarea[name='user-massage']"
    ).value;

    // Формуємо об'єкт з даними, який будемо передавати на сервер
    const formData = {
      name: name,
      phone: phone,
      email: email,
      message: message,
    };

    // Відправка даних на сервер
    fetch('https://tasty-treats-backend.p.goit.global/api/orders/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from server:', data);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  });

//  Темна тема екрану:
const toggleButton = document.getElementById('switcherCheckbox');
console.log(toggleButton);

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

const searchCategories = async () => {
  try {
    const response = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/categories'
    );
    const dataDetails = await response.json();
    const categories = dataDetails.map(category => category.name);

    return categories;
  } catch (error) {
    console.error('ERROR', error);
    return [];
  }
};

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
const allCategoriesBtn = document.querySelector('.all-categories-btn');
const allCategoriesList = document.querySelector('.all-categories-list');

async function handleCategoryClick(e) {
  const target = e.target;
  if (target.matches('button.all-categories-item-btn')) {
    allCategoriesBtn.classList.remove('btn-active');
    await handleQuery(`${BASE_URL}/recipes`, { category: target.innerText });
    return;
  }
}

async function handleAllCategoryClick(e) {
  allCategoriesBtn.classList.add('btn-active');
  await handleQuery(`${BASE_URL}/recipes`);
  return;
}

async function createAllCategireisItem() {
  const categories = await searchCategories();

  const allCategireisItem = categories
    .map(category => {
      return `<li class="all-categories-item" >
                <button class="all-categories-item-btn"
                  type="button">${category}
                </button>
                </li>
                `;
    })
    .join('');

  allCategoriesList.insertAdjacentHTML('afterbegin', allCategireisItem);
}

createAllCategireisItem();
allCategoriesList.addEventListener('click', handleCategoryClick);
allCategoriesBtn.addEventListener('click', handleAllCategoryClick);

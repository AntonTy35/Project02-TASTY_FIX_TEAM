import SlimSelect from 'slim-select';

const filterTimeSelect = document.querySelector('.filter-bar-time-select');
// const filterSelect = document.getElementsByClassName('.filter-bar-select');

// Додавання параметрів у селектор Time
function addOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.text = text;
  filterTimeSelect.appendChild(option);
}
for (let i = 5; i <= 120; i += 5) {
  addOption(i, `${i} min`);
}
// new SlimSelect({
//   select: filterSelect,
//   settings: {
//     showSearch: false,

//     searchHighlight: true,
//   },
// });

const selects = document.querySelectorAll('.filter-bar-select');
// selects.forEach(selectElement => {
//   new SlimSelect({
//     select: selectElement,
// settings: {
//   showSearch: false,

//   searchHighlight: true,
// },
//   });
//   setSlimData(selectElement);
// });
console.log(selects);

new SlimSelect({
  select: '#selectTime',
  settings: {
    showSearch: false,

    searchHighlight: true,
  },
});
new SlimSelect({
  select: '#selectArea',
  settings: {
    showSearch: false,

    searchHighlight: true,
  },
});
new SlimSelect({
  select: '#selectIngrs',
  settings: {
    showSearch: false,

    searchHighlight: true,
  },
});

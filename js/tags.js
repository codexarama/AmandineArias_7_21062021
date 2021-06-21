// HANDLE FILTER BOXES EVENTS
// DOM ELEMENTS
const searchBox = document.querySelectorAll('.search-box');
// OPEN / CLOSE FILTER BOXES
// add / remouve attributes
for (let i = 0; i < searchBox.length; i++) {
  searchBox[i].addEventListener('click', (event) => {
    event.preventDefault();
    searchBox[i].classList.toggle('open');
    const searchBtn = searchBox[i].firstElementChild;
    searchBtn.style.width = '40rem';
    const searchItem = searchBtn.children[1];
    searchItem.style.display = 'block';
    searchItem.setAttribute(
      'placeholder',
      'Rechercher des ' + searchBtn.textContent.toLowerCase().trim()
    );
    searchBtn.children[0].style.display = 'none';
  });

  // close filter boxes without target
  window.addEventListener('click', function (e) {
    if (!searchBox[i].contains(e.target)) {
      searchBox[i].classList.remove('open');
      const searchBtn = searchBox[i].firstElementChild;
      searchBtn.children[0].style.display = 'flex';
      searchBtn.style.width = '8.25rem';
      const searchItem = searchBtn.children[1];
      searchItem.style.display = 'none';
    }
  });
}

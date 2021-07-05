// TAGS EVENTS
// ingredients, appareils, ustensiles

// MAIN DOM ELEMENT
const tagLabel = document.querySelectorAll('.tag-label');

// DEPENDANT DOM ELEMENTS
tagLabel.forEach((label) => {
  const tagInput = label.parentNode.children[1];

  // HANDLE TEXT INPUT ACCESS
  label.addEventListener('click', (event) => {
    event.preventDefault();
    label.style.display = 'none';
    tagInput.setAttribute('placeholder', 'Rechercher');
    tagInput.style.display = 'block';
    tagInput.style.width = '5rem';
  });
});

// OPEN / CLOSE FILTER BOXES by clicking on the arrow
// MAIN DOM ELEMENT
const tagArrow = document.querySelectorAll('.tag-arrow');

// DEPENDANT DOM ELEMENTS
tagArrow.forEach((arrow) => {
  const tagBox = arrow.parentNode.parentNode;
  const tagBtn = arrow.parentNode;
  const tagLabel = tagBtn.children[0];
  const searchTag = tagBtn.children[1];
  const tagsList = tagBox.children[1];

  // HANDLE OPEN FILTER BOXES EVENTS
  arrow.addEventListener('click', (event) => {
    event.preventDefault();
    tagBox.classList.toggle('open');
    tagBtn.style.width = '40rem';
    tagBtn.style.borderRadius = '0.25rem 0.25rem 0 0'
    tagLabel.style.display = 'none';

    searchTag.setAttribute(
      'placeholder',
      'Rechercher des ' + tagBtn.textContent.toLowerCase().trim()
    );

    searchTag.style.display = 'block';
    searchTag.focus();
    tagsList.style.display = 'flex';

    if (!tagBox.classList.contains('open')) {
      searchTag.style.display = 'none';
      tagBtn.style.width = '8.25rem';
      tagBtn.style.borderRadius = '0.25rem'
      tagsList.style.display = 'none';
      tagLabel.style.display = 'inline-block';
    }
  });

  // CLOSE FILTER BOXES WITHOUT TARGET
  window.addEventListener('click', function (e) {
    if (!arrow.contains(e.target)) {
      tagBox.classList.remove('open');
      tagLabel.style.display = 'flex';
      tagBtn.style.width = '8.25rem';
      searchTag.style.display = 'none';
      tagsList.style.display = 'none';
      tagBtn.style.borderRadius = '0.25rem'
    }

    if (tagLabel.contains(e.target)) {
      tagLabel.style.display = 'none';
      searchTag.style.display = 'flex';
      searchTag.focus();
    }
  });
});

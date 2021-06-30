// RESULTATS RECHERCHE (from main search bar)
const generalSearch = document.querySelector('.search-bar');
// detecte et montre correspondances
function searchRecipe() {
  const recipeName = document.querySelectorAll('.recipe-name');
  const filter = generalSearch.value.toUpperCase();
  for (let i = 0; i < recipeName.length; i++) {
    const name = recipeName[i].getElementsByTagName('a')[0];
    const textValue = name.textContent || name.innerText;
    if (textValue.toUpperCase().indexOf(filter) > -1) {
      recipeChoice.style.display = 'flex';
      recipeName[i].style.display = '';
      recipeName[i].classList.add('matches');
    } else {
      recipeName[i].style.display = 'none';
      recipeName[i].classList.remove('matches');
    }
  }
}

// AFFICHE SELECTION(S)
function displaySelection() {
  // DOM elements
  const selectionList = [];
  const searchList = document.querySelectorAll('[role="option"]');
  // Affiche tag(s) correspondant au(x) choi(x)
  searchList.forEach((item) =>
    item.addEventListener('click', (event) => {
      event.preventDefault();
      // retire "selected" du choix precedent
      if (item.classList.contains('selected'))
        item.classList.remove('selected');
      // affecte "selected" au nouveau choix
      item.classList.add('selected');
      // tableau choix (sans doublons)
      if (!selectionList.includes(item)) {
        selectionList.push(item);
        // cree tag(s) correspondant(s)
        createTag(item);
        const lastSelection =
          document.querySelector('#tags-collection').lastChild;
        // affecte couleur au tag selon correspondance
        if (item.classList.contains('recipe-name'))
          lastSelection.classList.add('recipes-result-btn');
        if (item.classList.contains('ingredients-option'))
          lastSelection.classList.add('ingredients-result-btn');
        if (item.classList.contains('appliances-option'))
          lastSelection.classList.add('appliances-result-btn');
        if (item.classList.contains('ustensils-option'))
          lastSelection.classList.add('ustensils-result-btn');
      }
    })
  );
}

// AFFICHE MESSAGE SI AUCUN CRITERE DE RECHERCHE NE CORRESPOND
// MASQUE MESSAGE DANS LE CAS CONTRAIRE
function checkMatches() {
  const searchMatches = document.querySelectorAll('.matches');
  const alert = document.querySelector('.alert-msg')
  createAlert();
  if (searchMatches.length === 0)
  alert.style.display = 'block';
  else alert.style.display = 'none';
}

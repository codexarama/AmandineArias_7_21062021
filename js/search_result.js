// RESULTATS RECHERCHE (from main search bar)
const generalSearch = document.querySelector('.search-bar');
// detecte et montre correspondances
function searchRecipe() {
  const recipeOption = document.querySelectorAll('.recipe-option');
  const filter = generalSearch.value.toUpperCase();
  for (let i = 0; i < recipeOption.length; i++) {
    const name = recipeOption[i].getElementsByTagName('a')[0];
    const textValue = name.textContent || name.innerText;
    // if (textValue.length > 3 && textValue.toUpperCase().indexOf(filter) > -1) {
    if (textValue.toUpperCase().indexOf(filter) > -1) {
      mainChoice.style.display = 'flex';
      recipeOption[i].style.display = '';
      recipeOption[i].classList.add('matches');
    } else {
      recipeOption[i].style.display = 'none';
      recipeOption[i].classList.remove('matches');
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
        if (item.classList.contains('recipe-option'))
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
createAlert();
function checkMatches() {
  const searchMatches = document.querySelectorAll('.matches');
  const alert = document.querySelector('.alert-msg')
  if (searchMatches.length === 0)
  alert.style.display = 'block';
  else alert.style.display = 'none';
}

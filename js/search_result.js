// FONCTION
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

// FONCTION
// AFFICHE SELECTION(S)
function displaySelection(event) {
  const selected = event.target;
  // retire "selected" du choix precedent
  if (selected.classList.contains('selected'))
    selected.classList.remove('selected');
  // affecte "selected" au nouveau choix
  selected.classList.add('selected');
  // tableau choix
  const choices = document.querySelectorAll('.selected');
  // supprime cartes deja affichees
  const recipeSection = document.querySelector('#recipes');
  recipeSection.innerHTML = '';
  // AFFICHE RECETTES CORRESPONDANTES
  fetch('recipes.json')
    .then((response) => response.json())
    .then((data) => {
      const recipes = data.recipes;
      let recipesToDisplay = [];
      choices.forEach((choice) => {
        recipesToDisplay.push(getRecipesByChoice(recipes, choice.textContent));
      });
      console.log(recipesToDisplay);
    });

  // RECUPERE RECETTES CORRESPONDANT AU(X) CHOI(X)
  function getRecipesByChoice(recipes, choice) {
    recipesByChoice = [];
    recipes.forEach((recipe) => {
      let isIngredient = false;
      recipe.ingredients.forEach((i) => {
        if (i.ingredient === choice) {
          isIngredient = true;
        }
      });
      console.log(choice);
      if (
        recipe.name === choice ||
        recipe.description === choice ||
        isIngredient == true
      ) {
        recipesByChoice.push(recipe);
      }
    });
    return recipesByChoice;
  }

  // cree tag(s) correspondant(s)
  createTag(selected);
  // detecte dernier choix
  const lastSelection = document.querySelector('#tags-collection').lastChild;
  // attribue code couleur selon categorie
  if (selected.classList.contains('recipe-link'))
    lastSelection.classList.add('recipes-result-btn');
  if (selected.classList.contains('ingredients-link'))
    lastSelection.classList.add('ingredients-result-btn');
  if (selected.classList.contains('appliances-link'))
    lastSelection.classList.add('appliances-result-btn');
  if (selected.classList.contains('ustensils-link'))
    lastSelection.classList.add('ustensils-result-btn');
}

// FONCTION
// AFFICHE MESSAGE SI AUCUN CRITERE DE RECHERCHE NE CORRESPOND
createAlert();
function checkMatches() {
  const searchMatches = document.querySelectorAll('.matches');
  const alert = document.querySelector('.alert-msg');
  if (searchMatches.length === 0) alert.style.display = 'block';
  // masque message dans le cas contraire
  else alert.style.display = 'none';
}

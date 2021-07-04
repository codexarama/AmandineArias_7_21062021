// FONCTION
// RESULTATS RECHERCHE (from main search bar)
const generalSearch = document.querySelector('.search-bar');
// detecte et montre correspondances
function searchRecipe() {
  const recipeOption = document.querySelectorAll('.recipe-option');
  const filter = generalSearch.value.toUpperCase();
  for (let i = 0; i < recipeOption.length; i++) {
    const textValue = recipeOption[i].textContent || recipeOption[i].innerText;
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
// cree tableau [choix]
const choices = [];
function displaySelection(event) {
  const selected = event.target;
  // retire "selected" du choix precedent
  if (selected.classList.contains('selected'))
    selected.classList.remove('selected');
  // affecte "selected" au nouveau choix
  selected.classList.add('selected');
  // ajoute au tableau [choix] (sans doublons)
  if (!choices.includes(selected)) {
    choices.push(selected);
    // cree tag(s) correspondant(s)
    createTag(selected);
    // detecte dernier choix
    const lastSelection = document.querySelector('#tags-collection').lastChild;
    // attribue code couleur selon categorie
    if (selected.classList.contains('recipe-option'))
      lastSelection.classList.add('recipes-result-btn');
    if (selected.classList.contains('ingredients-option'))
      lastSelection.classList.add('ingredients-result-btn');
    if (selected.classList.contains('appliances-option'))
      lastSelection.classList.add('appliances-result-btn');
    if (selected.classList.contains('ustensils-option'))
      lastSelection.classList.add('ustensils-result-btn');
  }
  // -----------------------------------------------------------------------------
  console.log(choices);
  // -----------------------------------------------------------------------------

  fetch('recipes.json')
    .then((response) => response.json())
    .then((data) => {
      const recipes = data.recipes;
      // cree tableau(x) [recette(s) a afficher]
      let recipesToDisplay = [];
      // ajoute recette(s) correspondant au(x) choix
      choices.forEach((choice) => {
        recipesToDisplay.push(getRecipesByChoice(recipes, choice.textContent));
      });
      // fusionne tableaux [recette(s) a afficher]
      function merge(recipesToDisplay) {
        return recipesToDisplay.reduce(
          (acc, val) => acc.concat(Array.isArray(val) ? merge(val) : val),
          []
        );
      }
      // supprime doublons
      const uniqueRecipe = [...new Set(merge(recipesToDisplay))];
      // affiche recettes correspondant au(x) choix
      for (let i = 0; i < uniqueRecipe.length; i++) {
        // ---------------------------------------------------------------------
        // if (uniqueRecipe.length < 2) document.querySelector('#recipes').style.maxHeight = '800px'
        // ---------------------------------------------------------------------
        setRecipe(uniqueRecipe[i]);
      }
    });
  // recupere recettes correspondant au(x) choix
  function getRecipesByChoice(recipes, choice) {
    recipesByChoice = [];
    recipes.forEach((recipe) => {
      let isIngredient = false;
      recipe.ingredients.forEach((i) => {
        if (i.ingredient === choice) {
          isIngredient = true;
          // ---------------------------------------------------------------------
          // masquer son homologue dans [ingredients]
          // ---------------------------------------------------------------------
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
  // supprime cartes recettes deja affichees
  const recipeSection = document.querySelector('#recipes');
  recipeSection.innerHTML = '';
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

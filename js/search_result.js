// RESULTATS RECHERCHE
// detecte et montre correspondances
function setMatches(input, list, options) {
  input.addEventListener('keyup', () => {
    const searchInput = input.value.toUpperCase();
    // const searchInput = input.value.normalize("NFCK");
    const textValue = options.textContent;

    // recherche apres saisie d'au moins 3 caracteres
    if (
      searchInput.length > 2 &&
      textValue.toUpperCase().indexOf(searchInput) > -1
    ) {
      list.style.display = 'flex';
      options.style.display = '';
      options.classList.add('matches');
    } else {
      options.style.display = 'none';
      options.classList.remove('matches');
    }

    // // recherche dès 1er caractere saisi --------------------------------------
    // if (textValue.toUpperCase().indexOf(searchInput) > -1) {
    //   list.style.display = 'flex';
    //   options.style.display = '';
    //   options.classList.add('matches');
    // } else {
    //   options.style.display = 'none';
    //   options.classList.remove('matches');
    // } ------------------------------------------------------------------------
  });
}

// AFFICHE SELECTION(S)
// DOM element
const recipeSection = document.querySelector('#recipes');

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
  console.log(choices); // affiche elements du tableau [choices]
  // -----------------------------------------------------------------------------

  // AFFICHE RECETTES CORRESPONDANT AU(X) RECHERCHE(S)
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

      // cree tableau [recettes à afficher] sans doublons
      const uniqueRecipe = [...new Set(merge(recipesToDisplay))];

      // affiche recettes
      for (let i = 0; i < uniqueRecipe.length; i++) {
        setRecipe(uniqueRecipe[i]);

        // -----------------------------------------------------------------------------
        console.log(uniqueRecipe.length); // affiche nb recettes correspondant au(x) choix
        // -----------------------------------------------------------------------------
      }
    });

  // supprime cartes recettes deja affichees
  recipeSection.innerHTML = '';
}

// recupere recettes correspondant au(x) choix
function getRecipesByChoice(recipes, choice) {
  recipesByChoice = [];
  recipes.forEach((recipe) => {
    let isIngredient = false;
    recipe.ingredients.forEach((i) => {
      if (i.ingredient === choice) {
        isIngredient = true;
      }
    });

    // -----------------------------------------------------------------------------
    console.log(choice); // affiche nom selection et boucle generee
    // -----------------------------------------------------------------------------

    if (
      recipe.name === choice ||
      recipe.description === choice ||
      recipe.appliance === choice ||
      recipe.ustensils.forEach((ustensil) => ustensil === choice) ||
      isIngredient == true
    ) {
      recipesByChoice.push(recipe);
    }
  });

  return recipesByChoice;
}

// fusionne tableaux [recettes à afficher]
function merge(recipesToDisplay) {
  return recipesToDisplay.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? merge(val) : val),
    []
  );
}

// AFFICHE MESSAGE SI AUCUN CRITERE DE RECHERCHE NE CORRESPOND
// apres saisie d'au moins 3 caracteres
createAlert();

function checkMatches() {
  const searchMatches = document.querySelectorAll('.matches');
  const alert = document.querySelector('.alert-msg');
  const generalSearch = document.querySelector('.search-bar');
  const mainInput = generalSearch.value.toUpperCase();

  if (mainInput.length > 2 && searchMatches.length === 0)
    alert.style.display = 'block';
  // masque message dans le cas contraire
  else alert.style.display = 'none';
}

// // recherche dès 1er caractere saisi ------------------------------------------
// function checkMatches() {
//   const searchMatches = document.querySelectorAll('.matches');
//   const alert = document.querySelector('.alert-msg');

//   if (searchMatches.length === 0) alert.style.display = 'block';

//   // masque message dans le cas contraire
//   else alert.style.display = 'none';
// } ----------------------------------------------------------------------------

// RESULTATS RECHERCHE
// detecte et affiche correspondances

function setMatches(input, list, option) {
  input.addEventListener('keyup', () => {
    const searchInput = input.value.toUpperCase();
    // const searchInput = input.value.normalize("NFCK");
    const textValue = option.textContent;

    // recherche correspondance(s) apres saisie d'au moins 3 caracteres
    if (
      searchInput.length > 2 &&
      textValue.toUpperCase().indexOf(searchInput) > -1
    ) {
      list.style.display = 'flex';
      option.style.display = '';
      option.classList.add('matches');

      // recupere et affiche recette(s) correspondante(s)
      fetch('recipes.json')
        .then((response) => response.json())
        .then((data) => {
          const recipes = data.recipes;
          const noDoublon = [...new Set(recipesByMatchFromInputs)];
          console.log(noDoublon);
          matchedRecipes = getRecipes(recipes, textValue);
          matchedRecipes.forEach((match) => {
            setRecipe(match);
          });
        });

      // supprime cartes recettes deja affichees
      recipeSection.innerHTML = '';

    } else {
      option.style.display = 'none';
      option.classList.remove('matches');
    }

    // // recherche correspondance(s) dès 1er caractere saisi -------------------
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

// RECUPERE RECETTES CORRESPONDANT AU(X) CHOIX
// APPELLEE AU KEYUP EVENT DANS INPUT

// cree tableau correspondance(s) avec saisie input
let recipesByMatchFromInputs = [];

function getRecipes(recipes, option) {
  recipes.forEach((recipe) => {

    let isIngredient = false;
    recipe.ingredients.forEach((i) => {
      if (i.ingredient === option) {
        isIngredient = true;
      }
    });

    // -----------------------------------------------------------------------------
    // console.log(option); // affiche nom selection
    // -----------------------------------------------------------------------------

    if (
      recipe.name === option ||
      recipe.description === option ||
      recipe.appliance === option ||
      recipe.ustensils.forEach((ustensil) => ustensil === option) ||
      isIngredient == true
    ) {
      //console.log(recipe);
      let isDoublon = false;
      recipesByMatchFromInputs.forEach(r => {
        if (r.name === recipe.name) {
          isDoublon = true;
        }
      });

      if (!isDoublon) {
        recipesByMatchFromInputs.push(recipe);
      }

    }
  });

  // -----------------------------------------------------------------------------
  // console.log(recipesByMatchFromInputs);
  // -----------------------------------------------------------------------------

  return recipesByMatchFromInputs;
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

  // affiche recettes correspondant au(x) recherche(s)
  displayRecipesMatch();

  // supprime cartes recettes deja affichees
  recipeSection.innerHTML = '';
}

// RECUPERE RECETTES CORRESPONDANT AU(X) CHOIX
// APPELLEE AU CLIC EVENT SUR OPTION DANS LISTE OU SUR TAG DE SUPPRESSION
function getRecipes(recipes, option) {

  // cree tableau recettes par correspondance
  recipesByMatch = [];
  recipes.forEach((recipe) => {
    let isIngredient = false;
    recipe.ingredients.forEach((i) => {
      if (i.ingredient === option) {
        isIngredient = true;
      }
    });

    // -----------------------------------------------------------------------------
    // console.log(option); // affiche nom selection
    // -----------------------------------------------------------------------------

    if (
      recipe.name === option ||
      recipe.description === option ||
      recipe.appliance === option ||
      recipe.ustensils.forEach((ustensil) => ustensil === option) ||
      isIngredient == true
    ) {
      recipesByMatch.push(recipe);
    }
  });

  // -----------------------------------------------------------------------------
  // console.log(recipesByMatch);
  // -----------------------------------------------------------------------------

  return recipesByMatch;
}

// fusionne tableaux [recettes à afficher]
function merge(recipesToDisplay) {
  return recipesToDisplay.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? merge(val) : val),
    []
  );
}

// AFFICHE RECETTES CORRESPONDANT AU(X) RECHERCHE(S)
function displayRecipesMatch() {
  fetch('recipes.json')
    .then((response) => response.json())
    .then((data) => {
      const recipes = data.recipes;

      // cree tableau(x) [recette(s) a afficher]
      let recipesToDisplay = [];

      // ajoute recette(s) correspondant au(x) choix
      // choices.forEach((textValue) => {
      //   recipesToDisplay.push(getRecipes(recipes, textValue));
      choices.forEach((option) => {
        recipesToDisplay.push(getRecipes(recipes, option.textContent));
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
      return recipesToDisplay;
    });
}

// AFFICHE MESSAGE SI AUCUN CRITERE DE RECHERCHE NE CORRESPOND
// apres saisie d'au moins 3 caracteres
createAlert();

function noMatch() {
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
// function noMatch() {
//   const searchMatches = document.querySelectorAll('.matches');
//   const alert = document.querySelector('.alert-msg');

//   if (searchMatches.length === 0) alert.style.display = 'block';

//   // masque message dans le cas contraire
//   else alert.style.display = 'none';
// } ----------------------------------------------------------------------------

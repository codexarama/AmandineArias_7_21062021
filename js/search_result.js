// RESULTATS RECHERCHE PAR INPUT PRINCIPAL -----------------------------------------
// DOM ELEMENT
const mainSearch = document.querySelector('.search-bar');

// detecte et affiche correspondances
function recipesMatches(recipes) {
  mainSearch.addEventListener('keyup', (e) => {
    const inputValue = normString(e.target.value);

    if (inputValue.length > 2) {
      const recipesByMatch = recipes.filter((recipe) => {
        return (
          normString(recipe.name).includes(inputValue) ||
          normString(recipe.description).includes(inputValue) ||
          recipe.ingredients.some((i) =>
            normString(i.ingredient).includes(inputValue)
          )
        );
      });

      // -------------------------
      console.log(recipesByMatch);
      // -------------------------

      // AFFICHE MESSAGE ERREUR SI AUCUN CRITERE NE CORRESPOND
      noMatch(recipesByMatch);

      // supprime cartes recettes deja affichees
      recipeSection.innerHTML = '';

      // affiche recettes correspondant au(x) resultat(s) de la recherche
      recipesByMatch.forEach((match) => {
        setRecipe(match);
      });

      // actualise listes tags (ingrédients, appareils, ustensiles)
      const searchList = document.querySelectorAll('[role="option"]');
      searchList.forEach((item) => {
        item.style.display = 'none';

        recipesByMatch.forEach((match) => {
          let isIngredient = false;

          match.ingredients.forEach((ingredients) => {
            if (ingredients.ingredient === item.textContent) {
              isIngredient = true;
            }
          });

          if (
            isIngredient == true ||
            match.appliance === item.textContent ||
            match.ustensils.forEach((ustensil) => ustensil === item.textContent)
          )
            item.style.display = 'block';
        });
      });

      // reinitialise recettes si aucune correspondance avec recherche
      if (recipesByMatch.length === 0)
        recipes.forEach((recipe) => setRecipe(recipe));
    }
  });
}

// MESSAGE SI AUCUN CRITERE DE RECHERCHE NE CORRESPOND
createAlert();

function noMatch(search) {
  // DOM elements
  const alert = document.querySelector('.alert-msg');
  const selectedTags = document.querySelectorAll('.selection');

  // affiche message d'alerte
  // supprime sélection(s) s'il y en a
  if (search.length === 0) {
    alert.style.display = 'block';
    selectedTags.forEach((tag) => tag.remove(tag));
  }

  // masque message d'alerte
  else alert.style.display = 'none';
}

// RESULTATS RECHERCHE PAR TAG(S) -----------------------------------------------
// detecte et affiche correspondance(s)
function setTagsMatches(input, list, option) {
  input.addEventListener('keyup', () => {
    const inputValue = normString(input.value);
    const textValue = normString(option.textContent);

    // affiche / masque tag(s) selon correspondance
    // ajoute / supprime attribut ("matches") selon correspondance
    if (textValue.indexOf(inputValue) > -1) {
      list.style.display = 'flex';
      option.style.display = '';
      option.classList.add('matches');
    } else {
      option.style.display = 'none';
      option.classList.remove('matches');
    }
  });
}

// AFFICHE SELECTION(S) TAG(S) -------------------------------------------------
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

    // attribue code couleur selon categorie
    customiseTag(selected, 'ingredients');
    customiseTag(selected, 'appliances');
    customiseTag(selected, 'ustensils');
  }

  // ------------------
  console.log(choices);
  // ------------------

  // affiche recettes correspondant au(x) recherche(s) par tag
  displaySelectedRecipes();

  // supprime cartes recettes deja affichees
  recipeSection.innerHTML = '';

  // retourne tableau [choix]
  return choices;
}

// CUSTOMISE BOUTONS CREES A CHAQUE SELECTION DE TAG SELON CATEGORIE
function customiseTag(selected, category) {
  const lastSelection = document.querySelector('#tags-collection').lastChild;

  if (selected.classList.contains(category + '-option'))
    lastSelection.classList.add(category + '-result-btn');
}

// RECUPERE RECETTES CORRESPONDANT AU(X) CHOIX PAR TAG(S)
// (appellee au clic event sur option dans liste et sur tag de suppression)
function getRecipesByTag(recipes, option) {
  // cree tableau recettes par correspondance
  const recipesByTag = [];

  recipes.forEach((recipe) => {
    let isIngredient = false;

    recipe.ingredients.forEach((ingredients) => {
      if (ingredients.ingredient === option) {
        isIngredient = true;
      }
    });

    // --------------------
    // console.log(option);
    // --------------------

    if (
      isIngredient == true ||
      recipe.appliance === option ||
      recipe.ustensils.forEach((ustensil) => ustensil === option)
    )
      recipesByTag.push(recipe);
  });

  // --------------------------
  // console.log(recipesByTag);
  // --------------------------

  return recipesByTag;

}

// fusionne tableaux [recettes à afficher]
function merge(recipesToDisplay) {
  return recipesToDisplay.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? merge(val) : val),
    []
  );
}

// AFFICHE RECETTES CORRESPONDANT AU(X) RECHERCHE(S)
function displaySelectedRecipes() {
  fetch('recipes.json')
    .then((response) => response.json())
    .then((data) => {
      const recipes = data.recipes;

      // cree tableau(x) [recette(s) a afficher]
      let recipesToDisplay = [];

// ajoute recette(s) correspondant au(x) choix
choices.forEach((option) => {
  recipesToDisplay.push(getRecipesByTag(recipes, option.textContent));
});

      // supprime doublons [recettes à afficher]
      const uniqueRecipe = [...new Set(merge(recipesToDisplay))];

      // affiche recettes
      for (let i = 0; i < uniqueRecipe.length; i++) {
        setRecipe(uniqueRecipe[i]);
      }
      return recipesToDisplay;
    });
}

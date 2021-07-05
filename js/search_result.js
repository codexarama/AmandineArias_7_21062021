// RESULTATS RECHERCHE
// detecte et montre correspondances
function lookForCorrespondance(input, list, options) {
  input.addEventListener('keyup', () => {
    const searchInput = input.value.toUpperCase();
    // const searchInput = input.value.normalize("NFCK");
    const textValue = options.textContent;

    // if (textValue.length > 3 && textValue.toUpperCase().indexOf(filter) > -1) {}
    if (textValue.toUpperCase().indexOf(searchInput) > -1) {
      list.style.display = 'flex';
      list.style.borderRadius = '0 0.25rem 0.25rem 0.25rem'
      options.style.display = '';
      options.classList.add('matches');
      const tagBtn = document.querySelectorAll('.tag-btn');
      console.log(tagBtn);
      tagBtn.forEach((btn) => btn.style.borderRadius = '0.25rem 0.25rem 0 0')

    } else {
      options.style.display = 'none';
      options.classList.remove('matches');
    }
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
        setRecipe(uniqueRecipe[i]);
        console.log(uniqueRecipe.length);
        // ne fonctionne pas ---------------------------------------------------
        // if (uniqueRecipe.length <= 2) {
        // ok sans condition ---------------------------------------------------
        // console.log('coucou');
        // recipesSection.style.maxHeight = '800px';
        // ---------------------------------------------------------------------
        // }
        // else document.querySelector('#recipes').style.maxHeight = 'unset';
        // ---------------------------------------------------------------------
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
        recipe.appliance === choice ||
        recipe.ustensils.forEach((ustensil) => ustensil === choice) ||
        isIngredient == true
      ) {
        recipesByChoice.push(recipe);
      }
    });

    return recipesByChoice;
  }

  // supprime cartes recettes deja affichees
  recipeSection.innerHTML = '';
}

// AFFICHE MESSAGE SI AUCUN CRITERE DE RECHERCHE NE CORRESPOND
createAlert();

function checkMatches() {
  const searchMatches = document.querySelectorAll('.matches');
  const alert = document.querySelector('.alert-msg');
  if (searchMatches.length === 0) alert.style.display = 'block';
  // masque message dans le cas contraire
  else alert.style.display = 'none';
}

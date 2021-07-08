// GENERATEUR ELEMENTS DOM

// CREE LISTE RECETTES
const mainList = document.querySelector('#search-recipe');

function createMain(item) {
  const mainOption = elmtFactory(
    'li',
    { role: 'option', class: 'recipe-option' },
    `${item}`
  );

  mainList.append(mainOption);
}

// CREE LISTE INGREDIENTS
const ingredientsList = document.getElementById('ingredients-list');

function createIngredient(item) {
  const ingredientsOption = elmtFactory(
    'li',
    {
      role: 'option',
      class: 'ingredients-option',
    },
    `${item}`
  );

  ingredientsList.append(ingredientsOption);
}

// CREE LISTE APPAREILS
const appliancesList = document.getElementById('appliances-list');

function createAppliance(item) {
  const appliancesOption = elmtFactory(
    'li',
    {
      role: 'option',
      class: 'appliances-option',
    },
    `${item}`
  );

  appliancesList.append(appliancesOption);
}

// CREE LISTE USTENSILES
const ustensilsList = document.getElementById('ustensils-list');

function createUstensil(item) {
  const ustensilsOption = elmtFactory(
    'li',
    {
      role: 'option',
      class: 'ustensils-option',
    },
    `${item}`
  );

  ustensilsList.append(ustensilsOption);
}

// CREE TAG SELECTION(S)
const searchList = document.querySelectorAll('[role="option"]');
const tagsCollection = document.querySelector('#tags-collection');

function createTag(selectedTag) {
  const tag = elmtFactory(
    'button',
    { role: 'button', class: 'selection tag-btn' },
    selectedTag.textContent,
    elmtFactory('i', { class: 'far fa-times-circle' })
  );

  tagsCollection.append(tag);

  // SUPPRIME TAG
  tag.addEventListener('click', () => {
    // si clic sur "x"
    // retire attribut "selected"
    selectedTag.classList.remove('selected');

    // recupere index
    const tagIndex = choices.indexOf(selectedTag);

    // supprime du tableau [choices]
    choices.splice(tagIndex, 1);

    // -----------------------------------------------------------------------------
    console.log(choices); // affiche elements du tableau [choices]
    // -----------------------------------------------------------------------------

    // supprime bouton correspondant
    tag.remove(tag);

    // affiche recette(s) restante(s) apres suppression selection(s)
    displayRecipesMatch();

    // affiche toutes les recettes si tableau [choix] vide
    displayAllSortedRecipes ()

    // supprime cartes recettes deja affichees
    recipeSection.innerHTML = '';
  });
}

function displayAllSortedRecipes () {
  fetch('recipes.json')
  .then((response) => response.json())
  .then((data) => {
    const recipes = data.recipes;

    if (choices.length === 0) {
      let sortedRecipes = [];

      for (let i = 0; i < recipes.length; i++) {
        sortedRecipes.push(recipes.sort(filterBy('name'))[i]);
        setRecipe(sortedRecipes[i]);
      }
    }
  });
}

// cree message d'alerte si aucun critère de recherche ne correspond
function createAlert() {
  const alert = elmtFactory(
    'div',
    { class: 'alert-msg' },
    elmtFactory('img', { src: '/images/oops.png' }),
    elmtFactory('p', {}, 'OOPS'),
    elmtFactory('p', {}, 'Aucun résultat ne correspond à votre critère...'),
    elmtFactory(
      'p',
      {},
      'Vous pouvez chercher « Tarte aux pommes », « Poisson », etc.'
    )
  );

  tagsCollection.appendChild(alert);
}

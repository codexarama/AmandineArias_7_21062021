// GENERATEUR ELEMENTS

// cree liste recettes
const recipeList = document.querySelector('#search-recipe');
function createRecipesList(recipe) {
  const recipesList = elmtFactory(
    'li',
    { role: 'option', id: `${recipe.id}`, class: 'recipe-name' },
    elmtFactory('a', { class: 'name' }, `${recipe.name}`)
  );
  recipeList.append(recipesList);
}

// cree tag recette(s) choisie(s) dans liste barre recherche principale
const tagsCollection = document.querySelector('#tags-collection');
function createTag(selectedTag) {
  const tag = elmtFactory(
    'button',
    { role: 'button', class: 'selected-result tag-btn' },
    selectedTag.textContent,
    elmtFactory('i', { class: 'far fa-times-circle' })
  );
  tagsCollection.append(tag);
  // supprime tag
  removeTag = document.querySelectorAll('.selected-result');
  removeTag.forEach((btn) =>
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      if (tag.contains(event.target)) tag.style.display = 'none';
    })
  );
}

// cree DOM elements : liste ingredients
const ingredientsChoice = document.getElementById('ingredients-list');
function createIngredient(item) {
  const ingredientsOption = elmtFactory(
    'li',
    {
      role: 'option',
      class: 'ingredients-option tag',
      // id: `${recipe.id}`,
    },
    elmtFactory(
      'a',
      {
        href: '#',
        class: 'ingredients-link tag-link'
      },
      `${item}`
    )
  );
  ingredientsChoice.append(ingredientsOption);
}

// cree DOM elements : liste appareils
const appliancesChoice = document.getElementById('appliances-list');
function createAppliance(item) {
  const appliancesOption = elmtFactory(
    'li',
    {
      role: 'option',
      class: 'appliances-option tag',
      // id: `${recipe.id}`,
    },
    elmtFactory(
      'a',
      {
        href: '#',
        class: 'appliances-link tag-link'
      },
      `${item}`
    )
  );
  appliancesChoice.append(appliancesOption);
}

// cree DOM elements : liste ustensiles
const ustensilsChoice = document.getElementById('ustensils-list');
function createUstensil(item) {
  const ustensilsOption = elmtFactory(
    'li',
    {
      role: 'option',
      class: 'ustensils-option tag',
      // id: `${recipe.id}`,
    },
    elmtFactory(
      'a',
      {
        href: '#',
        class: 'ustensils-link tag-link',
      },
      `${item}`
    )
  );
  ustensilsChoice.append(ustensilsOption);
}

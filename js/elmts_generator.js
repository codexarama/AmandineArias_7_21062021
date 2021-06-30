// GENERATEUR ELEMENTS

// cree liste recettes
const recipeChoice = document.querySelector('#search-recipe');
function createRecipesList(recipe) {
  const recipesList = elmtFactory(
    'li',
    { role: 'option', id: recipe.id, class: 'recipe-name' },
    elmtFactory('a', { class: 'name' }, `${recipe.name}`)
  );
  recipeChoice.append(recipesList);
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
      if (tag.contains(event.target)) btn.remove(tag);
    })
  );
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

// cree DOM elements : liste ingredients
const ingredientsChoice = document.getElementById('ingredients-list');
function createIngredient(recipe) {
  const ingredientsOption = elmtFactory(
    'li',
    {
      role: 'option',
      id: recipe.id,
      class: 'ingredients-option tag',
    },
    elmtFactory('a', {
      href: '#',
      class: 'ingredients-link tag-link',
    })
  );
  ingredientsChoice.append(ingredientsOption);
}

// cree DOM elements : liste appareils
const appliancesChoice = document.getElementById('appliances-list');
function createAppliance(recipe) {
  const appliancesOption = elmtFactory(
    'li',
    {
      role: 'option',
      id: recipe.id,
      class: 'appliances-option tag',
    },
    elmtFactory(
      'a',
      {
        href: '#',
        class: 'appliances-link tag-link',
      },
    )
  );
  appliancesChoice.append(appliancesOption);
}

// cree DOM elements : liste ustensiles
const ustensilsChoice = document.getElementById('ustensils-list');
function createUstensil(recipe) {
  const ustensilsOption = elmtFactory(
    'li',
    {
      role: 'option',
      id: recipe.id,
      class: 'ustensils-option tag',
    },
    elmtFactory(
      'a',
      {
        href: '#',
        class: 'ustensils-link tag-link',
      },
    )
  );
  ustensilsChoice.append(ustensilsOption);
}

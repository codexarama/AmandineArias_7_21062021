// DOM parents elements
const mainList = document.querySelector('#search-recipe');
const ingredientsList = document.getElementById('ingredients-list');
const appliancesList = document.getElementById('appliances-list');
const ustensilsList = document.getElementById('ustensils-list');

// GENERATEUR ELEMENTS DOM
// CANEVAS LISTES OPTIONS (factory pattern)
function createTagOption(item, category, list) {
  const option = elmtFactory(
    'li',
    {
      role: 'option',
      class: category + '-option',
    },
    `${item}`
  );
  list.append(option);
}

// cree liste ingredients (DOM)
function setIngredientsList(category) {
  category.forEach((item) => {
    createTagOption(item, 'ingredients', ingredientsList);
  });
}

// cree liste appareils (DOM)
function setAppliancesList(category) {
  category.forEach((item) => {
    createTagOption(item, 'appliances', appliancesList);
  });
}

// cree liste ustensiles (DOM)
function setUstensilsList(category) {
  category.forEach((item) => {
    createTagOption(item, 'ustensils', ustensilsList);
  });
}

// CANEVAS TAG(S) SELECTION(S) (factory pattern)
// DOM element
const tagsCollection = document.querySelector('#tags-collection');

function createTag(selectedTag) {
  const tag = elmtFactory(
    'button',
    { role: 'button', class: 'selection tag-btn' },
    selectedTag.textContent,
    elmtFactory('i', { class: 'far fa-times-circle' })
  );

  tagsCollection.append(tag);

  // SUPPRIME TAG(S)
  tag.addEventListener('click', () => {
    // si clic sur "x"
    // retire attribut "selected"
    selectedTag.classList.remove('selected');

    // recupere index
    const tagIndex = choices.indexOf(selectedTag);

    // supprime du tableau [choices]
    choices.splice(tagIndex, 1);

    // ------------------
    console.log(choices);
    // ------------------

    // supprime bouton correspondant
    tag.remove(tag);

    // affiche recette(s) restante(s) apres suppression selection(s)
    displaySelectedRecipes();

    // restaure tag dans liste choix
    selectedTag.style.display = 'list-item'

    // affiche toutes les recettes si tableau [choix] vide
    resetRecipes()

    // supprime cartes recettes deja affichees
    recipeSection.innerHTML = '';
  });
}

function resetRecipes() {
  fetch('recipes.json')
    .then((response) => response.json())
    .then((data) => {
      const recipes = data.recipes;

      if (choices.length === 0) {
        displaySortedRecipes(recipes);
      }
    });
}

// CANEVAS MESSAGE D'ALERTE (fatory pattern)
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

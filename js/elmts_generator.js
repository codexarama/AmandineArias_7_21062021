// DOM parents elements
const mainList = document.querySelector('#search-recipe');
const ingredientsList = document.getElementById('ingredients-list');
const appliancesList = document.getElementById('appliances-list');
const ustensilsList = document.getElementById('ustensils-list');
const sections = document.querySelectorAll('section, nav');
const modal = document.getElementById('modal');
const recipes = document.getElementById('recipes');
const cards = document.getElementsByClassName('card');

// GENERATEUR ELEMENTS DOM
// CANEVAS LISTES d'OPTIONS (factory pattern)
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

// CANEVAS CATEGORIE de LISTE
function setCategoryList(category, name, list) {
  category.forEach((item) => {
    return createTagOption(item, name, list);
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
    selectedTag.style.display = 'list-item';

    // affiche toutes les recettes si tableau [choix] vide
    resetRecipes();

    // supprime cartes recettes deja affichees
    recipeSection.innerHTML = '';
  });
}

function resetRecipes() {
  fetch('recipes.json')
    .then((response) => response.json())
    .then((data) => {
      const recipes = data.recipes;

      if (choices.length === 0) displaySortedRecipes(recipes);
    });
}

// CANEVAS MESSAGE D'ALERTE (fatory pattern)
function createAlert() {
  const alert = elmtFactory(
    'div',
    { class: 'alert-msg' },
    elmtFactory('img', { src: 'images/oops.png' }),
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

// SHOW - UNSHOW SELECTED RECIPE
const showRecipe = () => {
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', (event) => {
      event.preventDefault();

      cards[i].classList.add('selected');
      selectedRecipe = cards[i].classList.contains('selected');
console.log(selectedRecipe);

      for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
      }

      modal.style.display = 'flex';
      modal.append(cards[i]);
    }, { once: true });
  }
};

const closeModal = () => {
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', (event) => {
      cards[i].classList.remove('selected');
    });
  }

  location.reload();
  return false;
};

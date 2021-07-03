// GENERATEUR ELEMENTS DOM

// cree liste recettes
const mainChoice = document.querySelector('#search-recipe');
function createmainList(item) {
  const mainList = elmtFactory(
    'li',
    { role: 'option', class: 'recipe-option' },
    `${item}`
  );
  mainChoice.append(mainList);
}

// cree liste ingredients
const ingredientsChoice = document.getElementById('ingredients-list');
function createIngredient(item) {
  const ingredientsOption = elmtFactory(
    'li',
    {
      role: 'option',
      class: 'ingredients-option',
    },
    `${item}`
  );
  ingredientsChoice.append(ingredientsOption);
}

// cree liste appareils
const appliancesChoice = document.getElementById('appliances-list');
function createAppliance(item) {
  const appliancesOption = elmtFactory(
    'li',
    {
      role: 'option',
      class: 'appliances-option',
    },
    `${item}`
  );
  appliancesChoice.append(appliancesOption);
}

// cree liste ustensiles
const ustensilsChoice = document.getElementById('ustensils-list');
function createUstensil(item) {
  const ustensilsOption = elmtFactory(
    'li',
    {
      role: 'option',
      class: 'ustensils-option',
    },
    `${item}`
  );
  ustensilsChoice.append(ustensilsOption);
}

// cree tag selection(s)
const searchList = document.querySelectorAll('[role="option"]');
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
  tag.addEventListener('click', () => {
    // si clic sur "x"
    // retire attribut "selected"
    selectedTag.classList.remove('selected');
    // recupere index
    const tagIndex = choices.indexOf(selectedTag);
    // supprime du tableau [choices]
    choices.splice(tagIndex, 1);
    // -----------------------------------------------------------------------------
    console.log(choices);
    // -----------------------------------------------------------------------------
    // supprime bouton correspondant
    tag.remove(tag);
    // return choices // ne renvoie rien
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

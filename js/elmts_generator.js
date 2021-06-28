// GENERATEUR ELEMENTS

// cree liste recettes
const recipeList = document.querySelector('#search-recipe');
function createRecipesList(recipe) {
  const recipesList = elmtFactory(
    'li',
    { role: 'option', class: 'recipe-name' },
    elmtFactory('a', { class: 'name' }, `${recipe.name}`)
  );
  recipeList.append(recipesList);
}

// cree tag recette(s) choisie(s) dans liste barre recherche principale
const tagsCollection = document.querySelector('#tags-collection');
function createTag(selectedTag) {
  const tag = elmtFactory(
    'button',
    { class: 'selected-result tag-btn' },
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

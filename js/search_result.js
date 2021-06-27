// CREE LISTE RECETTES
// DOM main element
const recipeList = document.querySelector('#search-recipe');
// GENERATEUR DOM element : liste noms recettes
function createRecipesList(recipe) {
  const recipesList = elmtFactory(
    'li',
    { role: 'option', class: 'recipe-name' },
    elmtFactory('a', { class: 'name' }, `${recipe.name}`)
  );
  recipeList.append(recipesList);
}

fetch('recipes.json')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // CHERCHE RECETTES
    // DOM main elements
    const generalSearch = document.querySelector('.search-bar');
    const recipeName = document.querySelectorAll('.recipe-name');
    // quand saisie dans searchbar
    generalSearch.addEventListener('keyup', searchRecipe);
    // affiche noms recettes si correspondent
    function searchRecipe() {
      const filter = generalSearch.value.toUpperCase();
      for (let i = 0; i < recipeName.length; i++) {
        const name = recipeName[i].getElementsByTagName('a')[0];
        const textValue = name.textContent || name.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
          recipeList.style.display = 'flex';
          recipeName[i].style.display = '';
          recipeName[i].classList.add('matches');
        } else {
          recipeName[i].style.display = 'none';
          recipeName[i].classList.remove('matches');
        }
      }
    }

    // AFFICHE RESULTATS RECHERCHE
    // DOM element
    const searchList = document.querySelectorAll('[role="option"]');
    const selectionList = [];
    // Affiche tag(s) correspondant au(x) choi(x)
    searchList.forEach((item) =>
      item.addEventListener('click', (event) => {
        event.preventDefault();
        // retire "selected" au choix precedent
        if (item.classList.contains('selected'))
          item.classList.remove('selected');
        // affecte "selected" au nouveau choix
        item.classList.add('selected');
        // tableau choix (sans doublons)
        if (!selectionList.includes(item)) {
          selectionList.push(item);
          // cree tag(s) correspondant(s)
          createTag(item);
        }
        // affecte couleur au tag selon correspondance
        // (recette, ingredient, appareil, ustensile)
        const selectedItem = document.querySelectorAll('.selected');
        const tagsCollection = document.querySelectorAll('.selected-result');
        for (let i = 0; i < selectedItem.length; i++) {
          if (selectedItem[i].classList.contains('recipe-name'))
            tagsCollection[i].classList.add('recipes-result-btn');
          if (selectedItem[i].classList.contains('ingredients-option'))
            tagsCollection[i].classList.add('ingredients-result-btn');
          if (selectedItem[i].classList.contains('appliances-option'))
            tagsCollection[i].classList.add('appliances-result-btn');
          if (selectedItem[i].classList.contains('ustensils-option'))
            tagsCollection[i].classList.add('ustensils-result-btn');
        }
      })
    );
  });

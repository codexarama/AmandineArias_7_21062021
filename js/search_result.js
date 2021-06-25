fetch('recipes.json')
  .then((response) => response.json())
  .then((data) => {
    let recipes = data.recipes;

    // CREE LISTE RECETTES
    // DOM main element
    const searchList = document.querySelector('#search-list');
    // cree DOM elements : liste noms recettes
    recipes.forEach((recipe) => {
      const recipesNames = elmtFactory(
        'li',
        { class: 'recipe-name' },
        elmtFactory('a', { class: 'name' }, `${recipe.name}`)
      );
      searchList.append(recipesNames);
    });

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
          searchList.style.display = 'flex';
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
    const searchListItems = [...searchList.children];
    // Affiche tag(s) correspondant au(x) choi(x)
    searchList.addEventListener('click', (event) => {
      const selectedItem = event.target.closest('li');
      if (!selectedItem) return;
      // retire "selected" sur ancien choix
      searchListItems.forEach((item) => item.classList.remove('selected'));
      // affecte "selected" sur nouveau choix
      selectedItem.classList.add('selected');
      // cree tag correspondant au choix
      // tagsResult.innerHTML = "" // affiche selection unique
      createTag(selectedItem);
      const recipesTags = document.querySelectorAll('.selected-tag');
      recipesTags.forEach((tag) => tag.classList.add('recipes-result-btn'));

      // SUPPRIME DOUBLONS ---------------------------------------------------------
      // NE FONCTIONNE PAS ---------------------------------------------------------
      // const selectionList = [];
      // recipesTags.forEach((tag) => {
      //   tag.classList.add('recipes-result-btn');
      //   if (tag && !selectionList.includes(tag)) selectionList.push(tag);
      // });
      // console.log(selectionList);
      // selectionList.forEach((selection) => createTag(selection));
    });

    // // AFFICHE RECETTE(S) CHOISIE(S)
    // for (let i = 0; i < recipes.length; i++) {}
  });
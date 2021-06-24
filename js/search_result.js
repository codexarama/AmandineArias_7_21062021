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
    const tagsCollection = document.querySelector('#tags-result');
    // affiche tags recette(s) choisie(s)
    for (let i = 0; i < recipeName.length; i++) {
      recipeName[i].addEventListener('click', (event) => {
        event.preventDefault();
        recipeName[i].classList.toggle('selected');
        const recipeTag = elmtFactory(
          'button',
          { class: 'tag-btn recipes-result-btn' },
          recipeName[i].textContent,
          elmtFactory('i', { class: 'far fa-times-circle' })
        );
        tagsCollection.append(recipeTag);

        // // NE FONCTIONNE PAS ---------------------------------------------------------
        // // actualise tableau recette(s) choisie(s)
        // // affiche tag(s) correspondant(s)
        // // recipeTag.forEach is not a function
        // const selectedRecipes = [];
        // const selected = recipeName[i].classList.contains('selected');
        // if (selected && !selectedRecipes.includes(selected)) {
        //   selectedRecipes.push(selected);
        //   recipeTag.forEach((tag) => {
        //     tagsCollection.append(tag);
        //   });
        //   // console.log(selectedRecipes);
        // }
      });
    }

    // AFFICHE RECETTE(S) CHOISIE(S)
    //   // for (let i = 0; i < recipes.length; i++) {
    //   //   setRecipe(quickSort(recipes)[i]);
    //   // }
    // }
  });

fetch('recipes.json')
  .then((response) => response.json())
  .then((data) => {
    const recipes = data.recipes;

    // RECHERCHE RECETTES PAR : nom, ingrédients, description (sans doublons)
    let mainSearch = [];
    recipes.forEach((recipe) => {
      if (!mainSearch.includes(recipe.name)) mainSearch.push(recipe.name);
      if (!mainSearch.includes(recipe.description))
        mainSearch.push(recipe.description);
      recipe.ingredients.forEach((item) => {
        if (!mainSearch.includes(item.ingredient))
          mainSearch.push(item.ingredient);
      });
    });

    // CONVERTIT DONNEES EN MOTS SEPARES (sans doublons)
    const separators = [
      ' ',
      '\\,',
      '\\, ',
      '\\. ',
      '\\+',
      '-',
      '\\(',
      '\\)',
      '\\*',
      '/',
      ':',
      '\\?',
    ];
    mainSearch = mainSearch
      .toString()
      .trim()
      .split(new RegExp(separators.join('|'), 'g'));
    // console.log(mainSearch); // 2876 occurrences

    let wordSearch = [];
    mainSearch.forEach((word) => {
      if (!wordSearch.includes(word)) wordSearch.push(word);
    });
    // console.log(wordSearch); // 753 occurrences => -75%

    // CHERCHE RECETTES
    // TABLEAU NOMS RECETTES
    let nameSearch = [];
    recipes.forEach((recipe) => {
      if (!nameSearch.includes(recipe.name)) nameSearch.push(recipe.name);
    });
    // DOM main ELEMENTS
    const searchList = document.querySelector('#search-list');
    // cree DOM elements
    recipes.forEach((recipe) => {
      const recipesNames = elmtFactory(
        'li',
        { class: 'recipe-name' },
        elmtFactory('a', { class: 'name' }, `${recipe.name}`)
      );
      searchList.append(recipesNames);
    });
    // EVENEMENTS
    // DOM main ELEMENTS
    const generalSearch = document.querySelector('.search-bar');
    generalSearch.addEventListener('keyup', searchRecipe);
    function searchRecipe() {
      const filter = generalSearch.value.toUpperCase();
      const recipeName = document.querySelectorAll('.recipe-name');
      for (let i = 0; i < recipeName.length; i++) {
        const name = recipeName[i].getElementsByTagName('a')[0];
        const textValue = name.textContent || name.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
          searchList.style.display = 'flex';
          recipeName[i].style.display = '';
        } else {
          recipeName[i].style.display = 'none';
        }
      }
    }
  });

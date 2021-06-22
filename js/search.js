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

    let wordSearch = [];
    mainSearch.forEach((word) => {
      if (!wordSearch.includes(word)) wordSearch.push(word);
    });
    console.log(wordSearch);

    // DOM ELEMENT
    const generalSearch = document.querySelector('.search-bar');

    // TRIE RECETTES
    // ne fonctionne pas -------------------------------------------------------
    // generalSearch.addEventListener('keyup',  searchRecipe = () => {
    //     let filter = generalSearch.value.toUpperCase();
    //     mainSearch.forEach((item) => {
    //       if (item.toUpperCase().indexOf(filter) > -1) generalSearch.getElementsByClassName.backgroundColr = 'green'
    //     });
    //   })
    // ne fonctionne pas -------------------------------------------------------
    // // searchRecipe is not defined at HTMLInputElement.onkeyup
    // function searchRecipe () {
    //   let filter = generalSearch.value.toUpperCase();
    //   mainSearch.forEach((item) => {
    //     if (item.toUpperCase().indexOf(filter) > -1) generalSearch.getElementsByClassName.backgroundColr = 'green'
    //   });
    // }
    // // searchRecipe()
  });

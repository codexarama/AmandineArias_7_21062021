fetch('recipes.json')
  .then((response) => response.json())
  .then((data) => {
    const recipes = data.recipes;
    console.log(recipes);

    // RECHERCHE RECETTES PAR : nom, ingrédients, description (sans doublons)
    // cree tableau principal
    let mainSearch = [];
    recipes.forEach((recipe) => {
      // ajoute noms recettes (sans doublons)
      if (!mainSearch.includes(recipe.name)) mainSearch.push(recipe.name);
      // ajoute descriptions (sans doublons)
      if (!mainSearch.includes(recipe.description))
        mainSearch.push(recipe.description);
      recipe.ingredients.forEach((item) => {
        // ajoute ingredients (sans doublons)
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

    // cree tableau principal
    let allWords = [];
    mainSearch.forEach((word) => {
      if (!allWords.includes(word)) allWords.push(word);
    });
    // console.log(allWords); // 752 occurrences

    // supprime mots < 3 lettres
    const mainWords = allWords.filter((word) => word.length > 3);
    // console.log(mainWords); // 673 occurrences

    // AFFICHE LISTE INGREDIENTS (sans doublons)
    let ingredients = [];
    function setIngredients() {
      // cree tableau ingredients
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((item) => {
          // supprime doublons
          if (!ingredients.includes(item.ingredient)) {
            ingredients.push(item.ingredient);
          }
        });
      });
      // trie ingredients par ordre alphabétique
      ingredients.sort();
      // cree liste ingredients (DOM)
      ingredients.forEach((item) => {
        createIngredient(item);
      });
    }
    console.log(ingredients);
    setIngredients();

    // AFFICHE LISTE APPAREILS (sans doublons)
    let appliances = [];
    function setAppliances() {
      // cree tableau appareils
      recipes.forEach((recipe) => {
        // supprime doublons
        if (!appliances.includes(recipe.appliance)) {
          appliances.push(recipe.appliance);
        }
      });
      // trie ingredients par ordre alphabétique
      appliances.sort();
      // cree liste appareils (DOM)
      appliances.forEach((item) => {
        createAppliance(item);
      });
    }
    setAppliances();

    // AFFICHE LISTE USTENSILES (sans doublons)
    let ustensils = [];
    function setUstensils() {
      recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
          // supprime doublons
          if (!ustensils.includes(ustensil)) {
            ustensils.push(ustensil);
          }
        });
      });
      // trie ustensiles par ordre alphabétique
      ustensils.sort();
      // cree liste appareils (DOM)
      ustensils.forEach((item) => {
        createUstensil(item);
      });
    }
    setUstensils();

    // AFFICHE LISTE RESULTATS RECHERCHES
    generalSearch.addEventListener('keyup', searchRecipe);
    // searches.forEach((search) => {
    //   search.addEventListener('keyup', searchRecipe);
    //   // console.log(search);
    // });
    generalSearch.addEventListener('keyup', displaySelection);
    generalSearch.addEventListener('keyup', checkMatches);



    // AFFICHE CARTES RECETTES (ordre alphabetique)
    const sortedIngredients = [];
    const sortedAppliances = [];
    const sortedUstensils = [];
    for (let i = 0; i < recipes.length; i++) {
      // console.log(recipes[i].ingredients[0].ingredient);
      // const allIngredients = recipes[i].ingredients[0].ingredient
      // const allIngredients = recipes.filter(ingredients.forEach((ingredient => ingredient.sort(filterBy('ingredient')))) )
      // console.log(allIngredients);
      // const sortIngredients = []
      // allIngredients.forEach((ingredient) => {sortIngredients.push(ingredient)})
      // sortIngredients.push(allIngredients)
      // console.log(sortIngredients);

      // console.log(sortIngredients);
      // tableau recettes trié par ordre alphabetique des appareils
      const sortAppliances = recipes.sort(filterBy('appliance'))[i];
      sortedAppliances.push(sortAppliances);

      // cree liste recettes (DOM)
      createRecipesList(recipes[i]);
      // affiche par defaut recettes triees par ordre alphabetique
      setRecipe(recipes.sort(filterBy('name'))[i]);
    }
    // console.log(sortedIngredients);
    // console.log(sortedAppliances);

    // const recipeName = document.querySelectorAll('.recipe-name');
    // console.log(recipeName);
    // recipeName.addEventListener('change', (event) => {
    //   event.preventDefault();
    // })

  });

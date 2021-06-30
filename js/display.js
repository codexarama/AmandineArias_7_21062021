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
            createIngredient(recipe);
          }
        });
      });
      // trie ingredients par ordre alphabétique
      ingredients.sort();
      // cree liste ingredients (DOM)
      const ingredientsLink = document.querySelectorAll('.ingredients-link');
      for (let i = 0; i < ingredientsLink.length; i++) {
        ingredientsLink[i].textContent = ingredients[i];
      }
    }
    setIngredients();

    // AFFICHE LISTE APPAREILS (sans doublons)
    let appliances = [];
    function setAppliances() {
      // cree tableau appareils
      recipes.forEach((recipe) => {
        // supprime doublons
        if (!appliances.includes(recipe.appliance)) {
          appliances.push(recipe.appliance);
          createAppliance(recipe);
        }
      });
      // trie ingredients par ordre alphabétique
      appliances.sort();
      // cree liste appareils (DOM)
      const appliancesLink = document.querySelectorAll('.appliances-link');
      for (let i = 0; i < appliancesLink.length; i++) {
        appliancesLink[i].textContent = appliances[i];
      }
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
            createUstensil(recipe);
          }
        });
      });
      // trie ustensiles par ordre alphabétique
      ustensils.sort();
      // cree liste appareils (DOM)
      const ustensilsLink = document.querySelectorAll('.ustensils-link');
      for (let i = 0; i < ustensilsLink.length; i++) {
        ustensilsLink[i].textContent = ustensils[i];
      }
    }
    setUstensils();

    // AFFICHE LISTE RESULTATS RECHERCHES
    generalSearch.addEventListener('keyup', searchRecipe);
    generalSearch.addEventListener('keyup', displaySelection);
    generalSearch.addEventListener('keyup', checkMatches);
    // searches.forEach((search) => {
    //   search.addEventListener('keyup', searchRecipe);
    //   // console.log(search);
    // });

    // AFFICHE CARTES RECETTES (ordre alphabetique)
    for (let i = 0; i < recipes.length; i++) {
      // cree liste recettes (DOM) triees par ordre alphabetique
      createRecipesList(recipes.sort(filterBy('name'))[i]);
      // affiche par defaut recettes triees par ordre alphabetique
      setRecipe(recipes.sort(filterBy('name'))[i]);
    }
  });

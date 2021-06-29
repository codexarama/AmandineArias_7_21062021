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
    function setIngredients() {
      // cree tableau ingredients
      let ingredients = [];
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
    setIngredients();

    // AFFICHE LISTE APPAREILS (sans doublons)
    function setAppliances() {
      // cree tableau appareils
      let appliances = [];
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
    function setUstensils() {
      let ustensils = [];
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

    // AFFICHE TAG(S) CORRESPONDANT AU(X) CHOI(X)
    // searchList.forEach((item) =>
    //   item.addEventListener('click', resultsSelection)
    // );
    // console.log(searchList) // NodeList []

    // resultsSelection()

    // AFFICHE CARTES RECETTES (ordre alphabetique)
    for (let i = 0; i < recipes.length; i++) {
      createRecipesList(recipes[i]);
      setRecipe(recipes.sort(filterBy('name'))[i]);
    }
  });

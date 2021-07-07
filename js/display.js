fetch('recipes.json')
  .then((response) => response.json())
  .then((data) => {
    const recipes = data.recipes;

    // AFFICHE CARTES RECETTES (non triees)
    // for (let i = 0; i < recipes.length; i++) {
    //   setRecipe(recipes[i]);
    // }

    // AFFICHE CARTES RECETTES (ordre alphabetique)
    // cree tableau [recettes triees]
    let sortedRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
      sortedRecipes.push(recipes.sort(filterBy('name'))[i]);
      setRecipe(sortedRecipes[i]);
    }

    // -----------------------------------------------------------------------------
    console.log(recipes); // affiche tableau de toutes les recettes
    // -----------------------------------------------------------------------------

    // RECHERCHE RECETTES PAR : nom, description, ingrédients
    // cree tableau [recherche principale] (ordre alphabetique)
    const mainSearch = [];

    function setMainSearch() {
      recipes.forEach((recipe) => {
        // ajoute noms recettes
        mainSearch.push(recipe.name);
        // ajoute descriptions
        mainSearch.push(recipe.description);
        recipe.ingredients.forEach((item) => {
          // ajoute ingredients
          mainSearch.push(item.ingredient);
        });
      });

      // cree liste nom, description, ingrédients (DOM)
      mainSearch.forEach((item) => {
        createmainList(item);
      });
    }
    setMainSearch();

    // AFFICHE LISTE INGREDIENTS (sans doublons)
    // cree tableau [ingredients]
    const ingredients = [];

    function setIngredients() {
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((item) => {
          // supprime doublons
          if (!ingredients.includes(item.ingredient)) {
            // ajoute ingredients
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
    // cree tableau [appareils]
    const appliances = [];

    function setAppliances() {
      recipes.forEach((recipe) => {
        // supprime doublons
        if (!appliances.includes(recipe.appliance)) {
          // ajoute appareils
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
    // cree tableau [ustensiles]
    const ustensils = [];

    function setUstensils() {
      recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
          // supprime doublons
          if (!ustensils.includes(ustensil)) {
            // ajoute ustensiles
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

    // AFFICHE SELECTION(S)
    const searchList = document.querySelectorAll('[role="option"]');
    searchList.forEach((item) =>
      item.addEventListener('click', displaySelection)
    );

    // AFFICHE LISTE RESULTATS RECHERCHES
    // via barre de recherche principale
    const generalSearch = document.querySelector('.search-bar');
    const recipeOption = document.querySelectorAll('.recipe-option');
    for (let i = 0; i < recipeOption.length; i++) {
      setMatches(generalSearch, mainChoice, recipeOption[i]);
    }

    // via barre de recherche "ingredients"
    const ingredientSearch = document.querySelector('#search-ingredients');
    const ingredientsOption = document.querySelectorAll('.ingredients-option');
    for (let i = 0; i < ingredientsOption.length; i++) {
      setMatches(ingredientSearch, ingredientsChoice, ingredientsOption[i]);
    }

    // via barre de recherche "appareils"
    const applianceSearch = document.querySelector('#search-appliances');
    const appliancesOption = document.querySelectorAll('.appliances-option');
    for (let i = 0; i < appliancesOption.length; i++) {
      setMatches(applianceSearch, appliancesChoice, appliancesOption[i]);
    }

    // via barre de recherche "ustensiles"
    const ustensilSearch = document.querySelector('#search-ustensils');
    const ustensilsOption = document.querySelectorAll('.ustensils-option');
    for (let i = 0; i < ustensilsOption.length; i++) {
      setMatches(ustensilSearch, ustensilsChoice, ustensilsOption[i]);
    }

    // AFFICHE MESSAGE ERREUR SI AUCUN CRITERE NE CORRESPOND
    generalSearch.addEventListener('keyup', checkMatches);
  });

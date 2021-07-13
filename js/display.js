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

    // AFFICHE LISTE INGREDIENTS (sans doublons)
    // cree tableau [ingredients]
    const ingredients = [];
    setIngredients(ingredients);

    function setIngredients(category) {
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((item) => {
          // supprime doublons
          if (!category.includes(item.ingredient)) {
            // ajoute ingredients
            category.push(item.ingredient);
          }
        });
      });

      // trie par ordre alphabétique
      category.sort();
      // cree liste (DOM)
      setIngredientsList(category);
    }

    // AFFICHE LISTE APPAREILS (sans doublons)
    // cree tableau [appareils]
    const appliances = [];
    setAppliances(appliances);

    function setAppliances(category) {
      recipes.forEach((recipe) => {
        // supprime doublons
        if (!category.includes(recipe.appliance)) {
          // ajoute appareils
          category.push(recipe.appliance);
        }
      });

      // trie par ordre alphabétique
      category.sort();
      // cree liste (DOM)
      setAppliancesList(category);
    }

    // AFFICHE LISTE USTENSILES (sans doublons)
    // cree tableau [ustensiles]
    const ustensils = [];
    setUstensils(ustensils);

    function setUstensils(category) {
      recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
          // supprime doublons
          if (!category.includes(ustensil)) {
            // ajoute ustensiles
            category.push(ustensil);
          }
        });
      });

      // trie par ordre alphabétique
      category.sort();
      // cree liste (DOM)
      setUstensilsList(category);
    }

    // AFFICHE RESULTATS RECHERCHES
    // via barre de recherche principale
    recipesMatches(recipes);

    // via barre de recherche "ingredients"
    const ingredientSearch = document.querySelector('#search-ingredients');
    const ingredientsOption = document.querySelectorAll('.ingredients-option');
    for (let i = 0; i < ingredientsOption.length; i++) {
      setTagsMatches(ingredientSearch, ingredientsList, ingredientsOption[i]);
    }

    // via barre de recherche "appareils"
    const applianceSearch = document.querySelector('#search-appliances');
    const appliancesOption = document.querySelectorAll('.appliances-option');
    for (let i = 0; i < appliancesOption.length; i++) {
      setTagsMatches(applianceSearch, appliancesList, appliancesOption[i]);
    }

    // via barre de recherche "ustensiles"
    const ustensilSearch = document.querySelector('#search-ustensils');
    const ustensilsOption = document.querySelectorAll('.ustensils-option');
    for (let i = 0; i < ustensilsOption.length; i++) {
      setTagsMatches(ustensilSearch, ustensilsList, ustensilsOption[i]);
    }

    // AFFICHE SELECTION(S)
    const searchList = document.querySelectorAll('[role="option"]');
    searchList.forEach((item) =>
      item.addEventListener('click', displaySelection)
    );
  });

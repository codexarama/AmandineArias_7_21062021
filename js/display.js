fetch('recipes.json')
  .then((response) => response.json())
  .then((data) => {
    const recipes = data.recipes;

    // AFFICHE CARTES RECETTES (non triees)
    // for (let i = 0; i < recipes.length; i++) {
    //   setRecipe(recipes[i]);
    // }

    // AFFICHE CARTES RECETTES (ordre alphabetique)
    let sortedRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      sortedRecipes.push(recipes.sort(filterBy('name'))[i]);
      setRecipe(sortedRecipes[i]);
    }
    console.log(recipes);

    // --------------------------------------------------------------------
    // // recupere taille de chaque carte (px)
    // const cards = document.querySelectorAll('.card')
    //   const cardHeight = []
    //   cards.forEach((card) => cardHeight.push(card.offsetHeight))
    //   console.log(cardHeight);
    //   for(let i = 0; i < cardHeight.length; i++) {
    //     console.log((i - 3)); // ok
    //     // cardHeight[i].style.top = '-150px'
    //     // if (i > 2) cardHeight[i].style.top = ((cardHeight[i - 3] - 5) * 2) + "px"
    //   }

    // RECHERCHE RECETTES PAR : nom, description, ingrédients
    // cree tableau [recherche principale] (ordre alphabetique)
    let mainSearch = [];
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
    let ingredients = [];
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
    let appliances = [];
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
    let ustensils = [];
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

    // AFFICHE LISTE RESULTATS RECHERCHES
    generalSearch.addEventListener('keyup', searchRecipe);
    // searches.forEach((search) => {
    //   search.addEventListener('keyup', searchRecipe);
    //   // console.log(search);
    // });
    // AFFICHE SELECTION(S)
    const searchList = document.querySelectorAll('[role="option"]');
    searchList.forEach((item) =>
      item.addEventListener('click', displaySelection)
    );
    // AFFICHE MESSAGE ERREUR SI AUCUN CRITERE NE CORRESPOND
    generalSearch.addEventListener('keyup', checkMatches);
  });

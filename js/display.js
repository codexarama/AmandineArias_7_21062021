fetch('recipes.json')
  .then((response) => response.json())
  .then((data) => {
    const recipes = data.recipes;
    console.log(recipes);

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

    // AFFICHE LISTE INGREDIENTS (sans doublons)
    const ingredientsChoice = document.getElementById('ingredients-list');
    function setIngredients() {
      let ingredients = [];
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((item) => {
          // supprime doublons
          if (!ingredients.includes(item.ingredient)) {
            ingredients.push(item.ingredient);
            // cree DOM elements
            const ingredientsOption = elmtFactory(
              'li',
              {
                id: recipe.id,
                role: 'option',
                class: 'ingredients-option tag',
              },
              elmtFactory(
                'a',
                { href: '#', class: 'ingredients-link tag-link' },
                `${item.ingredient}`
              )
            );
            ingredientsChoice.append(ingredientsOption);
          }
        });
      });
      console.log(ingredients.sort());
      return ingredients;
    }
    setIngredients();

    // AFFICHE LISTE APPAREILS (sans doublons)
    const appliancesChoice = document.getElementById('appliances-list');
    function setAppliances() {
      let appliances = [];
      recipes.forEach((recipe) => {
        if (!appliances.includes(recipe.appliance)) {
          // supprime doublons
          appliances.push(recipe.appliance);
          // appliances.sort().push(recipe.appliance);
          // cree DOM elements
          const appliancesOption = elmtFactory(
            'li',
            {
              id: recipe.id,
              role: 'option',
              class: 'appliances-option tag',
            },
            elmtFactory(
              'a',
              { href: '#', class: 'appliances-link tag-link' },
              `${recipe.appliance}`
            )
          );
          appliancesChoice.append(appliancesOption);
        }
      });
      console.log(appliances.sort());
      return appliances.sort(); // ne fonctionne pas
      // return appliances;
    }
    setAppliances();

    // AFFICHE LISTE USTENSILS (sans doublons)
    const ustensilsChoice = document.getElementById('ustensils-list');
    function setUstensils() {
      let ustensils = [];
      recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
          // supprime doublons
          if (!ustensils.includes(ustensil)) {
            ustensils.push(ustensil);
            // cree DOM elements
            const ustensilsOption = elmtFactory(
              'li',
              {
                id: recipe.id,
                role: 'option',
                class: 'ustensils-option tag',
              },
              elmtFactory(
                'a',
                { href: '#', class: 'ustensils-link tag-link' },
                `${ustensil}`
              )
            );
            ustensilsChoice.append(ustensilsOption);
          }
        });
      });
      console.log(ustensils.sort());
      return ustensils;
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
      // console.log(recipes[i].ingredients[0].ingredient);
      setRecipe(recipes.sort(filterBy('name'))[i]);
      // setRecipe(recipes.sort((recipe) => recipe.name)[i]); // ne fonctionne pas
      // console.log(recipes.sort());
    }
  });

fetch('recipes.json')
  .then((response) => response.json())
  .then((data) => {
    const recipes = data.recipes;

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
      return ingredients;
    }
    setIngredients();
    // ne fonctionne pas
    // setIngredients().sort(filterBy('ingredient')); // ne fonctionne pas

    // AFFICHE LISTE APPAREILS (sans doublons)
    const appliancesChoice = document.getElementById('appliances-list');
    function setAppliances() {
      let appliances = [];
      recipes.forEach((recipe) => {
        if (!appliances.includes(recipe.appliance)) {
          // supprime doublons
          appliances.push(recipe.appliance);
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
      return appliances;
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
      return ustensils;
    }
    setUstensils();

    // AFFICHE LES CARTES RECETTES (ordre alphabétique)
    for (let i = 0; i < recipes.length; i++) {
      // toutes les recettes par defaut
      // setRecipe(quickSort(recipes)[i]);
      // setRecipe(partitionHoare(recipes)[i])
    }
  });

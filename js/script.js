fetch('recipes.json')
  .then((response) => response.json())
  .then((data) => {
    const recipes = data.recipes;
    console.log(recipes);

    for (let i = 0; i < recipes.length; i++) {
      // console.log(recipes[i].ingredients[0].ingredient);
      setRecipe(recipes[i]);
    }

    // AFFICHE LISTE INGREDIENTS (sans doublons)
    const ingredientsChoice = document.getElementById('ingredients-list');
    const setIngredients = () => {
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
                class: 'ingredients-option options-list',
              },
              elmtFactory(
                'a',
                { href: '#', class: 'ingredients-link option-link' },
                `${item.ingredient}`
              )
            );
            ingredientsChoice.append(ingredientsOption);
          }
        });
      });
      return ingredients;
    };
    setIngredients();

    // AFFICHE LISTE APPAREILS (sans doublons)
    const appliancesChoice = document.getElementById('appliances-list');
    const setAppliances = () => {
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
              class: 'appliances-option options-list',
            },
            elmtFactory(
              'a',
              { href: '#', class: 'appliances-link option-link' },
              `${recipe.appliance}`
            )
          );
          appliancesChoice.append(appliancesOption);
        }
      });
      return appliances;
    };
    setAppliances();

    // AFFICHE LISTE USTENSILS (sans doublons)
    const ustensilsChoice = document.getElementById('ustensils-list');
    const setUstensils = () => {
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
                class: 'ustensils-option options-list',
              },
              elmtFactory(
                'a',
                { href: '#', class: 'ustensils-link option-link' },
                `${ustensil}`
              )
            );
            ustensilsChoice.append(ustensilsOption);
          }
        });
      });
      return ustensils;
    };
    setUstensils();

    // DOM ELEMENTS : OPTIONS OF EACH
    // const ingredientsAll = document.querySelectorAll('.ingredients-option a')
    // console.log(ingredientsAll);
    // const appliancesAll = document.querySelectorAll('.appliances-option a')
    // console.log(appliancesAll);
    // const ustensilsAll = document.querySelectorAll('.ustensils-option a')
    // console.log(ustensilsAll);
  });

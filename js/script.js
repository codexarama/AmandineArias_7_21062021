fetch('recipes.json')
  .then((response) => response.json())
  .then((data) => {
    const recipes = data.recipes;
    console.log(recipes);

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
            const ingredientsOption = (option) => {
              option = document.createElement('li');
              option.setAttribute('id', recipe.id);
              option.setAttribute('role', 'option');
              option.setAttribute('class', 'ingredients-option');
              option.textContent = item.ingredient;
              ingredientsChoice.append(option);
            };
            ingredientsOption();
          }
        });
      });
      return ingredients;
    };
    setIngredients();
    // const ingredientsAll = document.querySelectorAll('.ingredients-option')
    // console.log(ingredientsAll);

    // AFFICHE LISTE APPAREILS (sans doublons)
    const applianceChoice = document.getElementById('appliances-list');
    const appliancesList = () => {
      let appliances = [];
      recipes.forEach((recipe) => {
        if (!appliances.includes(recipe.appliance)) {
          // supprime doublons
          appliances.push(recipe.appliance);
          // cree DOM elements
          const appliancesOption = (option) => {
            option = document.createElement('li');
            option.setAttribute('id', recipe.id);
            option.setAttribute('role', 'option');
            option.setAttribute('class', 'appliances-option');
            option.textContent = recipe.appliance;
            applianceChoice.append(option);
          };
          appliancesOption();
        }
      });
      return appliances;
    };
    appliancesList();
    // const appliancesAll = document.querySelectorAll('.appliances-option')
    // console.log(appliancesAll);

    // AFFICHE LISTE USTENSILS (sans doublons)
    const ustensilsChoice = document.getElementById('ustensils-list');
    const ustensilsList = () => {
      let ustensils = [];
      recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
          // supprime doublons
          if (!ustensils.includes(ustensil)) {
            ustensils.push(ustensil);
            // cree DOM elements
            const ustensilsOption = (option) => {
              option = document.createElement('li');
              option.setAttribute('id', recipe.id);
              option.setAttribute('role', 'option');
              option.setAttribute('class', 'ustensils-list');
              option.textContent = ustensil;
              ustensilsChoice.append(option);
            };
            ustensilsOption();
          }
        });
      });
      return ustensils;
    };
    ustensilsList();
    // const ustensilsAll = document.querySelectorAll('.ustensils-option')
    // console.log(ustensilsAll);
  });

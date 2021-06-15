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
          // recupere ingredients
          if (!ingredients.includes(item.ingredient)) {
            ingredients.push(item.ingredient);
            // cree elements dans DOM
            const ingredientsOption = (option) => {
              option = document.createElement('li');
              option.setAttribute('id', recipe.id);
              option.setAttribute('class', 'ingredients-option');
              option.textContent = item.ingredient;
              ingredientsChoice.append(option);
            };
            ingredientsOption();
          }
        });
      });
      // supprime doublons
      return [...new Set(ingredients)];
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
          appliances.push(recipe.appliance);
          // cree elements dans DOM
          const appliancesOption = (option) => {
            option = document.createElement('li');
            option.setAttribute('id', recipe.id);
            option.setAttribute('class', 'appliances-option');
            option.textContent = recipe.appliance;
            applianceChoice.append(option);
          };
          appliancesOption();
        }
      });
      // supprime doublons
      return [...new Set(appliances)];
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
          if (!ustensils.includes(ustensil)) {
            ustensils.push(ustensil);
            // cree elements dans DOM
            const ustensilsOption = (option) => {
              option = document.createElement('li');
              option.setAttribute('id', recipe.id);
              option.setAttribute('class', 'ustensils-list');
              option.textContent = ustensil;
              ustensilsChoice.append(option);
            };
            ustensilsOption();
          }
        });
      });
      // supprime doublons
      return [...new Set(ustensils)];
    };
    ustensilsList();
    // const ustensilsAll = document.querySelectorAll('.ustensils-option')
    // console.log(ustensilsAll);
  });

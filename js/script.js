fetch('recipes.json')
  .then((response) => response.json())
  .then((data) => {
    const recipes = data.recipes;
    console.log(recipes);

    // LISTE INGREDIENTS (sans doublons)
    const ingredientsList = () => {
        let ingredients = [];
        recipes.forEach(recipe => {
            recipe.ingredients.forEach((items) => {
                if(!ingredients.includes(items.ingredient)) ingredients.push(items.ingredient);
            })
        });
        return [... new Set (ingredients)]
    }
    console.log(ingredientsList());

    // LISTE APPAREILS (sans doublons)
    const appliancesList = () => {
        let appliances = [];
        recipes.forEach(recipe => {
            if(!appliances.includes(recipe.appliance)) appliances.push(recipe.appliance);
        });
        return [... new Set (appliances)]
    }
    console.log(appliancesList());


    // LISTE USTENSILS (sans doublons)
    const ustensilsList = () => {
        let ustensils = [];
        recipes.forEach(recipe => {
            recipe.ustensils.forEach((ustensil) => {
                if(!ustensils.includes(ustensil)) ustensils.push(ustensil);
            })
        });
        return [... new Set (ustensils)]
    }
    console.log(ustensilsList());
  });

// RESULTATS RECHERCHE
// detecte et montre correspondances

// cree tableau [matches]
// const matches = [];
// let filtredMatches  = []

function setMatches(input, list, option) {
    input.addEventListener('keyup', () => {
      const searchInput = input.value.toUpperCase();
      // const searchInput = input.value.normalize("NFCK");
      const textValue = option.textContent;

      // recherche apres saisie d'au moins 3 caracteres
      if (
        searchInput.length > 2 &&
        textValue.toUpperCase().indexOf(searchInput) > -1
      ) {
        list.style.display = 'flex';
        option.style.display = '';
        option.classList.add('matches');

        // // recupere recettes correspondant au(x) choix
        // function getMatches(recipes, textValue) {
        //   matches = [];
        //   recipes.forEach((recipe) => {
        //     let isIngredient = false;
        //     recipe.ingredients.forEach((i) => {
        //       if (i.ingredient === textValue) {
        //         isIngredient = true;
        //       }
        //     });

        //     // -----------------------------------------------------------------------------
        //     console.log(textValue); // affiche nom selection et boucle generee
        //     // -----------------------------------------------------------------------------

        //     if (
        //       recipe.name === textValue ||
        //       recipe.description === textValue ||
        //       recipe.appliance === textValue ||
        //       recipe.ustensils.forEach((ustensil) => ustensil === textValue) ||
        //       isIngredient == true
        //     ) {
        //       matches.push(recipe);
        //     }
        //   });

        //   // -----------------------------------------------------------------------------
        //   console.log(matches);
        //   // -----------------------------------------------------------------------------

        //   return matches;
        // }

        // // AFFICHE RECETTES CORRESPONDANT AU(X) RECHERCHE(S)
        // function getRecipesToDisplay() {
          // fetch('recipes.json')
          //   .then((response) => response.json())
          //   .then((data) => {
          //     const recipes = data.recipes;

        //       // cree tableau(x) [recette(s) a afficher]
        //       let recipesToDisplay = [];

        //       // ajoute recette(s) correspondant au(x) choix
        //       recipesToDisplay.forEach((textValue) => {
        //         recipesToDisplay.push(getMatches(recipes, textValue));
        //       });

        //       console.log(recipesToDisplay);
        //       // cree tableau [recettes à afficher] sans doublons
        //       const uniqueRecipe = [...new Set(merge(recipesToDisplay))];

        //       // affiche recettes
        //       for (let i = 0; i < uniqueRecipe.length; i++) {
        //         setRecipe(uniqueRecipe[i]);

        //         // -----------------------------------------------------------------------------
        //         console.log(uniqueRecipe.length); // affiche nb recettes correspondant au(x) choix
        //         // -----------------------------------------------------------------------------
        //       }
        //       return recipesToDisplay;
            // });
        // }

        // getRecipesToDisplay();

        // -----------------------------------------------------------------------------
        fetch('recipes.json')
          .then((response) => response.json())
          .then((data) => {
            const recipes = data.recipes;

            // const matches = [];

            recipes.forEach((recipe) => {

              let isIngredient = false;

              recipe.ingredients.forEach((i) => {
                if (i.ingredient === textValue) {
                  isIngredient = true;
                }
              });

              if (
                recipe.name === textValue ||
                recipe.description === textValue ||
                recipe.appliance === textValue ||
                recipe.ustensils.forEach((ustensil) => ustensil === textValue) ||
                isIngredient == true
              ) {

                console.log(recipe); // recupere recette(s) correspondante(s)
                // console.log(recipe.id); // recupere id recette(s) correspondante(s)
                // return recipe

                // setRecipe(recipe)

                // recipe.forEach((match) => {
                //   if (!matches.includes(match)) matches.push(match);
                // }); // is not a function

                // if (!matches.includes(recipe)) matches.push(recipe);
                // matches.push(recipe);
                // matches.forEach((match) => {if (!filtredMatches.includes(match)) filtredMatches.push(match)})
                // filtredMatches = [...new Set(matches)]
                // const filtredMatches = [...new Set(matches)]
                // console.log(filtredMatches);
              }
            });

            // console.log(matches); // OK
            // return matches;
            // console.log(filtredMatches);

          });

        // // supprime cartes recettes deja affichees
        // recipeSection.innerHTML = '';
      } else {
        option.style.display = 'none';
        option.classList.remove('matches');
      }

      // // recherche dès 1er caractere saisi --------------------------------------
      // if (textValue.toUpperCase().indexOf(searchInput) > -1) {
      //   list.style.display = 'flex';
      //   options.style.display = '';
      //   options.classList.add('matches');
      // } else {
      //   options.style.display = 'none';
      //   options.classList.remove('matches');
      // } ------------------------------------------------------------------------
    });
  }

  // fusionne tableaux [recettes à afficher]
  function merge(recipesToDisplay) {
    return recipesToDisplay.reduce(
      (acc, val) => acc.concat(Array.isArray(val) ? merge(val) : val),
      []
    );
  }

  // AFFICHE SELECTION(S)
  // DOM element
  const recipeSection = document.querySelector('#recipes');

  // cree tableau [choix]
  const choices = [];

  function displaySelection(event) {
    const selected = event.target;

    // retire "selected" du choix precedent
    if (selected.classList.contains('selected'))
      selected.classList.remove('selected');

    // affecte "selected" au nouveau choix
    selected.classList.add('selected');

    // ajoute au tableau [choix] (sans doublons)
    if (!choices.includes(selected)) {
      choices.push(selected);

      // cree tag(s) correspondant(s)
      createTag(selected);

      // detecte dernier choix
      const lastSelection = document.querySelector('#tags-collection').lastChild;

      // attribue code couleur selon categorie
      if (selected.classList.contains('recipe-option'))
        lastSelection.classList.add('recipes-result-btn');
      if (selected.classList.contains('ingredients-option'))
        lastSelection.classList.add('ingredients-result-btn');
      if (selected.classList.contains('appliances-option'))
        lastSelection.classList.add('appliances-result-btn');
      if (selected.classList.contains('ustensils-option'))
        lastSelection.classList.add('ustensils-result-btn');
    }

    // -----------------------------------------------------------------------------
    console.log(choices); // affiche elements du tableau [choices]
    // -----------------------------------------------------------------------------

    // affiche recettes correspondant au(x) recherche(s)
    getRecipesToDisplay();

    // supprime cartes recettes deja affichees
    recipeSection.innerHTML = '';
  }

  // // recupere recettes correspondant au(x) choix
  // function getRecipesByChoice(recipes, choice) {
  //   recipesByChoice = [];
  //   recipes.forEach((recipe) => {
  //     let isIngredient = false;
  //     recipe.ingredients.forEach((i) => {
  //       if (i.ingredient === choice) {
  //         isIngredient = true;
  //       }
  //     });

  //     // -----------------------------------------------------------------------------
  //     console.log(choice); // affiche nom selection et boucle generee
  //     // -----------------------------------------------------------------------------

  //     if (
  //       recipe.name === choice ||
  //       recipe.description === choice ||
  //       recipe.appliance === choice ||
  //       recipe.ustensils.forEach((ustensil) => ustensil === choice) ||
  //       isIngredient == true
  //     ) {
  //       recipesByChoice.push(recipe);
  //     }
  //   });

  //   // -----------------------------------------------------------------------------
  //   console.log(recipesByChoice);
  //   // -----------------------------------------------------------------------------

  //   return recipesByChoice;
  // }

  // // fusionne tableaux [recettes à afficher]
  // function merge(recipesToDisplay) {
  //   return recipesToDisplay.reduce(
  //     (acc, val) => acc.concat(Array.isArray(val) ? merge(val) : val),
  //     []
  //   );
  // }

  // // AFFICHE RECETTES CORRESPONDANT AU(X) RECHERCHE(S)
  // function getRecipesToDisplay() {
  //   fetch('recipes.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const recipes = data.recipes;

  //       // cree tableau(x) [recette(s) a afficher]
  //       let recipesToDisplay = [];

  //       // ajoute recette(s) correspondant au(x) choix
  //       choices.forEach((choice) => {
  //         recipesToDisplay.push(getRecipesByChoice(recipes, choice.textContent));
  //       });

  //       // cree tableau [recettes à afficher] sans doublons
  //       const uniqueRecipe = [...new Set(merge(recipesToDisplay))];

  //       // affiche recettes
  //       for (let i = 0; i < uniqueRecipe.length; i++) {
  //         setRecipe(uniqueRecipe[i]);

  //         // -----------------------------------------------------------------------------
  //         console.log(uniqueRecipe.length); // affiche nb recettes correspondant au(x) choix
  //         // -----------------------------------------------------------------------------
  //       }
  //       return recipesToDisplay;
  //     });
  // }

  // AFFICHE MESSAGE SI AUCUN CRITERE DE RECHERCHE NE CORRESPOND
  // apres saisie d'au moins 3 caracteres
  createAlert();

  function checkMatches() {
    const searchMatches = document.querySelectorAll('.matches');
    const alert = document.querySelector('.alert-msg');
    const generalSearch = document.querySelector('.search-bar');
    const mainInput = generalSearch.value.toUpperCase();

    if (mainInput.length > 2 && searchMatches.length === 0)
      alert.style.display = 'block';
    // masque message dans le cas contraire
    else alert.style.display = 'none';
  }

  // // recherche dès 1er caractere saisi ------------------------------------------
  // function checkMatches() {
  //   const searchMatches = document.querySelectorAll('.matches');
  //   const alert = document.querySelector('.alert-msg');

  //   if (searchMatches.length === 0) alert.style.display = 'block';

  //   // masque message dans le cas contraire
  //   else alert.style.display = 'none';
  // } ----------------------------------------------------------------------------

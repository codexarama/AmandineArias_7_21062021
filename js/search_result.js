// // RESULTATS RECHERCHE
// // detecte et affiche correspondances

// function setMatches(input, list, option) {
//   input.addEventListener("keyup", () => {
//     const searchInput = input.value.toUpperCase();
//     // const searchInput = input.value.normalize("NFCK");
//     const textValue = option.textContent;

//     // recherche correspondance(s) apres saisie d'au moins 3 caracteres
//     if (
//       searchInput.length > 2 &&
//       textValue.toUpperCase().indexOf(searchInput) > -1
//     ) {
//       option.style.display = "";
//       option.classList.add("matches");

//       // recupere et affiche recette(s) correspondante(s)
//       fetch("recipes.json")
//         .then((response) => response.json())
//         .then((data) => {
//           const recipes = data.recipes;
//           const noDoublon = [...new Set(recipesByMatchFromInputs)];
//           console.log(noDoublon);
//           matchedRecipes = getRecipesFromSearchInput(recipes, textValue);
//           matchedRecipes.forEach((match) => {
//             setRecipe(match);
//           });
//         });

//       // supprime cartes recettes deja affichees
//       recipeSection.innerHTML = "";
//     } else {
//       option.style.display = "none";
//       option.classList.remove("matches");
//     }

//     // // recherche correspondance(s) dès 1er caractere saisi -------------------
//     // if (textValue.toUpperCase().indexOf(searchInput) > -1) {
//     //   list.style.display = 'flex';
//     //   options.style.display = '';
//     //   options.classList.add('matches');
//     // } else {
//     //   options.style.display = 'none';
//     //   options.classList.remove('matches');
//     // } ------------------------------------------------------------------------
//   });
// }

// // RECUPERE RECETTES CORRESPONDANT AU(X) CHOIX
// // APPELLEE AU KEYUP EVENT DANS INPUT

// // cree tableau correspondance(s) avec saisie input
// let recipesByMatchFromInputs = [];

// function getRecipesFromSearchInput(recipes, option) {
//   recipes.forEach((recipe) => {
//     let isIngredient = false;
//     recipe.ingredients.forEach((i) => {
//       if (i.ingredient === option) {
//         isIngredient = true;
//       }
//     });

//     // -----------------------------------------------------------------------------
//     console.log(option); // affiche nom selection
//     // -----------------------------------------------------------------------------

//     if (
//       recipe.name === option ||
//       recipe.description === option ||
//       recipe.appliance === option ||
//       recipe.ustensils.forEach((ustensil) => ustensil === option) ||
//       isIngredient == true
//     ) {
//       // console.log(recipe);
//       let isDoublon = false;
//       recipesByMatchFromInputs.forEach((r) => {
//         if (r.name === recipe.name) {
//           isDoublon = true;
//         }
//       });

//       if (!isDoublon) {
//         recipesByMatchFromInputs.push(recipe);
//         // recipesByMatchFromInputs.forEach((item) => {
//         //   if (!recipesByMatchFromInputs.includes(item))
//         //     recipesByMatchFromInputs.push(recipe);
//         // });
//         // const noDoublon = [...new Set(recipesByMatchFromInputs)];
//         // console.log(noDoublon);
//       }
//     }
//   });

//   // -----------------------------------------------------------------------------
//   console.log(recipesByMatchFromInputs);
//   // -----------------------------------------------------------------------------

//   return recipesByMatchFromInputs;
// }

// ______________________________________________________________________________________________________________________________________________

// RESULTATS RECHERCHE PAR TAG(S)
// detecte et affiche correspondance(s)

function setTagsMatches(input, list, option) {
  input.addEventListener("keyup", () => {
    const searchInput = input.value.toUpperCase();
    const textValue = option.textContent.toUpperCase();

    if (textValue.indexOf(searchInput) > -1) {
      list.style.display = "flex";
      option.style.display = "";
      option.classList.add("matches");
    } else {
      option.style.display = "none";
      option.classList.remove("matches");
    }
  });
}

// AFFICHE SELECTION(S)
// DOM element
const recipeSection = document.querySelector("#recipes");

// cree tableau [choix]
const choices = [];

// function displaySelection(event) {
//   const selected = event.target;
function displaySelection(event) {
  const selected = event.target;

  // retire "selected" du choix precedent
  if (selected.classList.contains("selected"))
    selected.classList.remove("selected");

  // affecte "selected" au nouveau choix
  selected.classList.add("selected");

  // ajoute au tableau [choix] (sans doublons)
  if (!choices.includes(selected)) {
    choices.push(selected);

    // cree tag(s) correspondant(s)
    createTag(selected);

    // attribue code couleur selon categorie
    customiseTag(selected, "ingredients");
    customiseTag(selected, "appliances");
    customiseTag(selected, "ustensils");
  }

  // -----------------------------------------------------------------------------
  console.log(choices); // affiche elements du tableau [choices]
  // -----------------------------------------------------------------------------

  // affiche recettes correspondant au(x) recherche(s)
  displaySelectedRecipes();

  // supprime cartes recettes deja affichees
  recipeSection.innerHTML = "";
  return choices;
}

// CUSTOMISE BOUTONS CREES A CHAQUE SELECTION DE TAG SELON CATEGORIE
function customiseTag(selected, category) {
  const lastSelection = document.querySelector("#tags-collection").lastChild;

  if (selected.classList.contains(category + "-option"))
    lastSelection.classList.add(category + "-result-btn");
}

// RECUPERE RECETTES CORRESPONDANT AU(X) CHOIX
// APPELLEE AU CLIC EVENT SUR OPTION DANS LISTE et SUR TAG DE SUPPRESSION
function getRecipesByTag(recipes, option) {
  // cree tableau recettes par correspondance
  recipesByTag = [];

  recipes.forEach((recipe) => {
    let isIngredient = false;
    recipe.ingredients.forEach((ingredients) => {
      if (ingredients.ingredient === option) {
        isIngredient = true;
      }
    });

    // -----------------------------------------------------------------------------
    console.log(option); // affiche nom selection
    // -----------------------------------------------------------------------------

    if (
      // recipe.ingredients.forEach((ingredients) => {
      //   ingredients.ingredient === option
      // }) ||
      isIngredient == true ||
      recipe.appliance === option ||
      recipe.ustensils.forEach((ustensil) => ustensil === option)
    ) {
      recipesByTag.push(recipe);
    }
  });

  // -----------------------------------------------------------------------------
  console.log(recipesByTag);
  // -----------------------------------------------------------------------------

  return recipesByTag;
}

// fusionne tableaux [recettes à afficher]
function merge(recipesToDisplay) {
  return recipesToDisplay.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? merge(val) : val),
    []
  );
}

// AFFICHE RECETTES CORRESPONDANT AU(X) RECHERCHE(S)
function displaySelectedRecipes() {
  fetch("recipes.json")
    .then((response) => response.json())
    .then((data) => {
      const recipes = data.recipes;

      // cree tableau(x) [recette(s) a afficher]
      let recipesToDisplay = [];

      // ajoute recette(s) correspondant au(x) choix
      // choices.forEach((textValue) => {
      //   recipesToDisplay.push(getRecipesByTag(recipes, textValue));
      choices.forEach((option) => {
        recipesToDisplay.push(getRecipesByTag(recipes, option.textContent));
      });

      // cree tableau [recettes à afficher] sans doublons
      const uniqueRecipe = [...new Set(merge(recipesToDisplay))];

      // affiche recettes
      for (let i = 0; i < uniqueRecipe.length; i++) {
        setRecipe(uniqueRecipe[i]);

        // -----------------------------------------------------------------------------
        console.log(uniqueRecipe.length); // affiche nb recettes correspondant au(x) choix
        // -----------------------------------------------------------------------------
      }
      return recipesToDisplay;
    });
}

// AFFICHE MESSAGE SI AUCUN CRITERE DE RECHERCHE NE CORRESPOND
// apres saisie d'au moins 3 caracteres
createAlert();

function noMatch() {
  const searchMatches = document.querySelectorAll(".matches");
  const alert = document.querySelector(".alert-msg");
  const generalSearch = document.querySelector(".search-bar");
  const mainInput = generalSearch.value.toUpperCase();

  if (mainInput.length > 2 && searchMatches.length === 0)
    alert.style.display = "block";
  // masque message dans le cas contraire
  else alert.style.display = "none";
}

// // recherche dès 1er caractere saisi ------------------------------------------
// function noMatch() {
//   const searchMatches = document.querySelectorAll('.matches');
//   const alert = document.querySelector('.alert-msg');

//   if (searchMatches.length === 0) alert.style.display = 'block';

//   // masque message dans le cas contraire
//   else alert.style.display = 'none';
// } ------------------------------------------------------------------------------

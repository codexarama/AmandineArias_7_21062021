// RESULTATS RECHERCHE PAR INPUT PRINCIPAL -----------------------------------------
// DOM ELEMENT
const mainSearch = document.querySelector('.search-bar');

// detecte et affiche correspondances
function recipesMatches(recipes) {
  // DOM element
  const recipesCard = document.querySelectorAll('.card');

  mainSearch.addEventListener('keyup', (e) => {
    const inputValue = normString(e.target.value);

    if (inputValue.length > 2) {
      const recipesByMatch = recipes.filter((recipe) => {
        const name = normString(recipe.name);
        const description = normString(recipe.description);

        return (
          name.includes(inputValue) ||
          description.includes(inputValue) ||
          recipe.ingredients.some((i) =>
            normString(i.ingredient).includes(inputValue)
          )
        );
      });

      // -------------------------
      console.log(recipesByMatch);
      // -------------------------

      // AFFICHE MESSAGE ERREUR SI AUCUN CRITERE NE CORRESPOND
      noMatch(recipesByMatch);

      // supprime cartes recettes deja affichees
      recipeSection.innerHTML = '';

      // affiche recettes correspondant au(x) resultat(s) de la recherche
      recipesByMatch.forEach((match) => {
        setRecipe(match);
      });

      // ajoute 'match' au(x) carte(s) recette(s) affichee(s)
      // NE FONCTIONNE PAS ----------------------------------------------------------
      recipesCard.forEach((card) => {
        console.log('coucou'); // ok
        card.classList.add('match');
      });

      // reinitialise toutes les recherches si aucune correspondance
      if (recipesByMatch.length === 0)
        recipes.forEach((recipe) => setRecipe(recipe));

      //   removeDataDOMRecipes();
      //   createDataDOMRecipes(recipesByMatch);
      //   displayInfoMessage(recipesByMatch);
      // } else {
      //   // Create full recipes and all tags
      //   removeDataDOMRecipes();
      //   createDataDOMRecipes(recipes);
      //   displayInfoMessage(recipes);

      //   // Delete selected tags if user restart a research
      //   const tagsChildren = tagsSelectedContainer.childNodes;
      //   tagsChildren.forEach(tagChild => {
      //     tagChild.remove();
      //   });
    }
  });
}

// MESSAGE SI AUCUN CRITERE DE RECHERCHE NE CORRESPOND
// apres saisie d'au moins 3 caracteres

createAlert();

function noMatch(search) {
  // const searchMatches = document.querySelectorAll('.matches');
  const alert = document.querySelector('.alert-msg');

  if (search.length === 0) {
    alert.style.display = 'block';
  }
  // masque message dans le cas contraire
  else alert.style.display = 'none';
}

// RESULTATS RECHERCHE PAR TAG(S) ---------------------------------------------------
// detecte et affiche correspondance(s)

function setTagsMatches(input, list, option) {
  input.addEventListener('keyup', () => {
    const searchInput = input.value.toUpperCase();
    const textValue = option.textContent.toUpperCase();

    if (textValue.indexOf(searchInput) > -1) {
      list.style.display = 'flex';
      option.style.display = '';
      option.classList.add('matches');
    } else {
      option.style.display = 'none';
      option.classList.remove('matches');
    }
  });
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

    // attribue code couleur selon categorie
    customiseTag(selected, 'ingredients');
    customiseTag(selected, 'appliances');
    customiseTag(selected, 'ustensils');
  }

  // ------------------
  console.log(choices);
  // ------------------

  // affiche recettes correspondant au(x) recherche(s)
  displaySelectedRecipes();

  // supprime cartes recettes deja affichees
  recipeSection.innerHTML = '';
  return choices;
}

// CUSTOMISE BOUTONS CREES A CHAQUE SELECTION DE TAG SELON CATEGORIE
function customiseTag(selected, category) {
  const lastSelection = document.querySelector('#tags-collection').lastChild;

  if (selected.classList.contains(category + '-option'))
    lastSelection.classList.add(category + '-result-btn');
}

// RECUPERE RECETTES CORRESPONDANT AU(X) CHOIX
// APPELLEE AU CLIC EVENT SUR OPTION DANS LISTE et SUR TAG DE SUPPRESSION
function getRecipesByTag(recipes, option) {
  // cree tableau recettes par correspondance
  const recipesByTag = [];

  recipes.forEach((recipe) => {
    let isIngredient = false;

    recipe.ingredients.forEach((ingredients) => {
      if (ingredients.ingredient === option) {
        isIngredient = true;
      }
    });

    // -----------------
    console.log(option);
    // -----------------

    if (
      isIngredient == true ||
      recipe.appliance === option ||
      recipe.ustensils.forEach((ustensil) => ustensil === option)
    ) {
      recipesByTag.push(recipe);
    }
  });

  // -----------------------
  console.log(recipesByTag);
  // -----------------------

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
  fetch('recipes.json')
    .then((response) => response.json())
    .then((data) => {
      const recipes = data.recipes;

      // cree tableau(x) [recette(s) a afficher]
      let recipesToDisplay = [];

      // ajoute recette(s) correspondant au(x) choix
      choices.forEach((option) => {
        recipesToDisplay.push(getRecipesByTag(recipes, option.textContent));
      });

      // cree tableau [recettes à afficher] sans doublons
      const uniqueRecipe = [...new Set(merge(recipesToDisplay))];

      // affiche recettes
      for (let i = 0; i < uniqueRecipe.length; i++) {
        setRecipe(uniqueRecipe[i]);

        // ------------------------------
        // console.log(uniqueRecipe.length);
        // ------------------------------
      }
      return recipesToDisplay;
    });
}

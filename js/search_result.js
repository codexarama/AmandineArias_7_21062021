// RESULTATS RECHERCHES (from main search bar)
const generalSearch = document.querySelector('.search-bar');
// detecte et montre correspondances
function searchRecipe() {
  const recipeName = document.querySelectorAll('.recipe-name');
  const filter = generalSearch.value.toUpperCase();
  for (let i = 0; i < recipeName.length; i++) {
    const name = recipeName[i].getElementsByTagName('a')[0];
    const textValue = name.textContent || name.innerText;
    if (textValue.toUpperCase().indexOf(filter) > -1) {
      recipeList.style.display = 'flex';
      recipeName[i].style.display = '';
      recipeName[i].classList.add('matches');
    } else {
      recipeName[i].style.display = 'none';
      recipeName[i].classList.remove('matches');
    }
  }
}

// RESULTATS RECHERCHES (from all search bars) -------------------------------------
// NE FONCTIONNE PAS ---------------------------------------------------------------
// // DOM main elements
// const searches = document.querySelectorAll('.search');
// console.log(searches);
// searches.forEach((search) => {
//   search.addEventListener('keyup', searchRecipe);
// });
// // affiche noms recettes si correspondent
// function searchRecipe() {
// const searchList = document.querySelectorAll('[role="option"]');
// console.log(searchList);
// // quand saisie dans searchbar
//   const filter = searches.forEach((search) => search.value.toUpperCase());
//   console.log(filter); // undefined
//   for (let i = 0; i < searchList.length; i++) {
//     const name = searchList[i].getElementsByTagName('a')[0];
//     const textValue = name.textContent || name.innerText;
//     if (textValue.toUpperCase().indexOf(filter) > -1) {
//       recipeList.style.display = 'flex';
//       searchList[i].style.display = '';
//       searchList[i].classList.add('matches');
//     } else {
//       searchList[i].style.display = 'none';
//       searchList[i].classList.remove('matches');
//     }
//   }
// }

// _________________________________________________________________________________

// CREE TAGS SELECTION RESULTATS RECHERCHE -----------------------------------------
// NE FONCTIONNE PAS HORS FETCH ----------------------------------------------------
// // SELECTION RESULTATS RECHERCHES
// // DOM element
// const searchList = document.querySelectorAll('[role="option"]');
// // cree tag(s) correspondant au(x) choi(x)
// function resultsSelection(item) {
//   const selectionList = [];
//   // retire "selected" au choix precedent
//   if (item.classList.contains('selected')) item.classList.remove('selected');
//   // affecte "selected" au nouveau choix
//   item.classList.add('selected');
//   // tableau choix (sans doublons)
//   if (!selectionList.includes(item)) {
//     selectionList.push(item);
//     // cree tag(s) correspondant(s)
//     createTag(item);
//     const lastSelection = document.querySelector('#tags-collection').lastChild;
//     // affecte couleur au tag selon correspondance
//     if (item.classList.contains('recipe-name'))
//       lastSelection.classList.add('recipes-result-btn');
//     if (item.classList.contains('ingredients-option'))
//       lastSelection.classList.add('ingredients-result-btn');
//     if (item.classList.contains('appliances-option'))
//       lastSelection.classList.add('appliances-result-btn');
//     if (item.classList.contains('ustensils-option'))
//       lastSelection.classList.add('ustensils-result-btn');
//   }
// }

// // SELECTION RESULTATS RECHERCHES
// // DOM element
// const searchList = document.querySelectorAll('[role="option"]');
// // cree tag(s) correspondant au(x) choi(x)
// function resultsSelection() {
//   const selectionList = [];
//   searchList.forEach((item) =>
//     item.addEventListener('click', (event) => {
//       event.preventDefault();
//       // retire "selected" au choix precedent
//       if (item.classList.contains('selected'))
//         item.classList.remove('selected');
//       // affecte "selected" au nouveau choix
//       item.classList.add('selected');
//       // tableau choix (sans doublons)
//       if (!selectionList.includes(item)) {
//         selectionList.push(item);
//         // cree tag(s) correspondant(s)
//         createTag(item);
//         const lastSelection =
//           document.querySelector('#tags-collection').lastChild;
//         // affecte couleur au tag selon correspondance
//         if (item.classList.contains('recipe-name'))
//           lastSelection.classList.add('recipes-result-btn');
//         if (item.classList.contains('ingredients-option'))
//           lastSelection.classList.add('ingredients-result-btn');
//         if (item.classList.contains('appliances-option'))
//           lastSelection.classList.add('appliances-result-btn');
//         if (item.classList.contains('ustensils-option'))
//           lastSelection.classList.add('ustensils-result-btn');
//       }
//     })
//   );
// }

// ---------------------------------------------------------------------------------

fetch('recipes.json')
  .then((response) => response.json())
  .then((data) => {

    // AFFICHE RESULTATS RECHERCHE
    // DOM elements
    const selectionList = [];
    const searchList = document.querySelectorAll('[role="option"]');
    // Affiche tag(s) correspondant au(x) choi(x)
    searchList.forEach((item) =>
      item.addEventListener('click', (event) => {
        event.preventDefault();
        // retire "selected" au choix precedent
        if (item.classList.contains('selected'))
          item.classList.remove('selected');
        // affecte "selected" au nouveau choix
        item.classList.add('selected');
        // tableau choix (sans doublons)
        if (!selectionList.includes(item)) {
          selectionList.push(item);
          // cree tag(s) correspondant(s)
          createTag(item);
          const lastSelection =
            document.querySelector('#tags-collection').lastChild;
          // affecte couleur au tag selon correspondance
          if (item.classList.contains('recipe-name'))
            lastSelection.classList.add('recipes-result-btn');
          if (item.classList.contains('ingredients-option'))
            lastSelection.classList.add('ingredients-result-btn');
          if (item.classList.contains('appliances-option'))
            lastSelection.classList.add('appliances-result-btn');
          if (item.classList.contains('ustensils-option'))
            lastSelection.classList.add('ustensils-result-btn');
        }
      })
    );
  });

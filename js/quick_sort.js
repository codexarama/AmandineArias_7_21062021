// ALGORITHME DE TRI
// METHODE QUICK SORT BASIC (sans utiliser fonction d'echange et de partition)
function quickSort(recipes) {
  // stop boucle si reste 1 seul element
  if (recipes.length < 2) return recipes;
  // valeur pivot
  let pivot = recipes[0];
  // sous-tableau elements < pivot
  let lesser = [];
  // sous-taleau elements > pivot
  let greater = [];
  // boucle sur tableau recettes
  for (let i = 1; i < recipes.length; i++) {
    // quick sort sur noms recettes
    if (recipes[i].name > pivot.name) greater.push(recipes[i]);
    else lesser.push(recipes[i]);
  }
  // fusion des 2 sous-tableaux
  return quickSort(lesser).concat(pivot, quickSort(greater));
}

// // METHODE QUICK SORT ELABORE (schéma de partition Hoare)

// // First write the swap function, which is just a helper function to swap values of the recipes.
// function swap(recipes, i, j) {
//   var temp = recipes[i];
//   recipes[i] = recipes[j];
//   recipes[j] = temp;
//   }
//   function quicksortHoare(recipes, left, right) {
//   // left-pointer would be the index of the first element which is 0 and right-pointer would b
//   left = left || 0;
//   right = right || recipes.length - 1;
//   var pivot = partitionHoare(recipes, left, right);
//   if (left < pivot - 1) {
//   quicksortHoare(recipes, left, pivot - 1);
//   }
//   if (right > pivot) {
//   quicksortHoare(recipes, pivot, right)
//   }
//   return recipes;
//   }

//   /* Two indices that start at the ends of the array being partitioned, then move toward each other, until they detect an inversion: a pair of elements, one greater than the pivot, one smaller, that are in the wrong order relative to each other. The inverted elements are then swapped.
// Here the numerical values of left and right is continually getting updated with each inner while loop. But only if the while loop condition gets satisfied. That is, when the while loop condition is unsatisfied, e.g. for the first inner while loop, when array[left] > array[pivot] which means we have found a misplaced pair.
// That is, although the left <= right (which is being made sure by the outer while loop) the actual elements are not sorted. Meaning a left side element is larger in value than the right side element. So, the code execution then jumps out of the inner while loop and goes right in to execute the swap function.
// */

//   function partitionHoare(recipes, left, right) {
//     var pivot = Math.floor((left + right) / 2);
//     while (left < right) {
//     while (recipes[left] < recipes[pivot]) {
//     left++
//     }
//     while (recipes[right] > recipes[pivot]) {
//     right--
//     }
//     if (left <= right) {
//     swap(recipes, left, right);
//     left++
//     right--
//     }
//     }
//     return left;
//     }

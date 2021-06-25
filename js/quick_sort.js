// ALGORITHME DE TRI
// METHODE QUICK SORT BASIC (sans utiliser fonction d'echange et de partition)
// function quickSort(recipes) {
//   // stop boucle si reste 1 seul element
//   if (recipes.length < 2) return recipes;
//   // valeur pivot
//   let pivot = recipes[0];
//   // sous-tableau elements < pivot
//   let lesser = [];
//   // sous-taleau elements > pivot
//   let greater = [];
//   // boucle sur tableau recettes
//   for (let i = 1; i < recipes.length; i++) {
//     // quick sort sur noms recettes
//     if (recipes[i].name > pivot.name) greater.push(recipes[i]);
//     else lesser.push(recipes[i]);
//   }
//   // fusion des 2 sous-tableaux
//   return quickSort(lesser).concat(pivot, quickSort(greater));
// }

// METHODE QUICK SORT ELABORE (schéma de partition Hoare)


    // First write the swap function, which is just a helper function to swap values of the array.
    function swap(array, i, j) {
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      console.log(temp); // 134 occurrences
      // var temp = array[i];
      // array[i] = array[j];
      // array[j] = temp;
    }

    function quicksortHoare(array, left = 0, right = array.length - 1) {
      // left-pointer would be the index of the first element which is 0 and right-pointer would be the index of the last element which would be (length -1).
      var pivot = partitionHoare(array, left, right);

      if (left < pivot.name - 1) {
        quicksortHoare(array, left.name, pivot.name - 1);
      }

      if (right.name > pivot.name) {
        quicksortHoare(array, pivot.name, right.name);
      }

      return array;
    }

    /* Two indices that start at the ends of the array being partitioned, then move toward each other, until they detect an inversion: a pair of elements, one greater than the pivot, one smaller, that are in the wrong order relative to each other. The inverted elements are then swapped.
Here the numerical values of left and right is continually getting updated with each inner while loop. But only if the while loop condition gets satisfied. That is, when the while loop condition is unsatisfied, e.g. for the first inner while loop, when array[left] > array[pivot] which means we have found a misplaced pair.
That is, although the left <= right (which is being made sure by the outer while loop) the actual elements are not sorted. Meaning a left side element is larger in value than the right side element. So, the code execution then jumps out of the inner while loop and goes right in to execute the swap function.
*/
    function partitionHoare(array, left, right) {
      var pivot = Math.floor((left + right) / 2);

      while (left < right) {
        while (array[left] < array[pivot]) {
          left++;
        }
        while (array[right] > array[pivot]) {
          right--;
        }

        if (left <= right) {
          swap(array, left, right);
          left++;
          right--;
        }
      }
      return left;
    }

    recipes = quicksortHoare(recipes, 0, recipes.length - 1);
    console.log(recipes); // tri par id

    for (let i = 0; i < recipes.length; i++) {
      setRecipe(quicksortHoare(recipes[i]));
    }

    // _____________________________________________________________________________

    // function swap(recipeName, i, j) {
    //   var temp = recipeName[i];
    //   recipeName[i] = recipeName[j];
    //   recipeName[j] = temp;
    // }

    // function partitionHoare(recipeName, left, right) {
    //   var pivot = recipeName[Math.floor((left + right) / 2)];
    //   while (left < right) {
    //     while (recipeName[left] < pivot) {
    //       left++;
    //     }
    //     while (recipeName[right] > pivot) {
    //       right--;
    //     }
    //     if (left <= right) {
    //       swap(recipeName, left, right);
    //       left++;
    //       right--;
    //     }
    //   }
    //   return left;
    // }

    // function quicksortHoare(recipeName, left, right) {
    //   var index;
    //   if (recipeName.length > 1) {
    //     index = partitionHoare(recipeName, left, right);
    //     if (left < index - 1) {
    //       quicksortHoare(recipeName, left, index - 1);
    //     }
    //     if (index < right) {
    //       quicksortHoare(recipeName, index, right);
    //     }
    //   }
    //   return recipeName;
    // }

    // for (let i = 0; i < recipes.length; i++) {
    //   setRecipe(quicksortHoare(recipes[i])); // cela ne trie pas !
    // }

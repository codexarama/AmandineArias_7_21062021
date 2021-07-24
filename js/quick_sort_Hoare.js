// QUICK SORT HOARE : trie recettes par nom
// echange position elements
function swapName(recipes, i, j) {
  var temp = recipes[i].name;
  recipes[i].name = recipes[j].name;
  recipes[j].name = temp;
}

function quicksortHoare(recipes, left, right) {
  left = left || 0; // index du 1er element
  right = right || recipes.length - 1; // index du dernier element

  // pivot = element separant le tableau en 2 parties
  var pivot = partitionHoare(recipes, left, right);

  if (left < pivot - 1) {
    quicksortHoare(recipes, left, pivot - 1);
  }

  if (right > pivot) {
    quicksortHoare(recipes, pivot, right);
  }

  return recipes;
}

/* Les 2 indices correspondent au dernier element de chaque tableau issu de la partition
Ils se deplacent l'un vers l'autre jusqu'a detecter 2 elements (l'un > au pivot, l'autre < au pivot) dans le mauvais ordre
Les elements de la paire sont alors intrevertis pour retablir le bon ordre
*/

function partitionHoare(recipes, left, right) {
  var pivot = Math.floor((left + right) / 2);

  while (left < right) {
    while (recipes[left].name < recipes[pivot].name) {
      left++;
    }
    while (recipes[right].name > recipes[pivot].name) {
      right--;
    }

    if (left <= right) {
      swapName(recipes, left, right);
      left++;
      right--;
    }
  }
  return left;
}

// ----------------------------------------
// QUICK SORT HOARE : tri generique
function swapGeneric(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function quicksortGeneric(array, left, right) {
  left = left || 0;
  right = right || array.length - 1;

  var pivot = partitionGeneric(array, left, right);

  if (left < pivot - 1) {
    quicksortGeneric(array, left, pivot - 1);
  }

  if (right > pivot) {
    quicksortGeneric(array, pivot, right);
  }

  return array;
}

function partitionGeneric(array, left, right) {
  var pivot = Math.floor((left + right) / 2);

  while (left < right) {
    while (array[left] < array[pivot]) {
      left++;
    }
    while (array[right] > array[pivot]) {
      right--;
    }

    if (left <= right) {
      swapGeneric(array, left, right);
      left++;
      right--;
    }
  }
  return left;
}

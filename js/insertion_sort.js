function insertionSort (arr) {
  // pour chaque recette du tableau
  for(let i = 0; i < arr.length; i++) {
    // recupere nom recette courant
    const current = arr[i].name;
    // recupere index nom recette precedent
    let j = i - 1;
    // ignore 1er nom recette (considere comme trie)
    // alors que nom recette courant < nom recette precedent
    while(j >= 0 && current < arr[j].name) {
      // echange rang des 2 elements
      arr[j + 1].name = arr[j].name;
      // revient au precedent index
      j--;
    }
    // nom recette suivant devient courant
    arr[j + 1].name = current;
  }
  return arr;
}
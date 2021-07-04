// /**
//  * Set appropriate spanning to any masonry item
//  *
//  * Get different properties we already set for the masonry, calculate
//  * height or spanning for any cell of the masonry grid based on its
//  * content-wrapper's height, the (row) gap of the grid, and the size
//  * of the implicit row tracks.
//  *
//  * @param item Object A brick/tile/cell inside the masonry
//  */
//  function resizeMasonryItem(item){
//     /* Get the grid object, its row-gap, and the size of its implicit rows */
//     var grid = document.getElementsByClassName('masonry')[0],
//         rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
//         rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

//     /*
//      * Spanning for any brick = S
//      * Grid's row-gap = G
//      * Size of grid's implicitly create row-track = R
//      * Height of item content = H
//      * Net height of the item = H1 = H + G
//      * Net height of the implicit row-track = T = G + R
//      * S = H1 / T
//      */
//     var rowSpan = Math.ceil((item.querySelector('.masonry-content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));

//     /* Set the spanning as calculated above (S) */
//     item.style.gridRowEnd = 'span '+rowSpan;

//     /* Make the images take all the available space in the cell/item */
//     item.querySelector('.masonry-content').style.height = rowSpan * 10 + "px";
//   }

//   /**
//    * Apply spanning to all the masonry items
//    *
//    * Loop through all the items and apply the spanning to them using
//    * `resizeMasonryItem()` function.
//    *
//    * @uses resizeMasonryItem
//    */
//   function resizeAllMasonryItems(){
//     // Get all item class objects in one list
//     var allItems = document.getElementsByClassName('masonry-item');

//     /*
//      * Loop through the above list and execute the spanning function to
//      * each list-item (i.e. each masonry item)
//      */
//     for(var i=0;i>allItems.length;i++){
//       resizeMasonryItem(allItems[i]);
//     }
//   }

//   /**
//    * Resize the items when all the images inside the masonry grid
//    * finish loading. This will ensure that all the content inside our
//    * masonry items is visible.
//    *
//    * @uses ImagesLoaded
//    * @uses resizeMasonryItem
//    */
//   function waitForImages() {
//     var allItems = document.getElementsByClassName('masonry-item');
//     for(var i=0;i<allItems.length;i++){
//       imagesLoaded( allItems[i], function(instance) {
//         var item = instance.elements[0];
//         resizeMasonryItem(item);
//       } );
//     }
//   }

//   /* Resize all the grid items on the load and resize events */
//   var masonryEvents = ['load', 'resize'];
//   masonryEvents.forEach( function(event) {
//     window.addEventListener(event, resizeAllMasonryItems);
//   } );

//   /* Do a resize once more when all the images finish loading */
//   waitForImages();

// ------------------------------------------------------------------------------

// function resizeGridItem(item) {
//   grid = document.getElementsByClassName('masonry')[0];
//   console.log(grid);
//   rowHeight = parseInt(
//     window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
//   );
//   rowGap = parseInt(
//     window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
//   );
//   rowSpan = Math.ceil(
//     (item.querySelector('.masonry').getBoundingClientRect().height + rowGap) /
//       (rowHeight + rowGap)
//   );
//   console.log(rowSpan);
//   item.style.gridRowEnd = 'span ' + rowSpan;
// }

// function resizeAllGridItems() {
//   allItems = document.querySelectorAll('.card');
//   // console.log();
//   for (x = 0; x < allItems.length; x++) {
//     resizeGridItem(allItems[x]);
//   }
// }

// function resizeInstance(instance) {
//   item = instance.elements[0];
//   resizeGridItem(item);
// }

// window.onload = resizeAllGridItems();
// window.addEventListener('resize', resizeAllGridItems);

// allItems = document.getElementsByClassName('card');
// for (x = 0; x < allItems.length; x++) {
//   imagesLoaded(allItems[x], resizeInstance);
// }

// -----------------------------------------------------------------------------

// function masonry(grid, gridCell, gridGutter, gridCol) {
//   let g = document.querySelector(grid),
//     gc = document.querySelectorAll(gridCell),
//     gcLength = gc.length, // Total number of cells in the masonry
//     gHeight = 0, // Initial height of our masonry
//     i; // Loop counter

//   // Calculate the net height of all the cells in the masonry
//   for (i = 0; i < gcLength; ++i) {
//     gHeight += gc[i].offsetHeight + parseInt(gridGutter);
//     console.log(gHeight);
//   }

//   // Calculate and set the masonry height
//   gc.style.height = gHeight / gridCol + gHeight / (gcLength + 1) + 'px';
// }
// masonry('.masonry', '.card', 2, 3);

// -----------------------------------------------------------------------------

//   function resizeAllMasonryItems(){
//     // Get all item class objects in one list
//     let allItems = document.querySelectorAll(".masonry-brick");
//     // Get the grid object, its row-gap, and the size of its implicit rows
//     let grid = document.querySelector(".masonry"),
//     rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-row-gap")),
//     rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-auto-rows"));

//     // Loop through each masonry-brick
//     for (let i = 0; i < allItems.length; i++){
//         // Calulate the correct height of the brick, and apply the correct gird value
//         let rowSpan = Math.ceil((allItems[i].getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));

//         // Set the spanning as calculated above
//         allItems[i].style.gridRowEnd = "span " + rowSpan;
//     }
// }
// resizeAllMasonryItems()

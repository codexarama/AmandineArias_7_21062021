// DOM ELEMENT
const recipesSection = document.querySelector('#recipes');

// RECIPE CARD CREATION (model)
function setRecipe(recipes) {
  const recipeCard = elmtFactory(
    'div',
    { class: 'card' },
    elmtFactory('img', {
      src: 'https://dummyimage.com/600x300/918c91/ffffff',
      class: 'card-img-top',
      alt: '...',
      loading: 'lazy'
    }),
    elmtFactory(
      'div',
      { class: 'card-body' },
      elmtFactory(
        'div',
        { class: 'card-header' },
        elmtFactory('h5', { class: 'card-title' }, `${recipes.name}`),
        elmtFactory(
          'div',
          { class: 'card-subtitle' },
          elmtFactory('i', { class: 'fas fa-clock' }),
          elmtFactory(
            'p',
            { class: 'subtitle-text' },
            `${recipes.time} minutes`
          )
        )
      ),
      elmtFactory(
        'div',
        { class: 'card-content' },
        elmtFactory('ul', {
          class: 'card-subcontent card-list scroll-description',
        }),
        elmtFactory(
          'p',
          { class: 'card-subcontent subcontent-text scroll-description' },
          `${recipes.description}`
        )
      )
    )
  );

  // INGREDIENTS LIST CREATION
  const cardListItem = recipeCard.getElementsByClassName('card-list')[0];

  for (i = 0; i < recipes.ingredients.length; i++) {
    if (recipes.ingredients[i].unit == undefined)
      recipes.ingredients[i].unit = '';
    if (recipes.ingredients[i].quantity == undefined)
      recipes.ingredients[i].quantity = '';
    const cardItem = elmtFactory(
      'li',
      { class: 'ingredient' },
      `${recipes.ingredients[i].ingredient} : ${recipes.ingredients[i].quantity} ${recipes.ingredients[i].unit}`
    );
    cardListItem.appendChild(cardItem);
  }

  // DOM INTEGRATION
  recipesSection.appendChild(recipeCard);
  recipeCard.setAttribute('data-name', `${recipes.name}`);
}

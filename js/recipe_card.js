// DOM ELEMENT
const recipesSection = document.querySelector('#recipes');

// RECIPE CARD CREATION (model)
function setRecipe (recipes) {
  const recipeCard = elmtFactory(
    'div',
    { class: 'card' },
    elmtFactory('img', {
      // src: 'http://lorempixel.com/400/200/food',
      src: 'https://dummyimage.com/600x300/918c91/ffffff',
      class: 'card-img-top',
      alt: '...',
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
          elmtFactory('p', { class: 'subtitle-text' }, `${recipes.time} minutes`)
        )
      ),
      elmtFactory(
        'div',
        { class: 'card-content' },
        elmtFactory('ul', { class: 'card-subcontent card-list' }),
        elmtFactory(
          'p',
          { class: 'card-subcontent subcontent-text' },
          `${recipes.description}`
        )
      )
    )
  );

  // INGREDIENTS LIST CREATION
  const cardListItem = recipeCard.getElementsByClassName('card-list')[0];
  for (i = 0; i < recipes.ingredients.length; i++) {
    const cardItem = elmtFactory(
      'li',
      { class: 'ingredient' },
      `${recipes.ingredients[i].ingredient}`
    );
    cardListItem.appendChild(cardItem);
  }

  // DOM INTEGRATION
  recipesSection.appendChild(recipeCard);
};

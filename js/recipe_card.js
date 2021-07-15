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
  // Cannot read property 'length' of undefined

  recipes.forEach((ingredients) => {
    if (ingredients.unit == undefined) ingredients.unit = '';
    if (ingredients.quantity == undefined) ingredients.quantity == '';
    const cardItem = elmtFactory(
      'li',
      { class: 'ingredient' },
      `${recipes.ingredients} : ${ingredients.quantity} ${ingredients.unit}`
    );
    cardListItem.appendChild(cardItem);
  });

  // DOM INTEGRATION
  recipesSection.appendChild(recipeCard);
  recipeCard.setAttribute('data-name', `${recipes.name}`);
}

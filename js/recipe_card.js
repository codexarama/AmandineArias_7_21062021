const recipesSection = document.querySelector('#recipes');
const setRecipe = (recipes) => {
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
          elmtFactory('p', { class: 'card-text' }, `${recipes.time} minutes`)
        )
      ),
      elmtFactory(
        'div',
        { class: 'card-content' },
        elmtFactory(
          'ul',
          { class: 'card-subcontent card-list' }
          //   elmtFactory('li', { class: 'card-text' }, `${recipes.ingredients}`)

          ///////////////////////////////////
          //   elmtFactory(
          //     'li',
          //     { class: 'card-text' },
          //     `${recipes.ingredients
          //       .map((ingredient) =>
          //         elmtFactory('li', { class: 'ingredient' }, `${ingredient}`)
          //       )
          //       .join(' ')}`
          //   )
          ////////////////////////////////////
        ),
        elmtFactory(
          'p',
          { class: 'card-subcontent card-text' },
          `${recipes.description}`
        )
      )
    )
  );

  const cardListItem = recipeCard.getElementsByClassName('card-list')[0];

  for (i = 0; i < recipes.ingredients.length; i++) {
    const cardItem = elmtFactory(
      'li',
      { class: 'ingredient' },
      `${recipes.ingredients[i].ingredient}`
    );
    cardListItem.appendChild(cardItem);
    console.log(cardItem);
}
  recipesSection.appendChild(recipeCard);
};

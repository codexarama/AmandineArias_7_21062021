// DOM ELEMENTS
const ingredientsList = document.getElementById('ingredients-options');
const applianceList = document.getElementById('appareil-options');
const ustensilsList = document.getElementById('ustensile-options');
const listItem = document.createElement('li');

// CREATION LISTE INGREDIENTS
const setIngredients = (item) => {
  for (let i = 0; i < item.ingredient.length; i++) {
    listItem[i];
    ingredientsList.appendChild(listItem);
    listItem[i].textContent = `${item.ingredient[i]}`;
  }
};

// CREATION LISTE APPAREILS
const setAppliance = (item) => {
  for (let i = 0; i < item.appliance.length; i++) {
    listItem;
    applianceList.appendChild(listItem);
    listItem.textContent = `${item.appliance[i]}`;
  }
};

// CREATION LISTE USTENSILES
const setUstensils = (item) => {
  for (let i = 0; i < item.ustensils.length; i++) {
    listItem[i];
    ustensilsList.appendChild(listItem);
    listItem[i].textContent = `${item.ustensils[i]}`;
  }
};

// NOTE
// recuperer 

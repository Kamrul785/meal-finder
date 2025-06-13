const searchByName = () => {
    const input = document.getElementById("search-input").value.trim();
    const productContainer = document.getElementById("product-container");
    const detailsContainer = document.getElementById("meal-details");

    productContainer.innerHTML = '';
    detailsContainer.innerHTML = '';
    if (input === '') {
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then(res => res.json())
        .then(data => {
            if (data.meals) {
                displayProduct(data.meals);
            } else {
                productContainer.innerHTML = '<h2 class="text-center mt-4 text-danger fs-2">No meals found</h2>';
            }
        });
};

const displayProduct = (meals) => {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = '';

    meals.forEach(meal => {
        const div = document.createElement("div");
        div.classList.add("cardList");

        div.innerHTML = `
            <div onclick="showDetails(${meal.idMeal})" class="card" style="width: 18rem; cursor:pointer;">
                <img src="${meal.strMealThumb}" class="card-img-top card-img" alt="${meal.strMeal}">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                </div>
            </div>
        `;

        productContainer.appendChild(div);
    });
};


const showDetails = (id) => {
    const detailsContainer = document.getElementById("meal-details");
    detailsContainer.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            const ingredients = getIngredents(meal);

            const div = document.createElement("div");
            div.classList.add("cardlist");

            div.innerHTML = `
                <div class="card" style="width: 18rem;">
                <img src="${meal.strMealThumb}" class="card-img-top card-img" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h3 class="card-title text-purple mb-3">${meal.strMeal}</h4>
                        <h4>Ingredients</h4>
                        <ul class="list-group list-group-numbered">
                            ${ingredients.map(ing => `<li class="list-group-item">${ing}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `
            detailsContainer.appendChild(div);
        });
}

const getIngredents = (meal) => {
    const allIngredients = [];
    for (let i = 1; i <= 15; i++) {
        const ing = meal[`strIngredient${i}`];
        if (ing.trim()) allIngredients.push(`${ing}`);
    }
    return allIngredients;
}

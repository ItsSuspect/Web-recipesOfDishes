$(document).ready(function () {
    const suggestions = [
        "Курица",
        "Куринные бедра",
        "Кукуруза",
        "Кускус",
        "Кулебяка",
        // ...другие подсказки
    ];

    const $searchInput = $("#search-input");
    const $clearInputButton = $("#clear-input-button");
    const $suggestionsList = $("#suggestions");
    const $selectedProductsList = $("#selected-products");
    const selectedProducts = [];

    $searchInput.on("input", function () {
        const query = $searchInput.val().toLowerCase();
        $suggestionsList.empty();

        if (query.length >= 1) {
            const matchingSuggestions = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(query)
            );

            matchingSuggestions.forEach(suggestion => {
                const $li = $("<li>").text(suggestion).addClass("suggestion");
                $li.appendTo($suggestionsList);

                $li.on("click", function () {
                    addSelectedProduct(suggestion);
                });
            });
        }
    });

    $clearInputButton.on("click", function () {
        $searchInput.val("");
    });

    function addSelectedProduct(product) {
        if (!selectedProducts.includes(product)) {
            selectedProducts.push(product);
            const $selectedProductLi = $("<li>").text(product);
            $selectedProductLi.addClass("selected-product");
            const $removeButton = $("<button>").text("✕").addClass("remove-button");
            $removeButton.appendTo($selectedProductLi);
            $selectedProductLi.appendTo($selectedProductsList);

            $removeButton.on("click", function () {
                removeSelectedProduct(product);
                $selectedProductLi.remove();
            });
        }
    }

    function removeSelectedProduct(product) {
        const index = selectedProducts.indexOf(product);
        if (index !== -1) {
            selectedProducts.splice(index, 1);
        }
    }

    $(document).on("click", function (e) {
        if (!$(e.target).closest("#search-input, #suggestions").length) {
            $suggestionsList.empty();
        }
    });
});

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
    const $suggestionsList = $("#suggestions");
    const $selectedProductsList = $("#selected-products");
    const selectedProducts = [];

    $searchInput.on("input", function () {
        const query = $searchInput.val().toLowerCase();
        $suggestionsList.empty();

        if (query.length >= 2) {
            const matchingSuggestions = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(query)
            );

            matchingSuggestions.forEach(suggestion => {
                const $li = $("<li>").text(suggestion);
                $li.appendTo($suggestionsList);

                $li.on("click", function () {
                    addSelectedProduct(suggestion);
                });
            });
        }
    });

    function addSelectedProduct(product) {
        if (!selectedProducts.includes(product)) {
            selectedProducts.push(product);
            const $selectedProductLi = $("<li>").text(product);
            $selectedProductLi.appendTo($selectedProductsList);
        }
    }

    $(document).on("click", function (e) {
        if (!$(e.target).closest("#search-input, #suggestions").length) {
            $suggestionsList.empty();
        }
    });
});

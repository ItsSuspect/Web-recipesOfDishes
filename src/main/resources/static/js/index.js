$(document).ready(function () {
    const $searchInput = $("#search-input");
    const $clearInputButton = $("#clear-input-button");
    const $suggestionsList = $("#suggestions");
    const $selectedProductsList = $("#selected-products");
    const $findRecipesButton = $("#find-recipes-button");
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

    $findRecipesButton.click(function () {
        // Создаем скрытое поле внутри формы и добавляем в него данные
        var selectedProducts = $('#selected-products li').map(function() {
            return $(this).text().replace("✕", "");
        }).get();

        // Удалите старое скрытое поле, если оно уже существует
        $('#selected-products-input').remove();

        // Создаем новое скрытое поле
        var inputField = document.createElement('input');
        inputField.type = 'hidden';
        inputField.name = 'selectedProducts';
        inputField.value = selectedProducts.join(',');

        // Добавляем скрытое поле в форму
        $('#recipe-form').append(inputField);

        // Отправляем форму на сервер
        $('#recipe-form').submit();
    });
});
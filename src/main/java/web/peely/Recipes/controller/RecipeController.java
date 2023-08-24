package web.peely.Recipes.controller;

import org.springframework.web.bind.annotation.*;
import web.peely.Recipes.entity.Ingredient;
import web.peely.Recipes.entity.Recipes;

import web.peely.Recipes.entity.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import web.peely.Recipes.service.RecipeService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("suggestions", recipeService.allProducts());
        return "index";
    }
    @PostMapping("/")
    public String receiveSelectedProducts(@RequestParam("selectedProducts") String selectedProducts, Model model) {
        List<String> selectedProductsList = Arrays.asList(selectedProducts.split(",")); //Выбранные ингридиенты пользователем
        List<Recipes> allRecipes = recipeService.allRecipes(); //Все рецепты, которые находятся в БД
        List<Recipes> selectedRecipes = new ArrayList<>(); //Подходящие рецепты для пользователя

        int countRecipes = allRecipes.size();
        for (int i = 0; i < countRecipes; i++) {
            List<Ingredient> ingredients = allRecipes.get(i).getIngredients();
            int countIngredient = ingredients.size();
            for (int j = 0; j < countIngredient; j++) {
                if (selectedProductsList.contains(ingredients.get(j).getName())) {
                    selectedRecipes.add(allRecipes.get(i));
                    break;
                }
            }
        }

        if (selectedProducts.isEmpty()) {
            model.addAttribute("error", "Для вывода рецептов выберете ингредиенты");
        } else if (selectedRecipes.isEmpty()) {
            model.addAttribute("error", "Отсутствуют рецепты под ваши ингрединты");
        } else model.addAttribute("message", "Рецепты, которые подходят под ваши ингредиенты:");

        model.addAttribute("suggestions", recipeService.allProducts());
        model.addAttribute("recipes", selectedRecipes);

        System.out.println("Выбранные ингридиенты: " + selectedProductsList);
        return "index";
    }
}
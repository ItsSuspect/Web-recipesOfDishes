package web.peely.Recipes.controller;

import org.springframework.web.bind.annotation.*;
import web.peely.Recipes.repository.ProductsRepository;
import web.peely.Recipes.repository.RecipesRepository;

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

    @Autowired
    ProductsRepository productsRepository;

    @Autowired
    RecipesRepository recipesRepository;

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("suggestions", productsRepository.findAll());
        return "index";
    }
    @PostMapping("/")
    public String receiveSelectedProducts(@RequestParam("selectedProducts") String selectedProducts, Model model) {
        List<String> selectedProductsList = Arrays.asList(selectedProducts.replace("✕", "").split(","));

        List<Recipes> selectedRecipes = new ArrayList<>();

        List<Recipes> allRecipes = recipeService.allRecipes();

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

        System.out.println(selectedProductsList);

        model.addAttribute("suggestions", productsRepository.findAll());
        model.addAttribute("recipes", selectedRecipes);
        return "index";
    }
}
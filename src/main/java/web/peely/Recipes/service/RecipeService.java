package web.peely.Recipes.service;

import web.peely.Recipes.entity.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.peely.Recipes.repository.ProductsRepository;
import web.peely.Recipes.repository.RecipesRepository;

import java.util.List;

@Service
public class RecipeService {
    @Autowired
    ProductsRepository productsRepository;

    @Autowired
    RecipesRepository recipesRepository;

    public List<Recipes> allRecipes() {
        return recipesRepository.findAll();
    }
}

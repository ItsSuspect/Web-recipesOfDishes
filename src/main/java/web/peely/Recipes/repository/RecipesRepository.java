package web.peely.Recipes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.peely.Recipes.entity.Recipes;

public interface RecipesRepository extends JpaRepository<Recipes, Long> {

}

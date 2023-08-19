package web.peely.Recipes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.peely.Recipes.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Long> {
}

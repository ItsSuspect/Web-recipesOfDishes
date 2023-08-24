package web.peely.Recipes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.peely.Recipes.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}

package web.peely.Recipes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.peely.Recipes.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}

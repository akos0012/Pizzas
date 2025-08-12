package hu.cubix.spring.akos0012.server.service.specification;

import hu.cubix.spring.akos0012.server.model.Allergen;
import hu.cubix.spring.akos0012.server.model.Allergen_;
import hu.cubix.spring.akos0012.server.model.Pizza;
import hu.cubix.spring.akos0012.server.model.Pizza_;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class PizzaSpecification {

    public static Specification<Pizza> hasPizza(String pizza) {
        return ((root, query, cb) -> cb.like(cb.lower(root.get(Pizza_.name)), (pizza + "%").toLowerCase()));
    }

    public static Specification<Pizza> doesNotContainAllergens(List<Long> allergenIds) {
        return (root, query, cb) -> {

            Join<Pizza, Allergen> allergensJoin = root.join(Pizza_.allergens, JoinType.LEFT);
            allergensJoin.on(allergensJoin.get(Allergen_.id).in(allergenIds));

            return cb.isNull(allergensJoin.get(Allergen_.id));
        };
    }
}

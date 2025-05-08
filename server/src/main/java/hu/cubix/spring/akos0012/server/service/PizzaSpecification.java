package hu.cubix.spring.akos0012.server.service;

import hu.cubix.spring.akos0012.server.model.Allergen;
import hu.cubix.spring.akos0012.server.model.Allergen_;
import hu.cubix.spring.akos0012.server.model.Pizza;
import hu.cubix.spring.akos0012.server.model.Pizza_;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class PizzaSpecification {

    public static Specification<Pizza> hasPizza(String pizza){
        return ((root, query, cb) -> cb.like(cb.lower(root.get(Pizza_.name)), (pizza + "%").toLowerCase()));
    }

    public static Specification<Pizza> doesNotContainAllergens(List<Long> allergenIds) {
        return (root, query, cb) -> {
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<Pizza> pizzaRoot = subquery.from(Pizza.class);
            Join<Pizza, Allergen> allergensJoin = pizzaRoot.join(Pizza_.allergens);

            subquery.select(pizzaRoot.get(Pizza_.id))
                    .where(allergensJoin.get(Allergen_.id).in(allergenIds));

            return cb.not(root.get(Pizza_.id).in(subquery));
        };
    }
}

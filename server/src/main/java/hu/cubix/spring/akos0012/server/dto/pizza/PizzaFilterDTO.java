package hu.cubix.spring.akos0012.server.dto.pizza;

import java.util.List;

public record PizzaFilterDTO(
        String pizzaName,
        List<Long> allergenIds
) {
}

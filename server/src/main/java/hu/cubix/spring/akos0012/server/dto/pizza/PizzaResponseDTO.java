package hu.cubix.spring.akos0012.server.dto.pizza;

import hu.cubix.spring.akos0012.server.dto.allergen.AllergenResponseDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.Set;

public record PizzaResponseDTO(
        Long id,

        @NotBlank
        String name,

        String description,
        String ingredients,

        @PositiveOrZero
        float price,

        Set<AllergenResponseDTO> allergens,

        Long imageID
) {
}

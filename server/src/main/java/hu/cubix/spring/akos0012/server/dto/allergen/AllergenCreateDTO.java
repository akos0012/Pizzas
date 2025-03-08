package hu.cubix.spring.akos0012.server.dto.allergen;

import jakarta.validation.constraints.NotBlank;

public record AllergenCreateDTO(
        @NotBlank
        String name
) {
}

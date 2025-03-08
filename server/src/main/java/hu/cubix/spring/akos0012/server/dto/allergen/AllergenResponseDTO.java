package hu.cubix.spring.akos0012.server.dto.allergen;

import jakarta.validation.constraints.NotBlank;

public record AllergenResponseDTO(
        Long id,

        @NotBlank
        String name
) {
}

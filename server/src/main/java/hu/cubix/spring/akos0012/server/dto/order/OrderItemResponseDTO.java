package hu.cubix.spring.akos0012.server.dto.order;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record OrderItemResponseDTO(
        Long id,

        @NotBlank
        String pizzaName,

        @Min(1)
        int quantity
) {
}

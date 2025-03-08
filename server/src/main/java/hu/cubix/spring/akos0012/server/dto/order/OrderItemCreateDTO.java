package hu.cubix.spring.akos0012.server.dto.order;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record OrderItemCreateDTO(
        @NotNull
        Long pizzaId,

        @Min(1)
        int quantity
) {
}

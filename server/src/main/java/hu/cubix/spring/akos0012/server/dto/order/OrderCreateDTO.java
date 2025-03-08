package hu.cubix.spring.akos0012.server.dto.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public record OrderCreateDTO(
        @Valid
        @NotNull
        ContactDTO contact,

        @Valid
        @NotNull
        DeliveryDTO delivery,

        @Valid
        @NotNull
        List<OrderItemCreateDTO> orderItems,

        LocalDateTime created_at
) {
}

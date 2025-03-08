package hu.cubix.spring.akos0012.server.dto.order;

import jakarta.validation.constraints.NotBlank;

public record DeliveryDTO(
        @NotBlank
        String country,

        @NotBlank
        String firstName,

        @NotBlank
        String lastName,

        @NotBlank
        String address,

        String company
) {
}

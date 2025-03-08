package hu.cubix.spring.akos0012.server.dto.pizza;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public record PizzaCreateDTO(
        @NotBlank
        String name,

        String description,
        String ingredients,

        @PositiveOrZero
        float price,

        Set<Long> allergenIds,

        MultipartFile image
) {
}

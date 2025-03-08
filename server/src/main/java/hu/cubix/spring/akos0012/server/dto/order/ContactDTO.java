package hu.cubix.spring.akos0012.server.dto.order;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ContactDTO (
        @Email
        @NotBlank
        String email,

        @NotBlank
        String phone
){
}

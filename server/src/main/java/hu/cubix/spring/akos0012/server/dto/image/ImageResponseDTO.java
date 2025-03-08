package hu.cubix.spring.akos0012.server.dto.image;

import jakarta.persistence.Lob;

public record ImageResponseDTO(
        Long id,

        String name,

        String type,
        
        byte[] data
) {
}

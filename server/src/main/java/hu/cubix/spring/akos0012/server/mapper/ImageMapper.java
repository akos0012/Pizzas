package hu.cubix.spring.akos0012.server.mapper;

import hu.cubix.spring.akos0012.server.dto.image.ImageResponseDTO;
import hu.cubix.spring.akos0012.server.model.Image;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    ImageResponseDTO imageToResponseDto(Image image);
}

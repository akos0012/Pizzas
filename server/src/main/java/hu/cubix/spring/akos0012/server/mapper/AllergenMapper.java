package hu.cubix.spring.akos0012.server.mapper;

import hu.cubix.spring.akos0012.server.dto.allergen.AllergenCreateDTO;
import hu.cubix.spring.akos0012.server.dto.allergen.AllergenResponseDTO;
import hu.cubix.spring.akos0012.server.model.Allergen;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AllergenMapper {
    AllergenResponseDTO allergenResponseToDto(Allergen allergen);

    List<AllergenResponseDTO> allergensToResponseDTOs(List<Allergen> allergens);

    Allergen createDtoToAllergen(AllergenCreateDTO allergenDTO);
}

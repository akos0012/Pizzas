package hu.cubix.spring.akos0012.server.mapper;

import hu.cubix.spring.akos0012.server.dto.pizza.PizzaCreateDTO;
import hu.cubix.spring.akos0012.server.dto.pizza.PizzaResponseDTO;
import hu.cubix.spring.akos0012.server.model.Pizza;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PizzaMapper {

    @Mapping(target = "imageID", source = "image.id")
    PizzaResponseDTO pizzaToResponseDto(Pizza pizza);

    List<PizzaResponseDTO> pizzasToResponseDTOs(List<Pizza> pizzas);

    @Mapping(target = "allergens", ignore = true)
    Pizza createDtoToPizza(PizzaCreateDTO pizzaDTO);

}

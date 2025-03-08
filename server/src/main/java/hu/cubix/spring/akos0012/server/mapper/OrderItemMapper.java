package hu.cubix.spring.akos0012.server.mapper;

import hu.cubix.spring.akos0012.server.dto.order.OrderItemCreateDTO;
import hu.cubix.spring.akos0012.server.dto.order.OrderItemResponseDTO;
import hu.cubix.spring.akos0012.server.model.order.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {

    @Mapping(target = "pizzaName", source = "pizza.name")
    OrderItemResponseDTO OrderItemToResponseDto(OrderItem orderItem);

    @Mapping(target = "pizza", ignore = true)
    OrderItem createDtoToOrderItem(OrderItemCreateDTO orderItemDTO);
}

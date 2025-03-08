package hu.cubix.spring.akos0012.server.mapper;

import hu.cubix.spring.akos0012.server.dto.order.OrderCreateDTO;
import hu.cubix.spring.akos0012.server.dto.order.OrderResponseDTO;
import hu.cubix.spring.akos0012.server.model.order.Order;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = OrderItemMapper.class)
public interface OrderMapper {
    OrderResponseDTO orderToResponseDto(Order order);

    List<OrderResponseDTO> ordersToResponseDTOs(List<Order> orders);

    Order createDtoToOrder(OrderCreateDTO orderDTO);
}

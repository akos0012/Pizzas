package hu.cubix.spring.akos0012.server.service;

import hu.cubix.spring.akos0012.server.dto.order.OrderCreateDTO;
import hu.cubix.spring.akos0012.server.dto.order.OrderResponseDTO;
import hu.cubix.spring.akos0012.server.mapper.OrderMapper;
import hu.cubix.spring.akos0012.server.model.Allergen;
import hu.cubix.spring.akos0012.server.model.Pizza;
import hu.cubix.spring.akos0012.server.model.order.Order;
import hu.cubix.spring.akos0012.server.model.order.OrderItem;
import hu.cubix.spring.akos0012.server.repository.OrderRepository;
import hu.cubix.spring.akos0012.server.repository.PizzaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private PizzaRepository pizzaRepository;

    public Order save(Order order) {
        return orderRepository.save(order);
    }

    public OrderResponseDTO createOrder(OrderCreateDTO orderDTO) {

        List<OrderItem> orderItems = orderDTO.orderItems()
                .stream()
                .map(itemDTO -> {
                    Pizza pizza = pizzaRepository.findById(itemDTO.pizzaId())
                            .orElseThrow(() -> new EntityNotFoundException("Pizza not found with ID: " + itemDTO.pizzaId()));
                    return new OrderItem(pizza, itemDTO.quantity());
                })
                .toList();

        Order order = orderMapper.createDtoToOrder(orderDTO);
        order.setOrderItems(orderItems);

        return orderMapper.orderToResponseDto(orderRepository.save(order));
    }

    public List<OrderResponseDTO> findAll() {
        return orderMapper.ordersToResponseDTOs(orderRepository.findAll());
    }

    @Transactional
    public void delete(Long id) {
        orderRepository.deleteById(id);
    }
}

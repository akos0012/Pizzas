package hu.cubix.spring.akos0012.server.controller;

import hu.cubix.spring.akos0012.server.dto.order.OrderCreateDTO;
import hu.cubix.spring.akos0012.server.dto.order.OrderResponseDTO;
import hu.cubix.spring.akos0012.server.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> findAll() {
        return ResponseEntity.ok(orderService.findAll());
    }

    @PostMapping
    public ResponseEntity<OrderResponseDTO> createOrder(@RequestBody @Valid OrderCreateDTO orderDTO) {
        OrderResponseDTO newOrder = orderService.createOrder(orderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newOrder);
    }
}

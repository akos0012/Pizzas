package hu.cubix.spring.akos0012.server.controller;

import hu.cubix.spring.akos0012.server.dto.order.OrderCreateDTO;
import hu.cubix.spring.akos0012.server.dto.order.OrderResponseDTO;
import hu.cubix.spring.akos0012.server.mapper.OrderMapper;
import hu.cubix.spring.akos0012.server.model.order.Order;
import hu.cubix.spring.akos0012.server.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;


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

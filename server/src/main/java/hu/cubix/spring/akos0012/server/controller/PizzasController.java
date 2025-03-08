package hu.cubix.spring.akos0012.server.controller;

import hu.cubix.spring.akos0012.server.dto.pizza.PizzaCreateDTO;
import hu.cubix.spring.akos0012.server.dto.pizza.PizzaResponseDTO;
import hu.cubix.spring.akos0012.server.mapper.PizzaMapper;
import hu.cubix.spring.akos0012.server.service.PizzaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/pizzas")
public class PizzasController {

    @Autowired
    private PizzaService pizzaService;

    @GetMapping
    public ResponseEntity<List<PizzaResponseDTO>> findAll() {
        return ResponseEntity.ok(pizzaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PizzaResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(pizzaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<PizzaResponseDTO> createPizza(@ModelAttribute @Valid PizzaCreateDTO pizzaDTO) {
        PizzaResponseDTO newPizza = pizzaService.createPizza(pizzaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newPizza);
    }
}

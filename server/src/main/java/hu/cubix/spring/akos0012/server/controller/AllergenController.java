package hu.cubix.spring.akos0012.server.controller;

import hu.cubix.spring.akos0012.server.dto.allergen.AllergenCreateDTO;
import hu.cubix.spring.akos0012.server.dto.allergen.AllergenResponseDTO;
import hu.cubix.spring.akos0012.server.mapper.AllergenMapper;
import hu.cubix.spring.akos0012.server.model.Allergen;
import hu.cubix.spring.akos0012.server.service.AllergenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/allergens")
public class AllergenController {

    @Autowired
    private AllergenService allergenService;

    @GetMapping
    private ResponseEntity<List<AllergenResponseDTO>> findAll() {
        return ResponseEntity.ok(allergenService.findAll());
    }

    @GetMapping("/{id}")
    private ResponseEntity<AllergenResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(allergenService.findById(id));
    }

    @PostMapping
    private ResponseEntity<AllergenResponseDTO> createAllergen(@RequestBody @Valid AllergenCreateDTO allergenDTO) {
        AllergenResponseDTO newAllergen = allergenService.createAllergen(allergenDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAllergen);
    }

    @DeleteMapping("/{id}")
    private void deleteAllergen(@PathVariable Long id) {
        allergenService.delete(id);
    }
}

package hu.cubix.spring.akos0012.server.service;

import hu.cubix.spring.akos0012.server.dto.pizza.PizzaCreateDTO;
import hu.cubix.spring.akos0012.server.dto.pizza.PizzaFilterDTO;
import hu.cubix.spring.akos0012.server.dto.pizza.PizzaResponseDTO;
import hu.cubix.spring.akos0012.server.mapper.PizzaMapper;
import hu.cubix.spring.akos0012.server.model.Allergen;
import hu.cubix.spring.akos0012.server.model.Image;
import hu.cubix.spring.akos0012.server.model.Pizza;
import hu.cubix.spring.akos0012.server.repository.AllergenRepository;
import hu.cubix.spring.akos0012.server.repository.PizzaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PizzaService {

    private final PizzaRepository pizzaRepository;
    private final PizzaMapper pizzaMapper;
    private final AllergenRepository allergenRepository;
    private final ImageService imageService;

    public PizzaService(PizzaRepository pizzaRepository,
                        PizzaMapper pizzaMapper,
                        AllergenRepository allergenRepository,
                        ImageService imageService) {
        this.pizzaRepository = pizzaRepository;
        this.pizzaMapper = pizzaMapper;
        this.allergenRepository = allergenRepository;
        this.imageService = imageService;
    }

    public Pizza save(Pizza pizza) {
        return pizzaRepository.save(pizza);
    }

    @Transactional
    public PizzaResponseDTO createPizza(PizzaCreateDTO pizzaDTO) {
        Set<Allergen> allergens = Optional.ofNullable(pizzaDTO.allergenIds())
                .orElse(Collections.emptySet())
                .stream()
                .map(id -> allergenRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Allergen not found with ID: " + id)))
                .collect(Collectors.toSet());

        Image image = pizzaDTO.image() != null ? imageService.storeImage(pizzaDTO.image()) : null;

        Pizza pizza = pizzaMapper.createDtoToPizza(pizzaDTO);

        pizza.setAllergens(allergens);
        pizza.setImage(image);

        return pizzaMapper.pizzaToResponseDto(pizzaRepository.save(pizza));
    }

    public List<PizzaResponseDTO> findAll() {
        return pizzaMapper.pizzasToResponseDTOs(pizzaRepository.findAllWithAllergens());
    }

    public PizzaResponseDTO findById(Long id) {
        Pizza pizza = pizzaRepository.findByIdWithAllergens(id)
                .orElseThrow(() -> new EntityNotFoundException("Pizza not found with ID: " + id));
        return pizzaMapper.pizzaToResponseDto(pizza);
    }

    public List<PizzaResponseDTO> findPizzaByCriteria(PizzaFilterDTO example, Pageable pageable) {
        String pizzaName = example.pizzaName();
        List<Long> allergenIds = example.allergenIds();

        Specification<Pizza> spec = Specification.where(null);

        if (StringUtils.hasText(pizzaName))
            spec = spec.and(PizzaSpecification.hasPizza(pizzaName));
        if (allergenIds != null && !allergenIds.isEmpty())
            spec = spec.and(PizzaSpecification.doesNotContainAllergens(allergenIds));

        return pizzaMapper.pizzasToResponseDTOs(pizzaRepository.findAll(spec, pageable).getContent());
    }

    @Transactional
    public Pizza update(Pizza pizza) {
        if (!pizzaRepository.existsById(pizza.getId()))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return pizzaRepository.save(pizza);
    }

    @Transactional
    public void delete(Long id) {
        pizzaRepository.deleteById(id);
    }
}

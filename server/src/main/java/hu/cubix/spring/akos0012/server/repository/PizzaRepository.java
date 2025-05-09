package hu.cubix.spring.akos0012.server.repository;

import hu.cubix.spring.akos0012.server.model.Pizza;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PizzaRepository extends JpaRepository<Pizza, Long>, JpaSpecificationExecutor<Pizza> {

    @EntityGraph(attributePaths = {"allergens"})
    @Query("SELECT p FROM Pizza p")
    List<Pizza> findAllWithAllergens();

    @EntityGraph(attributePaths = {"allergens"})
    @Query("SELECT p FROM Pizza p WHERE p.id = :id")
    Optional<Pizza> findByIdWithAllergens(Long id);

    @EntityGraph(attributePaths = {"allergens"})
    List<Pizza> findAll(Specification<Pizza> spec);

    @EntityGraph(attributePaths = {"allergens"})
    Page<Pizza> findAll(Specification<Pizza> spec, Pageable pageable);
}

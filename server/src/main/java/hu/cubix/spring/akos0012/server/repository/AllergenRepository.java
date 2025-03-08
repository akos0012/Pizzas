package hu.cubix.spring.akos0012.server.repository;

import hu.cubix.spring.akos0012.server.model.Allergen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllergenRepository extends JpaRepository<Allergen, Long> {
}

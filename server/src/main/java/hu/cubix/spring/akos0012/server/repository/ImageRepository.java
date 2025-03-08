package hu.cubix.spring.akos0012.server.repository;

import hu.cubix.spring.akos0012.server.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}

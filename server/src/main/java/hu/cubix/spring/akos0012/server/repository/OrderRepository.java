package hu.cubix.spring.akos0012.server.repository;


import hu.cubix.spring.akos0012.server.model.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}

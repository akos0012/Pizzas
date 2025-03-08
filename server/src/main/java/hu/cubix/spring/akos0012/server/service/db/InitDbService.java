package hu.cubix.spring.akos0012.server.service.db;

import hu.cubix.spring.akos0012.server.model.Allergen;
import hu.cubix.spring.akos0012.server.model.Pizza;
import hu.cubix.spring.akos0012.server.repository.AllergenRepository;
import hu.cubix.spring.akos0012.server.repository.ImageRepository;
import hu.cubix.spring.akos0012.server.repository.OrderRepository;
import hu.cubix.spring.akos0012.server.repository.PizzaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InitDbService {

    @Autowired
    private PizzaRepository pizzaRepository;

    @Autowired
    private AllergenRepository allergenRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ImageRepository imageRepository;

    public void clearDB() {
        pizzaRepository.deleteAll();
        allergenRepository.deleteAll();
        orderRepository.deleteAll();
        imageRepository.deleteAll();
    }

    public void insertTestData() {
        Allergen gluten = new Allergen("Gluten");
        Allergen dairy = new Allergen("Dairy");
        Allergen peanuts = new Allergen("Peanuts");

        allergenRepository.save(gluten);
        allergenRepository.save(dairy);
        allergenRepository.save(peanuts);

        Pizza margherita = new Pizza("Margherita", "Classic pizza with tomato, cheese, and basil", "Tomato, Cheese, Basil", 8.5f, null);
        Pizza pepperoni = new Pizza("Pepperoni", "Spicy pizza with pepperoni and cheese", "Tomato, Cheese, Pepperoni", 9.0f, null);

        margherita.addAllergen(gluten);
        margherita.addAllergen(dairy);

        pepperoni.addAllergen(gluten);
        pepperoni.addAllergen(dairy);
        pepperoni.addAllergen(peanuts);

        pizzaRepository.save(margherita);
        pizzaRepository.save(pepperoni);
    }

}

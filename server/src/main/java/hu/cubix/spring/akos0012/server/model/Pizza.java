package hu.cubix.spring.akos0012.server.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Pizza {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String ingredients;
    private float price;

    @ManyToMany
    private Set<Allergen> allergens;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Image image;

    public Pizza() {
    }

    public Pizza(String name, String description, String ingredients, float price, Set<Allergen> allergens, Image image) {
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.price = price;
        this.allergens = allergens;
        this.image = image;
    }

    public Pizza(String name, String description, String ingredients, float price, Image image) {
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.price = price;
        this.allergens = new HashSet<>();
        this.image = image;
    }

    public void addAllergen(Allergen allergen) {
        allergens.add(allergen);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public Set<Allergen> getAllergens() {
        return allergens;
    }

    public void setAllergens(Set<Allergen> allergens) {
        this.allergens = allergens;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }
}

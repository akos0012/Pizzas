package hu.cubix.spring.akos0012.server.model.order;

import jakarta.persistence.Embeddable;

@Embeddable
public class Delivery {
    private String country;
    private String firstName;
    private String lastName;
    private String address;
    private String company;

    public Delivery() {
    }

    public Delivery(String country, String firstName, String lastName, String address, String company) {
        this.country = country;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.company = company;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }
}

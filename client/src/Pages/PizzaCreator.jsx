import { useState, useEffect, Fragment } from "react";
import config from "../config";
const URL = config.API_BASE_URL;


const createPizza = (pizza) => {
    return fetch(`${URL}/api/pizza`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(pizza),
    })//.then((res) => res.json());
}

const fetchAllergen = () => {
    return fetch(`${URL}/api/allergens`).then((res) => res.json());
}

const PizzaCreator = () => {
    const [allergens, setAllergens] = useState([]);
    const [selectedAllergens, setSelectedAllergens] = useState([]);

    useEffect(() => {
        fetchAllergen()
            .then((allergens) => {
                setAllergens(allergens);
            })
    }, []);

    const handleCheckboxChange = (e) => {
        const allergenId = e.target.value;
        if (e.target.checked) {
            setSelectedAllergens((prevSelected) => [...prevSelected, allergenId]);
        } else {
            setSelectedAllergens((prevSelected) => prevSelected.filter(id => id !== allergenId));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const ingredients = formData.get("ingredients").split(", ");
        let img = formData.get("img");
        img = img.name ? await convertToBase64(img) : null;

        const pizzaData = {};
        formData.forEach((value, key) => {
            pizzaData[key] = value;
        });

        pizzaData.img = img;
        pizzaData.ingredients = ingredients;
        pizzaData.allergens = selectedAllergens;

        createPizza(pizzaData);
        console.log(pizzaData);
        //alert(`${pizzaData.name} added`);

    }

    return (
        <form encType="multipart/form-data" onSubmit={onSubmit} style={{ width: "50%", color: "white", display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                name="name"
                id="name"
            />

            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                id="description"
            />

            <label htmlFor="ingredients">Ingredients</label>
            <input
                type="text"
                name="ingredients"
                id="ingredients"
            />


            <label htmlFor="price">Price</label>
            <input
                type="number"
                name="price"
                id="price"
            />


            <label htmlFor="img">Upload Image</label>
            <input
                type="file"
                name="img"
                id="img"
                accept=".jpeg, .png, .jpg"
            />

            {allergens.map((allergen) => (
                <Fragment key={allergen._id}>
                    <input onChange={handleCheckboxChange} type="checkbox" id={allergen.name} name="allergens" value={allergen._id} />
                    <label htmlFor={allergen.name}>{allergen.name}</label>
                </Fragment>
            ))}

            <button type="submit">Submit</button>
        </form>
    );
}

export default PizzaCreator;


function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}
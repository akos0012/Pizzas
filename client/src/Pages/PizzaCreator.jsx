import {useState, useEffect, Fragment} from "react";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const createPizza = (pizza) => {
    return fetch(`${serverUrl}/api/pizzas`, {
        method: "POST",
        body: pizza,
    });
}

const fetchAllergen = () => {
    return fetch(`${serverUrl}/api/allergens`).then((res) => res.json());
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

        selectedAllergens.forEach((id) => formData.append("allergenIds", id));

        await createPizza(formData);
    }

    return (
        <form encType="multipart/form-data" onSubmit={onSubmit}
              style={{width: "50%", color: "white", display: 'flex', flexDirection: 'column'}}>
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
                step="0.01"
            />


            <label htmlFor="image">Upload Image</label>
            <input
                type="file"
                name="image"
                id="image"
                accept=".jpeg, .png, .jpg"
            />

            {allergens.map((allergen) => (
                <Fragment key={allergen.id}>
                    <input onChange={handleCheckboxChange} type="checkbox" id={allergen.name} name="allergens"
                           value={allergen.id}/>
                    <label htmlFor={allergen.name}>{allergen.name}</label>
                </Fragment>
            ))}

            <button type="submit">Submit</button>
        </form>
    );
}

export default PizzaCreator;
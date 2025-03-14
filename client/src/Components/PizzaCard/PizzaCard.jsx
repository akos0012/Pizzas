import {useEffect, useState} from "react";
import "./PizzaCard.css";
import Loading from "../Loading";

import {useInView} from "react-intersection-observer";
import {motion, useAnimation} from "framer-motion";
import animations from "../../Animations";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const getImageById = async (id) => {
    const res = await fetch(`${serverUrl}/api/images/${id}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
}

const PizzaCard = ({pizzaData, setRowReverse}) => {
    const [count, setCount] = useState(0);
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(true);

    const control = useAnimation();
    const {fadeInFromBelow} = animations;
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            control.start('visible');
        }
    }, [inView, control]);


    useEffect(() => {
        const cartContent = getCartContent();
        const pizza = cartContent.find((pz) => pz.id === pizzaData.id);
        if (pizza) setCount(pizza.quantity);

        if (pizzaData.imageID) {
            setLoading(true);
            getImageById(pizzaData.imageID)
                .then((data) => {
                    setImageData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching image data:", error);
                    setImageData(null);
                    setLoading(false);
                });
        } else {
            setImageData(null);
            setLoading(false);
        }
    }, [pizzaData])


    const decreaseCount = () => {
        if (count > 0) {
            const cartContent = getCartContent();
            if (cartContent.find((pz) => pz.id === pizzaData.id)) {
                cartContent.find((pz) => pz.id === pizzaData.id).quantity = count - 1;
            } else {
                const pizzaObject = {id: pizzaData.id, quantity: count - 1}
                cartContent.push(pizzaObject);
            }
            setCartContent(cartContent.filter((pz) => pz.quantity !== 0));
            setCount(count - 1);
        }
    }

    const increaseCount = () => {
        const cartContent = getCartContent();

        if (cartContent.find((pz) => pz.id === pizzaData.id)) {
            cartContent.find((pz) => pz.id === pizzaData.id).quantity = count + 1;
        } else {
            const pizzaObject = {id: pizzaData.id, quantity: count + 1}
            cartContent.push(pizzaObject);
        }
        setCartContent(cartContent);
        setCount(count + 1);
    }

    return (
        <motion.div className="pizza-card" key={pizzaData.id}
                    style={{flexDirection: setRowReverse ? "row" : "row-reverse"}} ref={ref} initial="hidden"
                    animate={control} variants={fadeInFromBelow} transition={{duration: 0.5}}>
            <div className="pizza-img" style={setRowReverse ? {right: 0} : {left: 0}}>
                {loading ?
                    <Loading/> : <img src={imageData || "/img/no-image.png"} alt="Book"/>
                }
            </div>
            <div className="pizza-info">
                <h1 className="pizza-name">{pizzaData.name}</h1>
                <p className="pizza-description">{pizzaData.description}</p>
                {/* <p className="pizza-ingredients">{pizzaData.ingredients.join(", ")}</p> */}
                <div className="counter-row">
                    <p className="pizza-price"><span className="dollar">$</span>{pizzaData.price.toFixed(2)}</p>
                    <div className="counter">
                        <span className="down" onClick={decreaseCount}>-</span>
                        <input type="number" value={count} readOnly/>
                        <span className="up" onClick={increaseCount}>+</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PizzaCard;

function getCartContent() {
    return JSON.parse(localStorage.getItem("cart")) || [];
};

function setCartContent(content) {
    localStorage.setItem("cart", JSON.stringify(content));
};
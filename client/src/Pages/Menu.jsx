import {useEffect, useState} from "react";
import PizzaCard from "../Components/PizzaCard";
import PizzaFilter from "../Components/PizzaFilter";
import {useNavigate} from "react-router-dom";
import "./css/Menu.css"
import {useInView} from "react-intersection-observer";
import {motion, useAnimation} from "framer-motion";
import animations from "../Animations"
import Loading from "../Components/Loading";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const fetchPizzas = async (filterData) => {
    const res = await fetch(`${serverUrl}/api/pizzas/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filterData)
    });
    return await res.json();
}

const fetchAllergens = async () => {
    const res = await fetch(`${serverUrl}/api/allergens`);
    return await res.json();
}

const useSectionAnimation = (threshold) => {
    const control = useAnimation();
    const [ref, inView] = useInView({threshold});

    useEffect(() => {
        if (inView) {
            control.start('visible');
        }
    }, [inView, control]);

    return [ref, control];
};

const PizzaList = () => {
    const [pizzas, setPizzas] = useState([]);
    const [allergens, setAllergens] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [containerRef, animateContainer] = useSectionAnimation(0);
    const [contentRef, animateContent] = useSectionAnimation(0.2);
    const {appear, fadeInFromBelow} = animations;

    const handleHomeTextClick = () => {
        navigate("/")
    }

    const handleSearch = (term, allergenIds) => {
        setLoading(true);
        const filter = {
            pizzaName: term,
            allergenIds: allergenIds
        };

        fetchPizzas(filter)
            .then((filteredPizzas) => {
                setPizzas(filteredPizzas);
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const [allergens, pizzas] = await Promise.all([
                    fetchAllergens(),
                    fetchPizzas({})
                ]);

                setAllergens(allergens);
                setPizzas(pizzas);
                filterCartContent(pizzas);
            } finally {
                setLoading(false);
            }
        };

        loadData().catch(error => {
            console.error("Error loading data:", error);
        });
    }, []);

    return (
        <div>
            <div className="img-container">
                <img src="/img/spices-background.jpg" alt="pizza logo" className="spices-background"/>
                <motion.div className="text" ref={containerRef} initial="hidden" animate={animateContainer}
                            variants={appear} transition={{duration: 1}}>
                    <h1 className="bread">OUR MENU</h1>
                    <div className="breadcrumbs">
                        <p onClick={handleHomeTextClick} style={{marginRight: "10px"}}>HOME</p>
                        <p style={{color: "rgba(255, 255, 255, 0.7)"}}>MENU</p>
                    </div>
                </motion.div>
            </div>
            <motion.div className="content-center" ref={contentRef} initial="hidden" animate={animateContent}
                        variants={fadeInFromBelow} transition={{duration: 0.5}}>
                <h2 variants={fadeInFromBelow}>Our menu</h2>
                <p variants={fadeInFromBelow} transition={{delay: 0.5}}>Our menu invites you on a journey of tantalizing
                    flavors and culinary delights, where every dish tells a story of passion and craftsmanship.</p>
            </motion.div>
            <PizzaFilter onSearch={handleSearch} allergenData={allergens}/>
            {loading ? (
                <Loading/>
            ) : (
                <div className="menu-row">
                    {
                        pizzas.map((pizza, index) => {
                            const setRowReverse = Math.floor(index / 3) % 2 !== 0;
                            return <PizzaCard pizzaData={pizza} key={pizza.id} setRowReverse={setRowReverse}/>
                        })}
                </div>
            )}
        </div>
    );
}

export default PizzaList;

function getCartContent() {
    return JSON.parse(localStorage.getItem("cart")) || [];
};

function filterCartContent(pizzas) {
    const cartContent = getCartContent();
    const pizzaIDs = pizzas.map(pizza => pizza.id);
    const filteredContent = cartContent.filter((c) => pizzaIDs.includes(c.id));
    localStorage.setItem("cart", JSON.stringify(filteredContent));
};
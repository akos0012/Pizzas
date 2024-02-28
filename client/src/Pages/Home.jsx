import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TelephoneFill, GeoAlt, Clock, Twitter, Facebook, Instagram } from "react-bootstrap-icons";
import "./css/Home.css"
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import animations from "../Animations"

const useSectionAnimation = (threshold) => {
    const control = useAnimation();
    const [ref, inView] = useInView({ threshold });

    useEffect(() => {
        if (inView) {
            control.start('visible');
        }
    }, [inView, control]);

    return [ref, control];
};

const Home = () => {
    const navigate = useNavigate();

    const [sliderRef, animateSlider] = useSectionAnimation(0);
    const [introRef, animateIntro] = useSectionAnimation(0.5);
    const [aboutRef, animateAbout] = useSectionAnimation(0.5);
    const [serviceTitleRef, animateTitleService] = useSectionAnimation(0.2);
    const [serviceMediaRef, animateMediaService] = useSectionAnimation(0.5);
    const { appear, fadeInFromBelow, fadeInFromRight } = animations;

    const handleViewMenuClick = () => {
        navigate("/menu");
    }

    return (
        <div>
            <div className="img-container">
                <div>
                    <img src="/img/spices-background.jpg" alt="Spices" className="spices-background" />
                </div>
                <div className="slider">
                    <motion.div className="slider-inner" ref={sliderRef} variants={appear} initial="hidden" animate={animateSlider} transition={{ duration: 1 }}>
                        <span className="subheading">Welcome</span>
                        <h1>We cooked your desired Pizza Recipe</h1>
                        <p>Experience pizza perfection. Our artisanal creations are crafted to delight your senses. Indulge in flavor like never before!</p>
                        <button type="button" onClick={handleViewMenuClick}>View menu</button>
                    </motion.div>
                </div>
            </div>
            <motion.div className="intro" ref={introRef} initial="hidden" animate={animateIntro}>
                <div className="info">
                    <motion.div className="info-inner" variants={fadeInFromBelow}>
                        <div className="icon"><TelephoneFill /></div>
                        <div className="text">
                            <h3>000 (123) 456 7890</h3>
                            <p>It's a fake phone number</p>
                        </div>
                    </motion.div>
                    <motion.div className="info-inner" variants={fadeInFromBelow} transition={{ delay: 0.2 }}>
                        <div className="icon"><GeoAlt /></div>
                        <div className="text">
                            <h3>198 West 21th Street</h3>
                            <p>Suite 721 New York NY 10016</p>
                        </div>
                    </motion.div>
                    <motion.div className="info-inner" variants={fadeInFromBelow} transition={{ delay: 0.4 }}>
                        <div className="icon"><Clock /></div>
                        <div className="text">
                            <h3>Open Monday-Friday</h3>
                            <p>8:00am - 9:00pm</p>
                        </div>
                    </motion.div>
                </div>
                <div className="social">
                    <div className="icon">
                        <ul>
                            <motion.li variants={fadeInFromRight}><Twitter /></motion.li>
                            <motion.li variants={fadeInFromRight} transition={{ delay: 0.2 }}><Facebook /></motion.li>
                            <motion.li variants={fadeInFromRight} transition={{ delay: 0.4 }}><Instagram /></motion.li>
                        </ul>
                    </div>
                </div>
            </motion.div>
            <motion.div className="about" ref={aboutRef} initial="hidden" animate={animateAbout}>
                <div className="about-inner">
                    <img src="/img/restaurant.jpg" alt="Restaurant" className="restaurant-img" />
                </div>
                <motion.div className="about-inner text" variants={fadeInFromBelow} transition={{ duration: 0.6 }}>
                    <h2>Welcome to <img src="/img/pizza.png" alt="Pizza" className="pizza-logo" /><span className="flaticon-pizza">pizza</span> a restaurant</h2>
                    <p>Indulge in a culinary journey like no other. Our artisanal pizzas are crafted with the finest ingredients, bursting with flavor in every bite. From classic favorites to innovative creations, we have the perfect pizza recipe to satisfy your cravings. Experience the ultimate taste sensation with our handcrafted pizzas today!</p>
                </motion.div>
            </motion.div>
            <div className="service">
                <motion.div className="title" ref={serviceTitleRef} initial="hidden" animate={animateTitleService} variants={fadeInFromBelow} transition={{ duration: "1" }}>
                    <h2>Our services</h2>
                    <p>Experience excellence in every bite with our exceptional service and commitment to culinary perfection.</p>
                </motion.div>
                <motion.div className="media-body" ref={serviceMediaRef} initial="hidden" animate={animateMediaService}>
                    <div className="media-body-innner">
                        <div>
                            <motion.div className="icon" variants={appear}>
                                <img src="/img/salad.png" alt="Salad" />
                            </motion.div>
                            <motion.div variants={fadeInFromBelow} transition={{ duration: 0.5 }}>
                                <h3>Healthy foods</h3>
                                <p>Enjoy a wide selection of nutritious and delicious meals prepared with fresh, high-quality ingredients to support your well-being.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="media-body-innner">
                        <div>
                            <motion.div className="icon" variants={appear} transition={{ delay: 0.2 }}>
                                <img src="/img/bicycle.png" alt="Bicyle" />
                            </motion.div>
                            <motion.div variants={fadeInFromBelow} transition={{ duration: 0.5, delay: 0.2 }}>
                                <h3>Fastest delivery</h3>
                                <p>Experience lightning-fast delivery service that ensures your order reaches you promptly and piping hot, straight to your doorstep.</p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="media-body-innner">
                        <div>
                            <motion.div className="icon" variants={appear} transition={{ delay: 0.4 }}>
                                <img src="/img/pizza2.png" alt="Pizza" />
                            </motion.div>
                            <motion.div variants={fadeInFromBelow} transition={{ duration: 0.5, delay: 0.4 }}>
                                <h3>Original recipes</h3>
                                <p>Savor the taste of original recipes crafted by our expert chefs, each dish bursting with unique flavors and culinary creativity.</p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div >
        </div >
    );
}

export default Home;
import {useCallback, useState} from "react";
import "./OrderForm.css"
import {XSquare} from "react-bootstrap-icons";
import Loading from "../Loading";


const OrderForm = ({onSubmit, closeModal, loading, success, handleBackToMenu}) => {

    const [formData, setFormData] = useState(() => ({
        email: '',
        phone: '',
        country: '',
        firstName: '',
        lastName: '',
        address: '',
        company: ''
    }));

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <div className="onePageFrame order-form">
            <div className="closeButton" onClick={closeModal}><XSquare/></div>
            {loading ? (
                <Loading/>
            ) : success ? (
                <div className="orderSuccess">
                    <div className="check-mark">
                        <img src="/img/check-mark.png" alt="check-mark" className="check-mark-image"/>
                    </div>
                    <div className="successMessage">
                        <h2>Your Order Has Been Received!</h2>
                        <p>Thank you for choosing our website, we will prepare your food soon!</p>
                        <button onClick={handleBackToMenu} className="back-to-menu-button" type="button">Back to the
                            menu
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleClick}>
                    <h1>Contact</h1>
                    <div className="contact-input">
                        <input type="email" id="email" name="email" placeholder="Email" value={formData.email}
                               onChange={handleChange} required/>
                        <input type="tel" id="phone" name="phone" placeholder="Phone" value={formData.phone}
                               onChange={handleChange} required/>
                    </div>
                    <h1>Delivery</h1>
                    <div className="delivery-input">
                        <input type="text" id="country" name="country" placeholder="Country" value={formData.country}
                               onChange={handleChange} required/>
                        <div className="delivery-input-name-line">
                            <input style={{marginRight: "10px"}} type="text" id="firstName" name="firstName"
                                   placeholder="First name" value={formData.firstName} onChange={handleChange}
                                   required/>
                            <input type="text" id="lastName" name="lastName" placeholder="Last name"
                                   value={formData.lastName} onChange={handleChange} required/>
                        </div>
                        <input type="text" id="address" name="address" placeholder="Address" value={formData.address}
                               onChange={handleChange} required/>
                        <input type="text" id="company" name="company" placeholder="Company (optional)"
                               value={formData.company} onChange={handleChange}/>
                    </div>
                    <button className="cart-recap-button" type="submit">Order</button>
                </form>
            )}
        </div>
    );
}

export default OrderForm;
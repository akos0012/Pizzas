import "./OrderForm.css"
import { XSquare } from "react-bootstrap-icons";

const OrderForm = ({ onSubmit, closeModal }) => {

    return (
        <div className="onePageFrame">
            <div className="closeButton" onClick={closeModal}><XSquare /></div>
            <form onSubmit={onSubmit}>
                <h1>Contact</h1>
                <div className="contact-input">
                    <input type="email" id="email" name="email" placeholder="Email" required />
                    <input type="tel" id="phone" name="phone" placeholder="Phone" required />
                </div>
                <h1>Delivery</h1>
                <div className="delivery-input">
                    <input type="text" id="country_region" name="country_region" placeholder="Country/Region" required />
                    <div className="delivery-input-name-line">
                        <input style={{ marginRight: "10px" }} type="text" id="firstName" name="firstName" placeholder="First name" required />
                        <input type="text" id="lastName" name="lastName" placeholder="Last name" required />
                    </div>
                    <input type="text" id="address" name="address" placeholder="Address" required />
                    <input type="text" id="company" name="company" placeholder="Company (optional)" />
                    <button className="cart-recap-button" type="submit">Order</button>
                </div>
            </form>
        </div>
    );
}

export default OrderForm;
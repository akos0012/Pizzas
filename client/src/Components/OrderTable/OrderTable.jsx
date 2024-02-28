import { useEffect, useState } from "react"
import "./OrderTable.css"
import { Cart2 } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';

const OrderTable = ({ orders, increaseQuantity, decreaseQuantity, removeButton, orderButton }) => {
    const [orderList, setOrderList] = useState(orders);
    const [total, setTotal] = useState(0);
    const [disableOrderButton, setDisableOrderButton] = useState(true);
    const [visibleEmptyCartWarning, setVisibleEmptyCartWarning] = useState(true);
    const navigate = useNavigate();

    const handleEmptyStateButtonClick = () => {
        navigate("/menu");
    }

    useEffect(() => {
        setOrderList(orders);
        const total = orders.map((order) => order.price * order.quantity).reduce((acc, current) => acc + current, 0);
        setTotal(Math.round(total * 100) / 100);

        const allQuantitiesZero = orders.every(order => order.quantity === 0);
        setDisableOrderButton(allQuantitiesZero);

        const isCartEmpty = !orders.length;
        setVisibleEmptyCartWarning(isCartEmpty);
    }, [orders]);

    return (
        <div>
            <header className="page-header">
                <h1>My cart</h1>
            </header>
            {visibleEmptyCartWarning ?
                <div className="empty-state">
                    <div>
                        <div className="cart-icon"><Cart2 /></div>
                        <h1>Your cart is empty</h1>
                        <button onClick={handleEmptyStateButtonClick} className="empty-state-button" type="button">Shop our products</button>
                    </div>
                </div>
                :
                <div className="cart-wrapper">
                    <div className="cart-wrapper-inner">
                        <table className="order-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th style={{ textAlign: "center" }}>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList.map((order) => (
                                    <tr key={order._id}>
                                        <td className="product-info">
                                            <div className="product-name">{order.name}</div>
                                            <div className="product-ingredients">
                                                {order.ingredients.join(", ")}
                                            </div>
                                            <div className="product-price">${order.price}</div>
                                        </td>
                                        <td className="item-quantity">
                                            <div className="quantity-selector">
                                                <button type="button" onClick={() => decreaseQuantity(order._id)} className="quantity-selector-button">-</button>
                                                <input type="number" className="quantity-selector-value" value={order.quantity} readOnly />
                                                <button type="button" onClick={() => increaseQuantity(order._id)} className="quantity-selector-button">+</button>
                                            </div>
                                            <button className="quantity-remove" onClick={() => removeButton(order._id)}>Remove</button>
                                        </td>
                                        <td className="product-total">${order.price * order.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="cart-recap">
                        <div className="cart-recap-price-line">
                            <span className="cart-recap-price-label">Total</span>
                            <span>${total}</span>
                        </div>
                        <button className="cart-recap-button" disabled={disableOrderButton} onClick={() => orderButton()} type="button">Order</button>
                    </div>
                </div>
            }
        </div>

    );
}

export default OrderTable;
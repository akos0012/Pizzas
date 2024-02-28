import { useState, useEffect } from "react";
import OrderTable from "../Components/OrderTable";
import OrderForm from "../Components/OrderForm";
import Popup from 'reactjs-popup';
import Loading from "../Components/Loading";

const getPizzaByID = (id) => {
    return fetch(`/api/pizza/${id}`).then((res) => res.json());
}

const createOrder = (order) => {
    return fetch('/api/order', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(order),
    });
}

const getOrders = async () => {
    const cartContent = getCartContent();
    const pizzaPromises = cartContent.map(async (c) => {
        const pizza = await getPizzaByID(c.id);
        return { ...pizza, quantity: c.quantity };
    });
    return await Promise.all(pizzaPromises);
}

const Cart = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [openOrderPopup, setOpenOrderPopup] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getOrders();
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const closeModal = () => setOpenOrderPopup(false);

    const decreaseQuantity = (id) => {
        const updatedOrders = orders.map(order => {
            if (order._id === id && order.quantity > 0) {
                return { ...order, quantity: order.quantity - 1 };
            }
            return order;
        });
        setOrders(updatedOrders);
        updateCartContent(updatedOrders);
    }

    const increaseQuantity = (id) => {
        const updatedOrders = orders.map(order => {
            if (order._id === id) {
                return { ...order, quantity: order.quantity + 1 };
            }
            return order;
        });
        setOrders(updatedOrders);
        updateCartContent(updatedOrders);
    }

    const handleOrderButton = () => setOpenOrderPopup(true);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const contact = {
            email: formData.get('email'),
            phone: formData.get('phone')
        };
        const delivery = {
            country: formData.get('country_region'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            address: formData.get('address'),
            company: formData.get('company')
        };

        const orderData = {
            contact,
            delivery,
            orders: orders.map((order) => ({
                order: order._id,
                quantity: order.quantity
            }))
        };


        try {
            await createOrder(orderData);
            setOrders([]);
            clearCartContect();
            closeModal();
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }

    const handleRemoveOrder = (id) => {
        removeOrderByID(id);

        setOrders((orders) => {
            return orders.filter((order) => order._id !== id);
        });
    };

    const updateCartContent = (content) => {
        const updatedCartContent = content.map(order => ({ id: order._id, quantity: order.quantity }));
        setCartContent(updatedCartContent);
    };

    if (loading) return <Loading />

    return (
        <div>
            <OrderTable
                orders={orders}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                orderButton={handleOrderButton}
                removeButton={handleRemoveOrder}
            />
            <Popup open={openOrderPopup} onClose={closeModal} position={"center center"} closeOnDocumentClick={false}>
                <OrderForm onSubmit={onSubmit} closeModal={closeModal} />
            </Popup>
        </div>
    );
}

export default Cart;

function removeOrderByID(id) {
    const cartContent = getCartContent();
    const filteredContent = cartContent.filter((c) => c.id !== id);
    localStorage.setItem("cart", JSON.stringify(filteredContent));
}

function clearCartContect() {
    localStorage.clear("cart");
}

function getCartContent() {
    return JSON.parse(localStorage.getItem("cart")) || [];
};

function setCartContent(content) {
    const filteredContent = content.filter((c) => c.quantity !== 0);
    localStorage.setItem("cart", JSON.stringify(filteredContent));
};
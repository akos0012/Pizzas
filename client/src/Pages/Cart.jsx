import {useState, useEffect} from "react";
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import OrderTable from "../Components/OrderTable";
import OrderForm from "../Components/OrderForm";
import Popup from 'reactjs-popup';
import Loading from "../Components/Loading";
import {useNavigate} from "react-router-dom";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const getPizzaByID = (id) => {
    return fetch(`${serverUrl}/api/pizzas/${id}`).then((res) => res.json());
}

const createOrder = (order) => {
    return fetch(`${serverUrl}/api/orders`, {
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
        return {...pizza, quantity: c.quantity};
    });
    return await Promise.all(pizzaPromises);
}

const Cart = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [modalLoading, setModalLoading] = useState(false);
    const [success, setSuccess] = useState(false);
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
            if (order.id === id && order.quantity > 0) {
                return {...order, quantity: order.quantity - 1};
            }
            return order;
        });
        setOrders(updatedOrders);
        updateCartContent(updatedOrders);
    }

    const increaseQuantity = (id) => {
        const updatedOrders = orders.map(order => {
            if (order.id === id) {
                return {...order, quantity: order.quantity + 1};
            }
            return order;
        });
        setOrders(updatedOrders);
        updateCartContent(updatedOrders);
    }

    const handleOrderButton = () => setOpenOrderPopup(true);

    const onSubmit = async (formData) => {
        setModalLoading(true);

        const contact = {
            email: formData.email,
            phone: formData.phone
        };
        const delivery = {
            country: formData.country,
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            company: formData.company
        };

        const orderData = {
            contact,
            delivery,
            orderItems: orders.map((order) => ({
                pizzaId: order.id,
                quantity: order.quantity
            }))
        };

        try {
            const response = await createOrder(orderData);
            if (response.ok) {
                setOrders([]);
                clearCartContent();
                setSuccess(true);
                toast.success("Order sent successfully!");
            } else {
                console.error('Error creating order:', response.statusText);
                toast.error("Failed to send order, try again later");
            }
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error("Failed to send order, try again later");
        } finally {
            setModalLoading(false);
        }
    }

    const handleBackToMenu = () => {
        navigate("/menu");
    }

    const handleRemoveOrder = (id) => {
        removeOrderByID(id);

        setOrders((orders) => {
            return orders.filter((order) => order.id !== id);
        });
    };

    const updateCartContent = (content) => {
        const updatedCartContent = content.map(order => ({id: order.id, quantity: order.quantity}));
        setCartContent(updatedCartContent);
    };

    if (loading) return <Loading/>

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
                <OrderForm onSubmit={onSubmit} loading={modalLoading} closeModal={closeModal}
                           handleBackToMenu={handleBackToMenu} success={success}/>
            </Popup>
            <ToastContainer/>
        </div>
    );
}

export default Cart;

function removeOrderByID(id) {
    const cartContent = getCartContent();
    const filteredContent = cartContent.filter((c) => c.id !== id);
    localStorage.setItem("cart", JSON.stringify(filteredContent));
}

function clearCartContent() {
    localStorage.clear("cart");
}

function getCartContent() {
    return JSON.parse(localStorage.getItem("cart")) || [];
};

function setCartContent(content) {
    const filteredContent = content.filter((c) => c.quantity !== 0);
    localStorage.setItem("cart", JSON.stringify(filteredContent));
};
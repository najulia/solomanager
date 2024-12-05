import styles from './MyOrders.module.css'
import Navbar from '../layouts/Navbar'
import Button from '../layouts/ButtonLink';
import { MdAdd } from "react-icons/md";
import { MdOutlineFilterList } from "react-icons/md";
import Product from '../layouts/Product';
import Api from '../../services/Api';
import { useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router";
import { useAuth } from '../contexts/Auth'
import SubmitButton from '../form/SubmitButton';
import ButtonLink from '../layouts/ButtonLink';
import Container from '../layouts/Container';
import Order from '../layouts/Order';

function MyOrders() {

  const [order, setOrder] = useState([])
  const { user } = useAuth();
  const { token } = useAuth();

  async function getUserOrders() {
        try {
            const response = await Api.get(`/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrder(response.data);
            console.log("pedidos recuperados com sucesso");
        } catch (error) {
            console.error("Erro ao recuperar pedidos", error.response?.data || error.message);
        }
    }

    useEffect(() => {
        if (token) {
            getUserOrders();
        }
    }, [token]);

  return(
    <div className={styles.productsContainer}>
        <Navbar />
        <div className={styles.productsMain}>
        <div className={styles.productsHeader}>
        <h3>Meus produtos</h3>
        <Button text="Aplicar filtros"
        icon = <MdOutlineFilterList/> variant="transparent"
        />
        <Button to="/products/new" text="Novo pedido" 
        icon = <MdAdd/> variant="default"
        />
        </div>
        <div className={styles.productsList}>
        {order.map((ord) => (
                    <Order
                        key={ord.id}
                        code={ord.id} 
                        customer_name={ord.customer_name} 
                        customer_phone={ord.customer_phone} 
                        payment_method={ord.payment_method} 
                        payment_status={ord.payment_status} 
                        quantity={ord.quantity}
                        total={ord.total}
                        product={ord.product}
                    />
                ))}
        </div>
        </div>
    </div>
)
} export default MyOrders
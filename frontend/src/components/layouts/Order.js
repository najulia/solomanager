import { Link } from 'react-router';
import styles from './Product.module.css'
import { FaEdit } from "react-icons/fa";

function Order({code, customer_name, customer_phone, payment_method, payment_status, 
  quantity, total, product}) {
    
    return(
            <ul className={styles.listProduct}>
                <li>
                    <Link to={`/order/${code}`}> 
                        <FaEdit className={styles.editBtn} />
                    </Link>
                </li>
                <li>Código
                <p>{code}</p>
                </li>
                <li>Nome do cliente
                <p>{customer_name}</p>
                </li>
                <li>Telefone do cliente
                <p>{customer_phone}</p>
                </li>
                <li>Método de pagamento
                <p>{payment_method}</p>
                </li>
                <li>Status do pagamento
                <p>{payment_status}</p>
                </li>
                <li> Quantidade
                  <p>{quantity}</p>
                </li>
                <li> Total do pedido
                  <p>R$ {total}</p>
                </li>
                <li> Produto
                  <p>{product.name}</p>
                </li>
            </ul>
    )
} export default Order
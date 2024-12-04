import styles from './Products.module.css'
import Navbar from '../layouts/Navbar'
import Button from '../layouts/ButtonLink';
import { MdAdd } from "react-icons/md";
import { MdOutlineFilterList } from "react-icons/md";
import Product from '../layouts/Product';
import Api from '../../services/Api';
import { useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router";
import { useAuth } from '../contexts/Auth'


function Products() {

    const [product, setProduct] = useState([])
    const { user } = useAuth();
    const { token } = useAuth();

       async function getUserProducts() {
        try {
            const response = await Api.get(`/me/products`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            setProduct(response.data);
        } catch (error) {
            console.error("Erro ao recuperar produtos", error.response?.data || error.message);
        }
    }

    useEffect(() => {
        if (token) {
            getUserProducts(); 
        }
    }, [token]); 

    return(
        <div className={styles.dashcontainer}>
            <Navbar />
            <div className={styles.header}>
            <div className={styles.prodct_header}>
            <h3>Meus produtos</h3>
            <Button text="Aplicar filtros"
            icon = <MdOutlineFilterList/>
            />
            <Button to="/products/new" text="Adicionar produto" 
            icon = <MdAdd/>
            />
            </div>
            {product.map((prod) => (
                        <Product 
                            key = {prod.id}
                            code={prod.id} 
                            name={prod.name} 
                            category={prod.category} 
                            stock={prod.stock} 
                            price={prod.price} 
                        />
                    ))}
            </div>
        </div>
    )
}

export default Products; 
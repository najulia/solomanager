import { Link } from 'react-router';
import styles from './Product.module.css'
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router";
import { useState, useEffect } from 'react';



function Product({code, name, category, stock, price}) {
    
    return(
        <div className={styles.div}>
            <ul className={styles.listProduct}>
                <li>
                    <Link to={`/products/${code}`}> 
                        <FaEdit className={styles.editBtn} />
                    </Link>
                </li>
                <li>Código
                <p>{code}</p>
                </li>
                <li>Nome
                <p>{name}</p>
                </li>
                <li>Categoria
                <p>{category}</p>
                </li>
                <li>Unidades dispoíveis
                <p>{stock}</p>
                </li>
                <li>Preço
                <p>R$ {price}</p>
                </li>
                <li><img src="https://placehold.co/100x40" /></li>
            </ul>
        </div>
    )
} export default Product
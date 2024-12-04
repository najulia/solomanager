import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "./NewProduct.module.css"; 
import {useRef, useState} from 'react';
import Api from "../../services/Api";
import { useNavigate } from 'react-router';

function NewProduct() {
    const inputName = useRef();
    const inputCategory = useRef();
    const inputUnits = useRef();
    const inputPrice = useRef();
    const inputPicture = useRef();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function createProduct(e) {
        e.preventDefault();
        const token = localStorage.getItem('token'); 
        const user_id = JSON.parse(localStorage.getItem('user_id'));
        
        if (!token) {
            throw new Error('Token de autenticação não encontrado!');
        }   
        try {
            await Api.post("/products", {
                name: inputName.current.value,
                category: inputCategory.current.value,
                stock: inputUnits.current.value,
                price: inputPrice.current.value,
                picture: inputPicture.current.value,
                user_id: user_id
            }, {
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Produto criado com sucesso!");
            navigate("/me/products");
        } catch (error) {
            console.error("Erro ao cadastrar", error.response?.data || error.message);
            if (error.response && error.response.status === 401) {
                // Se o erro for 401 (Unauthorized), redireciona para o login
                setError("Você precisa estar logado");
                navigate("/login");
        }
    }

}

    return(
        <form className={styles.form}>
            <h1>Cadastrar produto novo</h1>
            < Input type="text" placeholder="Titulo aqui" name="name" text="Nome do produto" ref={inputName}/>
            < Input type="text" placeholder="Categoria aqui" name="category" text="Categoria" ref={inputCategory}/>
            < Input type="number" placeholder="Quantidade aqui" name="stock" text="Em estoque" ref={inputUnits}/>
            < Input type="number" placeholder="Preço aqui" name="price" text="Preço (R$)" ref={inputPrice}/>
            < Input type="text" placeholder="Imagem aqui" name="picture" text="Imagem" ref={inputPicture}/>
            < SubmitButton onClick={createProduct} text="Cadastrar produto"/>
        </form>
    )
    
}

export default NewProduct; 
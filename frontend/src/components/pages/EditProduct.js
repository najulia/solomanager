import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "./EditProduct.module.css";
import { useState, useEffect } from "react";
import Api from "../../services/Api";
import { useNavigate, useParams } from "react-router";
import EditImg from "../../media/edit.svg"
import Container from "../layouts/Container";
import ButtonLink from "../layouts/ButtonLink";

function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (id) fetchProductById();
    }, [id]);

    const fetchProductById = async () => {
        try {
            const { data } = await Api.get(`/products/${id}`);
            setProduct(data);
        } catch (err) {
            console.error("Erro ao carregar o produto:", err.response?.data || err.message);
            setError("Erro ao carregar o produto.");
        }
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); 
        if (!token) {
            throw new Error('Token de autenticação não encontrado!');
        }   
        try {
            await Api.put(`/products/${id}`, product, {

                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                }
                
            });
            navigate("/me/products"); 
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Você precisa estar logado");
                navigate("/login"); }
                 else {
                    console.error("Erro ao salvar o produto:", err.response?.data || err.message);
                    setError("Erro ao salvar o produto.");
                }
            
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    async function deleteProduct(){
        const confirmation = window.confirm("Tem certeza que deseja remover o produto?");
        if (!confirmation) return;
        try{
            const response = await Api.delete(`/products/${id}`)
            console.log("Produto deletado com sucesso!")
            navigate("/me/products")
        } catch(err){
            console.error("Erro ao deletar o produto:", err.response?.data || err.message);
            setError("Erro ao deletar produto.");
        }

    }

    return (
        <>
        <Container>
            <div className={styles.editProductContainer}>
            <div className={styles.imgContainer}>
            <img src={EditImg} alt="form illustration" />
            </div>
            <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Editar Produto</h3>
            
            <Input
                type="text"
                name="name"
                text="Nome do produto"
                value={product.name}
                onChange={handleChange}
            />

            <Input
                type="text"
                name="category"
                text="Categoria"
                value={product.category}
                onChange={handleChange}
            />

            <Input
                type="number"
                name="stock"
                text="Em estoque"
                value={product.stock}
                onChange={handleChange}
            />

            <Input
                type="number"
                name="price"
                text="Preço (R$)"
                value={product.price}
                onChange={handleChange}
            />

            <Input
                type="text"
                name="picture"
                text="Imagem"
                value={product.picture}
                onChange={handleChange}
            />

            {error && <p className={styles.error}>{error}</p>}

            <SubmitButton text="Salvar alterações" variant="default"/>
            <SubmitButton text="Excluir permanentemente" onClick={deleteProduct} variant="default" />
            <ButtonLink to="/me/products" text="Voltar" variant="transparent" />
        </form>
            </div>
           </div>
            </Container>
        </>
    );
}

export default EditProduct;
import styles from "./NewUser.module.css"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"
import ButtonLink from "../layouts/ButtonLink"
import { useState } from "react"
import { useAuth } from "../contexts/Auth"
import { useNavigate } from "react-router";


function NewUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const { register } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({name, email, password, role});
        

        const success = await register(name, email, password, role);
        if (success) {
          navigate("/me"); 
        } else {
          setError("Não foi possível cadastrar");
        }
      };

    return(
        <>
            <Header />
            <main className={styles.loginContainer}>
                <form onSubmit={handleSubmit}>
                <div className={styles.formTitle}>
                    <h3>Crie sua conta e 
                    <strong> comece agora</strong></h3>
                    </div>
                < Input type="text" name="name" 
                    placeholder="Digite seu nome" 
                    text="Nome" 
                    value= {name}
                    onChange={(e) => {
                        console.log("Nome do input", e.target.value);
                        setName(e.target.value)}} />

                    < Input type="email" name="email" 
                    placeholder="Digite seu e-mail" 
                    text="E-mail" 
                    value= {email}
                    onChange={(e) => {
                        console.log("Email do input", e.target.value);
                        setEmail(e.target.value)}} />
                    
                    < Input type="password"
                     name="password" 
                     placeholder="Digite sua senha" 
                     text="Senha" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}/>
                     
                     < Input type="text" name="role" 
                    placeholder="Valores aceitos: Admin, Editor, Viewer" 
                    text="Cargo" 
                    value= {role}
                    onChange={(e) => {
                        console.log("Cargo do input", e.target.value);
                        setRole(e.target.value)}} />

                    {error && <p className={styles.error}>{error}</p>}

                    <div className={styles.formBtn}>
                    <SubmitButton text="Cadastrar"/>
                    <ButtonLink to="/login" text="Já tenho uma conta" />
                    </div>
                </form>
            </main>
            <Footer />
        </>
    )
    
}

export default NewUser
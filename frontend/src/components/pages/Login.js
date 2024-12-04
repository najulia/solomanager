import styles from "./Login.module.css"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"
import ButtonLink from "../layouts/ButtonLink"
import { useState } from "react"
import { useAuth } from "../contexts/Auth"
import { useNavigate } from "react-router";
import Container from "../layouts/Container"
import LoginImg from "../../media/access.svg"


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();        

        const success = await login(email, password);
        if (success) {
          navigate("/me"); 
        } else {
          setError("Credenciais inválidas.");
        }
      };

    return(
        <>
            <Header />
            <Container>
                <div className={styles.loginContainer}>
                <div className={styles.imgContainer}>
                <img src={LoginImg} alt="form illustration" />
                </div>
                <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formTitle}>
                    <h3>Entre em sua conta para começar</h3>
                    </div>
                    < Input type="text" name="email" 
                    placeholder="Digite seu e-mail" 
                    text="E-mail" 
                    value= {email}
                    onChange={(e) => {
                        setEmail(e.target.value)}} />
                    
                    < Input type="password"
                     name="password" 
                     placeholder="Digite sua senha" 
                     text="Senha" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}/>

                    {error && <p className={styles.error}>{error}</p>}

                    <div className={styles.formBtn}>
                    <SubmitButton text="Fazer login" variant="default"/>
                    <ButtonLink to="/singup" text="Ainda não tenho conta" variant="transparent" />
                    </div>
                </form>
                </div>
               </div>
                </Container>
            <Footer />
        </>
    )
    
} export default Login
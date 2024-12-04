import styles from './Header.module.css'
import SubmitButton from "../form/SubmitButton"
import ButtonLink from "../layouts/ButtonLink"
import { useAuth } from '../contexts/Auth'
import { useNavigate } from 'react-router'

function Header() {
    
    const navigate = useNavigate()
    const { token, logout } = useAuth();

    const handleLogout = () =>{
        console.log("Logout chamado");
        logout()
        navigate("/login")
    }

    return(
        <header className={styles.header}>
            
            <a href='/'>
            <img src="https://placehold.co/100x50" alt="logo" />
            </a>
       
        <div className={styles.headerLinks}>
        <ButtonLink to="/" className={styles.buttonLink} text="Sobre" />
        {token ? (
                    <>
                        <ButtonLink to="/me/products" text="Meus produtos" />
                        <SubmitButton to="/" text="Logout" onClick={handleLogout} />
                    </>
                ) : (
                    <ButtonLink to="/login" text="Entrar na conta" />
                )}
        </div>
       </header>
    )
} export default Header
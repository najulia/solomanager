import styles from './Navbar.module.css'
import { Link} from "react-router";
import { useAuth } from '../contexts/Auth'
import SubmitButton from '../form/SubmitButton';
import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import ButtonLink from './ButtonLink';


function Navbar() {
    
    const { user } = useAuth();
    const { logout }= useAuth()
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault(); 
        logout(); 
        console.log("Logout feito com sucesso")
        navigate("/"); 
    };

    return(
        <aside className={styles.navbarContainer}>
            <div className={styles.profileDiv}>
            <CgProfile className={styles.profileIcon}/>
            </div>
            <div>
            <ul className={styles.navbarLinks}>
                <ButtonLink to="/me" text="Painel" variant='default'></ButtonLink>
                <ButtonLink to={`/me/products`} text="Produtos" variant='default'></ButtonLink>
                <ButtonLink to={`/`} text="Ir pra home" variant='default'></ButtonLink>
                <SubmitButton text="Sair da conta" onClick={handleLogout} variant='default-small'></SubmitButton>
                </ul>
            </div>
        </aside>
    )
}

export default Navbar; 
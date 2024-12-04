import styles from './Navbar.module.css'
import { Link} from "react-router";
import { useAuth } from '../contexts/Auth'
import SubmitButton from '../form/SubmitButton';
import { useNavigate } from "react-router";

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
        <aside className={styles.navbar}>
            <img src="https://placehold.co/100x100" alt="profile-picture"/>
            <h3>Minha loja</h3>
            <nav className={styles.navbar}>
                <ul className={styles.list}>
                <Link to="/me" className={styles.item}>Painel</Link>
                <Link to={`/me/products`} className={styles.item}>Produtos</Link>
                </ul>
            </nav>
            <SubmitButton text="Sair da conta" onClick={handleLogout}/>
        </aside>
    )
}

export default Navbar; 
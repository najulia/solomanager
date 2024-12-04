import styles from './Dashboard.module.css'
import Navbar from '../layouts/Navbar'
import SubmitButton from '../form/SubmitButton';
import { useAuth } from "../contexts/Auth"
import { useNavigate } from "react-router";

function Dashboard() {

    return(
        <div className={styles.dashcontainer}>
            <Navbar />
            <div className={styles.header}>
            <h3>Meu painel</h3>
            <p>Você ainda não fez nenhuma venda</p>
            </div>
        </div>
    )
}

export default Dashboard; 
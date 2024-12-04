import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from './Footer.module.css'

function Footer() {
    return(
        <footer className={styles.footer}>
            <p>Desenvolvido por Ana Oliveira</p>
            <div className={styles.social}>
                <p><FaGithub /></p>
                <p><FaLinkedin/></p>
            </div>
           </footer>
    )
} export default Footer
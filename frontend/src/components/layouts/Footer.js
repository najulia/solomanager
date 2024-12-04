import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from './Footer.module.css'
import Logo from '../../media/logo branco.png'

function Footer() {
    return(
        <footer className={styles.footer}>
            <a href='/'>
            <img src={Logo} alt="logo" className={styles.logo} />
            </a>
            <p>Desenvolvido por Ana Oliveira</p>
            <div className={styles.social}>
                <p><FaGithub /></p>
                <p><FaLinkedin/></p>
            </div>
           </footer>
    )
} export default Footer
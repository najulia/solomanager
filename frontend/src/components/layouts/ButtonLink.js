import styles from "./ButtonLink.module.css"; 
import { Link} from "react-router";



function ButtonLink({text, icon, to}) {

    return(
            <Link to={to} className={styles.btn}>{text} {icon}</Link>
    )
    
}

export default ButtonLink; 
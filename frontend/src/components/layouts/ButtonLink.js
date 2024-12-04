import styles from "./ButtonLink.module.css"; 
import { Link} from "react-router";



function ButtonLink({text, icon, to, variant = "default"}) {
    const classNames = `${styles.btn} ${styles[variant] || ""}`;

    return(
            <Link to={to} className={classNames}>{text} {icon}</Link>
    )
    
}

export default ButtonLink; 
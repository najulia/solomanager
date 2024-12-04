import styles from "./SubmitButton.module.css"

function SubmitButton({onClick, text, variant}) {

    const classNames = `${styles.submitBtn} ${styles[variant] || ""}`;
    return(
            <button type="submit" 
            className={classNames} onClick={onClick}>{text}</button>
    )
}

export default SubmitButton
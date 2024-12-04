import styles from "./SubmitButton.module.css"

function SubmitButton({onClick, text}) {
    return(
            <button className={styles.submitBtn} type="submit" onClick={onClick}>{text}</button>
    )
}

export default SubmitButton
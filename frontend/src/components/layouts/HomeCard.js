import styles from "./HomeCard.module.css"

function HomeCard({ title, text, icon}) {
    return(
        <div className={styles.card}>
                <p className={styles.icon}>{icon} {title}</p>
                <img src="https://placehold.co/200x200" />
                    <p>
                        {text}
                    </p>
            </div>
    )
} export default HomeCard
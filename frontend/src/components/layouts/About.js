import styles from './About.module.css'
import Container from './Container';
import HomeCard from './HomeCard';
import ImgHome from "../../media/img-home.jpg";


function About() {

    return(
        <Container>
            <div className={styles.sectionAbout}>
                <div className={styles.aboutText}>
                <h2>Somos parceiros do seu negócio</h2>
                <p>O SoloManager foi projetado para atender pequenas empresas e comerciantes autônomos. 
                Com ferramentas simples e eficientes, facilitamos a gestão de vendas, estoque, finanças 
                e muito mais, tudo em um só lugar. Nosso objetivo é empoderar pequenos negócios com 
                tecnologia de qualidade, ajudando você a economizar tempo, organizar processos e 
                focar no que realmente importa: <strong>o crescimento do seu negócio.</strong></p>
                </div>
                <div className={styles.containerImg}>
                    <img src={ImgHome} alt="Imagem de um quebra-cabeças se encaixando" loading="lazy" />
                </div>
                </div>
        </Container>
    )
    
} export default About;
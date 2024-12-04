import styles from './About.module.css'
import HomeCard from './HomeCard';
import { MdOutlineManageAccounts } from "react-icons/md";


function About() {

    return(
        <section id="about" className={styles.containerAbout}>
        <h1> Sobre nós </h1>
        <p>O Solo Manager é uma ferramenta inovadora desenvolvida para tornar a gestão de produtos mais 
            simples, eficiente e organizada. Se você já enfrentou desafios como manter o controle do estoque, 
            acompanhar vendas, ou analisar o desempenho de seus produtos, o Solo Manager é a solução ideal.</p>
            <img src="https://placehold.co/1280x400" />
            <h2>O que você pode esperar </h2>
        <div className={styles.aboutCards}>

           <HomeCard text="Atualize e acompanhe seus produtos em tempo real, evitando 
                      erros e surpresas indesejadas." icon = {<MdOutlineManageAccounts />}
                       title="Facilidade no controle de estoque:"/>
             <HomeCard text="Atualize e acompanhe seus produtos em tempo real, evitando 
                      erros e surpresas indesejadas." icon = {<MdOutlineManageAccounts />}
                       title="Facilidade no controle de estoque:"/>
             <HomeCard text="Atualize e acompanhe seus produtos em tempo real, evitando 
                      erros e surpresas indesejadas." icon = {<MdOutlineManageAccounts />}
                       title="Facilidade no controle de estoque:"/>
        </div>
        </section>
    )
    
} export default About;
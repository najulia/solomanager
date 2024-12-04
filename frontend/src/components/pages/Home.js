import styles from './Home.module.css'
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import About from '../layouts/About';
import ButtonLink from '../layouts/ButtonLink';
import Banner from '../../media/banner-home.jpg';
import Container from '../layouts/Container';

function Home() {
    return(
        <div>
          <Header />
          <Container>
            <div className={styles.divBanner}>
            <img src={Banner} alt="banner"loading="lazy" />
            </div>
            <ButtonLink to="/login" text="Começar agora" variant='default-big' />
                <About />
           </Container>
            <Footer />
        </div>
    )
}

export default Home; 
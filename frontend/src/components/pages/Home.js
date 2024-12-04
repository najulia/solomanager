import styles from './Home.module.css'
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import About from '../layouts/About';
import ButtonLink from '../layouts/ButtonLink';
import Banner from '../../media/banner-home.jpg'

function Home() {
    return(
        <div>
          <Header />
           <main className={styles.main}>
            <h1>SoloManager</h1>
            <p>Gerencie seus produtos com facilidade e controle total</p>
            <div className={styles.divBanner}>
            <img src="/" alt='Illustration' loading="lazy" />
            </div>
            < About />
            <ButtonLink to="/login" text="Comece agora" />
           </main>
            <Footer />
        </div>
    )
}

export default Home; 
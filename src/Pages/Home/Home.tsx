import styles from './Home.module.css'

import Button from '../../components/Utils/Button'

import { RiFilePaper2Line } from 'react-icons/ri'
import { LuSwords } from 'react-icons/lu'
import { BsStars } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
  return (
    <div>
        <header className={styles.mainHeader}>

            <div className={styles.tag}><p><BsStars /> Gerencie seus Personagens de RPG</p></div>

            <h1 className={styles.title}>Crie Heróis <span>Épicos</span></h1>
            <h2 className={styles.subtitle}>A ferramenta completa para criar, gerenciar e evoluir seus personagens de RPG com estilo</h2>

            <div className={styles.buttonContainer}>
                <Button title='Começar Agora' variant='primary' action={() => {
                    navigate('/login')
                }} icon={<RiFilePaper2Line />} />
                
                <Button title='Ver Recursos' variant='secondary' action={() => {}} icon={<LuSwords />} />
            </div>

        </header>

        <section className={styles.section}>
            <h2 className={styles.title}>Recursos <span>Poderosos</span></h2>

        </section>
    
    </div>
  )
}

export default Home
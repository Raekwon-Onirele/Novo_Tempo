// import CSS
import "./Home.css"

// import components
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import ServicesHub from '../../components/ServicesHub';
import BimViewer from '../../components/BimViewer';
import QuantitySpreadsheet from '../../components/QuantitySpreadsheet';
import ProjectGallery from '../../components/ProjectGallery';
import Partners from '../../components/Partners';
import ContactForm from '../../components/ContactForm';
import Footer from '../../components/Footer';

const Home = () => {
  return (
    <div className="app-landing-page technical-grid-lines">
          {/* 1. Barra de Navegação com Menu Hambúrguer (Sanduíche) */}
          <Navbar />
    
          <main>
            {/* 2. Banner Principal / Apresentação e Estatísticas de Mercado */}
            <Hero />
    
            {/* 3. Hub de Serviços e Oportunidades Multidisciplinares */}
            <ServicesHub />
    
            {/* 4. Módulo Interativo: Visualizador 3D BIM Canvas */}
            <BimViewer />
    
            {/* 5. Módulo Interativo: Planilha Quantitativa e Estimador de Custos */}
            <QuantitySpreadsheet />
    
            {/* 6. Portfólio de Projetos Recentes com Zoom Técnico */}
            <ProjectGallery />
    
            {/* 7. Logos das Empresas Parceiras */}
            <Partners />
    
            {/* 8. Área de Contato e Direcionador Dinâmico de Emails */}
            <ContactForm />
          </main>
    
          {/* 9. Rodapé com Informações de Licenciamento, CREA e Contatos */}
          <Footer />
        </div>
  )
}

export default Home
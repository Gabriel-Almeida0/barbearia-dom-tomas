// Montagem final (T051): ordem do plano. Só a integração edita este arquivo.
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Servicos from "@/components/sections/Servicos";
import Sobre from "@/components/sections/Sobre";
import Missao from "@/components/sections/Missao";
import Galeria from "@/components/sections/Galeria";
import FaixaWhatsApp from "@/components/sections/FaixaWhatsApp";
import Equipe from "@/components/sections/Equipe";
import Depoimentos from "@/components/sections/Depoimentos";
import FaixaCta from "@/components/sections/FaixaCta";
import Contato from "@/components/sections/Contato";
import Footer from "@/components/sections/Footer";
import WhatsAppFab from "@/components/sections/WhatsAppFab";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <Servicos />
        <Sobre />
        <Missao />
        <Galeria />
        <FaixaWhatsApp />
        <Equipe />
        <Depoimentos />
        <FaixaCta />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

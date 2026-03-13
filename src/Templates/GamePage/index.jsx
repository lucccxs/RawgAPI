import capa from "../../assets/Imagem/jogo.jpeg"
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import Header from "../../components/header";
import Recomendado from "../../components/Cards/recomedacao";
import { useRef, useEffect } from "react";
import "./style/style.css"


export default function GamePage({nome, ano, dev, desc, genero, pub, metacritic, tempo, avaliacoes, recomendacoes}){
    const carrossel = useRef(null);

  // Clonar itens para criar efeito infinito
  useEffect(() => {
    const container = carrossel.current;
    if (!container) return;

    const items = Array.from(container.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.classList.add("clone");
      container.appendChild(clone);
    });

    // Começa no primeiro original
    container.scrollLeft = 0;
  }, []);

  const scrollDireita = () => {
    const container = carrossel.current;
    const itemWidth = container.children[0].offsetWidth + 20; // gap de 20px
    container.scrollBy({ left: itemWidth, behavior: "smooth" });
    
    // Loop infinito: quando chegar ao final, volta pro começo
    setTimeout(() => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
    }, 300); // espera a animação acabar
  };

  const scrollEsquerda = () => {
    const container = carrossel.current;
    const itemWidth = container.children[0].offsetWidth + 20; // gap de 20px
    container.scrollBy({ left: -itemWidth, behavior: "smooth" });
    
    // Loop infinito: se for menor que zero, volta pro final
    setTimeout(() => {
      if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth / 2;
      }
    }, 300);
  };

    return(
        <div className="parallax">
            <div className="parallax-image" style={{backgroundImage: 'url()'}}>
                <div className="overlay"></div>
            </div>
            <Header/>
            <div className="infos">
                <div className="header">
                    <div className="plataformas">
                        <FaPlaystation size={20}/>
                        <FaXbox/>
                        <FaSteam/>
                        <div className="dev-pub">
                            <p>Ubisoft</p>
                            <p>Ubisoft</p>
                        </div>
                    </div>
                </div>
                <main>
                    <img src={capa}/>
                    <p>Assassin's Creed Black Flag</p>
                    <p>2013</p>
                    <p>Jogo de piratinha que vira assassino, vulgo Edward Kenway</p>
                    <p>Ação e Aventura</p>
                    <p>8/10</p>
                    <p>12h</p>
                </main>
                    <div className="recomendados">
                        <h4>Recomendações</h4>
                                <button className ="seta-esquerda" onClick={scrollEsquerda}>&lt;</button>
                           <div className="carrossel">
                                <div className="recomendacoes" ref={carrossel}>
                                    <Recomendado/>
                                    <Recomendado/>
                                    <Recomendado/>
                                    <Recomendado/>
                                    <Recomendado/>
                                    <Recomendado/>
                                    <Recomendado/>
                                </div>
                            </div>
                            <button className="seta-direita" onClick={scrollDireita}>&gt;</button>
                        </div>
                    </div>
                </div>

    )
}
import "./style/style.css"
function Home() {
    return(
        
        <body>
            <header>
                <div className="pesquisar">
                    <label>RawgAPI</label>
                    <input type="text" placeholder="Pesquisar"/>
                </div>
                <div className="login">
                    <button>Entrar</button>
                    <button>Criar conta</button>
                </div>
            </header>
            <div className="filtros">
                <p>Filtros: </p>
                <li>
                    <ul>Plataforma</ul>
                    <ul>Gênero</ul>
                    <ul>Desenvolvedores</ul>
                    <ul>Ano de Lançamento</ul>
                    <ul>Top</ul>
                </li>
            </div>
            <div className="cards">
              
            </div>
        </body>
    )
}

export default Home
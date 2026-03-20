import "./style/style.css"
import { IoSearch } from "react-icons/io5"
import { useState } from "react"
export default function Header({onSearch}){
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            onSearch(searchTerm)
            setSearchTerm("")
        }
    }

    return(
        
        <>
            <header>
                <div className="pesquisar">
                    <label><a href="http://localhost:5173/">RawgAPI</a></label>
                    <form onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            placeholder="Pesquisar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" style={{background: "none", border: "none", cursor: "pointer"}}>
                            <IoSearch size={30} className="lupa"/>
                        </button>
                    </form>
                </div>
                <div className="login">
                    <button>Entrar</button>
                    <button>Criar conta</button>
                </div>
            </header>
            <div className="filtros">
                <li>
                    <ul>
                        Plataforma
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                    </ul>
                    <ul>
                        Gênero
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button> 
                    </ul>
                    <ul>
                        Desenvolvedores
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                    </ul>
                    <ul>
                        Ano
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button> 
                    </ul>
                    <ul>
                        Top
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                    </ul>
                </li>
            </div>
        </>
    )
}
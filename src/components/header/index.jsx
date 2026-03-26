import "./style/style.css"
import { IoSearch } from "react-icons/io5"
import { useState, useEffect } from "react"
import { getGenres } from "../../services/games/getGenres"
import { getPlatforms } from "../../services/games/getPlatforms"
import { getDevelopers } from "../../services/games/getDevelopers"

export default function Header({onSearch, onFilterChange, initialFilters, showFilters = true}){
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState({
        platforms: initialFilters?.platforms || [],
        genres: initialFilters?.genres || [],
        developers: initialFilters?.developers || [],
        year: initialFilters?.year || null,
        ordering: initialFilters?.ordering || null
    })
    const [expandedFilter, setExpandedFilter] = useState(null)
    const [filterOptions, setFilterOptions] = useState({
        platforms: [],
        genres: [],
        developers: []
    })

    useEffect(() => {
        async function loadFilterOptions() {
            try {
                const [genresRes, platformsRes, developersRes] = await Promise.all([
                    getGenres(),
                    getPlatforms(),
                    getDevelopers()
                ])
                setFilterOptions({
                    genres: genresRes.data.results || [],
                    platforms: platformsRes.data.results || [],
                    developers: developersRes.data.results || []
                })
            } catch (err) {
                console.error("Erro ao carregar opções de filtros:", err)
            }
        }
        loadFilterOptions()
    }, [])

    useEffect(() => {
        if (initialFilters) {
            setFilters({
                platforms: initialFilters?.platforms || [],
                genres: initialFilters?.genres || [],
                developers: initialFilters?.developers || [],
                year: initialFilters?.year || null,
                ordering: initialFilters?.ordering || null
            })
        }
    }, [initialFilters])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            onSearch(searchTerm)
            setSearchTerm("")
        }
    }

    const toggleFilter = (filterName) => {
        setExpandedFilter(expandedFilter === filterName ? null : filterName)
    }

    const getFilterName = (type, value) => {
        if (type === 'genres') {
            return filterOptions.genres.find(g => g.id === value)?.name || value
        } else if (type === 'platforms') {
            return filterOptions.platforms.find(p => p.id === value)?.name || value
        } else if (type === 'developers') {
            return filterOptions.developers.find(d => d.id === value)?.name || value
        }
        return value
    }

    const getOrderingLabel = (ordering) => {
        if (ordering === '-metacritic') return 'Melhor Avaliação'
        if (ordering === '-released') return 'Mais Recente'
        return ordering
    }

    const hasActiveFilters = () => {
        return (filters.platforms.length > 0 || 
                filters.genres.length > 0 || 
                filters.developers.length > 0 || 
                filters.year !== null || 
                filters.ordering !== null)
    }

    const removeFilter = (type, value) => {
        const newFilters = { ...filters }
        if (type === 'year' || type === 'ordering') {
            newFilters[type] = null
        } else {
            newFilters[type] = newFilters[type].filter(item => item !== value)
        }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const handleFilterToggle = (filterType, value) => {
        const newFilters = { ...filters }
        const filterArray = newFilters[filterType] || []
        
        if (filterArray.includes(value)) {
            newFilters[filterType] = filterArray.filter(item => item !== value)
        } else {
            newFilters[filterType] = [...filterArray, value]
        }
        
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const handleYearChange = (year) => {
        const newFilters = { ...filters, year: filters.year === year ? null : year }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const handleOrderingChange = (ordering) => {
        const newFilters = { ...filters, ordering: filters.ordering === ordering ? null : ordering }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

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
            {showFilters && hasActiveFilters() && (
                <div className="filtros-ativos">
                    <span style={{fontWeight: "bold", marginRight: "15px"}}>Filtros:</span>
                    {filters.platforms.map(id => (
                        <div key={`platform-${id}`} className="filtro-chip">
                            <span>{getFilterName('platforms', id)}</span>
                            <button onClick={() => removeFilter('platforms', id)}>×</button>
                        </div>
                    ))}
                    {filters.genres.map(id => (
                        <div key={`genre-${id}`} className="filtro-chip">
                            <span>{getFilterName('genres', id)}</span>
                            <button onClick={() => removeFilter('genres', id)}>×</button>
                        </div>
                    ))}
                    {filters.developers.map(id => (
                        <div key={`developer-${id}`} className="filtro-chip">
                            <span>{getFilterName('developers', id)}</span>
                            <button onClick={() => removeFilter('developers', id)}>×</button>
                        </div>
                    ))}
                    {filters.year && (
                        <div key="year-filter" className="filtro-chip">
                            <span>Ano: {filters.year}</span>
                            <button onClick={() => removeFilter('year', null)}>×</button>
                        </div>
                    )}
                    {filters.ordering && (
                        <div key="ordering-filter" className="filtro-chip">
                            <span>{getOrderingLabel(filters.ordering)}</span>
                            <button onClick={() => removeFilter('ordering', null)}>×</button>
                        </div>
                    )}
                </div>
            )}
            
            {showFilters && (
                <div className="filtros">
                    <li>
                    {/* Plataforma Filter */}
                    <ul>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}}>
                            <span onClick={() => toggleFilter('platforms')}>Plataforma</span>
                            <button onClick={() => toggleFilter('platforms')} style={{background: "none", border: "none"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{transform: expandedFilter === 'platforms' ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s'}}>
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </button>
                        </div>
                        {expandedFilter === 'platforms' && (
                            <div className="dropdown-filtro" >
                                {filterOptions.platforms.map(platform => (
                                    <div key={platform.id} style={{marginBottom: "8px"}}>
                                        <input 
                                            type="checkbox" 
                                            id={`platform-${platform.id}`}
                                            checked={filters.platforms.includes(platform.id)}
                                            onChange={() => handleFilterToggle('platforms', platform.id)}
                                        />
                                        <label htmlFor={`platform-${platform.id}`} style={{marginLeft: "8px", cursor: "pointer"}}>
                                            {platform.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ul>

                    {/* Gênero Filter */}
                    <ul>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}}>
                            <span onClick={() => toggleFilter('genres')}>Gênero</span>
                            <button onClick={() => toggleFilter('genres')} style={{background: "none", border: "none"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{transform: expandedFilter === 'genres' ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s'}}>
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </button>
                        </div>
                        {expandedFilter === 'genres' && (
                            <div className="dropdown-filtro">
                                {filterOptions.genres.map(genre => (
                                    <div key={genre.id} style={{marginBottom: "8px"}}>
                                        <input 
                                            type="checkbox" 
                                            id={`genre-${genre.id}`}
                                            checked={filters.genres.includes(genre.id)}
                                            onChange={() => handleFilterToggle('genres', genre.id)}
                                        />
                                        <label htmlFor={`genre-${genre.id}`} style={{marginLeft: "8px", cursor: "pointer"}}>
                                            {genre.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ul>

                    {/* Desenvolvedores Filter */}
                    <ul>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}}>
                            <span onClick={() => toggleFilter('developers')}>Desenvolvedores</span>
                            <button onClick={() => toggleFilter('developers')} style={{background: "none", border: "none"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{transform: expandedFilter === 'developers' ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s'}}>
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </button>
                        </div>
                        {expandedFilter === 'developers' && (
                            <div className="dropdown-filtro">
                                {filterOptions.developers.slice(0, 50).map(developer => (
                                    <div key={developer.id} style={{marginBottom: "8px"}}>
                                        <input 
                                            type="checkbox" 
                                            id={`developer-${developer.id}`}
                                            checked={filters.developers.includes(developer.id)}
                                            onChange={() => handleFilterToggle('developers', developer.id)}
                                        />
                                        <label htmlFor={`developer-${developer.id}`} style={{marginLeft: "8px", cursor: "pointer"}}>
                                            {developer.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ul>

                    {/* Ano Filter */}
                    <ul>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}}>
                            <span onClick={() => toggleFilter('year')}>Ano</span>
                            <button onClick={() => toggleFilter('year')} style={{background: "none", border: "none"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{transform: expandedFilter === 'year' ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s'}}>
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </button>
                        </div>
                        {expandedFilter === 'year' && (
                            <div className="dropdown-filtro">
                                {years.map(year => (
                                    <div key={year} style={{marginBottom: "8px"}}>
                                        <input 
                                            type="radio" 
                                            id={`year-${year}`}
                                            name="year"
                                            checked={filters.year === year}
                                            onChange={() => handleYearChange(year)}
                                        />
                                        <label htmlFor={`year-${year}`} style={{marginLeft: "8px", cursor: "pointer"}}>
                                            {year}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ul>

                    {/* Top Filter */}
                    <ul>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}}>
                            <span onClick={() => toggleFilter('top')}>Top</span>
                            <button onClick={() => toggleFilter('top')} style={{background: "none", border: "none"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{transform: expandedFilter === 'top' ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s'}}>
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </button>
                        </div>
                        {expandedFilter === 'top' && (
                            <div className="dropdown-filtro">
                                <div style={{marginBottom: "8px"}}>
                                    <input 
                                        type="radio" 
                                        id="top-rating"
                                        name="ordering"
                                        checked={filters.ordering === '-metacritic'}
                                        onChange={() => handleOrderingChange('-metacritic')}
                                    />
                                    <label htmlFor="top-rating" style={{marginLeft: "8px", cursor: "pointer"}}>
                                        Melhor Avaliação
                                    </label>
                                </div>
                                <div style={{marginBottom: "8px"}}>
                                    <input 
                                        type="radio" 
                                        id="top-recent"
                                        name="ordering"
                                        checked={filters.ordering === '-released'}
                                        onChange={() => handleOrderingChange('-released')}
                                    />
                                    <label htmlFor="top-recent" style={{marginLeft: "8px", cursor: "pointer"}}>
                                        Mais Recente
                                    </label>
                                </div>
                            </div>
                        )}
                    </ul>
                </li>
            </div>
            )}
        </>
    )
}
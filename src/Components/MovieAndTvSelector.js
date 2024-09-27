import Select from 'react-select';


const option = [
    { value: 'popularity.desc', label: 'Popularidade' },
    { value: 'vote_count.desc', label: 'Avaliação (público)' },
    { value: 'vote_average.desc', label: 'Mais bem votado' },
]

const language = [
    { value: '', label: 'Qualquer' },
    { value: 'KR', label: 'Dorama' },
]

const movieGenres = [
    { value: 28, label: 'Ação' },
    { value: 16, label: 'Animação' },
    { value: 12, label: 'Aventura' },
    { value: 35, label: 'Comédia' },
    { value: 10770, label: 'Cinema Tv' },
    { value: 80, label: 'Crime' },
    { value: 99, label: 'Documentário' },
    { value: 18, label: 'Drama' },
    { value: 10751, label: 'Família' },
    { value: 14, label: 'Fantasia' },
    { value: 37, label: 'Faroeste' },
    { value: 878, label: 'Ficção Científica' },
    { value: 10752, label: 'Guerra' },
    { value: 36, label: 'História' },
    { value: 9648, label: 'Mistério' },
    { value: 10402, label: 'Música' },
    { value: 10749, label: 'Romance' },
    { value: 53, label: 'Suspense' },
    { value: 27, label: 'Terror' }
]
const tvGenres = [
    { value: 10759, label: 'Ação e Aventura' },
    { value: 16, label: 'Animação' },
    { value: 35, label: 'Comédia' },
    { value: 80, label: 'Crime' },
    { value: 99, label: 'Documentário' },
    { value: 18, label: 'Drama' },
    { value: 10751, label: 'Família' },
    { value: 37, label: 'Faroeste' },
    { value: 10765, label: 'Ficção e Fantasia' },
    { value: 10768, label: 'Guerra e Política' },
    { value: 10762, label: 'Infantil' },
    { value: 9648, label: 'Mistério' },
    { value: 10763, label: 'Notícias' },
    { value: 10766, label: 'Novelas' },
    { value: 10764, label: 'Reality Show' },
    { value: 10767, label: 'Talk Show' },
   
    
]


const MovieAndTvSelector = ({ mediaType, setGenres, setSorttype, setLangtype }) => {
    const handleSelectItem = (selectedItem, action) => {
        action.name==='genres'?setGenres('&with_genres='+selectedItem.map(e => e.value).join('%2C')):setSorttype(selectedItem.value);
    }
    const handleSelectLang = (selectedLang, action) => {
        language.map(e => e.value);
        if (selectedLang.value === "KR") {
            setLangtype('&with_origin_country=KR');
        } else if (selectedLang.value === "") {
            setLangtype('');
        }
    }
    
    return (
        <div className='relative w-auto flex flex-col gap-2 items-end'>
            <div className="relative w-full h-auto flex flex-col sm:flex-row gap-3 md:gap-10 justify-between items-end sm:items-center">
                <p className="text-xl md:text-2xl font-bold text-center">{mediaType==='movie'?'Explore seus filmes':'Explore suas séries'}</p>
                <Select
                    name='sort_by'
                    defaultValue={'popularity.desc'}
                    options={option}
                    isClearable={false}
                    onChange={handleSelectItem}
                    placeholder='Filtre por'
                    styles={{
                        control: (base) => ({
                            ...base, 
                            width: '180px',
                            height: '40px',
                            backgroundColor: 'black',
                            color: 'white',
                        }),
                        option: (base, item) => {
                            return {
                                ...base,
                                color: 'white',
                                backgroundColor: item.isFocused ? 'gray' : 'black',
                            }
                        },
                        menu: (base) => {
                            return {
                                ...base,
                                backgroundColor: 'black',
                                border: '1px solid white',
                                zIndex: '2',
                            }
                        },
                        input: (base) => {
                            return {
                                ...base,
                                color: 'white',
                            }
                        },
                        placeholder: (base) => {
                            return {
                                ...base,
                                color: 'white',
                            }
                        },
                        singleValue: (base) => {
                            return {
                                ...base,
                                color: 'white',
                            }
                        },
                    }}
                />
            </div>
            <Select
                name='genres'
                options={mediaType === 'movie' ? movieGenres : tvGenres}
                isMulti
                isClearable={true}
                onChange={handleSelectItem}
                placeholder='&nbsp;Gêneros'
                styles={{
                    control: (base) => ({
                        ...base, 
                        minWidth: '180px',
                        minHeight: '40px',
                        backgroundColor: 'black',
                        color: 'white',
                        
                    }),
                    option: (base, item) => {
                        return {
                            ...base,
                            color: 'white',
                            backgroundColor: item.isFocused ? 'gray' : 'black',
                        }
                    },
                    menu: (base) => {
                        return {
                            ...base,
                            backgroundColor: 'black',
                            border: '1px solid white',
                            zIndex: '1',
                        }
                    },
                    input: (base) => {
                        return {
                            ...base,
                            color: 'white',
                        }
                    },
                    placeholder: (base) => {
                        return {
                            ...base,
                            color: 'white',
                        }
                    },
                    singleValue: (base) => {
                        return {
                            ...base,
                            color: 'white',
                        }
                    },
                    multiValue: (base) => {
                        return {
                            ...base,
                            backgroundColor: 'gray',
                            color: 'black',
                        }
                    },
                    multiValueRemove: (base) => {
                        return {
                            ...base,
                            color: 'black',
                        }
                    },
                    valueContainer: (base) => {
                        return {
                            ...base,
                            padding: '2px'
                        }
                    }
                }}
            />
            <Select
                    name='language'
                    defaultValue={''}
                    options={language}
                    isClearable={false}
                    onChange={(e) => handleSelectLang(e)}
                    placeholder='Tipo'
                    styles={{
                        control: (base) => ({
                            ...base, 
                            width: '180px',
                            height: '40px',
                            backgroundColor: 'black',
                            color: 'white',
                        }),
                        option: (base, item) => {
                            return {
                                ...base,
                                color: 'white',
                                backgroundColor: item.isFocused ? 'gray' : 'black',
                            }
                        },
                        menu: (base) => {
                            return {
                                ...base,
                                backgroundColor: 'black',
                                border: '1px solid white',
                                zIndex: '2',
                            }
                        },
                        input: (base) => {
                            return {
                                ...base,
                                color: 'white',
                            }
                        },
                        placeholder: (base) => {
                            return {
                                ...base,
                                color: 'white',
                            }
                        },
                        singleValue: (base) => {
                            return {
                                ...base,
                                color: 'white',
                            }
                        },
                    }}
                />
        </div>
    )
}

export default MovieAndTvSelector;
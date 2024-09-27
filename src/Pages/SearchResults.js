import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../Hook/useFetch";
import Select from "react-select";
import useUpdateNavBtn from "../Hook/useUpdateNavBtn";
import Card from "../Components/Card";
import { ReactComponent as Nobody_guy } from '../Icons/nobody_guy.svg';
import { ReactComponent as Nobody_girl } from '../Icons/nobody_girl.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GET } from "../API/APIconfig";




const option = [
    { value: 'multi', label: 'Multi' },
    { value: 'movie', label: "Filme" },
    { value: 'tv', label: 'Série' },
    { value: 'person', label: 'Pessoa' }
];
const Skeleton = () => {
    useUpdateNavBtn('movie');
    return (
        <div className="relative w-full h-full flex flex-row gap-3 md:gap-5 justify-center flex-wrap">
            <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
            <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
            <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
            <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
            <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
            <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
            <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
            <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
            <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
            <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
            <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
            <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
            <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
            <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
        </div>
    )
}
const PersonCard = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div className="relative w-32 md:w-48 flex flex-col items-center gap-5 cursor-pointer" onClick={() => navigate('/person/' + data.id)}>
            {data.profile_path ? <img src={`https://image.tmdb.org/t/p/w300/${data.profile_path}`} className="rounded-lg w-full aspect-[2/3] object-cover" /> : data.gender === 1 ? <Nobody_girl className='rounded-lg w-full aspect-[2/3] object-cover bg-slate-800' /> : <Nobody_guy className='rounded-lg w-full aspect-[2/3] object-cover bg-slate-800' />}
            <p className="text-center font-bold">{data.name}</p>
        </div>
    )
}
const SearchResults = () => {
    useUpdateNavBtn('');
    const { query } = useParams();
    const [hasMore, setHasMore] = useState(true);
    const [filter, setFilter] = useState('multi');
    const [data, loading, setData] = useFetch(`https://api.themoviedb.org/3/search/${filter}?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&certification.lte=16&certification_country=BR&include_adult=false&language=pt-BR&page=1`);

    const fetchMore = () => {
        let page = data.page + 1;
        if (page < data.total_pages){
            fetch(`https://api.themoviedb.org/3/search/${filter}?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&certification.lte=16&certification_country=BR&include_adult=false&language=pt-BR&page=${page}`, GET)
            .then(res => res.json())
            .then(newData => {
                if (newData.results[newData.results.length-1].id !== data.results[data.results.length-1].id){
                    setData({...data, 
                        results: [...data.results, ...newData.results],
                        page: newData.page,
                    })
                }
            })
        }
        else{
            setHasMore(false);
        }
    }

    const styles = {
        control: (base) => ({
            ...base,
            width: '200px',
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
    }

    return (
        <div className="relative w-full flex flex-col items-center gap-5 p-5 md:p-10">
            <div className="flex flex-row gap-5">
                <p className="text-2xl md:text-3xl font-bold">Resultados:</p>
                <Select
                    name="filter"
                    defaultValue={'multi'}
                    options={option}
                    isClearable={false}
                    onChange={(selectedItem) => setFilter(selectedItem.value)}
                    placeholder='Filtre'
                    styles={styles}
                />
            </div>
            {loading
                ? <Skeleton />
                : data.results.length!==0
                ? <InfiniteScroll
                dataLength={data.results.length}
                next={fetchMore}
                hasMore={hasMore}
                loader={<div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>}
                endMessage={<p className="w-full pt-6 lg:text-lg text-center">Você já viu tudo!</p>}
                className="flex flex-row flex-wrap gap-5 justify-center"
            >
                {data && data.results.map(e => (e.media_type === 'person' || filter === 'person') ? <PersonCard data={e} key={'person' + e.id} /> : <Card data={e} mediaType={e.media_type || filter} key={e.id} />)}
            </InfiniteScroll>
            : <div className="w-full pt-10 flex justify-center items-center"><p className="w-auto rounded-lg text-center p-5 bg-neutral-800">Nada foi encontrado!</p></div>
            }
        </div>
    )
}


export default SearchResults;
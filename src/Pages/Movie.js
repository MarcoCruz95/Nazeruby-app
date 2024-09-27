import { useState } from "react";
import useFetch from "../Hook/useFetch";
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from "../Components/Card";
import MovieAndTvSelector from "../Components/MovieAndTvSelector";
import useUpdateNavBtn from "../Hook/useUpdateNavBtn";
import { GET } from "../API/APIconfig";



const MovieSkeleton = () => {
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

const Movie = () => {
    useUpdateNavBtn('movie');

    const [hasMore, setHasMore] = useState(true);

    const [genres, setGenres] = useState('');
    const [sorttype, setSorttype] = useState('popularity.desc');
    const [langtype, setLangtype] = useState('')
    const [data, loading, setData] = useFetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&certification.lte=16&certification_country=BR&include_adult=false&language=pt-BR&page=1&sort_by=${sorttype}${genres}${langtype}`);


    const fetchMore = () => {
        let page = data.page + 1;
        if (page < data.total_pages) {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&certification.lte=16&certification_country=BR&include_adult=false&language=pt-BR&page=${page}&sort_by=${sorttype}${genres}${langtype}`, GET)
                .then(res => res.json())
                .then(newData => {
                    if (newData.results[newData.results.length - 1].id !== data.results[data.results.length - 1].id) {
                        setData({
                            ...data,
                            results: [...data.results, ...newData.results],
                            page: newData.page,
                        })
                    }
                })
        }
        else {
            setHasMore(false);
        }
    }

    return (
        <div className="relative w-full h-full p-6 flex flex-col gap-6 justify-center items-center">
            <MovieAndTvSelector mediaType='movie' setGenres={setGenres} setSorttype={setSorttype} setLangtype={setLangtype} />
            {loading
                ? <MovieSkeleton />
                : data.results.length !== 0
                    ? <InfiniteScroll
                        dataLength={data.results.length}
                        next={fetchMore}
                        hasMore={hasMore}
                        loader={<div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>}
                        endMessage={<p className="w-full pt-6 lg:text-lg text-center">Você já viu tudo!</p>}
                        className="relative w-full h-full flex flex-row gap-3 md:gap-5 justify-center flex-wrap"
                    >
                        {data.results.map(cardData => <Card key={'movie#' + cardData.id} data={cardData} mediaType={'movie'} />)}
                    </InfiniteScroll>
                    : <div className="w-full pt-10 flex justify-center items-center"><p className="w-auto rounded-lg text-center p-5 bg-neutral-800">Nada foi encontrado!</p></div>
            }
        </div>
    )
}


export default Movie;
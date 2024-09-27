import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useFetch from "../Hook/useFetch";
import useUpdateNavBtn from "../Hook/useUpdateNavBtn";
import InfiniteScroll from 'react-infinite-scroll-component';
import { GET } from "../API/APIconfig";
import { ReactComponent as Nobody_guy } from '../Icons/nobody_guy.svg';
import { ReactComponent as Nobody_girl } from '../Icons/nobody_girl.svg';




const PeopleSkeleton = () => {
    return (
        <div className="relative w-full flex flex-row flex-wrap gap-5 justify-center items-start">
            <div className="w-64 aspect-[3/4] rounded-lg bg-slate-900 animate-pulse"></div>
            <div className="w-64 aspect-[3/4] rounded-lg bg-slate-900 animate-pulse"></div>
            <div className="w-64 aspect-[3/4] rounded-lg bg-slate-900 animate-pulse"></div>
            <div className="w-64 aspect-[3/4] rounded-lg bg-slate-900 animate-pulse"></div>
            <div className="w-64 aspect-[3/4] rounded-lg bg-slate-900 animate-pulse"></div>
            <div className="w-64 aspect-[3/4] rounded-lg bg-slate-900 animate-pulse"></div>
            <div className="w-64 aspect-[3/4] rounded-lg bg-slate-900 animate-pulse"></div>
            <div className="w-64 aspect-[3/4] rounded-lg bg-slate-900 animate-pulse"></div>
            <div className="w-64 aspect-[3/4] rounded-lg bg-slate-900 animate-pulse"></div>
            <div className="w-64 aspect-[3/4] rounded-lg bg-slate-900 animate-pulse"></div>
        </div>
    )
}
const PCard = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div className="relative w-36 md:w-48 lg:w-64 h-auto flex-shrink-0 flex flex-col gap-3 cursor-pointer" onClick={() => navigate(`/person/${data.id}`)}>
            {data.profile_path
                ? <img src={`https://image.tmdb.org/t/p/w300/${data.profile_path}`} className="w-full aspect-[5/6] object-cover object-top rounded-lg" />
                : data.gender === 1
                    ? <Nobody_girl className="w-full aspect-[5/6] bg-slate-800 rounded-lg"/>
                    : <Nobody_guy className="w-full aspect-[5/6] bg-slate-800 rounded-lg"/>
            }
            <div className="relative w-full h-20 flex flex-col items-center">
                <p className="text-center font-bold">{data.original_name || data.name}</p>
                <div className="text-center w-full h-auto text-stone-500 text-ellipsis line-clamp-2">
                    {data.known_for?.map(e => e.name || e.title).join(', ')}
                </div>
            </div>
        </div>
    )
}

const People = () => {
    useUpdateNavBtn('people');
    const [hasMore, setHasMore] = useState(true);
    const [data, loading, setData] = useFetch(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`);

    const fetchMore = () => {
        let page = data.page + 1;
        if (page < data.total_pages) {
            fetch(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=${page}`, GET)
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
        <div className="relative w-full h-auto flex flex-col gap-3 p-5 justify-start items-center">
            <p className="text-2xl md:text-3xl font-bold">Pessoas populares</p>
            {loading
                ? <PeopleSkeleton />
                : <InfiniteScroll
                    className="relative w-full flex flex-row flex-wrap gap-5 justify-center items-start"
                    dataLength={data.results.length}
                    next={fetchMore}
                    hasMore={hasMore}
                    loader={<div className="w-64 aspect-[3/4] rounded-lg bg-slate-900 animate-pulse"></div>}
                    endMessage={<p className="w-full pt-6 lg:text-lg text-center">Você já viu tudo</p>}
                >
                    {data.results.map(e => <PCard data={e} key={'person' + e.id} />)}
                </InfiniteScroll>
            }
        </div>
    )
}

export default People;
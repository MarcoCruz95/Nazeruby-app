import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../Hook/useFetch.js';
import useUpdateNavBtn from '../Hook/useUpdateNavBtn.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircleRating from '../CanvasComponents/circleRating.js';
import RateIt from '../Components/RateIt.js';
import { GET, postAction } from '../API/APIconfig.js';
import { ReactComponent as Minus } from '../Icons/circle-minus.svg';
import prettyDate from '../Functions/prettyDate.js';



const gen = {
    '12': 'Aventura',
    '14': 'Fantasia',
    '16': 'Animação',
    '18': 'Drama',
    '27': 'Terror',
    '28': 'Ação',
    '35': 'Comédia',
    '36': 'História',
    '37': 'Faroeste',
    '53': 'Suspense',
    '80': 'Crime',
    '99': 'Documentário',
    '878': 'Ficção científica',
    '9648': 'Mistério',
    '10402': 'Música',
    '10749': 'Romance',
    '10751': 'Família',
    '10752': 'Guerra',
    '10759': 'Ação e Aventura',
    '10762': 'Infanti',
    '10763': 'Notícias',
    '10764': 'Reality Shows',
    '10765': 'Ficção e Fantasia',
    '10766': 'Novelas',
    '10767': 'Talk Show',
    '10768': 'Guerra e Política',
    '10770': 'Cinema tv'
}
const Skeleton = () => {
    return (
        <div className='w-full flex flex-col px-6 py-5 sm:px-10 gap-5 bg-transparent'>
            <div className='w-full h-44 md:h-56 rounded-lg bg-slate-900 animate-pulse'></div>
            <div className='w-full h-44 md:h-56 rounded-lg bg-slate-900 animate-pulse'></div>
            <div className='w-full h-44 md:h-56 rounded-lg bg-slate-900 animate-pulse'></div>
        </div>
    )
}
const ListItem = ({ data, mediaType, sessionId }) => {
    const [display, setDisplay] = useState(true);
    const navigate = useNavigate();
    const navigateToDetail = () => {
        navigate(`/detail/${mediaType}/${data.id}`)
    }
    const handleClickMinus = () => {
        setDisplay(false);
        const POST = postAction(JSON.stringify({media_type: mediaType, media_id: data.id, favorite: false}));
        fetch(`https://api.themoviedb.org/3/account/account_id/favorite?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`, POST)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
    return (
        <>
            {display && <div className='w-full h-40 md:h-56 rounded-lg grid-container-2 border border-slate-900 shadow-lg shadow-black'>
                <img src={`https://image.tmdb.org/t/p/w185${data.poster_path}`} loading='lazy' className='h-40 md:h-56 w-auto object-cover rounded-lg cursor-pointer ' onClick={navigateToDetail} />
                <div className='w-full flex flex-col gap-[2px] md:gap-2 px-2 py-2 sm:px-5'>
                    <div className='flex flex-row gap-3'>
                        <CircleRating rate={data.vote_average} size={'52px'} />
                        <div className='flex flex-col gap-0 items-start justify-start cursor-pointer' onClick={navigateToDetail}>
                            <p className='text-base md:text-lg font-bold line-clamp-2 text-ellipsis'>{data.title || data.name}</p>
                            <p className='text-sm md:text-base text-stone-500'>{prettyDate(data.release_date) || prettyDate(data.first_air_date)}</p>
                        </div>
                    </div>
                    <div className='hidden md:flex flex-row flex-wrap justify-start items-start gap-1 py-1'>
                        {data.genre_ids?.map(id => <p key={'genre#' + id} className="text-sm bg-stone-300 opacity-70 text-black px-1 rounded-md max-w-20 md:max-w-none text-start text-ellipsis text-nowrap overflow-hidden">{gen[id]}</p>)}
                    </div>
                    <p className='text-justify text-sm md:text-base w-full line-clamp-3 h-[60px] md:h-[72px] text-ellipsis'>{data.overview}</p>
                    <div className='w-auto h-7 flex flex-row gap-2 justify-start items-center'>
                        <RateIt mediaType={mediaType} id={data.id} />
                        <p className='font-bold text-nowrap text-base md:text-lg opacity-75'>Avaliar!</p>
                        <div className='w-1 sm:w-6 lg:w-12'></div>
                        <button className='w-auto h-auto' onClick={handleClickMinus} title='Remover dos favoritos'><Minus className='w-7 h-7 cursor-pointer fill-white opacity-75 hover:opacity-100 hover:scale-110 duration-300'/></button>
                        <p className='font-bold text-nowrap text-base md:text-lg opacity-75'>Remover</p>
                    </div>
                </div>
            </div>}
        </>
    )
}
const Favorite = () => {
    useUpdateNavBtn('favorite');
    const navigate = useNavigate();
    const sessionId = useSelector(store => store.sessionId);
    const [mediaType, setMediaType] = useState('movies');
    const [data, loading, setData] = useFetch(`https://api.themoviedb.org/3/account/account_id/favorite/${mediaType}?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1&session_id=${sessionId}&sort_by=created_at.desc`)
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        if(sessionId === ''){navigate('/home')}
    }, [sessionId]);
    const fetchMore = () => {
        let page = data.page + 1;
        if (page < data.total_pages) {
            fetch(`https://api.themoviedb.org/3/account/account_id/favorite/${mediaType}?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=${page}&session_id=${sessionId}&sort_by=created_at.desc`, GET)
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
                .catch(err => console.error(err));
        }
        else { setHasMore(false) }
    }
    const handleClickBtn = (btn) => {
        setMediaType(btn)
    }
    return (
        <div className='relative w-full flex flex-col gap-5 py-6 sm:py-10'>
            <div className='w-full px-6 sm:px-10 flex flex-row justify-start items-center gap-3 md:gap-5 flex-wrap'>
                <p className='text-2xl font-bold'>Seus favoritos:</p>
                <div className='flex flex-row w-fit h-auto gap-0 rounded-lg border border-white'>
                    <button className='px-5 py-2 rounded-lg' style={mediaType === 'movies' ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: 'transparent', color: 'white' }} onClick={() => handleClickBtn('movies')}>Filmes</button>
                    <button className='px-5 py-2 rounded-lg' style={mediaType === 'tv' ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: 'transparent', color: 'white' }} onClick={() => handleClickBtn('tv')}>Séries</button>
                </div>
            </div>
            {loading
                ? <Skeleton />
                : data.results.length !== 0
                    ? <InfiniteScroll
                        dataLength={data.results.length}
                        hasMore={hasMore}
                        next={fetchMore}
                        loader={<div className='w-full h-44 md:h-56 rounded-lg bg-slate-900 animate-pulse'></div>}
                        endMessage={<p className="w-full pt-6 lg:text-lg text-center">Você já viu tudo!</p>}
                        className='w-full flex flex-col gap-5 px-2 sm:px-8 pt-5 pb-16 xl:px-12'
                    >
                        {data.results.map(e => <ListItem data={e} mediaType={mediaType === 'movies' ? 'movie' : 'tv'} sessionId={sessionId} key={'listItem#' + e.id} />)}
                    </InfiniteScroll>
                    : <div className="w-full pt-10 flex justify-center items-center"><p className="w-auto rounded-lg text-center p-5 bg-neutral-800">Nada foi encontrado!</p></div>
            }
        </div>
    )
}

export default Favorite;
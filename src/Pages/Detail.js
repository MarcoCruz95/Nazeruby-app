import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Play } from '../Icons/play.svg';
import { ReactComponent as Favorite } from '../Icons/favorite.svg';
import { ReactComponent as Noposter } from '../Icons/no_poster.svg';
import { postAction } from "../API/APIconfig.js";
import useFetch from "../Hook/useFetch.js";
import CircleRating from "../CanvasComponents/circleRating.js";
import RowPeople from "../Components/RowPeople.js";
import RowCard from "../Components/RowCard.js";
import Review from "../Components/Review.js";
import RowVideo from "../Components/RowVideo.js";
import RateIt from "../Components/RateIt.js";
import useUpdateNavBtn from "../Hook/useUpdateNavBtn.js";
import prettyDate from "../Functions/prettyDate.js";



const BannerSkeleton = () => {
    return (
        <div className="h-auto w-auto">
            <div className="relative h-auto w-auto flex flex-col gap-5 md:gap-10 justify-start items-center p-10 lg:pl-[10%] md:flex-row md:items-start">
                <div className="rounded-xl relative w-full md:w-[360px] bg-slate-900 aspect-[2/3] animate-pulse"></div>
                <div className="relative h-full lg:w-[50%] flex flex-col justify-center gap-3 py-3">
                    <div className="h-9 w-40 rounded-full bg-slate-900 animate-pulse"></div>
                    <div className="flex flex-row flex-wrap gap-2 py-2">
                        <div className="w-16 h-7 rounded-md bg-slate-900 animate-pulse"></div>
                        <div className="w-16 h-7 rounded-md bg-slate-900 animate-pulse"></div>
                    </div>
                    <div className="h-8 w-48 rounded-full bg-slate-900 animate-pulse"></div>
                    <div className="w-full h-6 rounded-full bg-slate-900 animate-pulse"></div>
                    <div className="w-full h-6 rounded-full bg-slate-900 animate-pulse"></div>
                    <div className="w-full h-6 rounded-full bg-slate-900 animate-pulse"></div>
                    <div className="w-full h-6 rounded-full bg-slate-900 animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}
const Detail = () => {
    useUpdateNavBtn('');
    const { mediaType, id } = useParams();
    const [data, loading] = useFetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`);
    const [credit, creditLoad] = useFetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`);
    const [similar, similarLoad] = useFetch(`https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`);
    const [recommned, recommnedLoad] = useFetch(`https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`);
    const [review, reviewLoad] = useFetch(`https://api.themoviedb.org/3/${mediaType}/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`);
    const [video, videoLoad] = useFetch(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`);

    const [cast, setCast] = useState();
    const [pro, setPro] = useState({});
    const [ytVideoUrl, setYtVideoUrl] = useState('');

    const detail = useRef();
    const playVideoScreen = useRef();
    const addToFavoriteTooltip = useRef();

    const sessionId = useSelector((store) => store.sessionId);

    useEffect(() => {
        if (!creditLoad && credit.crew) {
            setCast(credit.cast);
            let Director = [];
            let Writer = [];
            for (let x of credit.crew) {
                if (x.job === 'Director' || x.job === 'Creator') {
                    Director.push(x.name);
                }
                if ((x.job === 'Writer' || x.job === 'Story' || x.job === 'Screenplay') && !Writer.includes(x.name)) {
                    Writer.push(x.name);
                }
            }
            setPro({ director: Director, writer: Writer });
        }
    }, [credit]);

    const handlePlayVideo = (videoKey) => {
        if (playVideoScreen.current.classList.contains('hidden')) {
            detail.current.classList.toggle('blur-md');
            playVideoScreen.current.classList.toggle('hidden');
            playVideoScreen.current.classList.toggle('flex');
            setYtVideoUrl(`https://www.youtube.com/embed/${videoKey}?autoplay=1`);
        }
    }
    const handleClickOutsideVideo = () => {
        if (playVideoScreen.current.classList.contains('flex')) {
            detail.current.classList.toggle('blur-md');
            playVideoScreen.current.classList.toggle('hidden');
            playVideoScreen.current.classList.toggle('flex');
            setYtVideoUrl('');
        }
    }
    const handleClickAddFavorite = () => {
        if (sessionId === '') { addToFavoriteTooltip.current.textContent = 'Você tem que fazer o login!' }
        else {
            addToFavoriteTooltip.current.textContent = 'Adicionado aos favoritos!';
            const POST = postAction(JSON.stringify({ media_type: mediaType, media_id: id, favorite: true }));
            fetch(`https://api.themoviedb.org/3/account/account_id/favorite?session_id=${sessionId}`, POST)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));
        }
        addToFavoriteTooltip.current.style.display = 'block';
        setTimeout(() => { addToFavoriteTooltip.current.style.display = 'none' }, 1200);
    }

    return (
        <div className="relative w-full h-auto">
            <div ref={detail} className="relative w-full h-auto flex flex-col">
                {!loading ? <div className="relative h-auto w-auto">
                    {data.backdrop_path && <img src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`} className="absolute top-0 left-0 h-full w-full object-cover" />}
                    <div className="absolute top-0 left-0 h-2/3 w-full bg-movie-theater bg-opacity-75"></div>
                    <div className="absolute top-2/3 left-0 h-1/3 w-full bg-gradient-to-b from-[rgba(6,9,14,0.75)] to-[rgba(6,9,14,1)]"></div>
                    <div className="relative h-auto w-auto flex flex-col gap-5 md:gap-10 justify-start items-center p-10 xl:pl-[10%] md:flex-row md:items-start">
                        {data.poster_path ? <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} className="rounded-xl relative w-full h-auto md:w-[360px]" /> : <div className="rounded-xl relative w-full h-full md:w-[360px] bg-slate-900 aspect-[2/3] flex flex-col justify-center items-center"><Noposter height='96px' width='96px' /><p className="text-center text-sm md:text-base">Nenhum poster disponível</p></div>}
                        <div className="relative h-full lg:max-w-[50%] flex flex-col justify-center overflow-x-hidden">
                            <p className="text-2xl lg:text-3xl"><span className="font-bold">{data.title || data.name}</span><span> ({data.release_date ? data.release_date.slice(0, 4) : data.last_air_date?.slice(0, 4)})</span></p>
                            <p className="italic">{data.tagline}</p>
                            {data.genres && <div className="flex flex-row flex-wrap gap-2 py-2">{data.genres.map(gen => <p key={gen.id} className="text-sm text-black bg-stone-300 bg-opacity-50 rounded-md px-2 py-1 flex-shrink-0">{gen.name}</p>)}</div>}
                            <div className="relative w-auto h-auto flex flex-row gap-5 items-center">
                                <CircleRating rate={data.vote_average} size={'64px'} key={mediaType + id} />
                                {video && video.results?.length !== 0 && <button className="w-10 h-auto opacity-70 flex flex-row gap-2 justify-start items-center overflow-hidden hover:opacity-100 sm:hover:w-44 duration-500" onClick={() => handlePlayVideo(video.results[0]?.key)}><Play className='fill-white h-9 w-9 flex-shrink-0' /><span className="text-xl font-bold flex-shrink-0">Assistir trailer</span></button>}
                                <div className="relative w-auto h-auto flex flex-col justify-center items-center">
                                    <button className="opacity-70 hover:opacity-100 hover:scale-110 duration-500" title="Adicionar aos favoritos"><Favorite className='fill-white h-8 w-8' onClick={handleClickAddFavorite} /></button>
                                    <p ref={addToFavoriteTooltip} className="absolute top-10 bg-emerald-800 w-auto rounded-md z-10 text-nowrap p-2" style={{ display: 'none' }}>Adicionado aos favoritos!</p>
                                </div>
                                <RateIt mediaType={mediaType} id={id} />
                            </div>
                            <p className="text-xl lg:text-2xl font-bold">Descrição:</p>
                            <p className="text-justify">{data.overview}</p>
                            <br />
                            {mediaType === 'movie' && <div className="relative w-full flex flex-col justify-start">
                                <div className="relative w-full border-b border-stone-600 py-3 flex flex-row justify-start gap-10">
                                    {data.release_date && <p className="flex flex-wrap"><span className="font-bold">Data de lançamento:&nbsp;</span><span>{prettyDate(data.release_date)}</span></p>}
                                    {data.runtime && <p className="flex flex-wrap"><span className="font-bold">Duração:&nbsp;</span><span>{Math.floor(data.runtime / 60) + 'h ' + data.runtime % 60 + 'm'}</span></p>}
                                </div>
                                {pro.director && pro.director.length !== 0 && <p className="relative w-full border-b border-stone-600 py-3"><span className="font-bold">{'Diretor: '}</span><span>{pro.director.join(', ')}</span></p>}
                                {pro.writer && pro.writer.length !== 0 && <p className="relative w-full border-b border-stone-600 py-3"><span className="font-bold">Escritor: </span><span>{pro.writer.join(', ')}</span></p>}
                            </div>}
                            {mediaType === 'tv' && <div className="relative w-full flex flex-col justify-start">
                                {data.first_air_date && <p className="relative w-full border-b border-stone-600 py-3"><span className="font-bold">Primeira data de exibição:&nbsp;</span><span>{prettyDate(data.first_air_date)}</span></p>}
                                {data.last_air_date && <p className="relative w-full border-b border-stone-600 py-3"><span className="font-bold">Última data de exibição:&nbsp;</span><span>{prettyDate(data.last_air_date)}</span></p>}
                                {pro.director && pro.director.length !== 0 && <p className="relative w-full border-b border-stone-600 py-3"><span className="font-bold">{'Criador: '}</span><span>{pro.director.join(', ')}</span></p>}
                            </div>}
                        </div>
                    </div>
                </div> : <BannerSkeleton />}
                <div className="relative w-full flex flex-col justify-start items-start gap-2 px-10 md:px-12">
                    {cast && cast.length !== 0 && <RowPeople data={cast} loading={creditLoad} />}
                    {video && <RowVideo data={video} loading={videoLoad} handlePlayVideo={handlePlayVideo} />}
                    {review && review.results?.length !== 0 && <div className="relative w-full h-auto flex flex-col py-5">
                        <p className="text-xl md:text-2xl font-bold">Reviews</p>
                        <Review data={review} loading={reviewLoad} />
                    </div>}
                    <RowCard title={'Recomendações'} data={recommned} loading={recommnedLoad} btnState={mediaType} />
                    <RowCard title={'Similares'} data={similar} loading={similarLoad} btnState={mediaType} />
                </div>
            </div>
            <div ref={playVideoScreen} className='fixed left-0 top-0 z-50 w-full h-screen bg-black bg-opacity-50 hidden justify-center items-center' onClick={handleClickOutsideVideo}>
                <iframe width="640" height="360" allow="autoplay"
                    src={ytVideoUrl}>
                </iframe>
            </div>
        </div>
    )
}


export default Detail;
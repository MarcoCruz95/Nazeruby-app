import { useNavigate } from "react-router-dom";
import { ReactComponent as Noposter } from '../Icons/no_poster.svg';
import CircleRating from "../CanvasComponents/circleRating.js"
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
    '10402': 'Musica',
    '10749': 'Romance',
    '10751': 'Família',
    '10752': 'Guerra',
    '10759': 'Ação e Aventura',
    '10762': 'Infantil',
    '10763': 'Notícias',
    '10764': 'Reality',
    '10765': 'Ficção e Fantasia',
    '10766': 'Novelas',
    '10767': 'Talk show',
    '10768': 'Guerra e Política',
    '10770': 'Cinema Tv'
}

const Card = ({ data, mediaType }) => {
    const navigate = useNavigate();
    const handleClickCard = () => {
        navigate(`/detail/${mediaType}/${data.id}`);
    }
    
    return (
        <div className='relative w-32 md:w-48 h-auto flex flex-col flex-shrink-0 hover:animate-pulse cursor-pointer' onClick={handleClickCard}>
            {data.poster_path
                ? <img src={`https://image.tmdb.org/t/p/w300${data.poster_path}`} className="rounded-lg  h-48 md:h-72 object-cover" loading="lazy"></img>
                : <div className="w-full h-48 md:h-72 bg-slate-800 rounded-lg flex flex-col justify-center items-center"><Noposter height='96px' width='96px' /><p className="text-center text-sm md:text-base">Nenhum poster disponível</p></div>}
            <div className="relative h-auto w-full flex flex-col text-sm md:text-base pt-8">
                <p className="font-bold">{data.title || data.name}</p>
                <p className="text-stone-500">{prettyDate(data.release_date) || prettyDate(data.first_air_date)}</p>
            </div>
            <div className="absolute top-[168px] md:top-[264px] left-0 h-auto w-full px-0 md:px-1 flex flex-row justify-between items-start">
                <div className="scale-75 md:scale-100"><CircleRating rate={data.vote_average} size={'48px'} /></div>
                <div className="flex flex-row justify-end flex-wrap gap-1 py-1 max-h-[52px] overflow-hidden">
                    {data.genre_ids?.map(id => <p key={id} className="text-sm bg-stone-300 opacity-70 text-black px-1 rounded-md max-w-20 md:max-w-none text-center text-ellipsis text-nowrap overflow-hidden">{gen[id]}</p>)}
                </div>
            </div>
        </div>
    )
}

export default Card;
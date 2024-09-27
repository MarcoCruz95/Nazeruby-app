import { useParams } from "react-router-dom";
import useUpdateNavBtn from "../Hook/useUpdateNavBtn";
import useFetch from "../Hook/useFetch";
import { ReactComponent as Instagram} from '../Icons/instagram.svg';
import { ReactComponent as Facebook} from '../Icons/facebook.svg';
import { ReactComponent as Twitter} from '../Icons/x-twitter.svg';
import { ReactComponent as Tiktok} from '../Icons/tiktok.svg';
import { ReactComponent as Nobody_guy } from '../Icons/nobody_guy.svg';
import { ReactComponent as Nobody_girl } from '../Icons/nobody_girl.svg';
import prettyDate from "../Functions/prettyDate";



const Person = () => {
    useUpdateNavBtn('');
    const { id } = useParams();
    const [data, loading] = useFetch(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`);
    const [social] = useFetch(`https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`);

    return (
        <div className="relative w-full">
            {!loading && <div className="relative w-full flex flex-col gap-3 p-10 lg:px-[10%]">
                <div className="relative w-full h-auto flex flex-col items-start gap-3 sm:flex-row justify-start sm:gap-5 md:gap-8">
                    {data.profile_path?<img src={`https://image.tmdb.org/t/p/w300/${data.profile_path}`} className="aspect-[2/3] object-cover h-auto w-full sm:w-64
                     rounded-lg" />:data.gender===1?<Nobody_girl className="aspect-[2/3] object-cover h-auto w-full sm:w-64
                     rounded-lg bg-slate-900"/>:<Nobody_guy className="aspect-[2/3] object-cover h-auto w-full sm:w-64
                     rounded-lg bg-slate-900"/>}
                    <div className="flex flex-col items-start h-auto overflow-hidden">
                        <p className="px-3 text-2xl md:text-3xl font-bold">{data.name}</p>
                        {social && (social.facebook_id || social.twitter_id || social.instagram_id || social.tiktok_id) && <div className="flex flex-row h-16 justify-start p-3 gap-3">
                            {social.facebook_id && <a href={`https://www.facebook.com/${social.facebook_id}`} target="_blank" rel='noopener noreferrer'><Facebook className='w-8 h-8 fill-white hover:scale-125 duration-300'/></a>}
                            {social.twitter_id && <a href={`https://twitter.com/${social.twitter_id}`} target="_blank" rel='noopener noreferrer'><Twitter className='w-8 h-8 fill-white hover:scale-125 duration-300'/></a>}
                            {social.instagram_id && <a href={`https://www.instagram.com/${social.instagram_id}`} target="_blank" rel='noopener noreferrer'><Instagram className='w-8 h-8 fill-white hover:scale-125 duration-300'/></a>}
                            {social.tiktok_id && <a href={`https://www.tiktok.com/@${social.tiktok_id}`} target="_blank" rel='noopener noreferrer'><Tiktok className='w-8 h-8 fill-white hover:scale-125 duration-300'/></a>}
                        </div>}
                        <p className="px-3 text-stone-300 text-lg"><span className="font-bold">Gênero: </span><span>{data.gender === 1 ? 'Feminino' : 'Masculino'}</span></p>
                        <p className="px-3 text-stone-300 text-lg"><span className="font-bold">Data de nascimento: </span><span>{prettyDate(data.birthday ? data.birthday : '-')}</span></p>
                        <p className="px-3 text-stone-300 text-lg"><span className="font-bold">Local do nascimento: </span><span>{data.place_of_birth ? data.place_of_birth : '-'}</span></p>
                    </div>
                </div>
                <p className="text-justify text-stone-300">{data.biography}</p>
            </div>}
        </div>
    )
}

export default Person;
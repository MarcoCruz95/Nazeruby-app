import { useEffect, useRef, useState } from 'react';
import { ReactComponent as Left } from '../Icons/arrow-left.svg';
import { ReactComponent as Right } from '../Icons/arrow-right.svg';
import { ReactComponent as Nobody_guy } from '../Icons/nobody_guy.svg';
import { ReactComponent as Nobody_girl } from '../Icons/nobody_girl.svg';
import { useNavigate } from 'react-router-dom';



const CastSkeleton = () => {
    return (
        <div className='w-full flex flex-row gap-5 py-5'>
            <div className='w-36 h-40 rounded-lg bg-slate-900 animate-pulse flex-shrink-0'></div>
            <div className='w-36 h-40 rounded-lg bg-slate-900 animate-pulse flex-shrink-0'></div>
            <div className='w-36 h-40 rounded-lg bg-slate-900 animate-pulse flex-shrink-0'></div>
            <div className='w-36 h-40 rounded-lg bg-slate-900 animate-pulse flex-shrink-0'></div>
            <div className='w-36 h-40 rounded-lg bg-slate-900 animate-pulse flex-shrink-0'></div>
            <div className='w-36 h-40 rounded-lg bg-slate-900 animate-pulse flex-shrink-0'></div>
            <div className='w-36 h-40 rounded-lg bg-slate-900 animate-pulse flex-shrink-0'></div>
            <div className='w-36 h-40 rounded-lg bg-slate-900 animate-pulse flex-shrink-0'></div>
            <div className='w-36 h-40 rounded-lg bg-slate-900 animate-pulse flex-shrink-0'></div>
        </div>
    )
}
const CardPeople = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div className="relative h-auto w-24 md:w-36 flex flex-col gap-3 justify-center items-center flex-shrink-0 cursor-pointer" onClick={() => navigate(`/person/${data.id}`)}>
            {data.profile_path 
            ? <img className="rounded-xl w-full h-32 md:h-40 object-cover object-center" src={`https://image.tmdb.org/t/p/w185${data.profile_path}`} loading="lazy" /> 
            : data.gender===1 ? <Nobody_girl className='w-full h-32 md:h-40 bg-slate-800 rounded-md'/> : <Nobody_guy className='w-full h-32 md:h-40 bg-slate-800 rounded-md'/>}
            <div className="relative w-full h-auto flex flex-col justify-start items-center">
                <p className="font-bold text-center">{data.original_name}</p>
                <p className="text-stone-500 text-center">{data.character}</p>
            </div>
        </div>
    )
}

const RowPeople = ({ data, loading }) => {
    const ref = useRef();
    const [isPeopleOverflow, setPeopleOverflow] = useState(false);
    useEffect(() => {
        if (ref.current?.clientWidth < ref.current?.scrollWidth){
            setPeopleOverflow(true);
        }
        else {setPeopleOverflow(false);}
    }, [data]);
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };
    return (
        <div className='relative w-full'>
            {loading ? <CastSkeleton /> : <div className="relative w-full h-auto py-3 flex flex-col justify-start gap-5">
                <p className="text-2xl font-bold">Elenco</p>
                <div ref={ref} className="relative h-auto w-full flex flex-row gap-3 md:gap-5 overflow-auto scroll-smooth justify-start items-start">
                    {data?.map((ele, index) => index < 16 && <CardPeople data={ele} key={ele.credit_id} />)}
                </div>
                {isPeopleOverflow && <button className="absolute top-[118px] md:top-32 left-0 md:left-0 h-6 w-6 md:h-8 md:w-8 rounded-full bg-neutral-900 text-white flex justify-center items-center font-bold opacity-45 hover:opacity-90 transition ease-in duration-300" onClick={() => scroll(-540)}><Left fill='#ffffff' height='16px' width='16px' /></button>}
                {isPeopleOverflow && <button className="absolute top-[118px] md:top-32 right-0 md:right-0 h-6 w-6 md:h-8 md:w-8 rounded-full bg-neutral-900 text-white flex justify-center items-center font-bold opacity-45 hover:opacity-90 transition ease-in duration-300" onClick={() => scroll(540)}><Right fill='#ffffff' height='16px' width='16px' /></button>}
            </div>}
        </div>
    )
}


export default RowPeople;
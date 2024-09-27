import { useEffect, useRef, useState } from 'react';
import Card from './Card.js';
import { ReactComponent as Left } from '../Icons/arrow-left.svg';
import { ReactComponent as Right } from '../Icons/arrow-right.svg';



const RowSkeleton = () => {
    return (
        <div className='relative p-6 flex flex-col gap-2 md:gap-5 h-auto w-auto bg-movie-theater'>
            <div className='relative flex flex-row justify-between lg:justify-start lg:gap-5'>
                <div className='animate-pulse relative h-8 w-48 rounded-full bg-slate-900'></div>
                <div className='animate-pulse relative h-8 w-48 rounded-xl bg-slate-900'></div>
            </div>
            <div className='relative h-auto w-full flex flex-row gap-3 md:gap-5 overflow-auto'>
                <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
                <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
                <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
                <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
                <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
                <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
                <div className='animate-pulse relative w-32 md:w-48 h-56 md:h-80 rounded-lg bg-slate-900 flex flex-col flex-shrink-0'></div>
            </div>
        </div>
    )
}

const RowCard = ({ btnState, handleClickStateBtn, title, btnName1, btnName2, data, loading }) => {
    const ref = useRef();
    const [isRowOverflow, setRowOverflow] = useState(false);
    useEffect(() => {
        if (ref.current?.clientWidth < ref.current?.scrollWidth){
            setRowOverflow(true);
        }
        else{setRowOverflow(false);}
    }, [data]);
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };
    return (
        <div className='relative w-full'>
            {(loading===false || loading===null && data.results?.length!==0 ) ? <div className='relative py-2 flex flex-col gap-2 h-auto w-full'>
                <h1 className='text-xl font-bold md:text-2xl'>{title}</h1>
                {data.results?.length!==0?<div ref={ref} className='relative h-auto w-full flex flex-row gap-3 justify-start items-start md:gap-5 overflow-auto scroll-smooth'>
                    {data.results?.map(cardData => <Card key={title + cardData.id} data={cardData} mediaType={cardData.media_type ? cardData.media_type : btnState}/>)}
                </div>:<p>Não disponível!</p>}
                {btnName1 && <div className='absolute h-8 w-auto top-[6px] right-0 2xl:right-auto 2xl:left-64 flex flex-row justify-start border border-neutral-100 rounded-lg text-sm'>
                    <button className={(btnState === 'day' || btnState === 'movie') ? 'py-1 px-3 md:px-5 rounded-lg bg-neutral-100 text-black' : 'py-1 px-3 md:px-5 rounded-lg bg-transparent text-white hover:bg-stone-800'} onClick={handleClickStateBtn}>{btnName1}</button>
                    <button className={(btnState === 'week' || btnState === 'tv') ? 'py-1 px-3 md:px-5 rounded-lg bg-neutral-100 text-black' : 'py-1 px-3 md:px-5 rounded-lg bg-transparent text-white hover:bg-stone-800'} onClick={handleClickStateBtn}>{btnName2}</button>
                </div>}
                {isRowOverflow && <button className="absolute top-32 md:top-44 left-0 h-6 w-6 md:h-8 md:w-8 rounded-full bg-neutral-900 text-white flex justify-center items-center font-bold opacity-45 hover:opacity-90 transition ease-in duration-300" onClick={() => scroll(-540)}><Left fill='#ffffff' height='16px' width='16px' /></button>}
                {isRowOverflow && <button className="absolute top-32 md:top-44 right-0 h-6 w-6 md:h-8 md:w-8 rounded-full bg-neutral-900 text-white flex justify-center items-center font-bold opacity-45 hover:opacity-90 transition ease-in duration-300" onClick={() => scroll(540)}><Right fill='#ffffff' height='16px' width='16px' /></button>}
            </div>
            : <RowSkeleton />}
        </div>
    )
}

export default RowCard;
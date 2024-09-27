import { useEffect, useRef, useState } from 'react';
import { ReactComponent as Play } from '../Icons/play.svg';
import { ReactComponent as Left } from '../Icons/arrow-left.svg';
import { ReactComponent as Right } from '../Icons/arrow-right.svg';



const TrailerSkeleton = () => {
    return (
        <div className='flex flex-col gap-3'>
            <div className='animate-pulse w-48 h-10 rounded-full bg-slate-900'></div>
            <div className='w-full h-auto flex flex-row gap-3 md:gap-5'>
                <div className='w-96 h-48 rounded-lg animate-pulse bg-slate-900 flex-shrink-0'></div>
                <div className='w-96 h-48 rounded-lg animate-pulse bg-slate-900 flex-shrink-0'></div>
                <div className='w-96 h-48 rounded-lg animate-pulse bg-slate-900 flex-shrink-0'></div>
                <div className='w-96 h-48 rounded-lg animate-pulse bg-slate-900 flex-shrink-0'></div>
            </div>
        </div>
    )
}
const Video = ({ id, handlePlayVideo }) => {
    return (
        <div className='relative flex-shrink-0 hover:brightness-75 cursor-pointer' onClick={() => handlePlayVideo(id)}>
            <img className="rounded-xl h-48 w-[342px] object-contain" src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} loading='lazy' onClick={handlePlayVideo}/>
            <div className='absolute top-0 left-0 w-[342px] h-48 flex justify-center items-center'>
                <Play className='w-12 h-12 fill-white opacity-75 hover:animate-ping' />
            </div>
        </div>
    )
}
const RowVideo = ({ data, loading, handlePlayVideo }) => {
    const ref = useRef();
    const [isVideoOverflow, setVideoOverflow] = useState(false);
    useEffect(() => {
        if (ref.current?.clientWidth < ref.current?.scrollWidth) {
            setVideoOverflow(true);
        }
        else { setVideoOverflow(false); }
    }, [data.results]);

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };
    return (
        <div className='relative w-full'>
            {loading ? <TrailerSkeleton /> : <div className="relative w-full h-auto flex flex-col items-start gap-2">
                <p className="text-xl md:text-2xl font-bold">Trailers</p>
                {data.results?.length !== 0 ? <div ref={ref} className="relative w-full h-auto flex flex-row gap-3 md:gap-5 justify-start overflow-auto scroll-smooth">
                    {data.results?.map(x => <Video id={x.key} key={x.id} handlePlayVideo={handlePlayVideo}/>)}
                </div> : <p>Não disponível!</p>}
                {isVideoOverflow && <button className="absolute top-32 left-0 h-6 w-6 md:h-8 md:w-8 rounded-full bg-neutral-900 text-white flex justify-center items-center font-bold opacity-45 hover:opacity-90 transition ease-in duration-300" onClick={() => scroll(-540)}><Left fill='#ffffff' height='16px' width='16px' /></button>}
                {isVideoOverflow && <button className="absolute top-32 right-0 h-6 w-6 md:h-8 md:w-8 rounded-full bg-neutral-900 text-white flex justify-center items-center font-bold opacity-45 hover:opacity-90 transition ease-in duration-300" onClick={() => scroll(540)}><Right fill='#ffffff' height='16px' width='16px' /></button>}
            </div>}
        </div>
    )
}

export default RowVideo;
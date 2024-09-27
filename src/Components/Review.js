import { useEffect, useRef, useState } from "react";
import prettyDate from "../Functions/prettyDate";


const ReviewSkeleton = () => {
    return (
        <div className="w-full flex flex-col gap-3 p-5 rounded-lg bg-slate-900">
            <div className="w-44 rounded-full h-7 bg-slate-800 animate-pulse"></div>
            <div className="w-44 rounded-full h-5 bg-slate-800 animate-pulse"></div>
            <div className="w-full rounded-lg h-80 bg-slate-800 animate-pulse"></div>
        </div>
    )
}

const ReviewTag = ({ data }) => {
    return (
        <div className="relative w-full h-auto rounded-xl bg-slate-900 flex flex-col items-start gap-3 p-5">
            <span className="relative flex flex-col">
                <p className="font-bold text-xl">{data.author}</p>
                <p className="text-stone-500 text-sm">{prettyDate(data.updated_at.slice(0, 10)) || prettyDate(data.created_at.slice(0, 10))}</p>
            </span>
            <p className="text-justify">{data.content}</p>
        </div>
    )
}

const Review = ({ data, loading }) => {
    const [btn, setBtn] = useState('Mostre mais');
    const review = useRef();
    const fadedFoot = useRef();
    const [isOverflow, setOverflow] = useState();

    useEffect(() => {
        if (btn === 'Mostre menos') {
            setBtn('Mostre mais');
        }
        if (!review.current?.classList.contains('max-h-96')){
            review.current.classList.toggle('max-h-96');
            fadedFoot.current?.classList.toggle('bg-gradient-to-t');
        }
        setOverflow(review.current?.scrollHeight > 384 ? true : false);
    }, [data]);

    const handleClickBtn = () => {
        btn === 'Mostre mais' ? setBtn('Mostre menos') : setBtn('Mostre mais');
        review.current.classList.toggle('max-h-96');
        fadedFoot.current.classList.toggle('bg-gradient-to-t');
    }
    return (
        <div>
            {loading ? <ReviewSkeleton /> : <div ref={review} className="relative h-auto w-full max-h-96 overflow-hidden">
                <div className="relative w-full h-auto py-3 flex flex-col gap-3">
                    {data.results?.map(com => <ReviewTag data={com} key={com.id} />)}
                </div>
                {isOverflow && <div ref={fadedFoot} className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[rgba(6,9,14,1)] flex flex-row items-end justify-center">
                    <button className="h-8 w-32 bg-slate-600 rounded-full" onClick={handleClickBtn}>{btn}</button>
                </div>}
            </div>}
        </div>
    )
}

export default Review;
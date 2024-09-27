import { useEffect, useRef, useState } from 'react'
import { ReactComponent as Star } from '../Icons/star-solid.svg'
import { useSelector } from 'react-redux';
import { postAction } from '../API/APIconfig';



const RateIt = ({ mediaType, id }) => {
    const sessionId = useSelector(store => store.sessionId);
    const [realRating, setRealRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const rateComponent = useRef();
    const rateBox = useRef();
    const toolTip = useRef();

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideRateBox);
        return () => document.removeEventListener('click', handleClickOutsideRateBox);
    })

    const handleClickOutsideRateBox = (e) => {
        if (rateBox.current && rateBox.current.style.display === 'flex' && !rateComponent.current.contains(e.target)) {
            rateBox.current.style.display = 'none';
        }
    }
    const handleClickRateButton = () => {
        if (sessionId !== '') {
            toolTip.current.textContent = 'Sua avaliação foi salva!';
            if (rateBox.current.style.display === 'none') {
                rateBox.current.style.display = 'flex';
            }
            else { rateBox.current.style.display = 'none'; }
        }
        else {
            toolTip.current.textContent = 'Você tem que fazer o login!';
            toolTip.current.style.display = 'block';
            setTimeout(() => {
                toolTip.current.style.display = 'none'
            }, 1200);
        }
    }
    const handleRate = (currentRating) => {
        setRealRating(currentRating);
        const POST = postAction(`{"value":${2 * currentRating}}`);
        fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/rating?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`, POST)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
        toolTip.current.style.display = 'block';
        rateBox.current.style.display = 'none';
        setTimeout(() => {
            toolTip.current.style.display = 'none';
        }, 1200)
    }

    return (
        <div ref={rateComponent} className="relative w-auto h-auto flex flex-col justify-center items-start">
            <button className="opacity-70 hover:opacity-100 hover:scale-110 duration-500" title="Avaliar!"><Star className='fill-white h-8 w-8' onClick={handleClickRateButton} /></button>
            <div ref={rateBox} className='absolute z-10 -right-16 xl:right-auto xl:-left-4 top-12 w-auto h-auto flex-row bg-emerald-800 p-3 rounded-md gap-1' style={{ display: 'none' }}>
                <div className="absolute left-24 xl:left-6 -top-2 w-4 h-4 rotate-45 bg-emerald-800"></div>
                {[...Array(5).fill(0)].map((e, i) => {
                    const currentRating = i + 1;
                    return (
                        <Star
                            key={'ratingStar#' + currentRating}
                            className='w-7 h-7 cursor-pointer'
                            fill={currentRating <= (hoverRating || realRating) ? '#ffc107' : '#e4e5e9'}
                            onMouseEnter={() => setHoverRating(currentRating)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => handleRate(currentRating)}
                        />
                    )
                })}
            </div>
            <p ref={toolTip} className='absolute text-nowrap -right-16 xl:right-auto xl:-left-4 top-10 z-10 p-2 bg-emerald-800 rounded-md' style={{ display: 'none' }}>Sua avaliação foi salva!</p>
        </div>
    )
}


export default RateIt;
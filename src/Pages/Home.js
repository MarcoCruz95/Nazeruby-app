import { useState } from 'react';
import useFetch from '../Hook/useFetch.js';
import RowCard from "../Components/RowCard.js";
import useUpdateNavBtn from '../Hook/useUpdateNavBtn.js';


const Home = () => {
    useUpdateNavBtn('home');

    const [kDramaMediaType, setKDramaMediaType] = useState('movie');
    const [duration, setDuration] = useState('day');
    const [popularMediaType, setPopularMediaType] = useState('movie');

    const [kDramaUrl, setKDramaUrl] = useState(`https://api.themoviedb.org/3/discover/${kDramaMediaType}?api_key=${process.env.REACT_APP_API_KEY}&certification.lte=16&certification_country=BR&language=pt-BR&page=1&with_origin_country=KR`);
    const [trendingUrl, setTrendingUrl] = useState(`https://api.themoviedb.org/3/trending/all/${duration}?api_key=${process.env.REACT_APP_API_KEY}&certification.lte=16&certification_country=BR&language=pt-BR`);
    const [popularUrl, setPopularUrl] = useState(`https://api.themoviedb.org/3/${popularMediaType}/popular?api_key=${process.env.REACT_APP_API_KEY}&certification.lte=16&certification_country=BR&language=pt-BR&page=1`);

    const [kDrama, kDramaLoad] = useFetch(kDramaUrl);
    const [trending, trendingLoad] = useFetch(trendingUrl);
    const [popular, popularLoad] = useFetch(popularUrl);

    const handleClickKDramaMediaTypeBtn = () => {
        if (kDramaMediaType === 'movie') {
            setKDramaMediaType('tv');
            setKDramaUrl(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&certification.lte=16&certification_country=BR&language=pt-BR&page=1&with_origin_country=KR`);
        }
        else {
            setKDramaMediaType('movie');
            setKDramaUrl(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&certification.lte=16&certification_country=BR&language=pt-BR&page=1&with_origin_country=KR`);
        }
    }
    
    const handleClickDurationBtn = () => {
        if (duration === 'day') {
            setDuration('week');
            setTrendingUrl(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`);
        }
        else {
            setDuration('day');
            setTrendingUrl(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`)
        }
    }
    const handleClickPopularMediaTypeBtn = () => {
        if (popularMediaType === 'movie') {
            setPopularMediaType('tv');
            setPopularUrl(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`);
        }
        else {
            setPopularMediaType('movie');
            setPopularUrl(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`);
        }
    }

    return (
        <div className="relative w-full h-full flex flex-col px-6 sm:px-8 md:px-12 py-5">
            <RowCard btnState={kDramaMediaType} handleClickStateBtn={handleClickKDramaMediaTypeBtn} title={'Doramas'} btnName1={'Filme'} btnName2={'Série'} data={kDrama} loading={kDramaLoad} />
            <RowCard btnState={duration} handleClickStateBtn={handleClickDurationBtn} title={'Em alta'} btnName1={'Hoje'} btnName2={'Nesta semana'} data={trending} loading={trendingLoad} />
            <RowCard btnState={popularMediaType} handleClickStateBtn={handleClickPopularMediaTypeBtn} title={"Mais populares"} btnName1={'Filme'} btnName2={'Série'} data={popular} loading={popularLoad} /> 
        </div>
    )
}

export default Home;
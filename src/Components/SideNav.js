import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Home } from '../Icons/home.svg';
import { ReactComponent as Film } from '../Icons/film.svg';
import { ReactComponent as Tv } from '../Icons/tv.svg';
import { ReactComponent as People } from '../Icons/people.svg';
import { ReactComponent as User } from '../Icons/user.svg';
import { ReactComponent as Star } from '../Icons/star.svg';
import { ReactComponent as Heart } from '../Icons/heart.svg';
import { GET } from '../API/APIconfig';

const SideNav = () => {
  const navigate = useNavigate();
  const sessionId = useSelector(store => store.sessionId);
  const navBtn = useSelector(store => store.navBtn);
  const dispatch = useDispatch();
  const isFetchingToken = useSelector(store => store.isFetchingToken);
  const handleClickBtn = btn => {
    const sideNav = document.getElementById('sideNav');
    const fog = document.getElementById('fog');
    fog.style.display = 'none';
    if (sideNav.classList.contains('flex')) {
      sideNav.classList.toggle('hidden');
      sideNav.classList.toggle('flex');
    }
    navigate(`/${btn}`);
  };
  const handleClickSignIn = () => {
    if (!isFetchingToken) {
      dispatch({ type: 'isFetchingToken', payload: true });
      fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`, GET)
        .then(response => response.json())
        .then(token => {
          window.location.replace(`https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=https://nazeruby-doramas.vercel.app/`);
          dispatch({ type: 'isFetchingToken', payload: false });
        })
        .catch(err => console.error(err));
    }
  };
  return (
    <span
      id='sideNav'
      className='absolute top-14 left-0 w-60 h-screen p-3 bg-black hidden lg:flex flex-col overflow-auto'>
      <button
        className='relative h-12 w-full flex flex-row justify-start items-center rounded-lg px-3 flex-shrink-0'
        style={navBtn === 'home' ? { backgroundColor: 'rgb(68,64,60)' } : { backgroundColor: 'transparent' }}
        onClick={() => handleClickBtn('home')}>
        <Home fill={navBtn === 'home' ? '#ffffff' : '#A8A29E'} />
        <p
          className='pl-3 font-bold'
          style={navBtn === 'home' ? { color: 'white' } : { color: '#A8A29E' }}>
          Home
        </p>
      </button>
      <button
        className='relative h-12 w-full flex flex-row justify-start items-center rounded-lg px-3 flex-shrink-0'
        style={navBtn === 'movie' ? { backgroundColor: 'rgb(68,64,60)' } : { backgroundColor: 'transparent' }}
        onClick={() => handleClickBtn('movie')}>
        <Film fill={navBtn === 'movie' ? '#ffffff' : '#A8A29E'} />
        <p
          className='pl-3 font-bold'
          style={navBtn === 'movie' ? { color: 'white' } : { color: '#A8A29E' }}>
          Filmes
        </p>
      </button>
      <button
        className='relative h-12 w-full flex flex-row justify-start items-center rounded-lg px-3 flex-shrink-0'
        style={navBtn === 'tv' ? { backgroundColor: 'rgb(68,64,60)' } : { backgroundColor: 'transparent' }}
        onClick={() => handleClickBtn('tv')}>
        <Tv fill={navBtn === 'tv' ? '#ffffff' : '#A8A29E'} />
        <p
          className='pl-3 font-bold'
          style={navBtn === 'tv' ? { color: 'white' } : { color: '#A8A29E' }}>
          Séries
        </p>
      </button>
      <button
        className='relative h-12 w-full flex flex-row justify-start items-center rounded-lg px-3 flex-shrink-0'
        style={navBtn === 'people' ? { backgroundColor: 'rgb(68,64,60)' } : { backgroundColor: 'transparent' }}
        onClick={() => handleClickBtn('people')}>
        <People fill={navBtn === 'people' ? '#ffffff' : '#A8A29E'} />
        <p
          className='pl-3 font-bold'
          style={navBtn === 'people' ? { color: 'white' } : { color: '#A8A29E' }}>
          Pessoas
        </p>
      </button>
      <div className='border-b border-stone-600 relative w-full h-6 flex-shrink-0'></div>
      <div className='relative w-full h-6 flex-shrink-0'></div>
      {sessionId === '' ? (
        <div className='relative flex flex-col gap-2 px-3 w-full flex-shrink-0'>
          <p className='text-stone-300'>Inscreva-se para avaliar seus filmes e séries (é 10 reais)</p>
          <button
            className='relative h-10 w-fit px-3 flex flex-row gap-2 items-center rounded-full border border-amber-300 hover:bg-stone-700 cursor-pointer'
            onClick={handleClickSignIn}
            title='Sign in with your themoviedb account'>
            <User
              fill='#FCD34D'
              title='Sign in'
            />
            <p className='md:font-bold text-amber-300'>Inscreva-se</p>
          </button>
        </div>
      ) : (
        <div className='relative flex flex-col gap-0 px-3 w-full flex-shrink-0'>
          <p className='font-bold text-lg pb-3'>Você</p>
          <button
            className='font-bold text-start py-2 px-3 rounded-md flex flex-row justify-start gap-3 items-center'
            style={navBtn === 'favorite' ? { backgroundColor: 'rgb(68,64,60)' } : { backgroundColor: 'transparent' }}
            onClick={() => handleClickBtn('favorite')}>
            <Heart
              fill={navBtn === 'favorite' ? '#ffffff' : '#A8A29E'}
              className='h-4 w-auto'
            />
            <p style={navBtn === 'favorite' ? { color: 'white' } : { color: '#A8A29E' }}>Favoritos</p>
          </button>
          <button
            className='font-bold text-start py-2 px-3 rounded-md flex flex-row justify-start gap-3 items-center'
            style={navBtn === 'rated' ? { backgroundColor: 'rgb(68,64,60)' } : { backgroundColor: 'transparent' }}
            onClick={() => handleClickBtn('rated')}>
            <Star
              fill={navBtn === 'rated' ? '#ffffff' : '#A8A29E'}
              className='h-4 w-auto'
            />
            <p style={navBtn === 'rated' ? { color: 'white' } : { color: '#A8A29E' }}>Avaliados</p>
          </button>
        </div>
      )}
      <div className='border-b border-stone-600 relative w-full h-6 flex-shrink-0'></div>
      <div className='relative w-full h-6 flex-shrink-0'></div>
      <div className='relative w-full h-auto px-3 text-stone-600 flex flex-col text-sm flex-shrink-0'>
        <br />
        <p>
        Pesquise seus filmes e séries favoritos, assista à trailers, saiba mais sobre eles, conheça o elenco e suas redes sociais. Pagando apenas 10 reais.
        <br />
        IMPERDÍVEL!!!.
        </p>
      </div>
    </span>
  );
};

export default SideNav;
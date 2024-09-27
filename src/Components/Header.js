import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import updateNavBtn from '../Redux/Actions/UpdateNavBtn.js';
import SideNav from './SideNav';
import { ReactComponent as LogoName } from '../Icons/logoName.svg';
import { ReactComponent as SearchIcon } from '../Icons/search.svg';
import { ReactComponent as RotateLoading } from '../Icons/arrows-rotate.svg';
import { ReactComponent as XMark } from '../Icons/xmark.svg';
import { GET } from '../API/APIconfig.js';
import SignIn from './SignIn.js';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [dropdownList, setDropdownList] = useState(<RotateLoading className='w-10 h-10 rounded-full bg-transparent fill-white animate-spin p-3' />);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const inp1 = useRef();
  const inp2 = useRef();
  const xBtn1 = useRef();
  const xBtn2 = useRef();

  // handle search bar
  useEffect(() => {
    if (query !== '') {
      setDisplayDropdown(true);
      xBtn1.current.style.display = 'flex';
      xBtn2.current.style.display = 'flex';
    } else {
      setDisplayDropdown(false);
      xBtn1.current.style.display = 'none';
      xBtn2.current.style.display = 'none';
    }
    setDropdownList(<RotateLoading className='w-10 h-10 rounded-full bg-transparent fill-white animate-spin p-2' />);
    const fetchRecommned = () => {
      fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&certification.lte=16&certification_country=BR&include_adult=false&language=pt-BR&page=1`, GET)
        .then(res => res.json())
        .then(data => {
          let name = data.results.map(e => e.name || e.title);
          name = [...new Set(name)];
          let index = 1;
          name.length !== 0
            ? setDropdownList(
                name.map(
                  (e, i) =>
                    i < 10 && (
                      <div
                        className='w-full cursor-pointer hover:bg-stone-500 px-3 py-2 rounded-lg'
                        key={'dropdownListItem#' + index++}
                        onClick={() => handleClickDropdownItem(e)}>
                        {e}
                      </div>
                    )
                )
              )
            : setDropdownList(<p className='py-2 px-3'>Nada encontrado!</p>);
        })
        .catch(err => {
          console.log(err);
        });
    };
    const timeOut = setTimeout(fetchRecommned, 500);
    if (query === '') {
      clearTimeout(timeOut);
    }
    return () => clearTimeout(timeOut);
  }, [query]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideInputRecommends);
    return () => document.removeEventListener('click', handleClickOutsideInputRecommends);
  }, []);

  const handleClickOutsideInputRecommends = e => {
    if (inp1.current && !inp1.current.contains(e.target)) {
      setDisplayDropdown(false);
    }
    if (inp2.current && !inp2.current.contains(e.target)) {
      setDisplayDropdown(false);
    }
  };
  const handleClickSearch = () => {
    if (query !== '') {
      navigate('/search/' + query);
      setDisplayDropdown(false);
      const mobileSearchBar = document.getElementById('mobileSearchBar');
      const fog = document.getElementById('fog');
      if (mobileSearchBar.classList.contains('flex')) {
        mobileSearchBar.classList.toggle('hidden');
        mobileSearchBar.classList.toggle('flex');
      }
      if (fog.style.display === 'block') {
        fog.style.display = 'none';
      }
    }
  };
  const handleClickDropdownItem = str => {
    setQuery(str);
    navigate('/search/' + str);
    const mobileSearchBar = document.getElementById('mobileSearchBar');
    const fog = document.getElementById('fog');
    if (mobileSearchBar.classList.contains('flex')) {
      mobileSearchBar.classList.toggle('hidden');
      mobileSearchBar.classList.toggle('flex');
    }
    if (fog.style.display === 'block') {
      fog.style.display = 'none';
    }
  };

  // handle mobile buttons
  const handleClickMobileBtn = () => {
    const sideNav = document.getElementById('sideNav');
    const mobileSearchBar = document.getElementById('mobileSearchBar');
    const fog = document.getElementById('fog');
    sideNav.classList.toggle('hidden');
    sideNav.classList.toggle('flex');
    if (mobileSearchBar.classList.contains('flex')) {
      mobileSearchBar.classList.toggle('hidden');
      mobileSearchBar.classList.toggle('flex');
    }
    if (mobileSearchBar.classList.contains('flex') || sideNav.classList.contains('flex')) {
      fog.style.display = 'block';
    } else {
      fog.style.display = 'none';
    }
  };
  const handleClickMobileSearchBtn = () => {
    const mobileSearchBar = document.getElementById('mobileSearchBar');
    const sideNav = document.getElementById('sideNav');
    const fog = document.getElementById('fog');
    mobileSearchBar.classList.toggle('hidden');
    mobileSearchBar.classList.toggle('flex');
    if (sideNav.classList.contains('flex')) {
      sideNav.classList.toggle('hidden');
      sideNav.classList.toggle('flex');
    }
    if (mobileSearchBar.classList.contains('flex') || sideNav.classList.contains('flex')) {
      fog.style.display = 'block';
    } else {
      fog.style.display = 'none';
    }
  };

  return (
    <header className='fixed top-0 w-full h-14 px-1 sm:px-3 flex flex-row justify-between items-center bg-black z-40'>
      <span
        id='mobileSearchBar'
        className='absolute top-14 left-0 px-2 w-full h-12 hidden lg:hidden bg-transparent flex-row items-center'>
        <input
          className='h-full w-full bg-movie-theater px-3 outline-0 border border-stone-600 focus:border-amber-300 rounded-l-lg placeholder:text-amber-300 placeholder:italic placeholder:opacity-30 text-amber-300 text-opacity-90'
          placeholder='pesquise por algo...'
          value={query}
          onChange={event => setQuery(event.target.value)}
          onKeyDown={e => {
            e.key === 'Enter' && handleClickSearch();
          }}
        />
        <button
          ref={xBtn2}
          className='absolute w-9 h-9 justify-center items-center right-[52px] rounded-full bg-transparent bg-opacity-50 hover:bg-neutral-700'
          style={{ display: 'none' }}
          onClick={() => setQuery('')}>
          <XMark className='w-5 h-5 fill-white opacity-40' />
        </button>
        <button
          className='h-full bg-stone-800 px-3 border border-stone-600 hover:border-amber-300 rounded-r-lg'
          onClick={handleClickSearch}>
          <SearchIcon
            height='16'
            width='16'
            fill='#fde047d9'
          />
        </button>
        {displayDropdown && (
          <div
            ref={inp2}
            className='absolute w-[98%] mx-[1%] z-20 top-14 rounded-lg left-0 h-auto bg-neutral-800 flex flex-col justify-start'>
            {dropdownList}
          </div>
        )}
      </span>
      <SideNav />
      <span className='relative w-auto h-full flex flex-row gap-0 md:gap-2 items-center'>
        <button
          className='relative w-10 h-10 text-2xl rounded-full hover:bg-stone-800 lg:hidden'
          onClick={handleClickMobileBtn}>
          &#9776;
        </button>
        <button
          onClick={() => {
            dispatch(updateNavBtn('home'));
            navigate('/home');
          }}>
          <LogoName className='bg-white' />
        </button>
      </span>
      <span className='relative h-10 w-2/5 hidden flex-row lg:flex items-center'>
        <input
          className='relative h-full w-full rounded-l-full px-5 bg-movie-theater border border-stone-800 outline-0 focus:border-amber-300 placeholder:text-amber-300 placeholder:italic placeholder:opacity-30 text-amber-300 text-opacity-90'
          placeholder='Pesquise por algo...'
          value={query}
          onChange={event => setQuery(event.target.value)}
          onKeyDown={e => {
            e.key === 'Enter' && handleClickSearch();
          }}></input>
        <button
          ref={xBtn1}
          className='absolute w-9 h-9 justify-center items-center right-[60px] rounded-full bg-transparent bg-opacity-50 hover:bg-neutral-700'
          style={{ display: 'none' }}
          onClick={() => setQuery('')}>
          <XMark className='w-5 h-5 fill-white opacity-40' />
        </button>
        <button
          className='relative h-full w-16 rounded-r-full flex justify-center items-center bg-stone-800 border-amber-300 hover:border'
          onClick={handleClickSearch}>
          <SearchIcon
            height='16'
            width='16'
            fill='#fde047d9'
          />
        </button>
        {displayDropdown && (
          <div
            ref={inp1}
            className='absolute w-full z-20 top-12 rounded-lg left-0 h-auto bg-neutral-800 flex flex-col justify-start'>
            {dropdownList}
          </div>
        )}
      </span>
      <span className='relative w-auto h-full flex flex-row gap-1 sm:gap-2 items-center'>
        <button
          className='relative h-10 w-10 rounded-full lg:hidden hover:bg-stone-800 flex justify-center items-center'
          onClick={handleClickMobileSearchBtn}>
          <SearchIcon
            height='18'
            width='18'
            fill='#fde047d9'
          />
        </button>
        <SignIn />
      </span>
    </header>
  );
};

export default Header;
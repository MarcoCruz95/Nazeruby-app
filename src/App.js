import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header.js';
import Home from './Pages/Home.js';
import Movie from './Pages/Movie.js';
import Tv from './Pages/Tv.js';
import People from './Pages/People.js';
import Detail from './Pages/Detail.js';
import Person from './Pages/Person.js';
import SearchResults from './Pages/SearchResults.js';
import Favorite from './Pages/Favorite.js';
import Rated from './Pages/Rated.js';
import ScrollToTop from './Components/ScrollToTop.js';



function App() {
  const handleClickFog = () => {
    const sideNav = document.getElementById('sideNav');
    const mobileSearchBar = document.getElementById('mobileSearchBar');
    const fog = document.getElementById('fog');
    if (mobileSearchBar.classList.contains('flex')) {
      mobileSearchBar.classList.toggle('hidden');
      mobileSearchBar.classList.toggle('flex');
    }
    if (sideNav.classList.contains('flex')) {
      sideNav.classList.toggle('hidden');
      sideNav.classList.toggle('flex');
    }
    fog.style.display = 'none';
  }
  return (
    <div className="relative w-full font-sans text-white bg-movie-theater flex min-h-screen">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <div id='bodyPage' className='relative pt-14 lg:pl-60 w-full h-full'>
          <div id='fog' className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-30' style={{ display: 'none' }} onClick={handleClickFog}></div>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/movie' element={<Movie />}></Route>
            <Route path='/tv' element={<Tv />}></Route>
            <Route path='/detail/:mediaType/:id' element={<Detail />}></Route>
            <Route path='/people' element={<People />}></Route>
            <Route path='/favorite' element={<Favorite />}></Route>
            <Route path='/rated' element={<Rated />}></Route>
            <Route path='/person/:id' element={<Person />}></Route>
            <Route path='/search/:query' element={<SearchResults />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

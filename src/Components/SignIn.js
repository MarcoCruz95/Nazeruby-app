import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET, deleteAction } from "../API/APIconfig";
import { ReactComponent as User } from '../Icons/user.svg';
import { useEffect, useRef } from "react";
import updateSessionId from "../Redux/Actions/UpdateSessionId.js";
import updateUserInf from "../Redux/Actions/UpdateUserInf";
import { ReactComponent as SignOut } from '../Icons/sign-out.svg';
import { ReactComponent as Star } from '../Icons/star.svg';
import { ReactComponent as Heart } from '../Icons/heart.svg';
import useUpdateUserNSignIn from '../Hook/useUpdateUserNSignIn.js';



const SignIn = () => {
    useUpdateUserNSignIn();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionId = useSelector(store => store.sessionId);
    const userInf = useSelector(store => store.userInf);
    const inf = useRef();
    const userNInf = useRef();
    const isFetchingToken = useSelector(store => store.isFetchingToken);

    useEffect(() => {
        document.addEventListener('click', handleClickOutSideUser);
        return () => document.removeEventListener('click', handleClickOutSideUser);
    }, []);
    const handleClickSignIn = () => {
        if (!isFetchingToken) {
            dispatch({type: 'isFetchingToken', payload: true});
            fetch('https://api.themoviedb.org/3/authentication/token/new', GET)
                .then(response => response.json())
                .then(token => {
                    window.location.replace(`https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=http://localhost:3000/home/`);
                    dispatch({type: 'isFetchingToken', payload: false});
                })
                .catch(err => console.error(err));
        }
    }
    const handleClickUser = () => {
        inf.current.classList.toggle('hidden');
        inf.current.classList.toggle('flex');
    }
    const handleClickOutSideUser = (e) => {
        if (userNInf.current && inf.current.classList.contains('flex') && !userNInf.current.contains(e.target)) {
            inf.current.classList.toggle('hidden');
            inf.current.classList.toggle('flex');
        }
    }
    const handleClickSignOut = () => {
        const DELETESSID = deleteAction(JSON.stringify({ session_id: sessionId }));
        fetch(`https://api.themoviedb.org/3/authentication/session?api_key=${process.env.REACT_APP_API_KEY}`, DELETESSID)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
        dispatch(updateSessionId(''));
        dispatch(updateUserInf({}));
        localStorage['session_id'] = '';
    }
    const handleClickInfBtn = (btnName) => {
        navigate('/' + btnName);
        inf.current.classList.toggle('hidden');
        inf.current.classList.toggle('flex');
    }
    return (
        <>
            {sessionId === ''
                ? <button className='relative h-10 w-auto px-3 flex flex-row gap-2 items-center rounded-full border border-amber-300 hover:bg-stone-700 cursor-pointer' onClick={handleClickSignIn} title='Sign in with your themoviedb account'>
                    <User fill='#FCD34D' />
                    <p className='hidden sm:inline-block md:font-bold text-amber-300'>Inscreva-se</p>
                </button>
                : <div ref={userNInf} className="relative" title="Seu perfil">
                    <button className="h-10 w-10 rounded-full text-center font-bold flex justify-center items-center bg-amber-800" onClick={handleClickUser}><p>{userInf.name?.charAt(0) || userInf.username?.charAt(0)}</p></button>
                    <div ref={inf} className="absolute top-12 right-1 w-auto h-auto py-3 bg-neutral-800 rounded-lg hidden flex-col gap-3 min-w-40">
                        <div className="w-auto flex flex-col gap-0 px-5">
                            <p className="text-xl font-bold text-nowrap">{userInf.name}</p>
                            <p className="text-neutral-300">{userInf.username}</p>
                        </div>
                        <div className="w-full px-5">
                            <div className="border-t border-neutral-500"></div>
                        </div>
                        <div className="w-auto flex flex-col gap-0 px-3">
                            <button className="font-bold text-start py-1 px-3 rounded-md hover:bg-neutral-500 flex flex-row justify-start gap-3 items-center" onClick={() => handleClickInfBtn('favorite')}><Heart className='fill-white h-4 w-auto' /><p>Favoritos</p></button>
                            <button className="font-bold text-start py-1 px-3 rounded-md hover:bg-neutral-500 flex flex-row justify-start gap-3 items-center" onClick={() => handleClickInfBtn('rated')}><Star className='fill-white h-4 w-auto' /><p>Avaliados</p></button>
                        </div>
                        <div className="w-full px-5">
                            <div className="border-t border-neutral-500"></div>
                        </div>
                        <div className="w-auto px-3">
                            <button className="font-bold w-full text-start py-1 px-3 rounded-md hover:bg-neutral-500 flex flex-row justify-start gap-3 items-center" onClick={handleClickSignOut}><SignOut className='fill-white h-4 w-auto' /><p>Sair</p></button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default SignIn;
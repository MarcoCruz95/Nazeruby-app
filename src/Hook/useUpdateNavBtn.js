import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import updateNavBtn from '../Redux/Actions/UpdateNavBtn.js';



// update state of navigation button when route page
const useUpdateNavBtn = (btn) => {
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateNavBtn(btn));
    }, [location.pathname])
}


export default useUpdateNavBtn;
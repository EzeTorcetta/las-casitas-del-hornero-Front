import { useState } from 'react';
import './SwitchButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../redux/Actions/Actions';
import day from "../../image/day-color.png";
import night from "../../image/night-color.png";


const SwitchButton = () => {
    
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme)
    

    const handleTheme = () => {
        if(theme === 'light'){
            dispatch(changeTheme('dark'))}
        else{
            dispatch(changeTheme('light'))};
        ;
    }

return(
    <div className='caja'>
        <img className='imagen' src={day} alt='imagen'/>
        <label className='switch'>
            <input type='checkbox' className='checkbox' onClick={handleTheme}/>
            <span className='slider'/>
        </label>
        <img className='imagen' src={night} alt='imagen'/>
    </div>
    
)
}

export default SwitchButton;
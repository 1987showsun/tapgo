/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Actions
import { signinAction } from '../../../redux/actions/sign';

const Index = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const AUTH_TOKEN = useSelector(state => state.sign.token);
    const [ stateForm, setForm ] = useState({
        username: "",
        password: ""
    });

    console.log('==>',AUTH_TOKEN);

    const handleChange = e => {
        const { name="", value="" } = e.target;
        setForm((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch( signinAction({ data:{...stateForm} }) );
    }

    const { username="", password="" } = stateForm;

    return(
        <form onSubmit={handleSubmit.bind(this)}>
            <div className="form-item">
                <label htmlFor="username">Username</label>
                <div className="input-box">
                    <input id="username" type="text" name="username" value={username} placeholder="Your input username" onChange={handleChange.bind(this)}/>
                </div>
            </div>
            <div className="form-item">
                <label htmlFor="password">Password</label>
                <div className="input-box">
                    <input id="password" type="password" name="password" value={password} placeholder="Password" onChange={handleChange.bind(this)}/>
                </div>
            </div>
            <div className="form-item">
                <button type="submit">Sign in</button>
            </div>
        </form>
    );
}

export default Index;
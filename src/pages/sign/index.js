/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
import { Outlet } from 'react-router-dom';

// stylesheets
import './public/style/sign.scss';

const Index = () => {
    return(
        <div className="sign-wrap">
            <div className='sign-form-wrap'>
                <Outlet />
            </div>
        </div>
    );
}

export default Index;
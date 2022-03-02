/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
import { NavLink } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineShopping } from 'react-icons/ai';

import './public/style.scss';

const Nav = () => {
    return(
        <nav>
            <div className="nav-item">
                <div className="menu-item">
                    <NavLink to="/admin/dashboard"><i><AiOutlineDashboard size="20px"/></i>Dashboard</NavLink>
                </div>
                <div className="menu-item">
                    <NavLink to="/admin/order"><i><AiOutlineShopping size="23px"/></i>Orders</NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
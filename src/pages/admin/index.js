/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
import { Outlet } from 'react-router-dom';

// Components
import Nav from '../../components/admin/common/nav/nav';
import MainHead from '../../components/admin/common/main-head';

const Index = () => {
    return(
        <>
            <Nav />
            <main>
                <MainHead />
                <Outlet />
            </main>
        </>
    );
}

export default Index;
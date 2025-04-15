import React from 'react';

const HeaderComponent = () => {
    return (
        <header className='bg-dark py-3 mb-4 shadow'>
            <div className='container d-flex justify-content-center'>
                <a className='navbar-brand text-white fs-4 fw-semibold' href='https://www.google.com'>Employee Management System</a>
            </div>
        </header>
    );
};

export default HeaderComponent;

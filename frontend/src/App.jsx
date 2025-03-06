import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import Register from './components/Register';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default App;
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { FavouritesPages } from './pages/FavouritesPages';
import { Navigation } from './components/Navigation';


export const App = () => (
    <>
        <Navigation />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favourites" element={<FavouritesPages />} />
            <Route path="/404" element={<h2>404: PAGE NOT FOUND</h2>} />
            <Route path="*" element={<Navigate to={'/404'} />} />
        </Routes>
    </>
);
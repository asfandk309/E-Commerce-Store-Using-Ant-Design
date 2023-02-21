import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Category from '../Category'
import Home from '../Home'

const AppRouter = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Category />} />
            <Route path="/:categoryID" element={<Category />} />
        </Routes>
    </div>
  )
}

export default AppRouter
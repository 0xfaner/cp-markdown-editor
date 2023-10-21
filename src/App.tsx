import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/page/HomePage'
import './App.css'

const router = createBrowserRouter([
  { path: '/', element: (<HomePage />), },
])

export const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

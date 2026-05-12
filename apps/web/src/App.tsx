// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello World!</div>,
//   },
//   {
//     path: "/tasks",
//     element: <div>Task List here</div>,
//   },
// ]);

// export function App() {
//   return <RouterProvider router={router} />;
// }

import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home, Info, Tasks } from './components/pages';
import './App.css';

export function App() {
  return <div className="App">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<Info />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  </div>;
}

export default App
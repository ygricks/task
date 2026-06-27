import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Home, Info, Login, Tasks } from "./components/pages";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MainLayout } from "./layouts/MainLayout";

const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: '/login',
    element: <MainLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: '/info',
    element: <MainLayout />,
    children: [{ index: true, element: <Info /> }],
  },

  // PROTECTED ROUTES (Wrapped in guard)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [{ index: true, element: <Home /> }],
      },
      {
        path: '/tasks',
        element: <MainLayout />,
        children: [{ index: true, element: <Tasks /> }],
      },
    ],
  },
  
  // Catch-all redirect to home
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
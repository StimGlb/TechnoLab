import NotFound from './pages/NotFound'
// ...
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'sequences', element: <SequencesList /> },
      { path: 'sequences/:id', element: <SequenceDetail /> },
      { path: '*', element: <NotFound /> }, // ⬅️ catch‑all
    ],
  },
])

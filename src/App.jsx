import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { DartsListPage } from './pages/DartsListPage.jsx';
import { DartsSinglePage } from './pages/DartsSinglePage.jsx';
import { CreateDartsPage } from './pages/CreateDartsPage.jsx';
import { DartsModPage } from './pages/DartsModPage.jsx';
import { DartsDelPage } from './pages/DartsDelPage.jsx';
import './App.css';

export const App = () => (
  <BrowserRouter>
    <nav className="navbar navbar-expand-sm navbar-light bg-light p-2" aria-label="Fő navigáció">
      <NavLink to="/darts" className="p-2 m-1 text-decoration-none text-black">
        Dartsjátékosok
      </NavLink>
      <NavLink to="/new-darts" className="p-2 m-1 text-decoration-none text-black">
        <i className="bi bi-plus-circle-fill" aria-hidden="true" /> Új dartsjátékos
      </NavLink>
    </nav>
    <main className="page-shell">
      <Routes>
        <Route path="/" element={<Navigate to="/darts" replace />} />
        <Route path="/darts" element={<DartsListPage />} />
        <Route path="/darts/:dartsId" element={<DartsSinglePage />} />
        <Route path="/new-darts" element={<CreateDartsPage />} />
        <Route path="/mod-darts/:dartsId" element={<DartsModPage />} />
        <Route path="/del-darts/:dartsId" element={<DartsDelPage />} />
        <Route path="*" element={<Navigate to="/darts" replace />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
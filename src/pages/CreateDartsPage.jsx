import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DartForm from '../components/DartForm.jsx';
import { createDart, getRequestError } from '../services/dartsApi.js';

export const CreateDartsPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleCreate = async (player) => {
    setIsSaving(true);
    setError('');
    try {
      const { data } = await createDart(player);
      navigate(data?.id ? `/darts/${data.id}` : '/darts');
    } catch (requestError) {
      setError(getRequestError(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="form-page">
      <div className="form-heading">
        <p className="eyebrow">Új adatlap</p>
        <h1>Játékos felvétele</h1>
        <p className="section-copy">Add meg a dartsjátékos adatait.</p>
      </div>
      {error && <p className="alert-message" role="alert">{error}</p>}
      <DartForm onSubmit={handleCreate} isSaving={isSaving} submitLabel="Játékos létrehozása" />
      <Link to="/darts" className="back-link"><i className="bi bi-arrow-left" aria-hidden="true" /> Mégse</Link>
    </section>
  );
};
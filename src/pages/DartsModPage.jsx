import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DartForm from '../components/DartForm.jsx';
import { getDart, getRequestError, updateDart } from '../services/dartsApi.js';

export const DartsModPage = () => {
  const { dartsId } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    getDart(dartsId)
      .then(({ data }) => {
        if (isCurrent) setPlayer(data);
      })
      .catch((requestError) => {
        if (isCurrent) setError(getRequestError(requestError));
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });
    return () => { isCurrent = false; };
  }, [dartsId]);

  const handleUpdate = async (updatedPlayer) => {
    setIsSaving(true);
    setError('');
    try {
      await updateDart(dartsId, updatedPlayer);
      navigate(`/darts/${dartsId}`);
    } catch (requestError) {
      setError(getRequestError(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <p className="loading-state" role="status">Adatok betöltése…</p>;
  if (!player && !error) return <p className="empty-state">A keresett játékos nem található.</p>;

  return (
    <section className="form-page">
      <div className="form-heading">
        <p className="eyebrow">Adatlap szerkesztése</p>
        <h1>{player?.name ?? 'Játékos'}</h1>
      </div>
      {error && <p className="alert-message" role="alert">{error}</p>}
      {player && <DartForm initialData={player} onSubmit={handleUpdate} isSaving={isSaving} submitLabel="Módosítások mentése" />}
      <Link to={player ? `/darts/${player.id}` : '/darts'} className="back-link"><i className="bi bi-arrow-left" aria-hidden="true" /> Vissza</Link>
    </section>
  );
};
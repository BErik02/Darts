import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteDart, getDart, getRequestError } from '../services/dartsApi.js';

export const DartsDelPage = () => {
    const { dartsId } = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

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

    const handleDelete = async () => {
        setIsDeleting(true);
        setError('');
        try {
            await deleteDart(dartsId);
            navigate('/darts');
        } catch (requestError) {
            setError(getRequestError(requestError));
            setIsDeleting(false);
        }
    };

    if (isLoading) return <p className="loading-state" role="status">Adatok betöltése…</p>;
    if (!player && !error) return <p className="empty-state">A keresett játékos nem található.</p>;

    return (
        <section className="delete-panel">
            <span className="delete-icon" aria-hidden="true"><i className="bi bi-trash3" /></span>
            <p className="eyebrow">Végleges művelet</p>
            <h1>Játékos törlése</h1>
            {player && <p className="delete-copy"><strong>{player.name}</strong> adatlapja törlődik. Ez a művelet nem vonható vissza.</p>}
            {error && <p className="alert-message" role="alert">{error}</p>}
            <div className="delete-actions">
                <Link className="button button-secondary" to={player ? `/darts/${player.id}` : '/darts'}>Mégse</Link>
                <button className="button button-danger" type="button" onClick={handleDelete} disabled={!player || isDeleting}>
                    {isDeleting ? 'Törlés…' : 'Igen, törlöm'}
                </button>
            </div>
        </section>
    );
};

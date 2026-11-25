import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDart, getRequestError } from '../services/dartsApi.js';

export const DartsSinglePage = () => {
    const { dartsId } = useParams();
    const [player, setPlayer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isCurrent = true;
        setIsLoading(true);
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

    if (isLoading) return <p className="loading-state" role="status">Adatlap betöltése…</p>;
    if (error) return <p className="alert-message" role="alert">{error}</p>;
    if (!player) return <p className="empty-state">A keresett játékos nem található.</p>;

    return (
        <section className="detail-layout">
            <div className="detail-image-wrap">
                <img className="detail-image" src={player.image_url} alt={player.name} />
                <span className="detail-stamp">PDC · #{String(player.id).padStart(2, '0')}</span>
            </div>
            <div className="detail-content">
                <p className="eyebrow">Játékos adatlapja</p>
                <h1>{player.name}</h1>
                <dl className="detail-stats">
                    <div><dt>Születési dátum</dt><dd>{player.birth_date}</dd></div>
                    <div><dt>Világbajnoki cím</dt><dd>{player.world_ch_won}</dd></div>
                </dl>
                <div className="detail-actions">
                    <Link className="button button-primary" to={`/mod-darts/${player.id}`}>
                        <i className="bi bi-pencil" aria-hidden="true" /> Szerkesztés
                    </Link>
                    <Link className="button button-secondary" to={`/del-darts/${player.id}`}>
                        <i className="bi bi-trash3" aria-hidden="true" /> Törlés
                    </Link>
                    {player.profile_url && <a className="text-link" href={player.profile_url} target="_blank" rel="noreferrer">Külső profil <i className="bi bi-box-arrow-up-right" aria-hidden="true" /></a>}
                    <Link className="back-link" to="/darts"><i className="bi bi-arrow-left" aria-hidden="true" /> Vissza a listához</Link>
                </div>
            </div>
        </section>
    );
};
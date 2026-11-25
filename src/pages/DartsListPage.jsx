import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDarts, getRequestError } from '../services/dartsApi.js';

export const DartsListPage = () => {
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isCurrent = true;
        getDarts()
            .then(({ data }) => {
                if (isCurrent) setPlayers(data);
            })
            .catch((requestError) => {
                if (isCurrent) setError(getRequestError(requestError));
            })
            .finally(() => {
                if (isCurrent) setIsLoading(false);
            });
        return () => { isCurrent = false; };
    }, []);

    return (
        <section className="content-section">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">A dobóvonal mögött</p>
                    <h1>Dartsjátékosok</h1>
                    <p className="section-copy">A sportág világbajnokai, egy helyen.</p>
                </div>
                {!isLoading && !error && <span className="player-count">{players.length} játékos</span>}
            </div>

            {isLoading && <div className="loading-state" role="status">Játékosok betöltése…</div>}
            {error && <p className="alert-message" role="alert">{error}</p>}
            {!isLoading && !error && players.length === 0 && (
                <div className="empty-state">Még nincs dartsjátékos a nyilvántartásban.</div>
            )}

            {!isLoading && !error && players.length > 0 && (
                <div className="player-grid">
                    {players.map((player) => (
                        <article className="player-card" key={player.id}>
                            <Link className="player-image-link" to={`/darts/${player.id}`} aria-label={`${player.name} adatlapja`}>
                                <img className="player-image" src={player.image_url} alt={player.name} loading="lazy" />
                                <span className="image-number">#{String(player.id).padStart(2, '0')}</span>
                            </Link>
                            <div className="player-card-content">
                                <div className="player-card-title">
                                    <div>
                                        <p className="player-kicker">Világbajnok</p>
                                        <h2>{player.name}</h2>
                                    </div>
                                    <span className="win-count" title="Világbajnoki címek">
                                        {player.world_ch_won}<small>×</small>
                                    </span>
                                </div>
                                <p className="player-meta">Született · {player.birth_date}</p>
                                <div className="player-card-actions">
                                    <Link to={`/darts/${player.id}`} aria-label={`${player.name} adatlapja`} title="Adatlap">
                                        <i className="bi bi-arrow-up-right" aria-hidden="true" />
                                    </Link>
                                    <Link to={`/mod-darts/${player.id}`} aria-label={`${player.name} szerkesztése`} title="Szerkesztés">
                                        <i className="bi bi-pencil" aria-hidden="true" />
                                    </Link>
                                    <Link to={`/del-darts/${player.id}`} aria-label={`${player.name} törlése`} title="Törlés">
                                        <i className="bi bi-trash3" aria-hidden="true" />
                                    </Link>
                                    {player.profile_url && (
                                        <a href={player.profile_url} target="_blank" rel="noreferrer" className="profile-link">
                                            Profil <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};
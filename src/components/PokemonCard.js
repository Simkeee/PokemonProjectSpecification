import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Styles.css';

const PokemonCard = ({ pokemon }) => {
  const { id, name, imageUrl } = pokemon;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(id.toString()));
    }
  }, [id]);

  const handleToggleFavorite = () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      if (favorites.includes(id.toString())) {
        const updatedFavorites = favorites.filter(
          favorite => favorite !== id.toString()
        );
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
      } else {
        const updatedFavorites = [...favorites, id.toString()];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(true);
      }
    } else {
      const favorites = [id.toString()];
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <Card>
      <div className="position-relative">
        <Link to={`/pokemon/${id}`}>
          <Card.Img variant="top" src={imageUrl} />
        </Link>
        <Button
          variant={isFavorite ? 'danger' : 'primary'}
          className={`favorite-button ${isFavorite ? 'favorite-active' : ''}`}
          onClick={handleToggleFavorite}
        >
          <i className="material-icons">favorite</i>
        </Button>
      </div>
      <Card.Body>
        <Card.Title
          style={{ color: 'black', textDecoration: 'none', textAlign: 'center' }}
        >
          {name}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;

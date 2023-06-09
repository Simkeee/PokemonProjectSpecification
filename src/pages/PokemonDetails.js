import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../components/Styles.css';
import api from './api';

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await api.get(`/pokemon/${id}`);
        const pokemonData = {
          id: response.data.id,
          name: response.data.name,
          imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${response.data.id
            .toString()
            .padStart(3, '0')}.png`,
          types: response.data.types.map(type => type.type.name),
          abilities: response.data.abilities.map(ability => ability.ability.name),
          height: response.data.height,
          weight: response.data.weight,
        };

        setPokemonDetails(pokemonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const renderPokemonDetails = () => {
    if (!pokemonDetails) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <Row className='details'>
          <Col>
            <h2 className='pokemonName'>{pokemonDetails.name}</h2>
            <img className='pokemonIMG' src={pokemonDetails.imageUrl} alt={pokemonDetails.name} />
          </Col>
          <Col>
            <h3>Details:</h3>
            <p>ID: {pokemonDetails.id}</p>
            <p>Types: {pokemonDetails.types.join(', ')}</p>
            <p>Abilities: {pokemonDetails.abilities.join(', ')}</p>
            <p>Height: {pokemonDetails.height}</p>
            <p>Weight: {pokemonDetails.weight}</p>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <Header />
      <Container className="mt-5">{renderPokemonDetails()}</Container>
      <Footer />
    </>
  );
};

export default PokemonDetails;

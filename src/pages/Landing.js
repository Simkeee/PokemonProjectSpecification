import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../components/Styles.css';

const Landing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const pokemonPerPage = 24;
  const totalPages = 36;

  useEffect(() => {
    const fetchPokemonData = async () => {
      const start = (currentPage - 1) * pokemonPerPage + 1;
      const end = currentPage * pokemonPerPage;

      const pokemonPromises = [];
      for (let id = start; id <= end; id++) {
        pokemonPromises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
      }

      try {
        const responses = await Promise.all(pokemonPromises);
        const pokemonData = responses.map(response => ({
          id: response.data.id,
          name: response.data.name,
          imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${response.data.id
            .toString()
            .padStart(3, '0')}.png`,
        }));

        // Sort the pokemon data based on the selected option
        const sortedPokemonData = sortPokemonData(pokemonData, sortOption);

        setPokemonList(sortedPokemonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonData();
  }, [currentPage, pokemonPerPage, sortOption]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleSortChange = event => {
    setSortOption(event.target.value);
  };

  const renderPokemonCards = () => {
    const filteredPokemon = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery)
    );

    return filteredPokemon.map(pokemon => (
      <Col key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
        <PokemonCard className="card" pokemon={pokemon} />
      </Col>
    ));
  };

  const renderPaginationButtons = () => {
    const pageNumbers = [];

    if (totalPages <= 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage === 1) {
        pageNumbers.push(1, 2);
      } else if (currentPage === totalPages) {
        pageNumbers.push(totalPages - 1, totalPages);
      } else {
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }

    return (
      <div className="d-flex justify-content-center mt-3">
        {pageNumbers.map(page => (
          <Button
            key={page}
            variant={currentPage === page ? 'primary' : 'light'}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </Button>
        ))}
      </div>
    );
  };

  const sortPokemonData = (pokemonData, sortOption) => {
    let sortedData = [...pokemonData];

    switch (sortOption) {
      case 'default':
        // No sorting needed, return the original data
        return sortedData;
      case 'a-z':
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        return sortedData;
      case 'z-a':
        sortedData.sort((a, b) => b.name.localeCompare(a.name));
        return sortedData;
      default:
        return sortedData;
    }
  };

  return (
    <Container>
      <Header />
      <Row className="formInput">
        <Col>
          <Form.Control
            className="formInput1"
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Col>
        <Col>
          <Form.Control
            as="select"
            className="formInput2"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="default">Default</option>
            <option value="a-z">Sort A-Z</option>
            <option value="z-a">Sort Z-A</option>
          </Form.Control>
        </Col>
      </Row>

      <Row className="cards">{renderPokemonCards()}</Row>
      <Row className="page">{renderPaginationButtons()}</Row>
      <Footer />
    </Container>
  );
};

export default Landing;
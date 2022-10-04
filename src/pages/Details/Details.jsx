import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";

const Details = () => {
    const parameters = useParams();

    const [details, setDetails] = useState(null);

    const handleResponse = async (rawResponse) => {
        const data = await rawResponse.json();
        const { name, sprites, height, weight } = data;
        const pokemonDetails = {
            height,
            name,
            sprite: sprites.other['official-artwork'].front_default,
            weight
        }
        setDetails(pokemonDetails);
    }

    const getPokemonDetails = useCallback((id) => {
        const request = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        request.then((event) => {
            handleResponse(event);
        });
        request.catch(() => {
            console.log('erro');
        });
    }, []);

    useEffect(() => {
        const { id } = parameters;
        getPokemonDetails(id);
    }, [getPokemonDetails, parameters]);
    

    return (
        <div className="wrapper">
            { details === null ? (
                <p>Carregando...</p>
            ) : (
                <div className="container">
                    <div className="image-container">
                        <img className="image" src={details.sprite} alt={details.name} />
                    </div>
                    <div className="details-container">
                        <h1>{details.name}</h1>
                        <ul>
                            <li>
                                <p>Altura: {details.height}</p>
                                <p>Peso: {details.weight}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Details;
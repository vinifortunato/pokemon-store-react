import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultButton from "../DefaultButton";
import "./Card.css"

const Card = ({ name, onClick }) => {
    const navigate = useNavigate();

    const [details, setDetails] = useState(null);

    const handleResponse = async (rawResponse) => {
        const data = await rawResponse.json();
        const { name, sprites, weight, height } = data;

        const price = weight * height;

        const pokemonDetails = {
            name,
            sprite: sprites.other['official-artwork'].front_default,
            price
        }
        setDetails(pokemonDetails);
    }

    const getPokemonDetails = useCallback(() => {
        const request = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        request.then((event) => {
            handleResponse(event);
        });
        request.catch(() => {
            console.log('erro');
        });
    }, [name]);

    useEffect(() => {
        getPokemonDetails();
    }, [getPokemonDetails]);

    const handleAddClick = () => {
        onClick(details);
    }

    const handleClick = useCallback(() => {
        navigate(`/details/${name}`);
    }, [navigate, name]);

    return (
        <div className="card">
            <div className="card-image-wrapper" onClick={handleClick}>
            {details && (
                <img 
                    alt={name}
                    className="card-image"
                    src={details.sprite}
                />
            )}
            </div>
            <div className="card-details">
                <p className="card-title" onClick={handleClick}>{name}</p>
                <p className="card-title" onClick={handleClick}>{details?.price || '...'}</p>
                <div className="button-adapter">
                    <DefaultButton 
                        label="Adicionar ao carrinho"
                        type="button"
                        onClick={handleAddClick}
                    />
                </div>
            </div>
        </div>
    )
}

export default Card;
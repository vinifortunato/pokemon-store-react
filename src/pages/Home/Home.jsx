import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cart, DefaultButton, Header, List } from "../../components";
import { cartActions } from "../../store/cart";
import { productsActions } from "../../store/products";
import { userActions } from "../../store/user";
import "./Home.css";

const Home = () => {
    const dispatch = useDispatch();

    const products = useSelector(({ products }) => products);

    const [cartOpen, setCartOpen] = useState(false);

    // Inicialização
    useEffect(() => {
        const localData = localStorage.getItem('pokemon-store');
        if (localData) {
            const parsed = JSON.parse(localData);
            const { cart, products, user } = parsed; 
            
            dispatch(cartActions.init(cart));

            dispatch(productsActions.init({
                next: products.next,
                previous: products.previous,
                list: products.list
            }));

            if (user) {
                dispatch(userActions.init(user));
            }
            return;
        }

        fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const { next, previous, results: list } = data;
                dispatch(productsActions.init({
                    next,
                    previous,
                    list
                }));
            })
            .catch(() => {
                console.error('Error');
            });
    }, [dispatch]);

    // Click no botão load more
    const handleLoadMore = useCallback(() => {
        fetch(products.next)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const { next, previous, results: list } = data;
                dispatch(productsActions.update({
                    next,
                    previous,
                    list
                }));
            })
            .catch(() => {
                console.error('Error');
            });
    }, [dispatch, products.next]);

    const handleAddToCart = useCallback((item) => {
        dispatch(cartActions.add(item));
        setCartOpen(true);
    }, [dispatch]);

    const handleCartClose = () => {
        setCartOpen(false);
    }

    const handleCartItemRemove = useCallback((item) => {
        dispatch(cartActions.remove(item));
    }, [dispatch]);

    const handleHeaderCart = useCallback(() => {
        setCartOpen(true);
    }, []);

    return (
        <div>
            <Header onCartClick={handleHeaderCart} />
            <Cart
                open={cartOpen}
                onClose={handleCartClose}
                onRemove={handleCartItemRemove}
            />
            <List 
                content={products.list}
                onItemClick={handleAddToCart}
            />
            <div className="load-more-wrapper">
                <DefaultButton 
                    label="Carregar mais"
                    onClick={handleLoadMore}
                />
            </div>
        </div>
    )
}

export default Home;
import './Header.css';

const Header = ({ onCartClick }) => {
    return (
        <header className="header">
            <p className="header-menu">Menu</p>
            <p className="header-title">Pokemon Store</p>
            <button 
                className="header-cart"
                type="button"
                onClick={onCartClick}
            >
                Carrinho
            </button>
        </header>
    )
}

export default Header;
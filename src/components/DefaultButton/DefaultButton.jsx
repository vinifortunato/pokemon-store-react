import "./DefaultButton.css";

const DefaultButton = ({ type = 'button', label = 'Label', onClick }) => {
    return (
        <button className="default-button" type={type} onClick={onClick}>{label}</button>
    )
}

export default DefaultButton;
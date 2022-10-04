import Card from "../Card";
import "./List.css";

const List = ({ content, onItemClick }) => {
    const handleClick = (content) => {
        onItemClick(content);
    }

    const map = content.map((item) => {
        return (
          <Card key={item.name} name={item.name} onClick={handleClick} />
        );
    });

    return (
        <div className="list-container">
            {map}
        </div>
    )
}

export default List;
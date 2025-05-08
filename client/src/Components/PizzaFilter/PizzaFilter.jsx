import "./PizzaFilter.css";
import {useState} from "react";

const PizzaFilter = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    }

    return (
        <div>
            <div className="filter-container">
                <div className="filter-search">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="filter-search-input"
                            type="text"
                            placeholder="Search.."
                            name="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit">🔍</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PizzaFilter;
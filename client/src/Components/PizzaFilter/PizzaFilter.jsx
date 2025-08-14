import "./PizzaFilter.css";
import Popup from 'reactjs-popup';
import {useState, useEffect} from "react";
import AllergenFilter from "../AllergenFilter";
import {Search, Filter} from "react-bootstrap-icons";

const PizzaFilter = ({onSearch, allergenData}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAllergenIDs, setSelectedAllergenIDs] = useState([]);
    const [openAllergenFilterPopup, setOpenAllergenFilterPopup] = useState(false);

    useEffect(() => {
        if (openAllergenFilterPopup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [openAllergenFilterPopup]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm, selectedAllergenIDs);
    }

    const openModal = () => setOpenAllergenFilterPopup(true);
    const closeModal = () => setOpenAllergenFilterPopup(false);

    const handleApplyFilter = (allergenIDs) => {
        setSelectedAllergenIDs(allergenIDs);
        onSearch(searchTerm, allergenIDs);
        setOpenAllergenFilterPopup(false);
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
                        <button type="submit"><Search/></button>
                    </form>
                </div>
                <div className={"filter-allergen"}>
                    <button type={"button"} onClick={openModal}><Filter/></button>
                </div>
            </div>
            <Popup open={openAllergenFilterPopup} onClose={closeModal} position={"center center"} modal>
                <AllergenFilter allergenData={allergenData} closeModal={closeModal}
                                handleApplyFilter={handleApplyFilter}
                                allergenIDs={selectedAllergenIDs} /*onSubmit={onSubmit}*//>
            </Popup>
        </div>
    )
}

export default PizzaFilter;
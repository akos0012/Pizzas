import {XSquare} from "react-bootstrap-icons";
import "./AllergenFilter.css"
import {useState} from "react";

const AllergenFilter = ({allergenData, allergenIDs, handleApplyFilter, closeModal}) => {
    const [selectedAllergenIDs, setSelectedAllergenIDs] = useState(allergenIDs);

    const handleAllergenButton = (allergenID) => {
        let newArray = [...selectedAllergenIDs];
        if (newArray.includes(allergenID)) {
            newArray = newArray.filter(id => id !== allergenID);
        } else {
            newArray.push(allergenID);
        }
        setSelectedAllergenIDs(newArray);
    }

    const isChanged = () => {
        if (selectedAllergenIDs.length !== allergenIDs.length) return true;
        return !selectedAllergenIDs.every(id => allergenIDs.includes(id));
    }

    return (
        <div className="onePageFrame allergen-filter">
            <div className="closeButton" onClick={closeModal}><XSquare/></div>
            <h1>Allergens</h1>
            <p>Select allergens to exclude from your pizza.</p>
            <div className={"allergen-buttons"}>
                {allergenData.map((allergen) => (
                    <button key={allergen.id} onClick={() => handleAllergenButton(allergen.id)}
                            type={"button"}
                            className={`allergen-button ${selectedAllergenIDs.includes(allergen.id) ? "selected" : ""}`}
                    >
                        {allergen.name}
                    </button>
                ))}
            </div>
            <button className="apply-button" type="button"
                    onClick={() => handleApplyFilter(selectedAllergenIDs)}
                    disabled={!isChanged()}
            >
                Apply Filter
            </button>
        </div>
    )
}

export default AllergenFilter;
import { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import './library.css'
export function Search({ onSearch }) {

    const [query, setQuery] = useState('')
    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(query);
    };
    return (
        <div className="search-container">

            <input type="search" name="search-text" className="search-input"
             placeholder="ابحث عن كتاب"
             value={query}
             onChange={handleChange}/>
            <button type="submit" className="search-button" onClick={handleSubmit}><FaSearch className="search-icon" />
            </button>

        </div>
    )
};
export default Search;
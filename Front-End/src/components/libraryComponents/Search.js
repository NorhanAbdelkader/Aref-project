import { useState} from 'react'
import { FaSearch } from "react-icons/fa";
import './library.css'
export function Search  ({ query, setQuery }){
     
    const [search, setSearch] = useState('')
    const Search = ({ onSearch }) => {
        const [query, setQuery] = useState('');
    
        const handleSearch = () => {
            onSearch(query);
        };
    };
    return(
        <div className="search-container">
 
        <input type="search" name="search-text" className="search-input" />
        <button className="search-button" onClick={Search}><FaSearch className="search-icon"/>
        </button>
 
        </div>
    )
};
export default Search;
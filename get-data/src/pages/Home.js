import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";

function Home() {

  const [info, setInfo] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [filters, setFilters] = useState({
    HouseCleaning: false,
    Gardening: false,
    Plumbing: false,
  });

  useEffect(() => {
    axios.get("https://helpme.apis.lk/api/service").then((response) => {
      setInfo(response.data);
      setFilteredInfo(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  useEffect(() => {
    let updatedInfo = info;
    const activeFilters = Object.keys(filters).filter((key) => filters[key]);
    if (activeFilters.length > 0) {
      updatedInfo = updatedInfo.filter((item) => activeFilters.includes(item.title.replace(" ", "")));
    }
    if (searchQuery) {
      updatedInfo = updatedInfo.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.caregiver.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredInfo(updatedInfo);
  }, [filters, searchQuery, info]);

  return (

    <div className="bg-gray-900 min-h-screen flex flex-row items-start p-6 gap-6">
      <div className="w-64 bg-gray-800 p-4 rounded-lg shadow-md text-white">
        <p className="text-lg font-semibold mb-2"> </p>
        
        <div className="flex flex-col gap-2">
          {Object.keys(filters).map((filter) => (
            <label key={filter} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={filter}
                checked={filters[filter]}
                onChange={handleFilterChange}
                className="w-4 h-4"
              />
              {filter.replace(/([A-Z])/g, " $1").trim()}
            </label>
          ))}
        </div>

        <button
          className="mt-4 p-2 bg-red-600 text-white rounded-lg w-full hover:bg-red-500"
          onClick={() => setFilters({ HouseCleaning: false, Gardening: false, Plumbing: false })}
        >
          Clear Filters
        </button>

      </div>

      <div className="flex flex-col w-full max-w-6xl">
   
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">☰</span>
        </div>

    
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {filteredInfo.length > 0 ? (
            filteredInfo.map(({ id, title, caregiver }) => (
              <JobCard
                key={id}
                title={title}
                name={caregiver.name}
                gender={caregiver.gender}
                image={caregiver.dp_url}
              />
            ))
          ) : (
            <p className="text-white text-center col-span-full">Loading ... </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

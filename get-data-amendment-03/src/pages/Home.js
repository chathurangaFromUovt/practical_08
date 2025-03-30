import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";

function Home() {
  const [info, setInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios.get("https://helpme.apis.lk/api/service")
      .then((response) => {
        setInfo(response.data);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        const { data } = await axios.post("https://helpme.apis.lk/api/service/filter", {
          title: search
        });
        setInfo(data.data);
      } else {
        axios.get("https://helpme.apis.lk/api/service").then((response) => {
          setInfo(response.data);
        });
      }
    };
    fetchData();
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCategory) {
        const { data } = await axios.post("https://helpme.apis.lk/api/service/filter", {
          title: selectedCategory
        });
        setInfo(data.data);
      } else {
        axios.get("https://helpme.apis.lk/api/service").then((response) => {
          setInfo(response.data);
        });
      }
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-row items-start p-6 gap-6">
      <div className="w-64 bg-gray-800 p-4 rounded-lg shadow-md text-white">
        <p className="text-lg font-semibold mb-2"> </p>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="House"
              className="w-4 h-4"
              onChange={(e) => setSelectedCategory(e.target.checked ? e.target.name : "")}
            />
            <span>House Cleaning</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="Gardening"
              className="w-4 h-4"
              onChange={(e) => setSelectedCategory(e.target.checked ? e.target.name : "")}
            />
            <span>Gardening</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="Plumbing"
              className="w-4 h-4"
              onChange={(e) => setSelectedCategory(e.target.checked ? e.target.name : "")}
            />
            <span>Plumbing</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-6xl">
        <div className="mb-4 relative">
          <input
            name="searchbox"
            type="text"
            placeholder="Search ..."
            className="w-full p-2 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">☰</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {info.map(({ id, title, caregiver }) => (
            <JobCard
              key={id}
              title={title}
              name={caregiver.name}
              gender={caregiver.gender}
              image={caregiver.dp_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
import React from "react";

function JobCard({ title, name, gender, image }) {

  return (

    <div className="bg-gray-800 p-6 rounded-2xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center gap-4">
        
        <div className="w-16 h-16 rounded-full bg-gray-600 overflow-hidden">
          <img src={image} alt="Profile" className="w-full h-full object-cover" />
        </div>

        
        <div className="text-white">
          <p className="text-xl font-bold">{title}</p>
          <p className="text-md">{name || "No name provided"}</p>
          <p className="text-sm text-gray-400">{gender || "No gender provided"}</p>
        </div>
      </div>
    </div>

  );
}

export default JobCard;

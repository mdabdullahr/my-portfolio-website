// src/components/SkillCard.jsx
import React from "react";

const SkillCard = ({ skill }) => {
  const { name, image } = skill;

  return (
    <div className="bg-[#E9004C]/2 border border-[#E9004C]/20 rounded-xl shadow-md p-10 w-60 mx-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img src={image} alt={name} className="w-16 h-16 mx-auto" />
      <h3 className="text-2xl rajdhani-bold text-center mt-4 text-white hover:text-[#E9004C] hover:underline ">
        {name}
      </h3>
    </div>
  );
};

export default SkillCard;

import React from "react";

const HeroSingleCard = ({ image, title, description }) => {
  return (
    <div className="card-1 group ">
      <div className="rounded-xl max-w-2xl mx-auto mb-5 text-center card-compact w-80 lg:w-64 py-5 shadow-xl text-slate-50 bg-gradient-to-r from-red-700 to-red-500 group-hover:scale-110">
        <figure>
          <img src={image} alt="image" className="mx-auto h-24" />
        </figure>
        <div className="card-body ">
          <h2 className="text-center font-bold text-2xl">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSingleCard;

import React from "react";

const HeroSingleCard = ({ image, title, description }) => {
  return (
    <div className="card-1 group">
      <div className="rounded-xl text-center card-compact w-96 py-5 shadow-xl text-slate-50 bg-gradient-to-r from-red-700 to-red-500 group-hover:scale-110">
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

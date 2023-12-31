import React from "react";
import qs from "query-string";

import { Link, useNavigate, useSearchParams } from "react-router-dom";

const PackageFR = ({ label, description, img, refetch }) => {
  const [params, setParams] = useSearchParams();

  return (
    <div className="card mx-auto w-72 mx-auto bg-base-100 shadow-xl text-slate-50 bg-gradient-to-r from-gray-700 to-slate-600 ">
      <figure className="px-2 pt-3">
        <img src={img} alt="images" className="mx-auto h-48 w-48 rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="font-bold mt-[-35px] text-2xl">{label}</h2>
        <p className="text-xl">{description}</p>
        <div className="card-actions">
          <button className="btn btn-md rounded-md px-10 border-0 btn-error text-slate-50 bg-gradient-to-r from-red-700 to-red-500">
            <Link to={`/all/items/${label}`}>Buy Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageFR;

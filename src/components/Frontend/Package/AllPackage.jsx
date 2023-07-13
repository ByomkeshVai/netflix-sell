import React from "react";
import { Link } from "react-router-dom";
import SectionHead from "../../Shared/SectionHead";

const AllPackage = () => {
  return (
    <>
      <div className="">
        <SectionHead slogan={"Our Top Packages"}></SectionHead>
        <div className="py-10 max-w-screen-2xl mx-auto grid grid-cols-4 gap-10">
          <div className="card lg:w-80 w-full bg-base-100 shadow-xl lg:ml-6 hover:scale-110 px-2 text-slate-50 bg-gradient-to-r from-blue-700 to-slate-600">
            <figure className="px-2 pt-3">
              <img
                src="https://static.vecteezy.com/system/resources/previews/022/101/069/original/netflix-logo-transparent-free-png.png"
                alt="Shoes"
                className="mx-auto object-cover h-56 w-56 rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="font-bold mt-[-24px] text-2xl">Netflix</h2>
              <p className="text-xl">
                Netflix Prime Starting Price from 600 BDT Only
              </p>
              <div className="card-actions">
                <button className="btn btn-md rounded-md px-10 border-0 btn-error text-slate-50 bg-gradient-to-r from-red-700 to-red-500">
                  <Link to="/classes">Buy Now</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="card lg:w-80 w-full bg-base-100 shadow-xl lg:ml-6 hover:scale-110 px-2 text-slate-50 bg-gradient-to-r from-blue-700 to-slate-600">
            <figure className="">
              <img
                src="https://static.vecteezy.com/system/resources/previews/022/101/069/original/netflix-logo-transparent-free-png.png"
                alt="Shoes"
                className="mx-auto object-cover h-56 w-56 rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="font-bold mt-[-24px] text-2xl">Netflix</h2>
              <p className="text-xl">
                Netflix Prime Starting Price from 600 BDT Only
              </p>
              <div className="card-actions">
                <button className="btn btn-md rounded-md px-10 border-0 btn-error text-slate-50 bg-gradient-to-r from-red-700 to-red-500">
                  <Link to="/classes">Buy Now</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="card lg:w-80 w-full bg-base-100 shadow-xl lg:ml-6 hover:scale-110 px-2 text-slate-50 bg-gradient-to-r from-blue-700 to-slate-600">
            <figure className="px-2 pt-3">
              <img
                src="https://static.vecteezy.com/system/resources/previews/022/101/069/original/netflix-logo-transparent-free-png.png"
                alt="Shoes"
                className="mx-auto object-cover h-56 w-56 rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="font-bold mt-[-24px] text-2xl">Netflix</h2>
              <p className="text-xl">
                Netflix Prime Starting Price from 600 BDT Only
              </p>
              <div className="card-actions">
                <button className="btn btn-md rounded-md px-10 border-0 btn-error text-slate-50 bg-gradient-to-r from-red-700 to-red-500">
                  <Link to="/classes">Buy Now</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="card lg:w-80 w-full bg-base-100 shadow-xl lg:ml-6 hover:scale-110 px-2 text-slate-50 bg-gradient-to-r from-blue-700 to-slate-600">
            <figure className="px-2 pt-3">
              <img
                src="https://static.vecteezy.com/system/resources/previews/022/101/069/original/netflix-logo-transparent-free-png.png"
                alt="Shoes"
                className="mx-auto object-cover h-56 w-56 rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="font-bold mt-[-24px] text-2xl">Netflix</h2>
              <p className="text-xl">
                Netflix Prime Starting Price from 600 BDT Only
              </p>
              <div className="card-actions">
                <button className="btn btn-md rounded-md px-10 border-0 btn-error text-slate-50 bg-gradient-to-r from-red-700 to-red-500">
                  <Link to="/classes">Buy Now</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPackage;

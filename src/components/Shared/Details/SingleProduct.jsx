import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import useSelect from "../../../hooks/useSelect";
import useAdmin from "../../../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import noimg from "../../../assets/noimg.png";
import ReactImageZoom from "react-image-zoom";

const SingleProduct = ({ product }) => {
  const {
    image,
    image2,
    image3,
    image4,
    name,
    price,
    stock,
    _id,
    duration,
    category,
  } = product;

  const [isAdmin] = useAdmin();
  const [, refetch] = useSelect();

  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToSelect = (product) => {
    if (user && user.email) {
      const selectItem = {
        selectItemId: _id,
        name,
        image,
        price,
        duration,
        category,
        customer_name: user.name,
        email: user.email,
        status: "unpaid",
      };
      fetch(`${import.meta.env.VITE_API_URL}/customer/select`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(selectItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            toast.success("Cart Updated, Check Your Dashboard");
          }
        });
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  const [images, setImages] = useState({
    img1: image,
    img2: image2 ? image2 : noimg,
    img3: image3 ? image3 : noimg,
    img4: image4 ? image3 : noimg,
  });

  const [activeImg, setActiveImage] = useState(images.img1);
  const props = { width: 540, height: 520, zoomWidth: 400, img: activeImg };

  return (
    <>
      <Helmet>
        <title>Streamcart - {product?.name}</title>
      </Helmet>

      <div className="flex flex-col gap-6 lg:w-4/6 mx-auto justify-center">
        <ReactImageZoom
          {...props}
          className="w-full h-full aspect-square object-cover rounded-xl"
        ></ReactImageZoom>

        <div className="flex flex-row justify-center gap-2 lg:gap-10 h-24">
          <img
            src={images.img1}
            alt=""
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImage(images.img1)}
          />
          <img
            src={images.img2}
            alt=""
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImage(images.img2)}
          />
          <img
            src={images.img3}
            alt=""
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImage(images.img3)}
          />
          <img
            src={images.img4}
            alt=""
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImage(images.img4)}
          />
        </div>
      </div>
      {/* ABOUT */}
      <div className="flex flex-col gap-4 lg:w-2/4 pl-5 lg:pl-0">
        <div>
          <span className=" text-red-600 font-semibold">
            Special {product?.label}
          </span>
          <h1 className="text-3xl font-bold">{product?.name}</h1>
        </div>
        <p className="text-gray-700">{product?.description}</p>
        <h6 className="text-2xl font-semibold">৳ {product?.price}</h6>
        <h6 className="text-2xl font-semibold">In Stock {product?.stock}</h6>
        {product.duration > 0 && (
          <h6 className="text-2xl font-semibold">
            Validity: {product?.duration} Days
          </h6>
        )}
        <div className="flex flex-row items-center gap-12">
          {/* <div className="flex flex-row items-center">
                  <button
                    className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                    onClick={() => setAmount((prev) => prev - 1)}
                  >
                    -
                  </button>
                  <span className="py-4 px-6 rounded-lg">{amount}</span>
                  <button
                    className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                    onClick={() => setAmount((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div> */}
          <button
            onClick={() => handleAddToSelect(product)}
            className="bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold py-3 px-16 rounded-xl h-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;

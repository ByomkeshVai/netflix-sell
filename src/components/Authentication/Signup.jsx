import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { saveUser } from "../../api/auth";
import { Helmet } from "react-helmet";
import { ImSpinner2 } from "react-icons/Im";
import { AiOutlineEye } from "react-icons/Ai";
import { imageUpload } from "../../api/utlits";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const passwords = watch("password");
  const { createUser, updateUserProfile, loading, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [loginError, setLoginError] = useState("");

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setLoginError("Passwords do not match");
    }

    function generateRandomID() {
      const min = 10000; // Minimum 5-digit number (10000)
      const max = 99999; // Maximum 5-digit number (99999)
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // const generateRandomID = () => {
    //   const randomNumber = Math.floor(Math.random() * 99999) + 10000; // Generate a random number between 10000 and 99999
    //   return `se${randomNumber}`; // Add the 'se' prefix to the random number
    // };

    const randomID = generateRandomID();

    const photoUrl =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPnb_I_OQt7Mcts15Kf9qwVchNCE7SJlkfYQ&usqp=CAU";

    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, photoUrl);
      navigate(from, { replace: true });
      const saveUser = {
        userID: randomID,
        name: data.name,
        email: data.email,
        phone: data.phone,
        photo: photoUrl,
        role: "customer",
      };
      fetch(`${import.meta.env.VITE_API_URL}/users/${loggedUser.email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("Signup Successful");
          }
        });
    });
  };

  return (
    <div className="bg-gray-900">
      <Helmet>
        <title>Stream Cart - Register</title>
      </Helmet>
      <div>
        <div className="hero-content flex-col lg:flex-row-reverse mx-auto text-center">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="phone"
                  {...register("phone", { required: true })}
                  name="phone"
                  placeholder="Phone Number"
                  className="input input-bordered"
                />
                {errors.phone && (
                  <span className="text-red-600">Phone Number is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type={passwordShown ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                <AiOutlineEye
                  onClick={togglePassword}
                  className="absolute right-10 bottom-40 top-80 cursor-pointer"
                ></AiOutlineEye>
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === passwords || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
                {loginError && <p className="text-red-600">{loginError}</p>}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control mt-6">
                <button
                  disabled={!!errors.confirmPassword}
                  type="submit"
                  className="bg-blue-900 w-full rounded-md py-3 text-white"
                >
                  {loading ? (
                    <ImSpinner2 className="m-auto animate-spin" size={24} />
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </form>
            <p className="mb-6 text-center">
              <small>
                Already have an account{" "}
                <Link to="/login" className="text-blue-900 font-bold">
                  Login
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const Reset = () => {
  const { resetPassword, loading } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailVal = e.target.email.value;
    resetPassword(emailVal)
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Yahooo...",
          text: "Check Your Email For New Password",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Opss...",
          text: "Maybe Your Write The Wrong Email",
        });
      });
  };
  return (
    <>
      <Helmet>
        <title>Stream Cart - Account Reset</title>
      </Helmet>
      <div className="hero hero-content flex-col lg:flex-row-reverse mx-auto text-center">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h2 className="text-xl font-bold">Reset Your Password</h2>
          <form onSubmit={(e) => handleSubmit(e)} className="card-body">
            <div className="form-control">
              <label className="label ">Your Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered mb-5"
                placeholder="Your Email"
              />
              <button
                type="submit"
                className="bg-blue-900 w-full rounded-md py-3 text-white"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Reset;

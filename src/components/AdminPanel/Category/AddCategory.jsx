import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { useState } from "react";
import { imageUpload } from "../../../api/utlits";
import { addCategory } from "../../../api/category";
import AddCategoryForm from "./AddCategoryForm";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

const AddCategory = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const label = event.target.label.value;
    const description = event.target.description.value;
    const image = event.target.image.files[0];
    const category = event.target.category.value;
    setUploadButtonText("Uploading...");
    // Upload image
    imageUpload(image)
      .then((data) => {
        const itemData = {
          label,
          description,
          image: data.data.display_url,
          category,
        };

        // post item data to server
        addCategory(itemData)
          .then((data) => {
            setUploadButtonText("Uploaded!");
            setLoading(false);
            toast.success("Category Added!");
            navigate("/admin/dashboard/all-category");
          })
          .catch((err) => console.log(err));

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const handleImageChange = (image) => {
    setUploadButtonText(image.name);
  };
  return (
    <div>
      <div className="">
        <Helmet>
          <title>Stream Cart - Add Category</title>
        </Helmet>
        <AddCategoryForm
          handleSubmit={handleSubmit}
          loading={loading}
          handleImageChange={handleImageChange}
          uploadButtonText={uploadButtonText}
        ></AddCategoryForm>
      </div>
    </div>
  );
};

export default AddCategory;

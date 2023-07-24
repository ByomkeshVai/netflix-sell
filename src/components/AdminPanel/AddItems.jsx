import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet";
import AddItemForm from "./AddItemForm";
import { imageUpload } from "../../api/utlits";
import { addItemData } from "../../api/item";

const AddItems = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const name = event.target.name.value;
    const price = event.target.price.value;
    const duration = event.target.duration.value;
    const stock = event.target.stock.value;
    const image = event.target.image.files[0];
    const category = event.target.category.value;
    setUploadButtonText("Uploading...");
    // Upload image
    imageUpload(image)
      .then((data) => {
        const itemData = {
          name,
          stock: parseInt(stock),
          duration: parseInt(duration),
          price: parseFloat(price),
          image: data.data.display_url,
          category,
          purchased: parseInt(0),
        };

        // post item data to server
        addItemData(itemData)
          .then((data) => {
            setUploadButtonText("Uploaded!");
            setLoading(false);
            toast.success("Items Added!");
            navigate("/admin/dashboard/allItem");
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
    <div className="">
      <Helmet>
        <title>Stream Cart - Add Items</title>
      </Helmet>
      <AddItemForm
        handleSubmit={handleSubmit}
        loading={loading}
        handleImageChange={handleImageChange}
        uploadButtonText={uploadButtonText}
      ></AddItemForm>
    </div>
  );
};

export default AddItems;

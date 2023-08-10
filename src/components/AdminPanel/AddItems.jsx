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
import noimg from "../../assets/noimg.png";

const AddItems = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const [selectedApply, setSelectedApply] = useState("");

  const handleApplyChange = (option) => {
    setSelectedApply(option);
  };

  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [uploadButtonText2, setUploadButtonText2] =
    useState("2nd Upload Image ");
  const [uploadButtonText3, setUploadButtonText3] =
    useState("3rd Upload Image");
  const [uploadButtonText4, setUploadButtonText4] =
    useState("4th Upload Image");
  // handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const name = event.target.name.value;
    const price = event.target.price.value;
    const duration = event.target.duration.value;
    const stock = event.target.stock.value;
    const description = event.target.description.value;
    const image = event.target.image.files[0];
    const image2 = event.target.image2.files[0];
    const image3 = event.target.image3.files[0];
    const image4 = event.target.image4.files[0];

    const category = event.target.category.value;
    const label = event.target.label.value;
    setUploadButtonText("Uploading...");

    try {
      // Define default values for imageData1, imageData2, imageData3, and imageData4
      let imageData1 = null;
      let imageData2 = null;
      let imageData3 = null;
      let imageData4 = null;

      // Uploading images conditionally
      if (image) {
        imageData1 = await imageUpload(image);
      }
      if (image2) {
        imageData2 = await imageUpload(image2);
      }
      if (image3) {
        imageData3 = await imageUpload(image3);
      }
      if (image4) {
        imageData4 = await imageUpload(image4);
      }

      const itemData = {
        name,
        stock: parseInt(stock),
        duration: parseInt(duration),
        price: parseFloat(price),
        description,
        image: imageData1
          ? imageData1.data.display_url
          : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
        image2: imageData2
          ? imageData2.data.display_url
          : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
        image3: imageData3
          ? imageData3.data.display_url
          : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
        image4: imageData4
          ? imageData4.data.display_url
          : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
        category,
        label,
        type: selectedOption,
        option: selectedApply,
      };

      console.log(itemData);

      // post item data to server
      addItemData(itemData)
        .then(() => {
          setUploadButtonText("Uploaded!");
          setLoading(false);
          toast.success("Items Added!");
          navigate("/admin/dashboard/allItem");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const handleImageChange = (image) => {
    setUploadButtonText(image ? image.name : "Upload Image");
  };

  const handleImageChange2 = (image2) => {
    setUploadButtonText2(image2 ? image2.name : "2nd Upload Image");
  };

  const handleImageChange3 = (image3) => {
    setUploadButtonText3(image3 ? image3.name : "3rd Upload Image");
  };

  const handleImageChange4 = (image4) => {
    setUploadButtonText4(image4 ? image4.name : "4th Upload Image");
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
        handleImageChange2={handleImageChange2}
        handleImageChange3={handleImageChange3}
        handleImageChange4={handleImageChange4}
        uploadButtonText={uploadButtonText}
        uploadButtonText2={uploadButtonText2}
        uploadButtonText3={uploadButtonText3}
        uploadButtonText4={uploadButtonText4}
        handleOptionChange={handleOptionChange}
        handleApplyChange={handleApplyChange}
      ></AddItemForm>
    </div>
  );
};

export default AddItems;

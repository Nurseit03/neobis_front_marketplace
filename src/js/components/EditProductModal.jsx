import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import axios from '../api/axios';
import close from '../../img/close.png';
import add from '../../img/image-add.png';

const EditProductModal = ({editModalOpen,setEditModalOpen, product_id}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [allInputsComplete, setAllInputsComplete] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [short_description, setShortDescription] = useState("");
    const [full_description, setFullDescription] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
    };
    
    const handleButtonClick = () => {
        document.getElementById('file_input').click();
    };
    const handleInputChange = () => {
      const inputs = document.querySelectorAll('.modal__product__description');
      let isComplete = true;
      inputs.forEach((input) => {
        if (input.value.trim() === '') {
          isComplete = false;
          return;
        }
      });
      setAllInputsComplete(isComplete);
  };

  const handleCloseModal = () => {
      setEditModalOpen(false);
  };
  const handleSubmit = async (e) => {
      e.preventDefault(); 
      const form = e.target;
      const inputs = form.querySelectorAll('.modal__product__description');
      const formData = {};
      inputs.forEach((input) => {
        formData[input.name] = input.value;
      });
      formData['photo'] = selectedImage;
      delete formData['photo'];
      console.log("Form data:",formData); 
      handleCloseModal();

      try {
          const accessToken = localStorage.getItem('access-token');
          const response = await axios.patch(`/products/${product_id}/`, formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          console.log("Successfull patched:", response);
          console.log("Product data",response.data); 

          window.location.reload();
        } catch (error) {
          console.error(error); 
        }

    };

  useEffect(() => {
      const fetchProductData = async () => {
        try {
          const accessToken = localStorage.getItem('access-token');
          const response = await axios.get(`/products/${product_id}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setPrice(response.data.price);
          setName(response.data.name);
          setShortDescription(response.data.short_description);
          setFullDescription(response.data.full_description);
        } catch (error) {
          console.log('Fetch product data error:', error);
        }
      };
  
      if (editModalOpen) {
        fetchProductData();
      }
    }, [editModalOpen, product_id]);
    return (
        <ReactModal 
        isOpen={editModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Модальное окно"
        className="modal__content add__product"
        overlayClassName="modal__overlay"
        >
        <button onClick={handleCloseModal} className="modal__close__image">
          <img src={close} alt="Close"/>
        </button>
        <form onSubmit={handleSubmit} className="add__product__form">
            <div className="all_items">
                <button type="button" onClick={handleButtonClick} className="file_input__button">
                    <img src={add} alt="#"/>
                    <p>Добавить фото</p>
                </button>
                {selectedImage && <img src={selectedImage} alt="image" className="selected_image"/>}
            </div>
            <div className="product__descriptions">
                <input id="file_input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }}/>
                <input type="text" className="modal__product__description" placeholder={price} onChange={handleInputChange} name="price"/>
                <input type="text" className="modal__product__description" placeholder={name} onChange={handleInputChange} name="name"/>
                <input type="text" className="modal__product__description" placeholder={short_description} onChange={handleInputChange} name="short_description"/>
                <textarea type="text" className="modal__product__description" placeholder={full_description} onChange={handleInputChange} name="full_description"/>
            </div>
            <button type="submit" className={`modal__continue__button ${allInputsComplete ? 'complete' : ''}`} >Далее</button>
        </form>
        </ReactModal>
    )
}

export default EditProductModal

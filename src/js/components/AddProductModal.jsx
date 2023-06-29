import React , {useState} from 'react'
import ReactModal from 'react-modal';
import close from '../../img/close.png';
import add from '../../img/image-add.png';
import axios from '../api/axios';


const AddProductModal = ({handleCloseModal}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [allInputsComplete, setAllInputsComplete] = useState(false);

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
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const form = e.target;
        const inputs = form.querySelectorAll('.modal__product__description');
        const formData = {};
        inputs.forEach((input) => {
          formData[input.name] = input.value;
        });
        formData['photo'] = selectedImage;
        delete formData['full_description'];    //Можно убрать удаление, когда бэк добавит это поле
        delete formData['photo'];
        console.log("Form data:",formData); 
        handleCloseModal();

        try {
            console.log(formData);
            const accessToken = localStorage.getItem('access-token');
            const response = await axios.post('/products/', formData, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            console.log(response.data); 
          } catch (error) {
            console.error(error); 
          }

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

    return (
        <>
            <ReactModal 
            isOpen={true}
            onRequestClose={handleCloseModal}
            contentLabel="Модальное окно"
            className="modal__content add__product"
            overlayClassName="modal__overlay"
            >
            <button onClick={handleCloseModal} className="close__modal__image"><img src={close} alt="X"/></button>
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
                    <input type="text" className="modal__product__description" placeholder="Цена $" onChange={handleInputChange} name="price"/>
                    <input type="text" className="modal__product__description" placeholder="Название" onChange={handleInputChange} name="name"/>
                    <input type="text" className="modal__product__description" placeholder="Краткое описание" onChange={handleInputChange} name="description"/>
                    <textarea type="text" className="modal__product__description" placeholder="Полное описание" onChange={handleInputChange} name="full_description"/>
                </div>
                <button type="submit" className={`modal__continue__button ${allInputsComplete ? 'complete' : ''}`} >Далее</button>
            </form>
            </ReactModal>
        </>
    )
}

export default AddProductModal

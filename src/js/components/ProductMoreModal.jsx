import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import edit from '../../img/edit.png';
import trash from '../../img/delete.png';
import rectangle from '../../img/products_more_rectangle.png';
import axios from '../api/axios';
import EditProductModal from '../components/EditProductModal';

const ProductMoreModal = ({ isOpen, onClose, product_id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const deleteProduct = async () => {
        try {
          let accessToken = localStorage.getItem('access-token');
          await axios.delete(`/products/${product_id}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log(`Product ${product_id} deleted successfully`);
          
          const uploadedProducts = localStorage.getItem('UploadedProducts');
          if (uploadedProducts) {
            const updatedUploadedProducts = JSON.parse(uploadedProducts).filter(
              (id) => id !== product_id
            );
            localStorage.setItem(
              'UploadedProducts',
              JSON.stringify(updatedUploadedProducts)
            );
          }

          window.location.reload();
        } catch (error) {
          console.log('Delete product error:', error);
        }
      };   

    const handleOpenModal = () =>{
        setEditModalOpen(true);
        
      }

    return (
        <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Модальное окно"
        className="product__more__modal"
        overlayClassName="modal__overlay"
        >
        <div className="product__more__actions">
            <button className="product__more__action" onClick={handleOpenModal}>
                <img src={edit} alt="#" className="product__more__action-image"/>
                <p>Изменить</p>
            </button>
            <img src={rectangle} alt="#"/>
            <button className="product__more__action" onClick={deleteProduct}>
                <img src={trash} alt="#" className="product__more__action-image"/>
                <p>Удалить</p>
            </button>
        </div>

        {editModalOpen && (
            <EditProductModal 
            editModalOpen={editModalOpen}
            setEditModalOpen={setEditModalOpen}
            product_id={product_id}
            />
        )}
        </ReactModal>
    )
}

export default ProductMoreModal

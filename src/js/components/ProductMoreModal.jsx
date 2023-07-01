import React, {useState} from 'react';
import ReactModal from 'react-modal';
import edit from '../../img/edit.png';
import trash from '../../img/delete.png';
import rectangle from '../../img/products_more_rectangle.png';

const ProductMoreModal = ({ isOpen, onClose }) => {
    return (
        <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Модальное окно"
        className="product__more__modal"
        overlayClassName="modal__overlay"
        >
        <div className="product__more__actions">
            <button className="product__more__action">
                <img src={edit} alt="#" className="product__more__action-image"/>
                <p>Изменить</p>
            </button>
            <img src={rectangle} alt="#"/>
            <button className="product__more__action">
                <img src={trash} alt="#" className="product__more__action-image"/>
                <p>Удалить</p>
            </button>
        </div>
        </ReactModal>
    )
}

export default ProductMoreModal

import React, { useState } from "react";
import styled from "styled-components";

function About({ products }) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleClick = (product) => {
        setSelectedProduct(product);
    };

    const handleClose = () => {
        setSelectedProduct(null);
    };

    return (
        <div>
            <h1>This is the About Page</h1>
            <h2>Click on one of the cats to find out more about</h2>
            <ProductsWrapper>
                {products.map((product, index) => (
                    <ProductWrapper key={index} onClick={() => handleClick(product)}>
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    </ProductWrapper>
                ))}
            </ProductsWrapper>
            {selectedProduct && <Modal product={selectedProduct} onClose={handleClose} />}
        </div>
    );
}

const Modal = ({ product, onClose }) => {
    return (
        <ModalWrapper>
            <ModalContent>
                <ModalHeader>
                    <h2>Name: {product.name}</h2>
                    <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
                </ModalHeader>
                    <ModalImage src={product.image} alt={product.name} />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </ModalContent>
        </ModalWrapper>
    );
};
    
export default About;

const ProductsWrapper = styled.div` 
    display: flex; 
    flex-wrap: wrap; 
    justify-content: center;
`

const ProductWrapper = styled.div`
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    text-align: center;
    cursor: pointer;

    img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    }

    h3 {
    margin-top: 10px;
    font-size: 20px;
    }

    p {
    margin-top: 5px;
    font-size: 16px;
    }
`

const ModalWrapper = styled.div `
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%; 
    background-color: rgba(0, 0, 0, 0.5); 
    display: flex; 
    justify-content: center; 
    align-items: center;
`

const ModalContent = styled.div` 
    background-color: #fff; 
    padding: 20px; 
    border-radius: 5px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 400px;
    height: 500px;
`

const ModalHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-right: 30px;
`

const ModalCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
`

const ModalImage = styled.img`
    width: 300px;
    height: 300px;
`
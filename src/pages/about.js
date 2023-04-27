import React, { useState } from "react";
import styled from "styled-components";

function About({ products }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    const handleClick = (products) => {
      setSelectedProduct(products);
    };
  
    const handleClose = () => {
      setSelectedProduct(null);
    };
  
    return (
      <>
        {products && products.length > 0 ? (
          <>
            <ProductsWrapper>
              {products.map((products, index) => (
                <ProductWrapper key={index} onClick={() => handleClick(products)}>
                  <img src={products.image} alt={products.name} />
                  <h3>{products.name}</h3>
                  <p>{products.price}</p>
                </ProductWrapper>
              ))}
            </ProductsWrapper>
            {selectedProduct && <Modal products={selectedProduct} onClose={handleClose} />}
          </>
        ) : (
          <div>No products found</div>
        )}
      </>
    );
  }

const Modal = ({ products, onClose }) => {
    return (
        <ModalWrapper>
            <ModalContent>
                <ModalHeader>
                    <h2>{products.name}</h2>
                    <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
                </ModalHeader>
                    <ModalImage src={products.image} alt={products.name} />
                    <p>{products.description}</p>
                    <p>Price: {products.price}</p>
                    <p>Category: {products.category}</p>
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
`

const ModalHeader = styled.div` 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 10px;
`

const ModalCloseButton = styled.button` 
    border: none; 
    background-color: transparent; 
    font-size: 20px; 
    cursor: pointer;
`

const ModalImage = styled.img`
    width: 300px;
    height: 300px;
`
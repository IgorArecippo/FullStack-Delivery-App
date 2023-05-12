import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryContext from '../contextAPI/deliveryContext';
import { requestData } from '../services/requests';

function Products() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    results,
    setResults,
    carrinho, setCarrinho,
  } = useContext(DeliveryContext);
  const onze = 11;
  const resultsMap = results.slice(0, onze);

  const calculator = () => {
    let valor = 0;
    const copyCarrinho = carrinho;
    copyCarrinho.forEach((produto) => {
      valor += Number(produto.price) * Number(produto.quantidade);
      return setTotalPrice(valor);
    });
  };

  // const verifyLocalStorage = () => {
  //   const carrinhoSaved = JSON.parse(localStorage.getItem('carrinho'));
  //   if (carrinhoSaved) {
  //     console.log('caiu aqui');
  //     setCarrinho(carrinhoSaved);
  //     const copyResults = results;
  //     const newResults = copyResults.map((p) => {
  //       const product = carrinhoSaved.find((pSaved) => pSaved.id === p.id);
  //       console.log(product);
  //       if (product) {
  //         return product;
  //       }
  //       return p;
  //     });
  //     setResults(newResults);
  //     console.log(copyResults);
  //     console.log(newResults);
  //   }
  //   if (!carrinhoSaved) setCarrinho([]);
  //   calculator();
  //   console.log(carrinhoSaved);
  // };

  useEffect(() => {
    const featchAll = async () => {
      const data = await requestData('/customer/products');
      const quantidade = data.map((prod) => {
        prod.quantidade = 0;
        return prod;
      });
      setResults(quantidade);
    };
    featchAll();
    // verifyLocalStorage();
    setIsLoading(false);
  }, []);

  const increaseQuantidade = (id, state) => {
    state.map((p) => {
      if (p.id === id) {
        p.quantidade += 1;
        return p;
      }
      return p;
    });
    return state;
  };

  const verifyCarrinhoAdd = (id) => {
    const copyCarrinho = carrinho;
    const verify = copyCarrinho.find((p) => p.id === id);
    if (verify) {
      const newCarrinho = increaseQuantidade(id, copyCarrinho);
      setCarrinho(newCarrinho);
      localStorage.setItem('carrinho', JSON.stringify(newCarrinho));
    } else {
      const product = results.find((p) => p.id === id);
      product.quantidade = 1;
      copyCarrinho.push(product);
      setCarrinho(copyCarrinho);
      localStorage.setItem('carrinho', JSON.stringify(copyCarrinho));
    }
  };

  const addItem = ({ target }) => {
    const id = Number(target.id);
    verifyCarrinhoAdd(id);
    calculator();
  };

  const decreasesQuantidade = (id, state) => {
    state.map((p) => {
      if (Number(p.id) === id) {
        p.quantidade -= 1;
        return p;
      }
      return p;
    });
    return state;
  };

  const verifyCarrinhoRemove = (id) => {
    const copyCarrinho = carrinho;
    const getProduct = copyCarrinho.find((p) => p.id === id);
    if (!getProduct) return null; // para não quebrar ao tentar diminuir um produto inexistente no carrinho.
    if (getProduct.quantidade === 1) {
      const newCarrinho = copyCarrinho.filter((p) => p.id !== id);
      setCarrinho(newCarrinho);
      localStorage.setItem('carrinho', JSON.stringify(newCarrinho));
      const copyResults = results;
      const newResults = decreasesQuantidade(id, copyResults);
      setResults(newResults);
    } else {
      const newCarrinho = decreasesQuantidade(id, copyCarrinho);
      setCarrinho(newCarrinho);
      localStorage.setItem('carrinho', JSON.stringify(newCarrinho));
    }
  };

  const removeItem2 = ({ target }) => {
    const id = Number(target.id);
    verifyCarrinhoRemove(id);
    calculator();
  };

  const handleInput = (event) => {
    const prodId = Number(event.target.id);
    const { value } = Number(event.target);
    const newLittleCar = carrinho;

    if (value < 1) {
      newLittleCar.filter((p) => p.id !== prodId);
      return setCarrinho(newLittleCar);
    }

    const produtoNoCarrinho = carrinho.find((item) => Number(item.id) === prodId);
    if (!produtoNoCarrinho) {
      const resultado = results.find((item) => Number(item.id) === prodId);
      newLittleCar.push(resultado);
    }
    newLittleCar.map((p) => {
      if (Number(p.id) === prodId) {
        p.quantidade = value;
        return p;
      }
      return p;
    });
    setCarrinho(newLittleCar);
    localStorage.setItem('carrinho', JSON.stringify(newLittleCar));
  };

  const buttonCarrinho = () => {
    history.push('/customer/checkout');
  };

  return (
    <div>
      <div>
        {isLoading ? (
          <p>Carregando...</p>)
          : (
            <div>
              {
                resultsMap.map((res) => (
                  <div key={ res.id }>
                    <p
                      className="product-price"
                      data-testid={ `customer_products__element-card-price-${res.id}` }
                    >
                      { `${res.price.replace(/\./, ',')}` }
                    </p>
                    <img
                      className="img-Products"
                      data-testid={ `customer_products__img-card-bg-image-${res.id}` }
                      src={ res.urlImage }
                      alt={ res.name }
                    />
                    <p
                      className="product-name"
                      data-testid={ `customer_products__element-card-title-${res.id}` }
                    >
                      {res.name}
                    </p>
                    <button
                      type="button"
                      id={ res.id }
                      data-testid={ `customer_products__button-card-rm-item-${res.id}` }
                      onClick={ removeItem2 }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      onChange={ handleInput }
                      id={ res.id }
                      data-testid={ `customer_products__input-card-quantity-${res.id}` }
                      value={ res.quantidade }
                    />
                    <button
                      type="button"
                      data-testid={ `customer_products__button-card-add-item-${res.id}` }
                      id={ res.id }
                      onClick={ addItem }
                    >
                      +
                    </button>
                  </div>
                ))
              }
            </div>
          )}
      </div>
      <button
        className="total-button"
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ buttonCarrinho }
      >
        {`Ver carrinho: R$${totalPrice.toFixed(2)}`}

      </button>
    </div>
  );
}

export default Products;

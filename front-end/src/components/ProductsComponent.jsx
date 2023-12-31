import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryContext from '../contextAPI/deliveryContext';
import { requestData } from '../services/requests';

function Products() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  // const [totalPrice, setTotalPrice] = useState(0);

  const {
    results,
    setResults,
    carrinho, setCarrinho,
    totalPrice, setTotalPrice,
  } = useContext(DeliveryContext);

  const calculator = () => {
    let valor = 0;
    const copyCarrinho = carrinho;
    copyCarrinho.forEach((produto) => {
      valor += Number(produto.price) * Number(produto.quantidade);
      localStorage.setItem('totalPrice', JSON.stringify(valor));
      return setTotalPrice(valor);
    });
  };

  // const verifyLocalStorage = () => {
  //   const carrinhoSaved = JSON.parse(localStorage.getItem('carrinho'));
  //   const resultsSaved = JSON.parse(localStorage.getItem('results'));
  //   // const priceSaved = JSON.parse(localStorage.getItem('totalPrice'));
  //   if (carrinhoSaved) {
  //     setCarrinho(carrinhoSaved);
  //     console.log('carrinho', carrinhoSaved);
  //     setResults(resultsSaved);
  //     console.log('results', resultsSaved);
  //     // setTotalPrice(priceSaved);
  //     calculator();
  //   }
  // };

  useEffect(() => {
    const featchAll = async () => {
      const data = await requestData('/customer/products');
      const quantidade = data.map((prod) => {
        prod.quantidade = 0;
        return prod;
      });
      setResults(quantidade);
      // verifyLocalStorage();
      calculator();
    };
    featchAll();
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
      localStorage.setItem('results', JSON.stringify(results));
    } else {
      const product = results.find((p) => p.id === id);
      product.quantidade += 1;
      copyCarrinho.push(product);
      setCarrinho(copyCarrinho);
      localStorage.setItem('carrinho', JSON.stringify(copyCarrinho));
      localStorage.setItem('results', JSON.stringify(results));
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
      localStorage.setItem('results', JSON.stringify(results));
      const copyResults = results;
      const newResults = decreasesQuantidade(id, copyResults);
      setResults(newResults);
    } else {
      const newCarrinho = decreasesQuantidade(id, copyCarrinho);
      setCarrinho(newCarrinho);
      localStorage.setItem('carrinho', JSON.stringify(newCarrinho));
      localStorage.setItem('results', JSON.stringify(results));
    }
  };

  const removeItem = ({ target }) => {
    const id = Number(target.id);
    verifyCarrinhoRemove(id);
    calculator();
  };

  const handleInput = (event) => {
    const { id, value } = event.target;
    const quantity = Number(value);

    const copyResults = results;
    copyResults.map((p) => {
      if (p.id === Number(id)) {
        p.quantidade = quantity;
        return p;
      }
      return p;
    });
    setResults(copyResults);
    localStorage.setItem('results', JSON.stringify(copyResults));
    const verifyCarrinho = carrinho.find((p) => p.id === Number(id));
    if (!verifyCarrinho) {
      const product = copyResults.find((p) => p.id === Number(id));
      const newCarrinho = carrinho;
      newCarrinho.push(product);
      setCarrinho(newCarrinho);
      localStorage.setItem('carrinho', JSON.stringify(newCarrinho));
    }
    calculator();
    console.log(copyResults);
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
                results.map((res) => (
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
                      onClick={ removeItem }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      onChange={ handleInput }
                      id={ res.id }
                      data-testid={ `customer_products__input-card-quantity-${res.id}` }
                      value={ res.quantidade }
                      min={ 0 }
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
        disabled={ carrinho.length === 0 }
        onClick={ buttonCarrinho }
      >
        Ver Carrinho: R$
        {' '}
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { totalPrice.toFixed(2).replace(/\./, ',') }
        </span>
      </button>
    </div>
  );
}

export default Products;

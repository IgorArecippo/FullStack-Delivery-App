import React, { useEffect, useContext, useState } from 'react';
import DeliveryContext from '../contextAPI/deliveryContext';
import { requestData, setLocalStorage } from '../services/requests';

function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    results,
    setResults,
    carrinho, setCarrinho,
  } = useContext(DeliveryContext);
  const onze = 11;
  const resultsMap = results.slice(0, onze);

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
    setIsLoading(false);
  }, [setResults]);

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

  const addItem = (event) => {
    const prodId = Number(event.target.id);
    const resultado = results.find((item) => Number(item.id) === prodId); // produto em objeto
    const produtoNoCarrinho = carrinho.find((item) => Number(item.id) === prodId); // checa se existe o produto no carrinho
    if (produtoNoCarrinho) {
      const novo = carrinho;
      novo.map((p) => {
        if (Number(p.id) === prodId) {
          p.quantidade += 1;
          return p;
        }
        return p;
      });
      setCarrinho(novo);
      setLocalStorage('Carrinho', novo);
    }

    if (!produtoNoCarrinho) {
      resultado.quantidade = 1;
      const novo = carrinho;
      novo.push(resultado);
      setCarrinho(novo);
      setLocalStorage('Carrinho', novo);
    }
  };

  const removeItem = (event) => {
    const prodId = Number(event.target.id);

    const produtoNoCarrinho = carrinho.find((item) => Number(item.id) === prodId); // checa se existe o produto no carrinho

    if (!produtoNoCarrinho) {
      return console.log('zerou');
    }

    const newArrayProducts = decreasesQuantidade(prodId, results);
    setResults(newArrayProducts);

    if (produtoNoCarrinho.quantidade === 0) {
      const novo = carrinho.filter((item) => item.id !== prodId);

      setCarrinho(novo);
      setLocalStorage('Carrinho', novo);
    }

    if (produtoNoCarrinho.quantidade > 1) {
      const novo = carrinho;
      novo.map((p) => {
        if (Number(p.id) === prodId) {
          p.quantidade -= 1;
          return p;
        }
        return p;
      });
      setCarrinho(novo);
      setLocalStorage('Carrinho', novo);
    }
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
                      onClick={ removeItem }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      // onChange={ handleInput }
                      data-testid={ `customer_products__input-card-quantity-${res.id}` }
                      defaultValue={ res.quantidade }
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
    </div>
  );
}

export default Products;

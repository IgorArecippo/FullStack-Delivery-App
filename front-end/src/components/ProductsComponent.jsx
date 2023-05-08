import React, { useEffect, useContext, useState } from 'react';
import DeliveryContext from '../contextAPI/deliveryContext';
import { requestData } from '../services/requests';

function Products() {
  // const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    results,
    setResults,
  } = useContext(DeliveryContext);
  const onze = 11;
  const resultsMap = results.slice(0, onze);

  useEffect(() => {
    const featchAll = async () => {
      const data = await requestData('/customer/products');
      setResults(data);
    };
    featchAll();
    setIsLoading(false);
  }, [setResults]);

  return (
    <div>
      <div>
        {isLoading ? (
          <p>Carregando...</p>)
          : (
            <div>
              {
                resultsMap.map((result) => (
                  <div key={ result.id }>
                    <p
                      className="product-price"
                      data-testid={ `customer_products__element-card-price-${result.id}` }
                    >
                      {result.price}
                    </p>
                    <img
                      className="img-Products"
                      data-testid={ `ustomer_products__img-card-bg-image-${result.id}` }
                      src={ result.urlImage }
                      alt={ result.name }
                    />
                    <p
                      className="product-name"
                      data-testid={ `customer_products__element-card-title-${result.id}` }
                    >
                      {result.name}
                    </p>
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

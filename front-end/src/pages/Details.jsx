import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import DeliveryContext from '../contextAPI/deliveryContext';

function Details() {
  const {
    carrinho,
    totalPrice,
    orders,
    setOrders,
  } = useContext(DeliveryContext);
  const { id, date, status, sellerId, deliveryAddress, deliveryNumber } = orders;
  const [isDisabled, setIsDisabled] = useState(false);

  const handleButton = () => {
    if (status === 'Pendente') {
      setOrders({
        userId: id,
        totalPrice,
        sellerId,
        deliveryAddress,
        deliveryNumber,
        status: 'Entregue',
      });
      setIsDisabled(true);
    }
  };

  return (
    <div>
      <Header />
      <h3>Detalhes do Pedido</h3>
      <p>{id}</p>
      <p>{`Vendedor ${sellerId}`}</p>
      <p>{date}</p>
      <p>{status}</p>
      <button
        type="button"
        onClick={ handleButton }
        disabled={ isDisabled }
      >
        MARCAR COMO ENTREGUE
      </button>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
          {
            carrinho.map((p, i) => (
              <tr key={ i }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${i}`
                  }
                >
                  {(i + 1)}

                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-name-${i}` }
                >
                  {p.name}
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
                >
                  {p.quantidade}
                </td>
                <td data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }>{`R$${p.price.replace(/\./, ',')}`}</td>
                <td data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }>{`R$${(p.quantidade * p.price).toFixed(2).replace(/\./, ',')}`}</td>
              </tr>
            ))
          }
        </thead>
      </table>
      <h3 data-testid="customer_checkout__element-order-total-price">{`Total: R$${totalPrice.toFixed(2).replace(/\./, ',')}`}</h3>
    </div>
  );
}

export default Details;

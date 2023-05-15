import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import DeliveryContext from '../contextAPI/deliveryContext';

function Checkout() {
  const { carrinho,
    totalPrice, setCarrinho, setTotalPrice } = useContext(DeliveryContext);
  const history = useHistory();

  const deleteSingleItem = (id) => {
    // const id = Number(target.id);
    const returnCarrinho = carrinho.filter((p) => p.id !== id);
    setCarrinho(returnCarrinho);
  };

  const buttonDetails = () => {
    history.push('/customer/details');
  };

  return (
    <div>
      <Header />
      <h3>Finalizar Pedido</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
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
                <td>
                  <button
                    type="button"
                    onClick={ () => deleteSingleItem(p.id) }
                    data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          }
        </thead>
      </table>
      <h3 data-testid="customer_checkout__element-order-total-price">{`Total: R$${totalPrice.toFixed(2).replace(/\./, ',')}`}</h3>
      <form>
        <h3>Detalhes e Endereço para Entrega</h3>
        <label htmlFor="vendedor" data-testid="customer_checkout__select-seller">
          P. Vendedora Responsável:
          <select name="vendedor" id="vendedor">
            <option value="vendedor1">vendedor1</option>
            <option value="vendedor2">vendedor2</option>
            <option value="vendedor3">vendedor3</option>
          </select>
        </label>
        <p>Endereço</p>
        <input type="text" data-testid="customer_checkout__input-address" />
        <p>Número</p>
        <input type="text" data-testid="customer_checkout__input-address-number" />
        <button
          type="button"
          onClick={ buttonDetails }
          data-testid="customer_checkout__button-submit-order"
        >
          FINALIZAR PEDIDO

        </button>
      </form>
    </div>
  );
}

export default Checkout;

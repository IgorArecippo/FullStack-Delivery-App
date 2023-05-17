import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import DeliveryContext from '../contextAPI/deliveryContext';
import { requestRegister, setLocalStorage } from '../services/requests';

function Checkout() {
  const {
    carrinho,
    totalPrice,
    orders,
    setCarrinho,
    setTotalPrice,
    setOrders,
  } = useContext(DeliveryContext);
  const history = useHistory();
  const [sellerId, setSellerId] = useState(1);
  const [address, setAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');

  const deleteSingleItem = (id) => {
    const returnCarrinho = carrinho.filter((p) => p.id !== id);
    const productPrice = returnCarrinho.map((p) => Number(p.price * p.quantidade));
    if (carrinho.length > 1) {
      const newPrice = productPrice.reduce((acc, curr) => Number(acc) + Number(curr));
      setTotalPrice(newPrice);
    } else {
      setTotalPrice(0);
    }
    setCarrinho(returnCarrinho);
  };

  const handleInputAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleInputNumber = (event) => {
    setDeliveryNumber(event.target.value);
  };

  const handleSellerId = (event) => {
    setSellerId(Number(event.target.value));
  };

  const handleOrder = () => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    const infoOrders = {
      userId: id,
      totalPrice,
      sellerId,
      deliveryAddress: address,
      deliveryNumber,
      status: 'pendente',
    };
    setOrders(infoOrders);
  };

  const finishOrder = async () => {
    handleOrder();
    console.log(orders);
    const saleId = await requestRegister('/customer/orders', orders);
    console.log(saleId);
    const { token } = JSON.parse(localStorage.getItem('user'));
    setLocalStorage(token);
    history.push(`/customer/orders/${saleId}`);
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
        <label htmlFor="vendedor">
          P. Vendedora Responsável:
          <select
            name="vendedor"
            id="vendedor"
            data-testid="customer_checkout__select-seller"
            onChange={ handleSellerId }
          >
            <option value={ 1 }>vendedor1</option>
            <option value={ 2 }>vendedor2</option>
            <option value={ 3 }>vendedor3</option>
          </select>
        </label>
        <p>Endereço</p>
        <input
          type="text"
          data-testid="customer_checkout__input-address"
          id="address"
          onChange={ handleInputAddress }
        />
        <p>Número</p>
        <input
          type="text"
          data-testid="customer_checkout__input-address-number"
          id="number"
          onChange={ handleInputNumber }
        />
        <button
          type="button"
          onClick={ finishOrder }
          data-testid="customer_checkout__button-submit-order"
        >
          FINALIZAR PEDIDO

        </button>
      </form>
    </div>
  );
}

export default Checkout;

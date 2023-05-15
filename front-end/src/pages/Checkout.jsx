import React, { useContext } from 'react';
import Header from '../components/Header';
import DeliveryContext from '../contextAPI/deliveryContext';

function Checkout() {
  const { carrinho } = useContext(DeliveryContext);

  return (
    <div>
      <Header />
      <div>
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
              carrinho.map((p, index) => (
                <tr key={ index }>
                  <td>{p.index}</td>
                  <td>{p.name}</td>
                  <td>{p.quantidade}</td>
                  <td>{`R$${p.price.replace(/\./, ',')}`}</td>
                  <td>{`R$${(p.quantidade * p.price).replace(/\./, ',')}`}</td>
                  <td>
                    <button type="button">Remover</button>
                  </td>
                </tr>
              ))
            }
          </thead>
        </table>
        <h3>{`Total: R$${totalPrice}`}</h3>
      </div>
      <div>
        <h3>Detalhes e Endereço para Entrega</h3>
        <label htmlFor="vendedor">
          P. Vendedora Responsável:
          <select name="vendedor" id="vendedor">
            <option value="vendedor1">vendedor1</option>
            <option value="vendedor2">vendedor2</option>
            <option value="vendedor3">vendedor3</option>
          </select>
        </label>
        <p>Endereço</p>
        <input type="text" />
        <p>Número</p>
        <input type="text" />
        <button type="button">FINALIZAR PEDIDO</button>
      </div>
    </div>
  );
}

export default Checkout;

import api from '../api/api';
import React from 'react';

export default function Cart() {
  const [checkoutMessage, setCheckoutMessage] = React.useState('');

  const cart = JSON.parse(localStorage.getItem('cart'));
  const NUM_COLUMNS = 5;

  const clearCart = () => {
    localStorage.removeItem('cart');

    // Create a cell that notifying the user that the table is empty
    let cartEmptyCell = document.createElement('td');
    cartEmptyCell.className = 'text-center';
    cartEmptyCell.setAttribute('colspan', NUM_COLUMNS);
    cartEmptyCell.appendChild(document.createTextNode('Cart is Empty'));

    // Clear table body and add empty table notification
    let tableBody = document.getElementById('cart-tbody');
    tableBody.innerHTML = '';
    tableBody.appendChild(cartEmptyCell);
  }

  const checkout = () => {
    const res = api.post('/preorders', { params: { cart: cart } });
    if (res.status() == 200) {
      localStorage.removeItem('cart');
      setCheckoutMessage('Your preorder has been successfully placed! Visit Carolina Closet to pickup your items within the next 24 hours.');
    } else {
      setCheckoutMessage('Unknown error occurred. Please try again later or contact Carolina Closet staff.');
    }
  }

  const removeItemFromCart = () => {
    // Search for an item with the same item id, and remove it
    for(let i = 0; i < cart.length; i++) {
      if (cart[i].id === item.id) {
        cart.splice(i,1);
        break;
      }
    }
    // Stringify and save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    event.target.parentNode.parentNode.outerHTML = '';
    if (cart.length === 0) {
      localStorage.removeItem('cart');
      clearCart();
    }
  }

  return (
    <React.Fragment>
      <div className="container">
        <h1>Your cart</h1>
        <div className="table-responsive">
          <table id="itemsTable" className="table table-striped table-bordered" cellspacing="0" width="99%">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Desc.</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {cart.forEach((item, i) => {
                <tr>
                  <td>{item.name}</td>
                  <td>INPUT TODO</td>
                  <td>{item.description ? item.description : ''}</td>
                  <td className="text-right">
                    <button 
                      className="btn btn-danger"
                      data-id={item.id}
                      onClick={() => removeItemFromCart()}
                    >
                      Remove From Cart
                    </button>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
        {checkoutMessage && (
          <div className="success">{checkoutMessage}</div>
        )}
        <div className="row">
          <div className="col-sm-6">
            <button type="button" className="btn btn-danger float-left" data-toggle="modal" data-target="#clearCartModal">Clear Cart</button>
          </div>
          <div className="col-sm-6">
            <button 
              type="button" id='checkoutButton'
              className="btn btn-primary float-right"
              onClick={() => checkout()}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
      <div className="modal fade" id="clearCartModal" tabindex="-1" role="dialog" aria-labelledby="clearCartModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <p>Are you sure you want to clear your cart?</p>
              <button type="button" className="btn btn-secondary float-left" data-dismiss="modal">Cancel</button>
              <button 
                className="btn btn-danger float-right" 
                id="clearCartButton" data-dismiss="modal"
                onClick={() => clearCart()}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
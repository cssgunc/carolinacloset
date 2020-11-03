import React from 'react';

export default function Cart() {
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
            <tbody id="cart-tbody" />
          </table>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <button type="button" className="btn btn-danger float-left" data-toggle="modal" data-target="#clearCartModal">Clear Cart</button>
          </div>
          <div className="col-sm-6">
            <button type="button" className="btn btn-primary float-right" id='checkoutButton'>Check Out</button>
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
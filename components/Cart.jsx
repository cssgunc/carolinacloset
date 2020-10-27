import React from 'react';

export default function Cart() {
  return(
    <React.Fragment>
      <div class="container">
        <h1>Your cart</h1>
        <div class="table-responsive">
          <table id="itemsTable" class="table table-striped table-bordered" cellspacing="0" width="99%">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Desc.</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody id="cart-tbody">
            </tbody>
          </table>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <button type="button" class="btn btn-danger float-left" data-toggle="modal" data-target="#clearCartModal">Clear Cart</button>
          </div>
          <div class="col-sm-6">
              <button type="button" class="btn btn-primary float-right" id='checkoutButton'>Check Out</button>
          </div>
        </div>
      </div>
      <div class="modal fade" id="clearCartModal" tabindex="-1" role="dialog" aria-labelledby="clearCartModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <p class="modal-title" id="clearCartModalLabel">Clear Cart?</p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to clear your cart?</p>
              <button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Cancel</button>
              <button class="btn btn-danger float-right" id="clearCartButton" data-dismiss="modal">Clear Cart</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ); // TODO cart script (and response.success message div ID=clear-cart)
}
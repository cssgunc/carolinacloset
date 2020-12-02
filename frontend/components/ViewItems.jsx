import React from 'react';

const items = '';

export default function ViewItems() {
  return(
    <div className="container">
      <div id="toast-div">
        <div id="toast-pos" className="toast-pos" />
      </div>
      <h1>Search for items to add to your cart</h1>
      <div className="table-responsive">
        <table id="itemsTable" className="table table-striped table-bordered" cellspacing="0" width="99%">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">In Stock</th>
              <th scope="col">Desc.</th>
              <th scope="col">Add</th>
            </tr>
          </thead>
          <tbody>
            {items && (
              items.forEach((item) => {
                if (item.count > 0) {
                  <tr>
                    <th scope="row">{item.name}</th>
                    <td>{item.count}</td>
                    <td>{item.description}</td>
                    <td className="text-right pr-1">
                      <div>
                        <input className="cartQuantity" aria-label="Add to cart quantity" type="number" min="1" max={item.count} value={1} />
                        <div className="btn-group" role="group">
                          <button 
                            type="button" 
                            className="btn btn-success addToCartButton" 
                            data-id={item.id} 
                            data-name={item.name}
                            data-barcode={item.barcode}
                            data-count={item.count} 
                            data-description={item.description}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                }
              })
            )}
          </tbody>
        </table>
      </div>
		</div>
  ); // TODO add items script from views/user/view-items.ejs
}
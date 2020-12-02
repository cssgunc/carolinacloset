import React from 'react';

const response = {
  foundItem: {
    brand_name: '',
    name: '',
    desc: '',
  },
  itemFound: {

  }
}

export default function ManualEntry() {
  return (
    <React.Fragment>
      <div className="container">
        <h1>Enter an Item Manually</h1>
        <form action="/entry/manual" method="post">
          <div className="form-group">
            <label for="name">Item Name: </label>
            <input id="name" name="name" className="form-control form-control-lg" type="text"
              placeholder="Ex. Campbell's Chicken Noodle Soup" required
              value={(response.foundItem && response.foundItem.name && response.foundItem.brand_name) 
                ? `${response.foundItem.brand_name} ${response.foundItem.name}`
                : ''}
            />
          </div>
          <div className="form-group">
            <label for="count">Count: </label>
            <input id="count" name="count" className="form-control form-control-lg" type="number" placeholder="Ex. 20" required />
          </div>
          <div className="form-group">
            <label for="description">Short Description:</label>
            <input id="description" name="description" className="form-control form-control-lg" type="text"
              placeholder="Ex. Gluten-free soup expiring 4/20/19"
              value={(response.foundItem && response.foundItem.desc) ? response.foundItem.desc : ''}
            />
          </div>
          <div className="form-group">
            <button className="form-control btn-success btn-md float-middle" type="action"
              value="Submit New Item">Submit New Item
            </button>
          </div>
        </form>
      </div>
      {response.itemFound && (
        <div className="modal fade" id="foundModal" tabIndex="-1" role="dialog" aria-labelledby="foundModalLabel"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <p className="modal-title" id="foundModalLabel">Item already found in database, do you want to update this entry?
                </p>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form name="foundForm" id="foundForm" action="/entry/manual/update" method="POST">
                  <div className="form-group">
                    <input 
                      className="form-control" type="text" name="id" id="foundModalId" readOnly hidden 
                      aria-label="item id" value={response.itemFound.id}
                    />
                  </div>
                  <div className="form-group">
                    <label for="foundModalName">Item Name</label>
                    <input className="form-control" type="text" name="name" id="foundModalName" readOnly
                      value={response.itemFound.name} 
                    />
                  </div>
                  <div className="form-group">
                    <label for="foundModalDescription">Description</label>
                    <input className="form-control" type="text" name="description" id="foundModalDescription" readOnly
                      value={response.itemFound.description}
                    />
                  </div>
                  <div className="form-group">
                    <label for="foundModalCount">Add or Remove</label>
                    <input className="form-control" type="number" name="quantity" id="foundModalCount"
                      min={`${1*response.itemFound.count}`} value={0}
                    />
                  </div>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-primary" id="submitFound">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
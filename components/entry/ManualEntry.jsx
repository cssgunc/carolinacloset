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
      <div class="container">
        <h1>Enter an Item Manually</h1>
        <form action="/entry/manual" method="post">
          <div class="form-group">
            <label for="name">Item Name: </label>
            <input id="name" name="name" class="form-control form-control-lg" type="text"
              placeholder="Ex. Campbell's Chicken Noodle Soup" required
              value={(response.foundItem && response.foundItem.name && response.foundItem.brand_name) 
                ? `${response.foundItem.brand_name} ${response.foundItem.name}`
                : ''}
            />
          </div>
          <div class="form-group">
            <label for="count">Count: </label>
            <input id="count" name="count" class="form-control form-control-lg" type="number" placeholder="Ex. 20" required />
          </div>
          <div class="form-group">
            <label for="description">Short Description:</label>
            <input id="description" name="description" class="form-control form-control-lg" type="text"
              placeholder="Ex. Gluten-free soup expiring 4/20/19"
              value={(response.foundItem && response.foundItem.desc) ? response.foundItem.desc : ''}
            />
          </div>
          <div class="form-group">
            <button class="form-control btn-success btn-md float-middle" type="action"
              value="Submit New Item">Submit New Item
            </button>
          </div>
        </form>
      </div>
      {response.itemFound && (
        <div class="modal fade" id="foundModal" tabIndex="-1" role="dialog" aria-labelledby="foundModalLabel"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <p class="modal-title" id="foundModalLabel">Item already found in database, do you want to update this entry?
                </p>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form name="foundForm" id="foundForm" action="/entry/manual/update" method="POST">
                  <div class="form-group">
                    <input 
                      class="form-control" type="text" name="id" id="foundModalId" readOnly hidden 
                      aria-label="item id" value={response.itemFound.id}
                    />
                  </div>
                  <div class="form-group">
                    <label for="foundModalName">Item Name</label>
                    <input class="form-control" type="text" name="name" id="foundModalName" readOnly
                      value={response.itemFound.name} 
                    />
                  </div>
                  <div class="form-group">
                    <label for="foundModalDescription">Description</label>
                    <input class="form-control" type="text" name="description" id="foundModalDescription" readOnly
                      value={response.itemFound.description}
                    />
                  </div>
                  <div class="form-group">
                    <label for="foundModalCount">Add or Remove</label>
                    <input class="form-control" type="number" name="quantity" id="foundModalCount"
                      min={`${1*response.itemFound.count}`} value={0}
                    />
                  </div>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-primary" id="submitFound">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
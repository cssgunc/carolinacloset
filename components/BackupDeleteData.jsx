import React from 'react';

export default function BackupDeleteData() {
  return (
    <React.Fragment>
      <h1>Backup Data</h1>
      <div class="row">
        <div class="col-sm-12">
          <form method="GET" action="/admin/backup/transactions.csv">
            <div class="form-group">
              <input class="btn btn-primary btn-lg" type="submit" value="Download Transactions" />
            </div>
          </form>
        </div>
        <div class="col-sm-12">
          <form method="GET" action="/admin/backup/items.csv">
            <div class="form-group">
              <input class="btn btn-primary btn-lg" type="submit" value="Download Items" />
            </div>
          </form>
        </div>
        <div class="col-sm-12">
          <form method="GET" action="/admin/backup/users.csv">
            <div class="form-group">
              <input class="btn btn-primary btn-lg" type="submit" value="Download Users" />
            </div>
          </form>
        </div>
      </div>
      <h1>Delete Data</h1>
      <div class="row">
        <div class="col-sm-12">
          <button type="button" class="btn btn-danger btn-lg" data-toggle="modal" data-target="#delTransModal">Delete
            Transactions
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <button type="button" class="btn btn-danger btn-lg" data-toggle="modal" data-target="#delItemsModal">Delete
            Items
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <button type="button" class="btn btn-danger btn-lg" data-toggle="modal" data-target="#delStockModal">Delete Out
            of Stock Items
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <button type="button" class="btn btn-danger btn-lg" data-toggle="modal" data-target="#delUsersModal">Delete
            Users</button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <a role="button" class="btn btn-danger btn-lg" href="/admin/database">Factory Reset</a>
        </div>
      </div>
      <div class="modal fade" id="delTransModal" tabindex="-1" role="dialog" aria-labelledby="delTransModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <p class="modal-title" id="delTransModalLabel">Delete Transactions</p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p><b>Please backup transactions before you delete them.</b> Once deleted, they will not be recoverable.</p>
              <p>Are you sure you want to delete all transactions?</p>
              <button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Cancel</button>
              <form method="POST" action="/admin/delete/transactions">
                <div class="form-group">
                  <button class="btn btn-danger float-right" type="submit">Delete Transactions</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="delItemsModal" tabindex="-1" role="dialog" aria-labelledby="delItemsModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <p class="modal-title" id="delItemsModalLabel">Delete Items</p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p><b>Please backup items before you delete them.</b> Once deleted, they will not be recoverable.</p>
              <p><b>You must delete all transactions before deleting items, otherwise you will get an error.</b></p>
              <p>Are you sure you want to delete all items?</p>
              <button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Cancel</button>
              <form method="POST" action="/admin/delete/items/all">
                <div class="form-group">
                  <button class="btn btn-danger float-right" type="submit">Delete Items</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="delStockModal" tabindex="-1" role="dialog" aria-labelledby="delStockModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <p class="modal-title" id="delStockModalLabel">Delete Out-of-stock Items</p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p><b>Please backup items before you delete them.</b> Once deleted, they will not be recoverable.</p>
              <p><b>You must delete all transactions before deleting out of stock items, otherwise you will get an
                  error.</b></p>
              <p>Are you sure you want to delete all items?</p>
              <button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Cancel</button>
              <form method="POST" action="/admin/delete/items/outofstock">
                <div class="form-group">
                  <button class="btn btn-danger float-right" type="submit">Delete OOS Items</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="delUsersModal" tabindex="-1" role="dialog" aria-labelledby="delUsersModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <p class="modal-title" id="delUsersModalLabel">Delete Users</p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p><b>Please backup users before you delete them.</b> Once deleted, they will not be recoverable.</p>
              <p><b>You must delete all transactions before deleting users, otherwise you will get an error.</b></p>
              <p>Are you sure you want to delete all users?</p>
              <button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Cancel</button>
              <form method="POST" action="/admin/delete/users">
                <div class="form-group">
                  <button class="btn btn-danger float-right" type="submit">Delete Users</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
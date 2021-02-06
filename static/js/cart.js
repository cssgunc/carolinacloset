const NUM_COLUMNS = 4;

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
};

$(document).ready(function () {
    if (document.getElementById('clear-cart')) {
        localStorage.removeItem('cart');
    }

    // Grab cart from local storage and parse as JSON
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart && cart.length > 0) {
        let tableBody = document.getElementById('cart-tbody');
        
        // Dynamically generate table rows from cart items
        cart.forEach((item, i) => {
            let row = document.createElement('tr');
            
            // Name cell contains name text
            let nameCell = document.createElement('td');
            nameCell.appendChild(document.createTextNode(item.name));
            row.appendChild(nameCell);

            // Action cell contains delete button
            let actionCell = document.createElement('td');
            actionCell.className = 'text-right';
            let deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger';
            deleteButton.setAttribute('type', 'button');
            deleteButton.setAttribute('data-id', item.id);
            // On click, delete item from cart
            deleteButton.addEventListener('click', (event) => {
                let currCart = JSON.parse(localStorage.getItem('cart'));
                // Search for an item with the same item id, and remove it
                for(let i = 0; i < currCart.length; i++) {
                    if (currCart[i].id === item.id) {
                        currCart.splice(i,1);
                        break;
                    }
                }
                // Stringify and save updated cart
                localStorage.setItem('cart', JSON.stringify(currCart));
                event.target.parentNode.parentNode.outerHTML = '';
                if (currCart.length === 0) {
                    localStorage.removeItem('cart');
                    clearCart();
                } 
            });
            deleteButton.appendChild(document.createTextNode('Remove from Cart'));
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        });
    } else {
        // Create a cell that notifying the user that the table is empty
        let cartEmptyCell = document.createElement('td');
        cartEmptyCell.className = 'text-center';
        cartEmptyCell.setAttribute('colspan', NUM_COLUMNS);
        cartEmptyCell.appendChild(document.createTextNode('Cart is Empty'));

        // Clear table body and add empty table notification
        let tableBody = document.getElementById('cart-tbody');
        tableBody.appendChild(cartEmptyCell);
    }

    // Clear cart and table when the clear cart confirmation is clicked
    let clearCartButton = document.getElementById('clearCartButton');
    clearCartButton.addEventListener('click', (event) => {
        clearCart();
    });

    let checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.addEventListener('click', (event) => {
        let form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.setAttribute('action', '/cart');
        let input = document.createElement('input');
        input.setAttribute('name', 'cart');
        input.setAttribute('type', 'hidden');
        input.setAttribute('value', localStorage.getItem('cart'));
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    });
});
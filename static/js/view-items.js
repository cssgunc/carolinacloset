toasts = [];

$(document).ready(function () {
    $('#itemsTable').DataTable({
        'order': [[2, 'desc']]
    });

    let buttons = document.querySelectorAll('.addToCartButton');
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function (event) {
            const button = $(event.target); // Button that triggered the modal
            
            // Pulls data values attached to button
            const id = button.data('id');
            const name = button.data('name');

            // Create toast alert
            let toast = document.createElement('div');
            toast.className = 'toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            toast.setAttribute('aria-atomic', 'true');
            toast.setAttribute('data-autohide', 'true');
            toast.setAttribute('data-delay', '5000');
            
            let toastHeader = document.createElement('div');
            toastHeader.className = 'toast-header';

            let toastHeaderText = document.createElement('strong');
            toastHeaderText.className = 'mr-auto';

            let toastClose = document.createElement('button');
            toastClose.className = 'ml-2 mb-1 close';
            toastClose.setAttribute('type', 'button');
            toastClose.setAttribute('data-dismiss', 'toast');
            toastClose.setAttribute('aria-label', 'Close');

            let toastCloseIcon = document.createElement('span');
            toastCloseIcon.setAttribute('aria-hidden', 'true');
            toastCloseIcon.innerHTML = '&times;';

            let toastBody = document.createElement('div');
            toastBody.className = 'toast-body';

            toastHeader.appendChild(toastHeaderText);
            toastClose.appendChild(toastCloseIcon);
            toastHeader.appendChild(toastClose);
            toast.appendChild(toastHeader);
            toast.appendChild(toastBody);
            document.getElementById('toast-pos').appendChild(toast);

            const newItem = {
                id: id,
                name: name,
                quantity: 1,
            }

            let cart = localStorage.getItem('cart');

            if (cart) {
                cart = JSON.parse(cart);
                let found = false;
                // checks if item is already in cart
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].id === id) {
                        // cannot add this item if it is already in the cart
                        toastHeaderText.appendChild(document.createTextNode('Error'));
                        toastBody.appendChild(document.createTextNode(name + ' is already in your cart'));
                        found = true;
                        break;
                    }
                }
                // if not yet in cart, push a new item
                if (!found) {
                    cart.push(newItem);
                    toastHeaderText.appendChild(document.createTextNode('Success'));
                    toastBody.appendChild(document.createTextNode(name + ' added to cart'));
                }
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                localStorage.setItem('cart', JSON.stringify([newItem]));
                toastHeaderText.appendChild(document.createTextNode('Success'));
                toastBody.appendChild(document.createTextNode(name + ' added to cart'));
            }

            $('.toast').toast('show');
            $('.toast').on('hidden.bs.toast', (e) => {
                e.target.outerHTML = '';
            });
        });
    }
});
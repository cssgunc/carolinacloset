$(document).ready(function () {
    $('#itemsTable').DataTable();

    $('#addModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var id = button.data('id');
        var name = button.data('name');
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('#addModalId').val(id);
        modal.find('#addModalName').val(name);
        modal.find('#addModalQuantity').val(1);
    });

    $('#editModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var id = button.data('id');
        var type = button.data('type');
        var name = button.data('name');
        var gender = button.data('gender');
        var brand = button.data('brand');
        var color = button.data('color');
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('#editModalId').val(id);
        modal.find('#editModalType').val(type);
        modal.find('#editModalName').val(name);
        modal.find('#editModalGender').val(gender);
        modal.find('#editModalBrand').val(brand);
        modal.find('#editModalColor').val(color);
    });

    $('#removeModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var id = button.data('id');
        var name = button.data('name');
        var maxCount = button.data('count');
        var customerOnyen = document.getElementById('customerOnyen').value;
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('#removeModalId').val(id);
        modal.find('#removeModalName').val(name);
        modal.find('#removeModalQuantity').attr('max', maxCount);
        modal.find('#removeModalQuantity').val(1);
        if(customerOnyen) modal.find('#removeModalOnyen').val(customerOnyen);
    });
});
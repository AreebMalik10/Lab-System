import Swal from 'sweetalert2'

// Success alert
export const showSuccessAlert = (title = 'Success!', text = '', timer = 2000) => {
    Swal.fire({
        icon: 'success',
        title,
        text,
        showConfirmButton: false,
        timerProgressBar: true,
        timer,
        target: document.body,
        customClass: {
            container: 'swal2-zindex-fix',
        },
    });
};

// Error alert
export const showErrorAlert = (title = 'Error!', text = '') => {
    Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonColor: '#d33',
        target: document.body,
        customClass: {
            container: 'swal2-zindex-fix',
        },
    });
};

// Close any open Swal alert
export const closeAlert = () => {
    try {
        Swal.close();
    } catch (e) {
        // ignore
    }
};

// Info alert
export const showInfoAlert = (title = 'Info', text = '') => {
    Swal.fire({
        icon: 'info',
        title,
        text,
        confirmButtonColor: '#3085d6',
        target: document.body,
        customClass: {
            container: 'swal2-zindex-fix',
        },
    });
};

// Warning alert with confirmation
export const showConfirmAlert = async ({
    title = 'Are you sure?',
    text = '',
    confirmButtonText = 'Yes',
    cancelButtonText = 'Cancel',
    confirmButtonColor = '#3085d6',
    cancelButtonColor = '#d33',
} = {}) => {
    const result = await Swal.fire({
        icon: 'warning',
        title,
        text,
        showCancelButton: true,
        confirmButtonColor,
        cancelButtonColor,
        confirmButtonText,
        cancelButtonText,
        target: document.body,
        customClass: {
            container: 'swal2-zindex-fix',
        },
    });

    return result.isConfirmed;
};

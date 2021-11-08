/* global Element, fetch */
var SubmitForm = function(submittersSelector, formSelector, callbackSuccess, callbackError ){
    var form = document.querySelector(formSelector);
    var submitters = document.querySelectorAll(submittersSelector);
    
    if (!submitters || !form) {
        return;
    }
    
    submitters.forEach(function(button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            
            submitters.forEach(function(submit_btn) { submit_btn.spinner('start'); });
            
            const button = form.ownerDocument.createElement('input');
            button.style.display = 'none';
            button.type = 'submit';
            form.appendChild(button).click();
            form.removeChild(button);
        });
    });
    
    function stopSubmitters() {
        submitters.forEach(function(submit_btn) { submit_btn.spinner('stop'); });
    }
    
    if (!form.hasAttribute('hasSubmitHandler')) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const _valid = this.checkValidity();
            this.classList.add('was-validated');
            if (!_valid) {
                event.stopPropagation();
                
                stopSubmitters();
                
                let response = {
                    type: 'validation-error',
                    title: 'Error',
                    error: {
                        message: 'You have some form errors. Please check below.'
                    }
                };
                if (window.texts) {
                    if (window.texts['error']) {
                        response.title = window.texts['error'];
                    }
                    if (window.texts['form-validation-error']) {
                        response.error.message = window.texts['form-validation-error'];
                    }
                }                
                if (callbackError) {
                    return callbackError(response);
                }
                return NotifyTop('danger', response.title, response.error.message);
            } else {
                const url = this.getAttribute('action');
                let method = this.getAttribute('method');
                if (!method) {
                    method = 'POST';
                }
                const data = new FormData(this);
                fetch(url, {
                    method: method,
                    body: data
                }).then(res => {
                    stopSubmitters();
                    
                    if (!res.ok) {
                        throw new Error(res.statusText);
                    }
                    
                    return res.json();
                }).then(response => {
                    if (response.status !== 'success') {
                        throw new Error(response.message ? response.message : 'Invalid response!');
                    }
                    
                    if (callbackSuccess) {
                        return callbackSuccess(response);
                    }
                    
                    let type = response.type ? response.type : 'success';
                    let title = response.title ? response.title : (window.texts && window.texts['success'] ? window.texts['success'] : 'Success');
                    NotifyTop(type, title, response.message ? response.message : '');
                    
                    if (response.href
                            && response.href !== 'javascript:;'
                    ) {
                        window.location.href = response.href;
                    }
                })
                .catch(error => {
                    let response = {
                        type: 'error-error',
                        title: 'Error',
                        error: error
                    };
                    if (window.texts && window.texts['error']) {
                        response.title = window.texts['error'];
                    }
                    if (callbackError) {
                        return callbackError(error);
                    }
                    return NotifyTop('danger', response.title, response.error.message);
                });
            }
        }, false);
        form.setAttribute('hasSubmitHandler', true);
    }
};

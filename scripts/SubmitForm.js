/* global Element, fetch */
var SubmitForm = function(submittersSelector, formSelector, callbackSuccess, callbackError) {
    var submitters = document.querySelectorAll(submittersSelector);
    if (!submitters) {
        return NotifyTop('danger', window.texts && window.texts['error'] ? window.texts['error'] : 'Error', 'Form submitters not found!');
    }
    
    var form = document.querySelector(formSelector);
    
    submitters.forEach(function(button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            
            let textSuccess = 'Success';
            let textError = 'Error';
            let textFormValidationError = 'You have some form errors. Please check below.';
            if (window.texts) {
                if (window.texts['success']) {
                    textSuccess = window.texts['success'];
                }
                if (window.texts['error']) {
                    textError = window.texts['error'];
                }
                if (window.texts['form-validation-error']) {
                    textFormValidationError = window.texts['form-validation-error'];
                }
            }
            
            submitters.forEach(function(submit_btn) {
                submit_btn.spinner('start', 'border', true);
            });
            
            if (!form) {
                form = this.closest('form');
                if (!form) {
                    stopSubmitters();
                    return NotifyTop('danger', textError, 'Form not found!');
                }
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
                            title: textError,
                            error: {
                                message: textFormValidationError
                            }
                        };
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
                            let title = response.title ? response.title : textSuccess;
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
                                title: textError,
                                error: error
                            };                            
                            if (callbackError) {
                                return callbackError(error);
                            }
                            return NotifyTop('danger', response.title, response.error.message);
                        });
                    }
                }, false);
                form.setAttribute('hasSubmitHandler', true);
            }
            
            const submit = form.ownerDocument.createElement('input');
            submit.style.display = 'none';
            submit.type = 'submit';
            form.appendChild(submit).click();
            form.removeChild(submit);
        });
    });
    
    function stopSubmitters() {
        submitters.forEach(function(submit_btn) { submit_btn.spinner('stop'); });
    }
};

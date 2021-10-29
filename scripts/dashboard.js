var Dashboard = function() {
    var content;
    
    var formSubmit = function(form, callback, button, modalSelector = null) {
        $(document).ajaxStop($.unblockUI);

        $.blockUI({message: content.processing, baseZ: 2000});

        button.spinLoader('start', 'grow');

        let data = {};
        let a = form.serializeArray();
        $.each(a, function() {
            if (data[this.name]) {
                if (!data[this.name].push) {
                    data[this.name] = [data[this.name]];
                }
                data[this.name].push(this.value || '');
            } else {
                data[this.name] = this.value || '';
            }
        });

        form.ajaxSubmit({
            data: data,
            url: form.attr('action'),
            method: form.attr('method'),
            success: function(response, status, xhr)
            {
                if (callback && typeof callback === 'function') {
                    return callback(response, status, button, form, modalSelector);
                }
                
                let type = (typeof response.status !== 'undefined') ? response.status : 'default';
                if (type === 'primary' || type === 'success' || type === 'info') {
                    let table = null;
                    if (typeof button.attr('data-table') !== 'undefined') {
                        table = $('table#' + button.attr('data-table'));
                    } else {
                        table = button.closest('table');
                    }
                    if (table && table.length && $.fn.DataTable.isDataTable(table)) {
                        table.DataTable().ajax.reload(null, false);
                    }

                    button.spinLoader('stop');

                    if (modalSelector) {
                        $(modalSelector).modal('hide');
                    }
                }
                
                $(this).notifyMe('top', type, (typeof response.title !== 'undefined') ? response.title : content.notice, (typeof response.message !== 'undefined') ? response.message : content.invalid_res, 200, 3000);
                
                if (typeof response.href !== 'undefined'
                        && response.href !== 'javascript:;') {
                    window.location.href = response.href;
                }
            },
            error: function (xhr, status, error)
            {
                $(this).notifyMe('top', 'default', content.error, content.cant_complete, 200, 3000);

                if (typeof button !== 'undefined') {
                    button.spinLoader('stop');
                }
            }
        });
    };
    
    return {
        init: function(settings) {
            content = $.extend(true,
            {
                title:         'Title',
                notice:        'Notice',
                error:         'Error',
                close:         'Close',
                loading:       'Loading ...',
                processing:    'Processing ...',
                invalid_res:   'Invalid response!',
                conn_error:    'Connection error!',
                cant_complete: 'Can\'t complete request'
            }, settings);
            
            let defaultModalBody = `<div class="modal fade" id="dashboard-modal" role="dialog" aria-labelledby="dashboard-modal-label" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">'
                    <div class="modal-content">
                        <div class="modal-header modal-header-solid">
                            <h5 class="modal-title text-uppercase" id="dashboard-modal-label">` + content.title + `</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="` + content.close + `"></button>
                        </div>
                        <div class="modal-body">` + content.loading + `</div>
                        <div class="modal-footer modal-footer-solid">
                            <button class="btn btn-secondary shadow-sm" data-bs-dismiss="modal">` + content.close + `</button>
                        </div>
                    </div>
                </div>
            </div>`;
            
            $(defaultModalBody).appendTo('body');
            
            document.querySelectorAll('[data-bs-toggle="modal"][data-bs-target="#dashboard-modal"]').forEach(function(ele) {
                ele.addEventListener('click', function() {
                    Dashboard.ajaxModal(ele);
                });
            });
            
            Dashboard.handleSubmit('.dashboard-submit');
            
            $('#dashboard-modal').on('hidden.bs.modal', function() {
                $(this).html(defaultModalBody);
            });
        },
        
        handleSubmit: function(selector, callback = null, formSelector = null, modalSelector = null) {
            $(selector).click(function(e) {
                e.preventDefault();

                let button = $(this);
                let form = formSelector ? $(formSelector) : button.closest('form');
                if (!form) {
                    return;
                }

                let novalidate = form.attr('novalidate');
                if (form.hasClass('needs-validation')
                        && novalidate !== false && 
                        typeof novalidate !== typeof undefined) {
                    let valid = form[0].checkValidity();
                    form[0].classList.add('was-validated');
                    if (valid === false) {
                        $(this).notifyMe('top', 'error', content.notice, content.form_error, 200, 3000);
                    } else {
                        formSubmit(form, callback, button, modalSelector);
                    }
                } else {
                    formSubmit(form, callback, button, modalSelector);
                }
            });
        },
        
        ajaxModal: function(element) {
            let url = 'javascript:;';
            if (element.hasAttribute('href')) {
                url = element.getAttribute('href');
            } else if (element.hasAttribute('data-href')) {
                url = element.getAttribute('data-href');
            }

            if (url !== 'javascript:;') {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        try {
                            let modal = element.getAttribute('data-bs-target');
                            if (modal === null || modal === '') {
                                modal = '#dashboard-modal';
                            }
                            let modalDiv = document.querySelector(modal);
                            if (modalDiv) {
                                modalDiv.innerHTML = xhr.responseText;
                            }
                            
                            var parser = new DOMParser();
                            var modalDocument = parser.parseFromString(xhr.responseText, 'text/html');
                            modalDocument.querySelectorAll('script[type="text/javascript"]').forEach(function(element) {
                                eval(element.innerHTML);
                            });
                        } catch(e) {
                        }
                    }
                };
                xhr.send();
            }
        }
    };
} ();

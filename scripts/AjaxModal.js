var AjaxModal = function() {
    var options = {};
    
    return {
        append: function(id, loader = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading ...') {
            options = { id, loader };
            
            let modal = document.createElement('div');
            modal.id = id;
            modal.tabIndex = -1;
            modal.classList.add('modal', 'fade');
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-hidden', 'true');
            modal.setAttribute('aria-labelledby', 'dashboard-modal-label');
            modal.innerHTML = `<div class="modal-dialog" role="document">'
                <div class="modal-content">
                    <div class="modal-body">` + options.loader + `</div>
                </div>
            </div>`;
            document.body.appendChild(modal);
            
            document.querySelectorAll('[data-bs-toggle="modal"][data-bs-target="#' + options.id + '"]').forEach(function(element) {
                element.addEventListener('click', function() {
                    AjaxModal.ajaxContent(element);
                });
            });
            
            let modalInitialContent = modal.innerHTML;
            modal.addEventListener('hidden.bs.modal', function () {
                this.innerHTML = modalInitialContent;
            });
        },
        
        ajaxContent: function(element) {
            let url = 'javascript:;';
            if (element.hasAttribute('href')) {
                url = element.getAttribute('href');
            } else if (element.hasAttribute('data-href')) {
                url = element.getAttribute('data-href');
            } 

            if (url === 'javascript:;') {
                return;
            }

            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        let modal = element.getAttribute('data-bs-target');
                        if (modal === null || modal === '') {
                            modal = '#' + options.id;
                        }
                        let modalDiv = document.querySelector(modal);
                        if (modalDiv) {
                            modalDiv.innerHTML = xhr.responseText;
                        }

                        let parser = new DOMParser();
                        let modalDocument = parser.parseFromString(xhr.responseText, 'text/html');
                        modalDocument.querySelectorAll('script[type="text/javascript"]').forEach(function(element) {
                            eval(element.innerHTML);
                        });
                    } catch(e) {
                    }
                }
            };
            xhr.send();
        }
    };
} ();

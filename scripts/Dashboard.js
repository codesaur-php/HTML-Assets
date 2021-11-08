/* global AjaxModal */
var Dashboard = function() {
    return {
        init: function(modalId, loadingText) {            
            if (!String.prototype.format) {
              String.prototype.format = function() {
                var args = arguments;
                return this.replace(/{(\d+)}/g, function(match, number) { 
                  return typeof args[number] !== 'undefined' ? args[number] : match;
                });
              };
            }
            
            const loader = '<span class="spinner-border spinner-border-sm text-secondary" role="status" aria-hidden="true" style="margin-right:5px;top:1px;position:relative"></span> ' + loadingText + ' ...';
            
            AjaxModal.append(modalId, loader);

            ScrollUp();
        },
        
        activateLink: function(link) {
            if (!link) {
                return;
            }
            document.querySelectorAll('#sidebarMenu .nav-link').forEach(function(a) {
                if (a.getAttribute('href') === link) {
                    a.classList.add('active');
                }
            });
        }
    };
} ();

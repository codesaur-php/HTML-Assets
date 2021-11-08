/* global AjaxModal */
var Dashboard = function() {
    function include(file) {  
      var script = document.createElement('script');
      script.src = file;
      script.defer = true;
      document.getElementsByTagName('head').item(0).appendChild(script);
    }
    
    return {
        init: function(modalId, loadingText) {            
            include('https://cdn.jsdelivr.net/gh/codesaur-php/HTML-Assets@2.0/scripts/spinner.js');
            include('https://cdn.jsdelivr.net/gh/codesaur-php/HTML-Assets@2.0/scripts/ScrollUp.js');
            include('https://cdn.jsdelivr.net/gh/codesaur-php/HTML-Assets@2.0/scripts/NotifyTop.js');
            include('https://cdn.jsdelivr.net/gh/codesaur-php/HTML-Assets@2.0/scripts/AjaxModal.js');
            include('https://cdn.jsdelivr.net/gh/codesaur-php/HTML-Assets@2.0.1/scripts/imageInput.js');
            include('https://cdn.jsdelivr.net/gh/codesaur-php/HTML-Assets@2.0.1/scripts/SubmitForm.js');

            if (!String.prototype.format) {
              String.prototype.format = function() {
                var args = arguments;
                return this.replace(/{(\d+)}/g, function(match, number) { 
                  return typeof args[number] !== 'undefined' ? args[number] : match;
                });
              };
            }
            
            document.addEventListener('DOMContentLoaded', function() {
                const loader = '<span class="spinner-border spinner-border-sm text-secondary" role="status" aria-hidden="true" style="margin-right:5px;top:1px;position:relative"></span> ' + loadingText + ' ...';
            
                AjaxModal.append(modalId, loader);

                ScrollUp();
            });
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

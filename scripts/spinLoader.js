(function($) {
    $.fn.spinLoader = function(action, type = 'border') {
        if (action === 'start') {
            if ($(this).attr('disabled') === 'disabled') {
                return false;
            }
            let text = $(this).text();
            $(this).attr('data-innerHTML', text);
            
            let size = '';            
            if(!$(this).hasClass('btn-lg')) {
                size = ' spinner-' + type + '-sm';
            };            
            $(this).html('<span class="spinner-' + type + size + '" role="status" aria-hidden="true"></span> ' + text);
            $(this).attr('disabled', true);
            $(this).addClass('disabled');
        } else {
            let attrText = $(this).attr('data-innerHTML');
            if (typeof attrText !== 'undefined' && attrText !== false) {
                $(this).html(attrText);
            }
            $(this).attr('disabled', false).removeClass('disabled');
        }
  };
} (jQuery));

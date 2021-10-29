(function($) {
    $.fn.notifyMe = function($position, $type, $title, $content, $velocity, $delay) {
        $('.notify').remove();
        
        function createNotify(position) {
            let style = 'z-index:11500;position:fixed;padding:20px;color:#fff;';
            let bgColorHex;
            switch ($type) {
                case 'primary': bgColorHex = '0d6efd'; break;
                case 'success': bgColorHex = '15cc1f'; break;
                case 'info': bgColorHex = '2d9cee'; break;
                case 'warning': bgColorHex = 'ffc107'; break;
                case 'danger': bgColorHex = 'f32750'; break;
                default: bgColorHex = 'cf80ad'; break;
            }
            style += 'background:#' + bgColorHex + ';';
            switch (position) {
                case 'left': style += 'left:0;top:0;bottom:0;max-width:300px;'; break;
                case 'right': style += 'right:0;bottom:0;top:0;max-width:300px;'; break;
                case 'bottom': style += 'right:0;left:0;bottom:0;'; break;
                default: style += 'right:0;left:0;top:0;'; break;
            }            
            let closeX = '<a class="notify-close" style="cursor:pointer;position:absolute;right:0;top:0;color:#fff;padding:10px 15px;font-size:20px;text-decoration:none;">x</a>';
            let title = '<h2 style="margin:5px 0 10px 0;text-transform:uppercase;font-weight:300;color:#fff;">' + $title + '</h2>';
            let notifyElement = '<section class="notify" style="' + style + '">' + title + closeX + '<div>' + $content + '</div></section>';
            $('body').prepend(notifyElement);
            
            
            var close = {};
            var show = {};
            let notifyHeight = $('.notify').outerHeight();
            close[position] = '-' + notifyHeight;
            show[position] = '0px';

            $('.notify').css(position, '-' + notifyHeight);
            $('.notify').animate(show, $velocity);

            if (typeof $delay !== 'undefined') {
                setTimeout(function() {
                    $('.notify').animate(close, $velocity);
                    
                    setTimeout(function() {
                        $('.notify').remove();
                    }, $velocity + 100);
                }, $delay);
            }
        }
        
        createNotify($position);

        function closeNotify(position) {
            var options = {};
            let notifyHeight = $('.notify').outerHeight();
            options[position] = '-' + notifyHeight;
            $('.notify').animate(options, $velocity);

            setTimeout(function() {
                $('.notify').remove();
            }, $velocity + 100);
        }

        $('.notify-close').click(function() {
            switch ($position) {
                case 'bottom': closeNotify('bottom'); break;
                case 'left': closeNotify('left'); break;
                case 'right': closeNotify('right'); break;
                default: closeNotify('top'); break;
            }
        });
    };
} (jQuery));

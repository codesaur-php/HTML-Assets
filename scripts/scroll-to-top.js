var ScrollToTop = function() {    
    return {
        add: function(settings) {
            let options = $.extend(true,
            {
                color: {
                    arrow: 'white',
                    hover: 'blue',
                    background: '#7952b3'
                },
                padding: {
                    right: '40px',
                    bottom: '40px'
                }
            }, settings);
            
            var upArrow = document.createElement('i');
            upArrow.style.cssText = 'border:solid black;border-width:0 3px 3px 0;border-color:' + options.color.arrow + ';display:inline-block;padding:3.4px;margin-top:17px;transform:rotate(-135deg);-webkit-transform:rotate(-135deg);';
            
            var btnScrollToTop = document.createElement('a');
            btnScrollToTop.style.cssText = 'display:inline-block;cursor:pointer;background-color:' + options.color.background + ';width:40px;height:40px;text-align:center;border-radius:4px;position:fixed;bottom:' + options.padding.bottom + ';right:' + options.padding.right + ';transition:background-color .3s, opacity .5s, visibility .5s;opacity:0;visibility:hidden;z-index:1000;';
            btnScrollToTop.appendChild(upArrow);
            $(btnScrollToTop).on('click', function(e) {
                e.preventDefault();
                $('html, body').animate({scrollTop:0}, 'slow');
            });
            $(btnScrollToTop).mouseover(function() {
                btnScrollToTop.style.backgroundColor = options.color.hover;
            });
            $(btnScrollToTop).mouseout(function() {
                btnScrollToTop.style.backgroundColor = options.color.background;
            });

            $(window).scroll(function() {
                if ($(window).scrollTop() > 200) {
                    btnScrollToTop.style.opacity = 1;
                    btnScrollToTop.style.visibility = 'visible';
                } else {
                    btnScrollToTop.style.opacity = 0;
                    btnScrollToTop.style.visibility = 'hidden';
                }
            });
            
            document.body.appendChild(btnScrollToTop);
        }
    };
} ();

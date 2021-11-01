var ScrollUp = function(
        color = {
            arrow: 'white',
            hover: 'blue',
            background: '#7952b3'
        },
        padding = {
            right: '40px',
            bottom: '40px'
        },
        scrollTo = {
            top: 0,
            behavior: 'smooth'
        }
) {
    const upArrow = document.createElement('i');
    upArrow.style.cssText = 'border:solid black;border-width:0 3px 3px 0;border-color:' + color.arrow + ';display:inline-block;padding:3.4px;margin-top:17px;transform:rotate(-135deg);-webkit-transform:rotate(-135deg);';
    const btnScroll = document.createElement('a');
    btnScroll.style.cssText = 'display:inline-block;cursor:pointer;background-color:' + color.background + ';width:40px;height:40px;text-align:center;border-radius:4px;position:fixed;bottom:' + padding.bottom + ';right:' + padding.right + ';transition:background-color .3s, opacity .5s, visibility .5s;opacity:0;visibility:hidden;z-index:1000;';
    btnScroll.appendChild(upArrow);
    document.body.appendChild(btnScroll);

    window.addEventListener('scroll', function() {
        const windowpos = document.querySelector('html').scrollTop;
        if (windowpos > 200) {
            btnScroll.style.opacity = 1;
            btnScroll.style.visibility = 'visible';
        } else {
            btnScroll.style.opacity = 0;
            btnScroll.style.visibility = 'hidden';
        }
    });

    btnScroll.addEventListener('click', function(e) {
        e.preventDefault();                
        scroll(scrollTo);
    });
    btnScroll.addEventListener('mouseover', function() {
        btnScroll.style.backgroundColor = color.hover;
    });
    btnScroll.addEventListener('mouseout', function() {
        btnScroll.style.backgroundColor = color.background;
    });
};

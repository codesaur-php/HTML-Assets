var NotifyTop = function(type, title, content, velocity = 5, delay = 2500) {
    const previous = document.querySelector('.notifyTop');
    if (previous && previous.parentNode !== null) {
        previous.parentNode.removeChild(previous);
    }
    
    let style = 'z-index:11500;position:fixed;padding:20px;color:#fff;';
    let bgColorHex;
    switch (type) {
        case 'primary': bgColorHex = '0d6efd'; break;
        case 'success': bgColorHex = '15cc1f'; break;
        case 'warning': bgColorHex = 'ffc107'; break;
        case 'danger': bgColorHex = 'f32750'; break;
        default: bgColorHex = '17a2b8'; break;
    }
    style += 'background:#' + bgColorHex + ';';
    style += 'right:0;left:0;top:0';
    const closeX = '<a class="notifyTop-close" style="cursor:pointer;position:absolute;right:0;top:0;color:#fff;padding:10px 15px;font-size:16px;text-decoration:none;">x</a>';
    const h_title = '<h5 style="margin:5px 0 10px 0;text-transform:uppercase;font-weight:300;color:#fff;">' + title + '</h5>';
    const section = document.createElement('section');
    section.style.cssText = style;
    section.classList.add('notifyTop');
    section.innerHTML = h_title + closeX + '<div>' + content + '</div>';
    document.body.appendChild(section);
    
    let notify = document.querySelector('.notifyTop');
    const notifyHeight = notify.offsetHeight;
    notify.style.top = (-notifyHeight) + 'px';
    
    let top = -notifyHeight;
    let interv = setInterval(function() {
        top += 10;
        notify.style.top = top + 'px';
        if (top >= 0) {
            clearInterval(interv);
        }
    }, velocity);
    
    notify.querySelector('.notifyTop-close').addEventListener('click', function(e) {
        e.preventDefault();
        
        this.style.display = 'none';
        let interv_ = setInterval(function() {
            top -= 10;
            notify.style.top = top + 'px';
            if (top < -notifyHeight) {
                if (notify && notify.parentNode !== null) {
                    notify.parentNode.removeChild(notify);
                }
                clearInterval(interv_);
            }
        }, velocity);
    });

    setTimeout(function() {
        if (notify && notify.parentNode !== null) {
            notify.querySelector('.notifyTop-close').click();
        }
    }, delay);
};

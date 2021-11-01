/* global Element */
Element.prototype.spinner = function(action, type = 'border', block = false) {
    if (action === 'start') {
        if (this.disabled || this.classList.contains('disabled')) {
            return false;
        }
        
        const text = this.innerHTML;
        this.setAttribute('data-innerHTML', text);
        
        let span = '<span class="spinner-' + type + ' spinner-' + type + '-sm" role="status" aria-hidden="true"';
        if (this.classList.contains('btn-lg')) {
            span += ' style="position:relative;top:-2px"';
        };
        span += '></span>';
        
        this.innerHTML = span;
        if (!block) {
            this.innerHTML += ' ' + text;
        }
        this.disabled = true;
        this.classList.add('disabled');
    } else if (this.disabled || this.classList.contains('disabled')) {
        const attrText = this.getAttribute('data-innerHTML');
        if (typeof attrText !== 'undefined' && attrText !== false) {
            this.innerHTML = attrText;
        }
        this.disabled = false;
        this.classList.remove('disabled');
    }
};

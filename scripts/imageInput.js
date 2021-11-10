/* global Element */
Element.prototype.imageInput = function(
        src,
        placeholder = 'Choose a file',
        choose = 'Choose',
        change = 'Change',
        remove = 'Remove',
        maxLength = 256,
        accept = 'image/*'
) {
    this.type = 'file' ;
    this.style.display = 'none' ;
    this.setAttribute('accept', accept);
    this.setAttribute('maxLength', maxLength);
    
    const name = this.name;
    if (!name) {
        return;
    }
    
    const self = this;
    const removeSelector = '.' + name + '-remove';
    
    self.setAttribute('data-record-name', name);
    
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group');
    self.after(inputGroup);

    const fileNameInput = document.createElement('input');
    fileNameInput.type = 'text';
    fileNameInput.disabled = true;
    fileNameInput.placeholder = placeholder;
    fileNameInput.classList.add('form-control');
    inputGroup.appendChild(fileNameInput);    

    const inputGroupAppend = document.createElement('div');
    inputGroupAppend.classList.add('input-group-append');
    fileNameInput.after(inputGroupAppend);
    
    const btnGroup = document.createElement('div');
    btnGroup.classList.add('btn-group');
    inputGroupAppend.appendChild(btnGroup);
    
    const btnBrowse = document.createElement('button');
    btnBrowse.type = 'button';
    btnBrowse.innerHTML = choose;
    btnBrowse.classList.add(name + '-browse', 'btn', 'btn-primary');
    btnBrowse.addEventListener('click', function(e) {
        e.preventDefault();
            
        self.click();
    });
    btnGroup.appendChild(btnBrowse);
    
    self.addEventListener('change', function(e) {
        fileNameInput.value = e.target.files[0].name;
        
        var reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            btnBrowse.innerHTML = change;            
            appendRemoveBtn();
            
            if (!self.name) {
                self.name = self.getAttribute('data-record-name');
            }
        };
        
        reader.readAsDataURL(this.files[0]);
    });
    
    const imagePreview = document.createElement('img');
    imagePreview.id = name + '_preview';
    if (src) {
        imagePreview.src = src;
        fileNameInput.value = src.replace(/^.*[\\\/]/, '');
        appendRemoveBtn();
    }
    imagePreview.classList.add('img-thumbnail', 'img-fluid');
    inputGroup.after(imagePreview);
    
    function appendRemoveBtn() {
        const btnRemove = btnGroup.querySelector(removeSelector);
        if (!btnRemove) {
            const button = document.createElement('button');
            button.type = 'button';
            button.innerHTML = remove;
            button.classList.add(name + '-remove', 'btn', 'btn-danger');
            btnGroup.appendChild(button);

            button.addEventListener('click', function(e) {
                e.preventDefault();

                imagePreview.removeAttribute('src');
                fileNameInput.value = '';
                self.value = '';
                btnBrowse.innerHTML = choose;
                this.parentNode.removeChild(this);
                
                self.removeAttribute('name');
            });
        }
    }
};

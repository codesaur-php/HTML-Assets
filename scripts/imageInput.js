/* global Element */
Element.prototype.imageInput = function(
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
    
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group');
    self.after(inputGroup);

    const imagePreview = document.createElement('img');
    imagePreview.id = name + '_preview';
    imagePreview.classList.add('img-thumbnail', 'img-fluid');
    inputGroup.after(imagePreview);    

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
                });
            }
        };
        
        reader.readAsDataURL(this.files[0]);
    });
};

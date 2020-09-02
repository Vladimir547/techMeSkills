const formResume = document.forms.resume;
const modal = document.querySelector('.modal');
const error = document.querySelector('.none');
const overflow = document.createElement('div');
overflow.classList.add('overflow');
function validation (arr) {
    const list = document.createElement('ul');
    list.classList.add('list');
    arr.forEach(item => {
        switch(item.value) {
            case '':
                if (item.name === 'name') {
                    error.classList.add('showError');
                }
                item.classList.add('border-red');
                break;
            case 'male':
            case 'female':
                if( item.checked !== true) {
                    break;
                } else {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = item.value;
                    list.append(listItem);
                    break;
                }
            case 'send':
                break;
            default: 
                const listItem = document.createElement('li');
                item.classList.remove('border-red');
                listItem.innerHTML = item.value;
                list.append(listItem);
                break;
        }
    });
    if(!Number(formResume.age.value) ) {
        formResume.age.classList.add('border-red');
        return;
    }
    return list;
}
formResume.addEventListener('submit', (e) => {
    e.preventDefault();
    if (document.querySelector('.list')) {
        document.querySelector('.list').remove();
    }
    if (error.closest('.showError')) {
        error.classList.remove('showError');
    }
    const arrForm = [...formResume];
    const list = validation(arrForm);
    if (formResume.name.value === '' || formResume.age.closest('.border-red') || formResume.date.value === '') {
        return;
    }
    modal.style.top = '50%';
    modal.prepend(list);
    document.body.append(overflow);
});
function hideMenu() {
    modal.style.top = '-300px';
    document.querySelector('.overflow').remove();
}
modal.addEventListener('click', (e) => {
    const target = e.target.closest('.close')
    if (!target) {
        return;
    }
    hideMenu();
});
overflow.addEventListener('click', () => {
    hideMenu();
});
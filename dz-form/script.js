const formResume = document.forms.resume;

const modal = document.querySelector('.modal');
const error = document.querySelector('.none');
const overflow = document.createElement('div');
overflow.classList.add('overflow');

formResume.addEventListener('submit', (e) => {
    e.preventDefault();
    if (document.querySelector('.list')) {
        document.querySelector('.list').remove();
    }
    if (error.closest('.showError')) {
        error.classList.remove('showError');
    }
    const list = document.createElement('ul');
    list.classList.add('list');
    for (let item of formResume.elements) {
        if (item.value === '') {
            if ( item.name === 'name' ) {
                error.classList.add('showError');
            }
            item.classList.add('border-red');
        } else if (item.name === 'age' && !Number.isInteger(Number(item.value))) {
            item.classList.add('border-red');
        } else if (item.name === 'gender' && item.checked !== true){ 
            continue;
        } else if (item.name === 'sub'){ 
            break;
        }else {
            const listItem = document.createElement('li');
            item.classList.remove('border-red');
            listItem.innerHTML = item.value;
            list.append(listItem);
            
        }
    }
    if (formResume.name.value === '' || formResume.age.closest('.border-red') || formResume.date.value === '') {
        return;
    }
    // console.log(formResume.gender.checked);
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
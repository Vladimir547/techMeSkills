const menu = document.querySelector('.menu');
const data = [
    {
        name: "Пункт 1",
        submenu: [
            { name: "Пункт 1.1" },
            { name: "Пункт 1.2" },
            {
                name: "Пункт 1.3",
                submenu: [{ name: "Пункт 1.3.1" }, { name: "Пункт 1.3.2" }],
            },
        ],
    },
    {
        name: "Пункт 2",
    },
    {
        name: "Пункт 3",
        submenu: [
            { name: "Пункт 3.1" },
            { name: "Пункт 3.2" },
            { name: "Пункт 3.3" },
            { name: "Пункт 3.4" },
        ],
    },
];
let currentElem = null;
function createMenu(headmenu, data) {
    for (let i = 0; i < data.length; i++) {
        let headItem = document.createElement('li');
        //headItem.classList.add('title-menu');
        headItem.innerHTML = data[i].name;
        headItem.dataset.show = 'false';
        headmenu.append(headItem);
        if (data[i].submenu) {
            let sub = document.createElement('ul');
            headItem.classList.add('open-drop')
            sub.classList.add('drop-down');
            headItem.append(sub);
            createMenu(sub, data[i].submenu);
        }
    }
}

function hideDropDown(elem, parentElement) {
    let dropDown = elem.querySelector('.drop-down');
    //console.log(parentElement);
    if (!elem) {
        return;
    }
    if (parentElement.contains(elem)) {
        elem.dataset.show = 'false';
        dropDown.style.display = 'none';}
    //  } else {
    //     parentElement.parentNode.style.display = 'none';
    //  }
}
function showDropDown(elem) {
    let dropDown = elem.querySelector(".drop-down");
    if (!dropDown) {
        return;
    }
    if (elem.dataset.show === 'false') {
        elem.dataset.show = 'true';
        dropDown.style.display = 'block';
    }
}
window.onload = function () {
    createMenu(menu, data);
    menu.onmouseover = function (e) {
        let target = e.target.closest('.open-drop');
        if(!target) {
            return;
        }
        currentElem = target;
        showDropDown(target);
    }
    menu.addEventListener('mouseout', (e) => {
        let relatedTarget = e.relatedTarget;
        let target = e.target.closest('.open-drop');
        if(!target) {
            return;
        }
        while (relatedTarget) {
            if (relatedTarget === currentElem) {
                return;
            }
            relatedTarget = relatedTarget.parentNode;
        }
        hideDropDown(target, target.parentNode);
        currentElem = null;
    });
}
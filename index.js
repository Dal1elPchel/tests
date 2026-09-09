
function createBtns() {
    const $buttonManager = document.querySelector('.button_manager');
    const projectsList = ["Плагин До/После", "Слайдер", "Галерея"];
    const colors = ["#F29987", "#C73E34", "#346D74", "#031020", "#563522"];

    const btns = [];
    for (let i = 0; i < projectsList.length; i++) {
        const btn = document.createElement('button');
        btn.innerText = projectsList[i];
        btn.style.backgroundColor = colors[i];
        $buttonManager.appendChild(btn);
        btns.push(btn);
    }
    return btns;
}

function bindBtns(btns) {
    btns[0].addEventListener('click',
        () => window.location.href = "html/beforeAfter.html");

    btns[1].addEventListener('click',
        () => window.location.href = "html/newsSlider.html");

    btns[2].addEventListener('click',
        () => window.location.href = "html/lightbox.html");
}


function Main() {
    const btns = createBtns();
    bindBtns(btns);
}

Main();
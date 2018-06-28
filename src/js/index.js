let nextClick = 'x';

window.onload = (() => {
    const tds = document.body.getElementsByTagName('td');
    for (let i = 0; i < tds.length; i++) {
        tds[i].onclick = function() { tds[i].innerHTML = 'x'; };
    }
});
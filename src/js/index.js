const gameWindow = document.createElement('div');
gameWindow.appendChild(document.createTextNode('hello world'));

window.onload = (() => {
    document.getElementById('game').appendChild(gameWindow);
});
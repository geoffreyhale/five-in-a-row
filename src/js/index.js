let nextClick = 'x';
const getNextClick = () => {
  nextClick = nextClick == 'x' ? 'o' : 'x';
  return nextClick;
};

window.onload = (() => {
    const tds = document.body.getElementsByTagName('td');
    for (let i = 0; i < tds.length; i++) {
        tds[i].onclick = function() {
            tds[i].innerHTML = getNextClick();
        };
    }
});
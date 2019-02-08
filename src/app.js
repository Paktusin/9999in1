import './main.scss'
import images from './images';
import SeaGull from './SeaGull';

let currentPicture = 9999;
let loaded = 0;
let seaguls = [];

function nextPicture(index) {
    if (currentPicture >= images.backs.length - 1) {
        currentPicture = 0;
    } else {
        currentPicture++;
    }
    if (index) currentPicture = index;
    const oldBg = $(`.bg`);
    const newBg = $(`<div class="bg"></div>`);
    newBg.css({backgroundImage: `url(${images.backs[currentPicture]})`});
    smoothReplace(oldBg, newBg, () => {
        $('#fire').toggle([10, 11].indexOf(currentPicture) !== -1);
        seaguls.forEach(seagul => seagul.setIsNight((9 <= currentPicture && currentPicture <= 14)))
    });
    smoothReplace($('#canvas img'), $(`<img src="${images.backs[currentPicture]}" />`));
}

function smoothReplace(oldEl, newEl, cb) {
    newEl.css({opacity: 0});
    newEl.insertAfter(oldEl);
    newEl.animate({opacity: 1}, () => {
        oldEl.remove();
        if (typeof cb === 'function') {
            cb()
        }
    });
}

function start() {
    nextPicture();
    setInterval(_ => {
        nextPicture();
    }, 3000);
    setInterval(_ => {
        $('#fire').toggleClass('next')
    }, 100);

    seaguls = [
        new SeaGull($('#canvas')), new SeaGull($('#canvas'))
    ];
}

window.loadedBack = () => {
    loaded++;
    if (loaded === images.backs.length) start();
};

images.backs.forEach(image => {
    const imageEl = $(`<img src="${image}" onload="loadedBack()"/>`);
    $('#preload').append(imageEl)
});



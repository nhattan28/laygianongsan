// script-hoa-roi.js
document.addEventListener('DOMContentLoaded', function() {
    for (let i = 0; i < 30; i++) {
        let hoa = document.createElement('div');
        hoa.classList.add('hoa');
        hoa.style.left = Math.random() * 100 + "vw";
        hoa.style.animationDuration = (Math.random() * 2 + 3) + "s";
        hoa.style.opacity = Math.random();
        hoa.style.fontSize = Math.random() * 10 + 10 + "px";
        document.body.appendChild(hoa);
    }
});


(function(){
/////////  PUBLIC VARIABLES /////////
const squared = document.getElementById('squared');
const left = document.getElementById('left');
const right = document.getElementById('right')
const bottom = document.getElementById('bottom');
const topp = document.getElementById('topp');
const topLayer = document.getElementById('toplayer');
const btn = document.querySelector('.btn');
const panels = document.querySelectorAll('.panel');
const welcome = document.querySelector('.welcome');

const tl1 = gsap.timeline({defaults: {duration: 1}, paused: true});
const tl2 = gsap.timeline({paused: true});
const tl3 = gsap.timeline({paused: true});
const tl4 = gsap.timeline({paused: true});
const tl5 = gsap.timeline({paused: true});

/////////// OBJECTS & ARRAYS ///////////

const obj = [    
        tl1.from("#left", {y: -800, ease: "bounce", onStart: makeVisible(left)})
        .from("#bottom", {y: 800, ease: "bounce", onStart: makeVisible(bottom)})
        .from("#topp", {y: -800, ease: "bounce", onStart: makeVisible(topp)})
        .from("#right", {y: 800, ease: "bounce", onStart: makeVisible(right)})
        .from(".btn", {x: 1200, ease: "bounce", onStart: makeVisible(btn), onComplete: colorChange}),

        tl2.to(".btn", {duration: 1, x: -1200})
        .to("#squared", {duration: 1, x: -1200})
        .to("#up", {duration: 1, y: 200, ease: "bounce"})
        .to("#up", {duration: .5, x: 1200})
        .to("#topp", {duration: .3, y: 100, x: -50, rotation: 45, onComplete: removeTop2})
        .to("#topp", {duration: 1, y: 175, x:-50, rotation: 0})
        .to("#topp", {duration: 2, y: 800, x: -200, rotation: -240}),
        
        tl3.to("#left", {duration: 2, y: 800, x: -80, rotation: -210})
        .to("#bottom", {duration: 2, y: 800, x: -100, rotation: -240, delay: -1})
        .to("#right", {duration: .8, y:200, rotation: 90, delay: -.7})
        .to("#right",  {duration: .8, y: 600, rotation: 90, delay: -.6, onComplete: layer2Start}),

        tl4.from(".welcome", {duration: 2, scale: 0, ease:"bounce", onStart: makeVisible(welcome), onComplete: clearMid}),

        tl5.to(".welcome", {duration: 2, scale: 0})
        .to("#midlayer", {duration: 2, opacity: 0, delay: -.5})
]

/////////  EVENT LISTENERS ////////////
function addEventListeners() {
    panels.forEach(function(elem) {
        elem.addEventListener('mouseleave', flipIt);
    });
    btn.addEventListener('click', removeTop);
}

/////////  START  ///////////
addEventListeners();

start();

/////////  Functions  /////////////
function start() {
    gsap.from("#squared", {duration: 2, y: -800});
    gsap.from("#up", {duration: 2, y: 800, onComplete: enterSquare});
}


function enterSquare() {
    obj[0].play();
}


function makeVisible(tar) {
    tar.style.opacity = 1;
}


function flipIt(e) {
    gsap.to(e.target, 1, {rotation: 360})
}


function colorChange() {
    const c1 = "hsl(+=360, +=0%, +=0%)";
    gsap.to(".btn", 12, {color: c1, repeat:-1,});
}


function removeTop() {
    obj[1].play();
    removeHandler();
}


function removeHandler() {
    btn.removeEventListener('click', removeTop);

    panels.forEach(function(elem) {
        elem.removeEventListener('mouseleave', flipIt);
    });

}


function removeTop2() {
    obj[2].play();
}


function layer2Start() {
    topLayer.style.display = 'none';
    obj[3].play();
}


function clearMid() {
    obj[4].play();
}

})();
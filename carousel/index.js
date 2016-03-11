/**
 * Created by admin on 2016/3/11.
 */
window.onload = function() {
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var animating = false;
    var timer;

    function showbutton(){
        for(var i = 0;i < buttons.length; i++){
            if (buttons[i].className == 'on'){
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }

    function animate(offset) {
        animating = true;
        var newleft = parseInt(list.style.left) + offset;
        var time = 500;
        var interval = 10;
        var speed = offset/(time/interval);

        function go() {
                if ( (speed < 0 && parseInt(list.style.left) > newleft) || (speed > 0 && parseInt(list.style.left) < newleft)) {
                    list.style.left = parseInt(list.style.left) + speed + 'px';
                    setTimeout(go, interval);
                }
                else{
                    animating = false;
                    list.style.left = newleft + 'px';

                    if (newleft > -850) {
                        list.style.left = -5100 + 'px';
                    }
                    if (newleft < -5100) {
                        list.style.left = -850 + 'px';
                    }
                }
        }
        go();
    }

    function play(){
        timer = setInterval(function(){
            next.onclick();
        }, 3000);
    }
    function stop(){
        clearInterval(timer);
    }
    next.onclick = function(){
        if (index == 6){
            index = 1;
        }
        else {
            index += 1;
        }
        showbutton();
        if ( !animating){
            animate(-850);
        }

    }
    prev.onclick = function(){
        if (index == 1){
            index = 6;
        }
        else {
            index -= 1;
        }
        showbutton();
        if ( !animating){
            animate(850);
        }
    }
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            if(this.className == 'on'){
                return;
            }
            var myindex = parseInt(this.getAttribute('index'));
            var offset = -850 * (myindex - index);
            if ( !animating){
                animate(offset);
            }
            index = myindex;
            showbutton();
        }
    }
    container.onmouseover = stop;
    container.onmouseout = play;
    play();


}
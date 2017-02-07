'use strict';
$(function(){
function Slider(unit,speed,delay) {
    this.unit = unit;
    this.slides = ['img/image1.jpg','img/image2.jpg','img/image3.jpg','img/image4.jpg'];//Массив изображений
    this.obj = 0;
    this.createDom = function() {//Создание ДОМа слайдера
        $(this.unit).prepend('<div class="main">');
        $(this.unit).find('.main').append('<div>');
        $(this.unit).find('.main>div').addClass('bar');
        $(this.unit).find(".main .bar").after('<div>');
        $(this.unit).find(".main" ).find('div').eq(1).addClass('slider');
        $(this.unit).find('.bar').append('<ul>');
        for (var i = 0; i < 4; i++) {
           $(this.unit).find('.bar ul').append('<li>')
           $(this.unit).find('.bar li').eq(i).attr('id', i);
            if(i===0){
                $(this.unit).find('.bar li').eq(i).addClass('active');
            }
        }
        $(this.unit).find('.slider').append('<ul>');
        for (var i = 0; i < 4; i++) {
            $(this.unit).find('.slider ul').append('<li>')
            $(this.unit).find('.slider li').eq(i).append('<img>');
            $(this.unit).find('.slider li>img').eq(i).addClass('slide'+i).attr('src',this.slides[i]);
        }
  };

  var _this=this;

    $(document).on("click", ".main .bar li", function() { //Обработка Клика
    _this.sl =  $(_this.unit).find(this).closest(".main"); // находим, в каком блоке был клик
    $(_this.unit).find(_this.sl).find("li").removeClass("active"); // убираем активный элемент
    $(_this.unit).find(this).addClass("active"); // делаем активным текущий
    _this.obj = $(_this.unit).find(this).attr("id"); // узнаем его номер
    _this.sliderJS(_this.obj, _this.sl); // слайдим
    clearInterval(_this.timer);
    clearTimeout(_this.timerId);
    _this.timerId = setTimeout(function() {
            _this.timer = setInterval(function() { 
                if(_this.obj>=3){
                    _this.obj=-1;
                }
                _this.autoSliderJS(++_this.obj) }, speed);
        }, delay);   
    return false;
    });
    _this.timerId = setTimeout(function() {
            _this.timer = setInterval(function() { 
                if(_this.obj>=3){
                    _this.obj=-1;
                }
                _this.autoSliderJS(++_this.obj) }, speed);
        }, 10);
    this.createDom();

};
Slider.prototype.sliderJS = function (obj, sl) { // slider function
    var ul = $(this.unit).find(sl).find("ul").eq(1); // находим блок
    var bl = $(this.unit).find(sl).find("li>.slide"+obj); // находим оприделенный элемент блока
    var step = $(this.unit).find(bl).width(); // ширина объекта
    $(ul).stop().animate({marginLeft: "-"+step*obj}, 500); // 500 это скорость перемотки
}
Slider.prototype.autoSliderJS = function (obj) {// slider function
    var ul =  $(this.unit).find('.main').find("ul").eq(1); // находим блок
    var bl =  $(this.unit).find('.main').find("li>.slide"+obj); // находим оприделенный элемент блока
    var step = $(bl).width(); // ширина объекта
     $(this.unit).find('.bar').find("li").removeClass("active");  
     $(this.unit).find('.bar').find("li").eq(obj).addClass('active'); 
    $(ul).stop().animate({marginLeft: "-"+step*obj}, 500); // 500 это скорость перемотки    
}


var Slider1 = new Slider('body',2000,5000);
}());







/*<div class="main">
        <div class="bar">
            <ul>
                <li id="0" class="active"></li>
                <li id="1"></li>
                <li id="2"></li>
                <li id="3"></li>
            </ul>
        </div>
        <div class="slider">
        <ul>
            <li><img class="slide0" src='img/image1.jpg' alt=""></li>
            <li><img class="slide1" src='img/image2.jpg' alt=""></li>
            <li><img class="slide2" src='img/image3.jpg' alt=""></li>
            <li><img class="slide3" src='img/image4.jpg' alt=""></li>
        </ul>
</div>
    </div>

$('body').prepend('<div class="place">');
var Slider2 = new Slider('.place',2000,5000);
Slider2.createDom();
*/
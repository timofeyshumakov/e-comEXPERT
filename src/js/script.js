// #region global
const imgPatch = "assets/img/";
let burgerActive = false;
let cardsOnPage = 3;
let showedPopup;
let currentProgressCard = 0;
let initialPosition = `translateX(0)`;
let isElementClicked = false;
let finishPosition = 0;
let startPosition = 0;
let posX = 0;
let progressCards;
let boxTariffs;
let cloudTariffs;
let tariffsCards;
let tariffsSlider;
let tariffsCardsOnPage;
let boxTariffsCards;
let boxTariffsSlider;
let boxTariffsCardsOnPage;
let screenSize;
let currentBoxTariffsCard = 0;
let currentTariffsCard = 0;

function popupAlign(showedPopup){
  if(!showedPopup){ return; }
  if(window.innerHeight < showedPopup.offsetHeight){
    document.querySelector('.main__popup-container').style.alignItems = 'flex-start';
    document.querySelector('.header__popup-container').style.alignItems = 'flex-start';
  }else{
    document.querySelector('.main__popup-container').style.alignItems = 'center';
    document.querySelector('.header__popup-container').style.alignItems = 'center';
  }
}

function showPopup(){
  document.querySelector('.header__popup-container').classList.add('show');
  document.querySelector('.header__popup').classList.add('show');
  showedPopup = document.getElementById('headerPopup');
  popupAlign(showedPopup);
  setTimeout(() => {
    document.querySelector('.header__popup').style.transform = 'translateY(0)';
  }, 100);
}

window.addEventListener('resize', () => {
  resizeScreen();
  popupAlign(showedPopup);
});

function resizeScreen(){
  screenSize = window.innerWidth;
  if(screenSize < 1025){
    headerMenu.style.display = 'none';
    burger.style.display = 'flex';
    document.querySelector('.header__right').appendChild(document.querySelector('.header__button'));
    document.querySelector('.header__right').appendChild(burger);
  }else{
    headerMenu.style.display = 'flex';
    burger.style.display = 'none';
    document.querySelector('.header__menu').classList.remove('show');
    document.querySelector('.header').classList.remove('burger-active');
    document.querySelector('.header__left').appendChild(document.querySelector('.header__tel'));
    document.querySelector('.header__menu').appendChild(document.querySelector('.header__button'));
    document.querySelector('.header__right').appendChild(burger);
    burgerActive = false;
  }
  if(screenSize < 768){
    cardsOnPage = 0;
    currentProgressCard = 0;
    for(i = 0; i < progressCards.length; i++){
      progressCards[i].style.transform = `translateX(0)`;
    }
  }else if(screenSize < 1440  &&  screenSize > 768){
    cardsOnPage = 2;
  }else{
    cardsOnPage = 3;
  }
  if(screenSize < 768){
    //document.querySelector('.item-contacts-img').appendChild(document.querySelector('.footer__img'));
    document.querySelector('.item-contacts-img').insertBefore(document.querySelector('.footer__img'), document.querySelector('.item-contacts-img').firstChild);
  }else{
    document.querySelector('.item-img').appendChild(document.querySelector('.footer__img'));
  }
  if(document.querySelector('.cloud-tariffs').offsetWidth > 0){
    tariffsCardsOnPage = Math.floor(document.querySelector('.cloud-tariffs').offsetWidth / document.querySelector('.cloud-tariffs').querySelector('.tariffs-card').offsetWidth);
  }
  if(document.querySelector('.box-tariffs').offsetWidth > 0){
    boxTariffsCardsOnPage = Math.floor(document.querySelector('.box-tariffs').offsetWidth / document.querySelector('.box-tariffs').querySelector('.tariffs-card').offsetWidth);
  }
}

document.addEventListener('DOMContentLoaded', function(){

const boxTariffsButton = document.getElementById('boxTariffsButton');
const cloudTariffsButton = document.getElementById('cloudTariffsButton');
boxTariffs = document.querySelector('.box-tariffs');
cloudTariffs = document.querySelector('.cloud-tariffs');
tariffsSlider  = document.querySelector(".cloud-tariffs");
tariffsCards = tariffsSlider.getElementsByClassName("tariffs-card");
boxTariffsSlider  = document.querySelector(".box-tariffs");
boxTariffsCards = boxTariffsSlider.getElementsByClassName("tariffs-card");

document.querySelector('.tariffs__select-container').addEventListener('click', function(e) {
  document.querySelector('.tariffs__select').classList.toggle('active-select');
  document.querySelectorAll('.tariffs__option')[1].classList.add('show');
  if(e.target.id === 'cloud-option' && e.target.classList.contains('show')){
    document.querySelector('.tariffs__select').appendChild(document.getElementById('cloud-option'));
    document.querySelector('.tariffs__select-container').appendChild(document.getElementById('box-option'));
    document.querySelectorAll('.tariffs__option').forEach(item => {
      item.classList.remove('show');
    });
    cloudTariff();
  }else if(e.target.id === 'box-option' && e.target.classList.contains('show')){
    document.querySelector('.tariffs__select').appendChild(document.getElementById('box-option'));
    document.querySelector('.tariffs__select-container').appendChild(document.getElementById('cloud-option'));
    document.querySelectorAll('.tariffs__option').forEach(item => {
      item.classList.remove('show');
    });
    boxTariff();
  }
});

boxTariffsButton.addEventListener('click', () => {
  boxTariff();
});

cloudTariffsButton.addEventListener('click', () => {
  cloudTariff();
});

document.querySelector('.consultation__button').addEventListener('click', () => {
  showPopup();
});

document.querySelectorAll('.buy-button').forEach(item => {
  item.addEventListener('click', () => {
    popupcloser(item);
    setTimeout(() => {
      showPopup();
    }, "400");
  });
});

// #endregion 

// #region boxTariffs


let isBoxTariffsClicked = false;
let boxTariffsInitialPosition = `translateX(0)`;
let boxTariffsFinishPosition = 0;
let boxTariffsStartPosition = 0;
let boxTariffsPosX = 0;

document.getElementById("tariffs-left-arrow").style.opacity = "0.72";



function boxTariffsPreviousCard () {
  if(currentBoxTariffsCard !== 0){
    if(boxTariffsCards.length < (currentBoxTariffsCard + boxTariffsCardsOnPage)){
      document.getElementById("tariffs-right-arrow").style.opacity = "0.72";
    }else{
      document.getElementById("tariffs-right-arrow").style.opacity = "1";
    }
    currentBoxTariffsCard--;
    if(currentBoxTariffsCard === 0){
      document.getElementById("tariffs-left-arrow").style.opacity = "0.72";
    }else{
      document.getElementById("tariffs-left-arrow").style.opacity = "1";
    }
    boxTariffsInitialPosition = `translateX(-${currentBoxTariffsCard}00%)`;
    for(i = 0; i < boxTariffsCards.length; i++){
      boxTariffsCards[i].style.transform = `translateX(-${currentBoxTariffsCard}00%)`;
    }
  }
}

function boxTariffsNextCard () {
  if(boxTariffsCards.length >= currentBoxTariffsCard + boxTariffsCardsOnPage){
    document.getElementById("tariffs-right-arrow").style.opacity = "0.72";
  }else{
    document.getElementById("tariffs-right-arrow").style.opacity = "1";
  }
  if(currentBoxTariffsCard >= boxTariffsCards.length - boxTariffsCardsOnPage){
  }else{
    currentBoxTariffsCard++;
    if(currentBoxTariffsCard === 0){
      document.getElementById("tariffs-left-arrow").style.opacity = "0.72";
    }else{
      document.getElementById("tariffs-left-arrow").style.opacity = "1";
    }
    boxTariffsInitialPosition = `translateX(-${currentBoxTariffsCard}00%)`;
    for(i = 0; i < boxTariffsCards.length; i++){
      boxTariffsCards[i].style.transform = `translateX(-${currentBoxTariffsCard}00%)`;
    }
  }
}

boxTariffsSlider.addEventListener('mousedown', function(e) {
  boxTariffsFinishPosition = e.pageX;
  isBoxTariffsClicked = true;
});

boxTariffsSlider.addEventListener('touchstart', function(e) {
  boxTariffsFinishPosition = e.touches[0].pageX;
  isBoxTariffsClicked = true;
});

boxTariffsSlider.addEventListener('mousemove', function(e) {
  boxTariffsPosX = e.pageX;
 boxTariffsMoveFunction();
});

boxTariffsSlider.addEventListener('touchmove', function(e) {
  boxTariffsPosX = e.touches[0].pageX;
 boxTariffsMoveFunction();
});

boxTariffsSlider.addEventListener('mouseup', function(e) {
  isBoxTariffsClicked = false;
  boxTariffsSliderFunction();
});

boxTariffsSlider.addEventListener('touchend', function(e) {
  isBoxTariffsClicked = false;
  boxTariffsSliderFunction();
});

function boxTariffsMoveFunction(){
  if(isBoxTariffsClicked){
    boxTariffsCW = boxTariffsSlider.offsetWidth;
    p = (currentBoxTariffsCard + ((boxTariffsFinishPosition - boxTariffsPosX) / boxTariffsCW)) * 100;
    if(currentBoxTariffsCard <boxTariffsCards.length){
      for(i = 0; i <boxTariffsCards.length; i++){
      if(p > 0){
       boxTariffsCards[i].style.transform = `translateX(-${p}%)`;
      }else{
       boxTariffsCards[i].style.transform = `translateX(${-p}%)`;
      }
      }
    }
  }
}

function boxTariffsSliderFunction(){
  boxTariffsFinishPosition = boxTariffsFinishPosition - boxTariffsPosX;
  if(currentBoxTariffsCard === 0 || currentBoxTariffsCard === boxTariffsCards.length - boxTariffsCardsOnPage){
    for(i = 0; i <boxTariffsCards.length; i++){
      boxTariffsCards[i].style.transform = boxTariffsInitialPosition;
     }
  }
  
  if(boxTariffsPosX !== 0){
    if(boxTariffsFinishPosition > 100){
      boxTariffsNextCard();
    }else if(boxTariffsFinishPosition < -100){
      boxTariffsPreviousCard();
    }else{
      for(i = 0; i <boxTariffsCards.length; i++){
       boxTariffsCards[i].style.transform = boxTariffsInitialPosition;
      }
    }
  }
  isBoxTariffsClicked = false;
  boxTariffsFinishPosition = 0;
  boxTariffsPosX = 0;
}

// #endregion

// #region cloudTariffs
let isTariffsClicked = false;
let tariffsInitialPosition = `translateX(0)`;
let tariffsFinishPosition = 0;
let tariffsStartPosition = 0;
let tariffsPosX = 0;

document.getElementById("tariffs-left-arrow").style.opacity = "0.72";

document.getElementById('tariffs-right-arrow').addEventListener('click', () => {
  if(document.querySelector('.box-tariffs').offsetWidth > 0){
    boxTariffsNextCard();
  }else{
    tariffsNextCard();
  }
});

document.getElementById('tariffs-left-arrow').addEventListener('click', () => {
  if(document.querySelector('.box-tariffs').offsetWidth > 0){
    boxTariffsPreviousCard();
  }else{
    tariffsPreviousCard();
  }
});

function tariffsPreviousCard () {
  document.getElementById("tariffs-right-arrow").style.opacity = "1";
  if(currentTariffsCard <= 1){
    document.getElementById("tariffs-left-arrow").style.opacity = "0.72";
  }else{
    document.getElementById("tariffs-left-arrow").style.opacity = "1";
  }
  if(currentTariffsCard !== 0){
    currentTariffsCard--;
    tariffsInitialPosition = `translateX(-${currentTariffsCard}00%)`;
    for(i = 0; i < tariffsCards.length; i++){
      tariffsCards[i].style.transform = `translateX(-${currentTariffsCard}00%)`;
      tariffsCards[i].classList.remove('tariffs-card-focused');
    }
    tariffsCards[currentTariffsCard].classList.add('tariffs-card-focused');
  }
}

function tariffsNextCard () {
  if( tariffsCards.length > tariffsCardsOnPage){
    document.getElementById("tariffs-left-arrow").style.opacity = "1";
  }
  if(currentTariffsCard >=  tariffsCards.length - tariffsCardsOnPage - 1){
    document.getElementById("tariffs-right-arrow").style.opacity = "0.72";
  }else{
    document.getElementById("tariffs-right-arrow").style.opacity = "1";
  }
  if(currentTariffsCard >= tariffsCards.length - tariffsCardsOnPage){
  }else{
    currentTariffsCard++;
    tariffsInitialPosition = `translateX(-${currentTariffsCard}00%)`;
    for(i = 0; i < tariffsCards.length; i++){
      tariffsCards[i].style.transform = `translateX(-${currentTariffsCard}00%)`;
      tariffsCards[i].classList.remove('tariffs-card-focused');
    }
    tariffsCards[currentTariffsCard].classList.add('tariffs-card-focused');
  }
}

tariffsSlider.addEventListener('mousedown', function(e) {
  tariffsFinishPosition = e.pageX;
  isTariffsClicked = true;
});

tariffsSlider.addEventListener('touchstart', function(e) {
  tariffsFinishPosition = e.touches[0].pageX;
  isTariffsClicked = true;
});

tariffsSlider.addEventListener('mousemove', function(e) {
  tariffsPosX = e.pageX;
 tariffsMoveFunction();
});

tariffsSlider.addEventListener('touchmove', function(e) {
  tariffsPosX = e.touches[0].pageX;
 tariffsMoveFunction();
});

tariffsSlider.addEventListener('mouseup', function(e) {
  isTariffsClicked = false;
  tariffsSliderFunction();
});

tariffsSlider.addEventListener('touchend', function(e) {
  isTariffsClicked = false;
  tariffsSliderFunction();
});

function tariffsMoveFunction(){
  if(isTariffsClicked){
    tariffsCW = tariffsSlider.offsetWidth;
    p = (currentTariffsCard + ((tariffsFinishPosition - tariffsPosX) / tariffsCW)) * 100;
    if(currentTariffsCard <tariffsCards.length){
      for(i = 0; i <tariffsCards.length; i++){
      if(p > 0){
       tariffsCards[i].style.transform = `translateX(-${p}%)`;
      }else{
       tariffsCards[i].style.transform = `translateX(${-p}%)`;
      }
      }
    }
  }
}

function tariffsSliderFunction(){
  tariffsFinishPosition = tariffsFinishPosition - tariffsPosX;
  if(currentTariffsCard === 0 || currentTariffsCard === tariffsCards.length - tariffsCardsOnPage){
    for(i = 0; i <tariffsCards.length; i++){
      tariffsCards[i].style.transform = tariffsInitialPosition;
     }
  }
  
  if(tariffsPosX !== 0){
    if(tariffsFinishPosition > 100){
      tariffsNextCard();
    }else if(tariffsFinishPosition < -100){
      tariffsPreviousCard();
    }else{
      for(i = 0; i <tariffsCards.length; i++){
       tariffsCards[i].style.transform = tariffsInitialPosition;
      }
    }
  }
  isTariffsClicked = false;
  tariffsFinishPosition = 0;
  tariffsPosX = 0;
}

// #endregion 

// #region portfolio

document.getElementById('right-arrow').addEventListener('click', () => {
  nextProgressCard();
});

document.getElementById('left-arrow').addEventListener('click', () => {
  previousProgressCard();
});

progressCards = document.getElementsByClassName("portfolio-card-wrapper");
const progressSlider = document.querySelector(".portfolio__cards-container");
document.getElementById("left-arrow").style.opacity = "0.72";
if(progressCards.length <= cardsOnPage){
  progressSlider.style.justifyContent = 'center';
  progressCards[progressCards.length - 1].classList.add('portfolio-card-adaptive');
  document.getElementById("right-arrow").style.opacity = "0.72";
}

const portfolioCards = document.querySelector('.portfolio__cards').querySelectorAll('.portfolio-card');
portfolioCards.forEach((listItem) => {
  listItem.addEventListener('click', () => {
    if(finishPosition !== 0){ return; }
      listItem.classList.add('flipped');
      listItem.querySelector('.portfolio-card-front').classList.toggle('hide');
      listItem.querySelector('.portfolio-card-back').classList.toggle('show');
  });
});

progressSlider.addEventListener('mouseup', function(e) {
  if(cardsOnPage > 0){
    progressSliderFunction();
  }
});
progressSlider.addEventListener('touchend', function(e) {
  if(cardsOnPage > 0){
    progressSliderFunction();
  }
});

function previousProgressCard() {
  if(currentProgressCard <= 1){
    document.getElementById("left-arrow").style.opacity = "0.72";
  }else{
    document.getElementById("left-arrow").style.opacity = "1";
  }
  if(currentProgressCard !== 0){
    currentProgressCard--;
    initialPosition = `translateX(-${currentProgressCard}00%)`;
    for(i = 0; i < progressCards.length; i++){
      progressCards[i].style.transform = `translateX(-${currentProgressCard}00%)`;
    }
  }
  if(currentProgressCard < progressCards.length - cardsOnPage){
    document.getElementById("right-arrow").style.opacity = "1";
  }
}

function nextProgressCard() {
  if(currentProgressCard >= progressCards.length - cardsOnPage - 1){
    document.getElementById("right-arrow").style.opacity = "0.72";
  }else{
    document.getElementById("right-arrow").style.opacity = "1";
  }
  if(currentProgressCard >= progressCards.length - cardsOnPage){
  }else{
    currentProgressCard++;
    initialPosition = `translateX(-${currentProgressCard}00%)`;
    for(i = 0; i < progressCards.length; i++){
      progressCards[i].style.transform = `translateX(-${currentProgressCard}00%)`;
    }
  }
  if(currentProgressCard > 0){
    document.getElementById("left-arrow").style.opacity = "1";
  }
}

function progressSliderFunction(){
  if(currentProgressCard >= progressCards.length - cardsOnPage || currentProgressCard === 0){
    for(i = 0; i < progressCards.length; i++){
      progressCards[i].style.transform = initialPosition;
    }
  }
  finishPosition = startPosition - posX;
  if(finishPosition === 0){
    isElementClicked = false;
    startPosition = 0;
    return;
  }
  if(finishPosition > 100){
    nextProgressCard();
  }else if(finishPosition < -100){
    previousProgressCard();
  }else{
    for(i = 0; i < progressCards.length; i++){
      progressCards[i].style.transform = initialPosition;
    }
  }
  isElementClicked = false;
  startPosition = 0;
  posX = 0;
}

// #endregion 

// #region accordeon
document.querySelectorAll('.accordion-header').forEach(item => {
  const accordion = item.parentNode;
  item.addEventListener('mouseover', () => {
      accordion.classList.add('active');
  });
  accordion.addEventListener('mouseout', (event) => {
    if (!event.relatedTarget || !accordion.contains(event.relatedTarget)) {
      accordion.classList.remove('active');
    }
  });
});  
// #endregion 

// #region burger
  const headerMenu = document.getElementById('headerMenu');
  const burger = document.getElementById('burger');
  const burgerContent = document.getElementById('burgerContent');
  burger.addEventListener('click', () => {
    if(burgerActive){
      burgerActive = false;
      document.querySelector('.header__left').appendChild(document.querySelector('.header__tel'));
    }else{
      burgerActive = true;
      document.querySelector('.header__container').appendChild(document.querySelector('.header__right'));
      document.querySelector('.header__right').appendChild(document.querySelector('.header__tel'));
    }
    document.querySelector('.header__menu').classList.toggle('show');
    document.querySelector('.header').classList.toggle('burger-active');
  });
// #endregion

// #region capabilites
const capabilityList = document.querySelector('.capabilities__list');
const listItems = capabilityList.querySelectorAll('li');
const container = document.querySelector('.capabilities__cards');

listItems.forEach((listItem, index) => {
  listItem.addEventListener('click', () => {
    listItems.forEach(item => 
      item.classList.remove('active-capability'),
    );
    listItem.classList.add('active-capability');
    const thirdElement = container.children[index];
    container.querySelectorAll('.capabilities__card').forEach((item, index) => {
      item.style.position = 'absolute';
      item.style.transform = 'translateY(200%)';
    });
    thirdElement.style.display = 'flex';
    thirdElement.style.position = 'static';
    setTimeout(() => {
      thirdElement.style.transform = 'translateY(0)';
    }, "100");
    
    });
  });
// #endregion

  const servicesCards = document.querySelector('.services__cards').querySelectorAll('.services-card');
servicesCards.forEach((listItem, index) => {
  listItem.addEventListener('click', () => {
      listItem.classList.toggle('show');
      listItem.querySelector('.services-card-front').classList.toggle('hide');
      listItem.querySelector('.services-card-back').classList.toggle('show');
  });
});

// #region observer 
let sections = document.querySelectorAll('section:not(.info)');
let footer = document.querySelector('footer');
sections = [...sections, footer];
let delay = 0;

const observerOptions = {
    threshold: 0.01
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// #endregion

// #region popup 
function popupcloser(item){
    let popup = item.closest('.popup');
    setTimeout(() => {
      popup.style.transform = 'translateY(-200%)';
      setTimeout(() => {
        popup.parentElement.classList.remove('show');
        popup.classList.remove('show');
      }, 400);
    }, 100);
}

document.querySelectorAll(".popup-closer").forEach(item => {
  item.addEventListener('click', () => {
    popupcloser(item);
  });
});

setTimeout(() => {
  resizeScreen();
}, 100);

});
// #endregion

// #region tariffs
function showTariff(element){
  let elementId = element.getAttribute('data-tariff');
  document.querySelector('.main__popup-container').classList.add('show');
  showedPopup = document.getElementById(elementId);
  showedPopup.classList.add('show');
  popupAlign(showedPopup);
  setTimeout(() => {
    showedPopup.style.transform = 'translateY(0%)';
  }, "100");
}

function boxTariff(){
  boxTariffs.style.position = 'static';
  boxTariffs.style.display = 'flex';
  setTimeout(() => {
    cloudTariffs.style.transform = 'translateX(100%)';
    boxTariffs.style.transform = 'translateX(0)';
    cloudTariffs.style.display = 'none';
  }, "100");
  boxTariffsCardsOnPage = Math.floor(document.querySelector('.box-tariffs').offsetWidth / document.querySelector('.box-tariffs').querySelector('.tariffs-card').offsetWidth);
  boxTariffsButton.classList.add('active-button');
  cloudTariffsButton.classList.remove('active-button');
  if(boxTariffsCards.length <= (currentBoxTariffsCard + boxTariffsCardsOnPage)){
    document.getElementById("tariffs-right-arrow").style.opacity = "0.72";
  }else{
    document.getElementById("tariffs-right-arrow").style.opacity = "1";
  }
  if(currentBoxTariffsCard === 0){
    document.getElementById("tariffs-left-arrow").style.opacity = "0.72";
  }else{
    document.getElementById("tariffs-left-arrow").style.opacity = "1";
  }
}

function cloudTariff(){
  cloudTariffs.style.position = 'static';
  cloudTariffs.style.display = 'flex';
  setTimeout(() => {
    cloudTariffs.style.transform = 'translateX(0)';
    boxTariffs.style.transform = 'translateX(100%)';
    boxTariffs.style.display = 'none';
  }, "100");
  boxTariffsButton.classList.remove('active-button');
  cloudTariffsButton.classList.add('active-button');
  document.querySelector('.box-tariffs').style.display = 'none';
  document.querySelector('.cloud-tariffs').style.display = 'flex';
  if( tariffsCards.length <= (currentTariffsCard + tariffsCardsOnPage)){
    document.getElementById("tariffs-right-arrow").style.opacity = "0.72";
  }else{
    document.getElementById("tariffs-right-arrow").style.opacity = "1";
  }
  if(currentTariffsCard === 0){
    document.getElementById("tariffs-left-arrow").style.opacity = "0.72";
  }else{
    document.getElementById("tariffs-left-arrow").style.opacity = "1";
  }
}
// #endregion 
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
  if(window.innerWidth < 1025){
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
  if(window.innerWidth < 768){
    cardsOnPage = 0;
    currentProgressCard = 0;
    for(i = 0; i < progressCards.length; i++){
      progressCards[i].style.transform = `translateX(0)`;
    }
  }else if(window.innerWidth < 1440  &&  window.innerWidth > 768){
    cardsOnPage = 2;
  }else{
    cardsOnPage = 3;
  }
  if(window.innerWidth < 768){
    //document.querySelector('.item-contacts-img').appendChild(document.querySelector('.footer__img'));
    document.querySelector('.item-contacts-img').insertBefore(document.querySelector('.footer__img'), document.querySelector('.item-contacts-img').firstChild);
  }else{
    document.querySelector('.item-img').appendChild(document.querySelector('.footer__img'));
  }
}

document.addEventListener('DOMContentLoaded', function(){

const boxTariffsButton = document.getElementById('boxTariffsButton');
const cloudTariffsButton = document.getElementById('cloudTariffsButton');
boxTariffs = document.querySelector('.box-tariffs');
cloudTariffs = document.querySelector('.cloud-tariffs');

document.querySelector('.tariffs__select').addEventListener('change', function() {
  if (this.selectedIndex === 0) {
    cloudTariff();
  }else if(this.selectedIndex === 1) {
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

// #endregion

setTimeout(() => {
  resizeScreen();
}, 100);

});

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
  boxTariffsButton.classList.add('active-button');
  cloudTariffsButton.classList.remove('active-button');
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
}
// #endregion 
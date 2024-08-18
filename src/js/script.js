const theme = document.getElementById('theme');
const lang = document.getElementById('lang');
const arrows = document.querySelectorAll('.arrow');
let burgerIsActive = false;
const blue = '#415fff';
const dark = '#1c1c1c';
const bg = '#f5f5f5';
let textFontSize = "1rem";
let titleFontSize = "1.5rem";
const fontFamily = "Manrope";
const axisFontSize = "0.6rem";
let bigChartFont;
let charts = [];
let i = 0;
let chartBg;
let chartTxt;
let gridLineColor;
let gradient;
let screenSize;
let newsOnPage = 5;
let page = 1;
let rowsOnTable;
let themeColor = sessionStorage.getItem("themeColor");
const subpagesImgSrc = ['miners', 'transactions', 'earnings', 'hashrate', 'settings'];
let table =document.querySelector('.table__table-main');

if(document.querySelector('.table__table-main')){
 rowsOnTable = document.querySelector('.table__table-main').querySelectorAll(".table__tr").length - 1;
 if(table.dataset.display !== undefined){
  table.style.display = table.dataset.display; 
 }else{
  table.style.display = 'flex';
 }
}

const payment = document.getElementById('payment');
    const paymentCircle = document.getElementById('paymentCircle');
    if(payment){
      payment.addEventListener('change', () => {
        paymentCircle.classList.toggle('checked');
        document.getElementById('paymentCircleBg').classList.toggle('checked');
    });
  }
  const percent = document.getElementById('percent');
  const percentCircle = document.getElementById('percentCircle');
  if(percent){
    percent.addEventListener('change', () => {
      percentCircle.classList.toggle('checked');
      document.getElementById('percentCircleBg').classList.toggle('checked');
  });
}
window.addEventListener("load", () => {
  screenSize = window.innerWidth;
  switchNews(screenSize);
  if(document.getElementById('tableTo')){
    document.getElementById('tableTo').textContent = rowsOnTable;
    document.getElementById('tableOf').textContent = document.querySelectorAll(".table__tr").length - newsWrapperCount;
  }
  if (themeColor === null) {
    themeColor = 'light';
  }
  theme.click();
  if(document.getElementById('subpagesSelect')){
    document.getElementById('subpagesSelect').addEventListener('change', function() {
      if(this.dataset.pool !== undefined){
        window.location.href = `${this.dataset.pool}-pool-miners-transactions-${this.value.toLowerCase()}.html`;
      }
    });
  }
  if(document.querySelector('.info-card__select')){
    document.querySelectorAll('.hathor-card-content').forEach((item, i )=> {
      if (i === 0){
        item.style.display = 'block';
      }else{
        item.style.display = 'none';
      }
    });
    document.querySelector('.info-card__select').addEventListener('change', function() {
      document.querySelectorAll('.hathor-card-content').forEach((item, i )=> {
        if (i !== this.selectedIndex){
          item.style.display = 'none';
        }else{
          item.style.display = 'block';
        }
      });
    });
  }
  chartsMedia(screenSize);
});

document.addEventListener("click", (event)=>{
  if (event.target.classList.contains('pools') || event.target.classList.contains('pools__summary')){
  }else{
    document.querySelector('.pools').removeAttribute('open');
  }
});

theme.addEventListener('click', () => {
  sessionStorage.setItem("themeColor", themeColor);
  if(themeColor === 'dark'){
    themeColor = 'light';
    document.querySelector('body').classList.add('light-theme');
    if(burgerIsActive === false){
      theme.querySelector('.header__button-img').src = 'assets/img/header/sun-black.svg';
      lang.querySelector('.header__button-img').src = 'assets/img/header/website-black.svg';
      }
    if(document.getElementById('get-started')){
      document.getElementById('get-started').src = 'assets/img/get-started-white.svg';
    }
    document.querySelectorAll('.info-card__decor').forEach((item)=> {
      item.src="assets/img/icons/calendar.svg";
    });
    arrows.forEach(item => {
      if(item){
        if(item.classList.contains('pagination__img')){
          item.src = 'assets/img/icons/arrow-black.svg';
        }else{
          item.src = 'assets/img/icons/arrow-white.svg';
        }
      }
    });
    document.querySelectorAll('.video__icon').forEach((item)=> {
      item.src = `assets/img/videos/start-video-white.svg`;
    });
    document.querySelectorAll('.subpages-nav__img').forEach((item, i )=> {
      item.src = `assets/img/icons/${subpagesImgSrc[i]}-black.svg`;
    });
    if(document.querySelector('.copy__img')){
      document.querySelector('.copy__img').src = 'assets/img/icons/copy-black.svg';
    }
    document.querySelectorAll('.advantagesСard__img').forEach((item, i)=> {
      item.src= `assets/img/advantages/${i + 1}-white.jpg`;
    });
    document.querySelectorAll('.video__zoom-in').forEach((item)=> {
      item.src= `assets/img/videos/search-zoom-in-white.svg`;
    });
  }else{
    themeColor = 'dark';
    arrows.forEach(item => {
      if(item){
        if(item.classList.contains('pagination__img')){
          item.src = 'assets/img/icons/arrow-white.svg';
        }else{
          item.src = 'assets/img/icons/arrow-black.svg';
        }
      }
    });
    document.querySelectorAll('.info-card__decor').forEach((item)=> {
      item.src="assets/img/icons/calendar-black.svg";
    });
    document.querySelectorAll('.video__icon').forEach((item)=> {
      item.src = `assets/img/videos/start-video.svg`;
    });
    document.querySelectorAll('.subpages-nav__img').forEach((item, i )=> {
      item.src = `assets/img/icons/${subpagesImgSrc[i]}.svg`;
    });
    document.querySelector('body').classList.remove('light-theme');
    if(burgerIsActive === false){
    theme.querySelector('.header__button-img').src = 'assets/img/header/sun-white.svg';
    lang.querySelector('.header__button-img').src = 'assets/img/header/website-white.svg';
    }
    if(document.getElementById('get-started')){
      document.getElementById('get-started').src = 'assets/img/get-started-dark.svg';
    }
    if(document.querySelector('.copy__img')){
      document.querySelector('.copy__img').src = 'assets/img/icons/copy.svg';
    }
    document.querySelectorAll('.advantagesСard__img').forEach((item, i)=> {
      item.src= `assets/img/advantages/${i + 1}.jpg`;
    });
    document.querySelectorAll('.video__zoom-in').forEach((item)=> {
      item.src= `assets/img/videos/search-zoom-in-black.svg`;
    });
  }
  chartsUptate();
});

function showBurger(){
  if(burgerIsActive){
    burgerIsActive = false;
  }else{
    burgerIsActive = true;
  }
  document.querySelector('.header__main').classList.toggle('burgerActive');
  document.querySelector('.header__top').classList.toggle('burgerActive');
  document.querySelector('.header__menu').classList.toggle('burgerActive');
  document.querySelector('.menu__wallet').classList.toggle('burgerActive');
  document.querySelector('.menu__list').classList.toggle('burgerActive');
  document.querySelector('.header__buttons').classList.toggle('burgerActive');
  document.querySelector('.header__logo').classList.toggle('burgerActive');
  document.querySelector('.header__menu-burger').classList.toggle('burgerActive');
  document.querySelector('.header__signup').classList.toggle('burgerActive');
  theme.querySelector('.header__button-img').src = 'assets/img/header/sun-black.svg';
  lang.querySelector('.header__button-img').src = 'assets/img/header/website-black.svg';
}

function switchNews(screenSize) {
  if(newsWrapperCount < 2){return;}
  if (screenSize < 769) {
    if (newsOnPage === 5){
      newsOnPage = 3;
      if( page * 1 === 1){
        for (i = newsOnPage; i < newsWrapperCount; i++) {
          paginationNumbers[i].style.display = 'none';
        }
      }else if( page * 1 === newsWrapperCount){
        for (i = 0; i < newsWrapperCount - newsOnPage; i++) {
          paginationNumbers[i].style.display = 'none';
        }
      }else{
        for (i = 0; i < newsWrapperCount; i++) {
          if(i > page - newsOnPage && i < page * 1 + 1){
          }else{
            paginationNumbers[i].style.display = 'none';
          }
        }
      }
      }
  }else{
    if (newsOnPage === 3){
      newsOnPage = 5;
      if( page * 1 === 1){
        for (i = 0; i < newsOnPage; i++) {
          paginationNumbers[i].style.display = 'flex';
        }
      }else if( page * 1 === newsWrapperCount){
        for (i = newsWrapperCount - newsOnPage; i < newsWrapperCount; i++) {
          paginationNumbers[i].style.display = 'flex';
        }
      }else{
        // Если оба элемента существуют, устанавливаем `display: flex` для обоих
        if (paginationNumbers[page - 3] && paginationNumbers[page * 1 + 1]) {
          paginationNumbers[page * 1 + 1].style.display = 'flex';
          paginationNumbers[page - 3].style.display = 'flex';
        } else {
          // Если элемент слева существует, устанавливаем `display: flex` для него
          if (paginationNumbers[page - 3]) {
            paginationNumbers[page - 4].style.display = 'flex';
            paginationNumbers[page - 3].style.display = 'flex';
          }
          // Если элемент справа существует, устанавливаем `display: flex` для него
          if ( paginationNumbers[page * 1 + 1]) {
            paginationNumbers[page * 1 + 1].style.display = 'flex';
            paginationNumbers[page * 1 + 2].style.display = 'flex';
          }
        }

      }
    }
  }
}

window.addEventListener('resize', () => {
  screenSize = window.innerWidth;
  switchNews(screenSize);
  if (screenSize > 912) {
    document.querySelector('.header__main').classList.remove('burgerActive');
    document.querySelector('.header__top').classList.remove('burgerActive');
    document.querySelector('.header__menu').classList.remove('burgerActive');
    document.querySelector('.menu__wallet').classList.remove('burgerActive');
    document.querySelector('.menu__list').classList.remove('burgerActive');
    document.querySelector('.header__buttons').classList.remove('burgerActive');
    document.querySelector('.header__logo').classList.remove('burgerActive');
    document.querySelector('.header__menu-burger').classList.remove('burgerActive');
    document.querySelector('.header__signup').classList.remove('burgerActive');
    burgerIsActive = false;
    if(themeColor === 'light'){
      theme.querySelector('.header__button-img').src = 'assets/img/header/sun-black.svg';
      lang.querySelector('.header__button-img').src = 'assets/img/header/website-black.svg';
    }else{
      theme.querySelector('.header__button-img').src = 'assets/img/header/sun-white.svg';
      lang.querySelector('.header__button-img').src = 'assets/img/header/website-white.svg';
    }
  }
  imgResize();
  chartsMedia(screenSize);
});



let newsWrapperCount = document.querySelectorAll('.news__wrapper').length;
let newsWrappers;
if(newsWrapperCount === 0){
  newsWrapperCount = document.querySelectorAll('.table__table-main').length;
  newsWrappers = document.querySelectorAll('.table__table-main');
}else{
  newsWrappers = document.querySelectorAll('.news__wrapper');
}
const newsPagination = document.querySelector('.pagination__numbers');
if(newsWrapperCount > 1){
for (let i = 0; i < newsWrapperCount; i++) {
  const paginationNumber = document.createElement('div');
  paginationNumber.classList.add('pagination__number');
  paginationNumber.textContent = i + 1;
  if(i === 0){
    paginationNumber.classList.add('active-number');
  }
  newsPagination.appendChild(paginationNumber);

  paginationNumber.addEventListener('click', () => {
    page = paginationNumber.textContent;
    if (paginationNumbers[page] && page > 1){
    if (window.getComputedStyle(paginationNumbers[page]).display === 'none') {
      paginationNumbers[page].style.display = 'flex';
      paginationNumbers[page - newsOnPage].style.display = 'none';
    }else if(window.getComputedStyle(paginationNumbers[page - 2]).display === 'none'){
      paginationNumbers[page - 2].style.display = 'flex';
      paginationNumbers[page  * 1 + newsOnPage - 2].style.display = 'none';
    }
  }
    pagination(page);
  })}
  if(document.getElementById('back')){
    document.getElementById('back').classList.add('unactive');
  }
}else{
  if(document.querySelector('.pagination')){
    document.querySelector('.pagination').style.display = 'none';
  }
  if(document.querySelector('.table__navigation')){
    document.querySelector('.table__navigation').style.display = 'none';
  }
}
const paginationNumbers = document.querySelectorAll('.pagination__number');
function pagination(page){

if(rowsOnTable){
  document.getElementById('tableFrom').textContent = rowsOnTable * (page - 1)  + 1;
  if(page * 1 === newsWrapperCount){
    document.getElementById('tableTo').textContent = document.getElementById('tableOf').textContent;
   }else{
    document.getElementById('tableTo').textContent = rowsOnTable * page;
   }
}



  paginationNumbers.forEach((item, index )=> {
    if (index != page - 1){
      item.classList.remove('active-number');
    }else{
      item.classList.add('active-number');
    }
  });
  if(page == newsWrapperCount){
    document.getElementById('forward').classList.add('unactive');
    document.getElementById('back').classList.remove('unactive');
  }else if(page == 1) {
    document.getElementById('back').classList.add('unactive');
    document.getElementById('forward').classList.remove('unactive');
  }else{
    document.getElementById('back').classList.remove('unactive');
    document.getElementById('forward').classList.remove('unactive');
  }
  newsWrappers.forEach((wrapper, index) => {
  if (index !== page - 1) {
 wrapper.style.display = 'none';
}else{
wrapper.style.display = 'flex';
}
  });
  if(document.querySelector('.table__table-main')){
    if(page - 1 !== 0){
      if(table.dataset.display !== undefined){
        table.style.display = table.dataset.display; 
       }else{
        table.style.display = 'flex';
       }
    document.querySelector('.table__table-main thead').style.display = 'none';
    document.querySelector('.table__table-main tbody').style.display = 'none';
    }else{
      document.querySelector('.table__table-main thead').style.display = 'flex';
      document.querySelector('.table__table-main tbody').style.display = 'flex';
    }
    if(document.querySelector('.table__table-main tfoot')){
      newsWrappers[page - 1].appendChild(document.querySelector('.table__table-main tfoot'));
    }
  }
}


if (newsWrapperCount > newsOnPage){
  const paginationEllipsis = document.createElement('div');
  paginationEllipsis.classList.add('pagination__ellipsis');
  newsPagination.appendChild(paginationEllipsis);
  paginationEllipsis.textContent = '...';
  document.querySelector('.pagination__ellipsis').addEventListener('click', () => {

      for( i = page; i < newsWrapperCount; i++ ) {
        if(window.getComputedStyle(paginationNumbers[i]).display === 'none'){
          page = i + 1;
          break;
        }
      }
      for( i = 0; i < newsWrapperCount - newsOnPage; i++ ) {
        paginationNumbers[i].style.display = 'none';
      }
      for( i = page - 2; i < Math.min(page + newsOnPage - 2, newsWrapperCount); i++ ) {
        paginationNumbers[i].style.display = 'flex';
      }
    pagination(page);
  })
  document.querySelectorAll('.pagination__number').forEach((item, index )=> {
    if (index + 1 > newsOnPage){
      item.style.display = 'none';
    }else{

    }
  });
  
}
if(document.getElementById('forward')){
  document.getElementById('forward').addEventListener('click', () => {
  if (page < newsWrapperCount){
    page++;
    if(page >= newsOnPage && page < newsWrapperCount ){
      paginationNumbers[page].style.display = 'flex';
      paginationNumbers[page - newsOnPage].style.display = 'none';
    }
   pagination(page);
  }
});
}
if(document.getElementById('back')){
document.getElementById('back').addEventListener('click', () => {
  if (page * 1 < 2){
    return;
  }
  page--;
  if (page > 1){
      if (window.getComputedStyle(paginationNumbers[page - 2]).display === 'none'){
        paginationNumbers[page - 2].style.display = 'flex';
        paginationNumbers[page * 1 + (newsOnPage - 2)].style.display = 'none';
      }
  }
  pagination(page);
});
function copy(element) {
  if(element.querySelector(".command__txt")){
    navigator.clipboard.writeText(element.querySelector(".command__txt").textContent);
  }
  if(element.querySelector(".table__txt")){
    navigator.clipboard.writeText(element.querySelector(".table__txt").textContent);
  }
  if (event.target.classList.contains('copy-img')){
    navigator.clipboard.writeText(element.textContent);
  }else{
    return;
  }
}
}

document.querySelectorAll(".options__input").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".options__input").forEach(input => {
      input.classList.remove("active-input");
    });
    item.classList.add("active-input");
  });
});

const containerWidth = 80;
const rem = 16;
const scale = 1.5;
const margin = 1;
let imgAspectRatio;
let zoomImgWidth;

const gallery = document.querySelector('.gallery');
if(gallery){
  gallery.addEventListener('click', function(event) {
    if (event.target.tagName != 'IMG') { return; };
    let oTarget = event.target, nHeight, nWidth;
    let imgContainer = this.appendChild(document.createElement('DIV'));
    let zoomImg = imgContainer.appendChild(document.createElement('DIV'));
    imgAspectRatio = oTarget.offsetWidth / oTarget.offsetHeight;
  
    imgContainer.addEventListener('click', function(event) {
      event.stopPropagation();
      zoomImg.addEventListener('transitionend', function() { zoomImg.remove(); imgContainer.remove();});
      zoomImg.style.transition = `.5s ease-in`;
      zoomImg.style.height = zoomImg.style.width = `0px`;
      gallery.classList.toggle('show', false);
    });
  
    imgContainer.classList.toggle('active-img-container');
    imgContainer.style.position = 'fixed';
    imgContainer.style.width = "100vw";
    imgContainer.style.height = "100vh";
    imgContainer.style.zIndex = 10;
    imgContainer.style.top = 0;
    imgContainer.style.left = 0;
  
    zoomImg.style.position = `fixed`;
    zoomImg.style.background = `center / 100% 100% no-repeat url('${oTarget.currentSrc}')`;
    zoomImg.classList.toggle('active-img');
    zoomImg.style.position = 'fixed';
    zoomImg.style.transform = `scale(${scale}) translate(-33.3%, -33.5%)`;
    zoomImg.style.top = '50%';
    zoomImg.style.left = '50%';
    zoomImg.style.borderRadius = `3.5%`;
    zoomImg.style.cursor = 'pointer';
    zoomImg.style.transition = `transform 0.5s ease-out`;
    gallery.classList.toggle('show', true);
    imgResize();
  });
}


function imgResize(){
  zoomImg = document.querySelector('.active-img');
  if(zoomImg === null){ return; }
  if(window.screen.availWidth > containerWidth * rem){
    zoomImgWidth = containerWidth / scale;
    if(containerWidth * rem > window.screen.availHeight * imgAspectRatio){
      zoomImgWidth = (100 - (margin * 2)) / scale;
      zoomImg.style.height = `${zoomImgWidth}vh`;
      zoomImg.style.width = `${zoomImgWidth * imgAspectRatio}vh`;
    }else{
      zoomImg.style.height = `${zoomImgWidth / imgAspectRatio}rem`;
      zoomImg.style.width = `${zoomImgWidth}rem`;
    }
    }else{
    zoomImgWidth = (100 - (margin * 2)) / scale;
    if(window.screen.availWidth > window.screen.availHeight * imgAspectRatio){
      zoomImg.style.height = `${zoomImgWidth}vh`;
      zoomImg.style.width = `${zoomImgWidth * imgAspectRatio}vh`;
    }else{
      zoomImg.style.height = `${zoomImgWidth * (1 / imgAspectRatio)}vw`;
      zoomImg.style.width = `${zoomImgWidth}vw`;
    }
  }
}


function findVideos() {
  if (document.getElementById('videos') === null ){return;}
  let videos = document.querySelector('.videos').querySelectorAll('.video');
  for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
  }
}

function setupVideo(video) {
  let videolink;
  let link = video;
  let media = video.querySelector('.video__img');
  videolink = media.dataset.link;

  video.addEventListener('click', () => {
    if(video.classList.contains('video--enabled')) { return; }
      let iframe = createIframe(videolink);
      video.insertBefore(iframe, video.firstChild);
      video.querySelector('.video__img').remove();
      video.querySelector('.video__preview').remove();
      video.classList.add('video--enabled');
  });

  link.removeAttribute('href');
}

function createIframe(videolink) {
  let iframe = document.createElement('iframe');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', `https://www.youtube.com/embed/${videolink}?rel=0&showinfo=0&autoplay=1`);
  iframe.classList.add('video');
  return iframe;
}

findVideos();

function chartsMedia(screenSize){

  if( screenSize < 768 ){
    bigChartFont = false;
  }else{
    bigChartFont = true;
  }

  if(bigChartFont === true){
    titleFontSize = '1.5rem';
    textFontSize = '1rem';
  }else{
    titleFontSize = '1.15rem';
    textFontSize = '0.85rem';
  }

  for(i = 0; i < charts.length; i++){
    charts[i].update({
      title: {
        style: {
          fontSize: titleFontSize
        }
      },
      subtitle: {
        style: {
          fontSize: textFontSize
        }
      },
    });
  }
}

function chartsUptate(){

  if(document.querySelector('.line-chart')){
    document.querySelectorAll('.line-chart').forEach(item => {
      if(item.querySelector('.highcharts-legend')){
        item.querySelector('.highcharts-legend').style.transform = 'translate(0px, 359px)';
      }
    });
  }

  if(document.querySelector('.pie-chart')){
    document.querySelectorAll('.pie-chart').forEach(item => {
      if(item.querySelector('.highcharts-legend')){
      item.querySelector('.highcharts-legend').style.transform = 'translate(50%, 20%)';
      }
    });
  }

  if(themeColor === 'light'){
    chartBg = "#ffffff";
    chartTxt = "#000000";
    gridLineColor = "#e5e5e5";
    gradient = [[0, "#dfe5ff"],[1, 'rgba(65, 95, 255, 0)']];
  }else{
    chartBg = "#000000";
    chartTxt = "#ffffff";
    gridLineColor = "#333333";
    gradient = [[0, blue],[1, 'rgba(65, 95, 255, 0)']];
  }

  for(i = 0; i < charts.length; i++){
    charts[i].update({
      gridLineColor: gridLineColor,
      chart: {
        style: {
          gridLineColor: gridLineColor,
        },
        backgroundColor: chartBg
      },
      gridLineColor: gridLineColor,
      plotOptions: {
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: gradient
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: 0
        }
    },
      title: {
        style: {
            color: chartTxt
        }
      },

      yAxis: [{
        labels: {
            format: '{value} Sat',
        },
        title: {
            text: '',
        },
        gridLineColor: gridLineColor
        }, {
        title: {
            text: '',
        },
        labels: {
            format: '{value} USD',
        },
        opposite: true,
        gridLineColor: gridLineColor
    }],
    yAxis: [{
      labels: {
          format: '{value} Sat',
          style: {
              color: chartTxt
          }
      },
      title: {
          style: {
              color: chartTxt
          }
      }
    }, {
      title: {
          style: {
              color: chartTxt
          }
      },
      labels: {
          format: '{value} USD',
          style: {
              color: chartTxt
          }
      },
      opposite: true,
          gridLineColor: gridLineColor
      }],
      xAxis: {
        title: {
          style: {
              color: chartTxt
          }
        },
        labels: {
            style: {
              fontSize: axisFontSize,
              color: chartTxt
            }
        }
      },
    });
  }
}

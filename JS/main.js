
// Получать данные от сюда GET
// https://jsonplaceholder.typicode.com/photos
// https://jsonplaceholder.typicode.com/albums

// необходимо реализовать отрисовку данных по фильтрам:
// По альбомам

// Реализовать пагинацию(постраничная отрисовка данных)

// Реализовать показ в модалке двух картинок по ссылкам из свойств:
// url и thumbnailUrl
// Так же в модалке реализовать возможность показа информации о альбоме



const URLPHORO = 'https://jsonplaceholder.typicode.com/photos';
const URLALBUMS = 'https://jsonplaceholder.typicode.com/albums';

const COUNTPAGE = 9;

async function getDateFromUrl(url) {
  try {
    const responce = await fetch(url);
    return await responce.json();
  }
  catch (error) {
    showErrorMessage(`Произошла ошибка при получении данных об альбоме: ${error.message}`);
    return [];
  }
}

function createBodyApp() {
  const Body = document.querySelector('body');
  Body.insertAdjacentHTML('beforeend', `<div class="main" id="Album-App"></div>`);
}

async function createPages() {
  let albums = await getDateFromUrl(URLALBUMS);
  let container = document.querySelector('.main');

  if (albums) {
    container.insertAdjacentHTML('afterbegin', generatePages(Math.ceil(albums.length / COUNTPAGE)));
    createAlboms(albums);
    showPage();
  }
}

function createAlboms(albums = []) {
  let albumItem = `<div class="alboms">`;
  let container = document.querySelector('.main');

  albums.forEach(element => {
    albumItem = albumItem + `
      <div class="album-container" id="${element.id}">
        <div class="album__contant">
          <h2 class="album__h2">
            ${element.title};
          </h2>
        </div>
      </div>`;
  });

  container.insertAdjacentHTML('afterbegin', albumItem + `</div>`);
}

function generatePages(pageCount) {
  let pageStart = `
    <div class="page-container">
      <div class="page-body">
        <div class="pages">`;
  let pageEnd = `
        </div>
      </div>
    </div>`;

  for (let i = 0; i < pageCount; i++) {
    pageStart = pageStart + `<div class="page">${i + 1}</div>`;
  }

  return pageStart + pageEnd;
}



function showPage(pageCount = 1) {
  let start = (pageCount * COUNTPAGE) - (COUNTPAGE - 1);
  let end = pageCount * COUNTPAGE;

  document.querySelectorAll('.album-container').forEach(elem => {
    elem.classList.remove('open');
    if ((elem.id >= start) && (elem.id <= end)) {
      elem.classList.add('open');
    }
  });
}

function clearPages() {
  document.querySelectorAll('.page').forEach(item => {
    item.classList.remove('active');
  })
}

async function showPhotos(url) {
  let albums = await getDateFromUrl(url);

  if (albums) {
    let albumcontent = '';

    albums.forEach(item => {
      albumcontent = albumcontent + `
        <div class="albums">
          <img src="${item.thumbnailUrl}" class="albums__image-min">
          <img src="${item.url}" class="albums__image-max">
          <p>${item.title}</p>
        </div>`;
    })

    let popupContent = `
      <div id="popup" class="popup">
        <div class="popup__area"></div>
        <div class="popup__body">
          <div class="popup__content">
            <div class="popup__close">X</div>
            ${albumcontent}
          </div>
        </div>
      </div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', popupContent);
    document.querySelector('.popup').classList.add('popup-active');
  }

}



createBodyApp();
createPages();

document.addEventListener('click', item => {
  if (item.target.closest('.page')) {
    clearPages();
    item.target.classList.add('active');
    showPage(item.target.innerHTML);
  }

  if (item.target.closest('.album-container')) {
    let url = `${URLPHORO}?albumId=${item.target.closest('.album-container').id}`;
    console.log(url);
    showPhotos(url);
  }

  if ( (item.target.closest('.popup__close')) || (item.target.closest('.popup__area')) ) {
    document.querySelector('.popup').remove();
  }

  if (item.target.closest('.albums__image-min')) {
    item.target.parentNode.querySelector('.albums__image-max').classList.add('albums__image-min-active');
  }
});

document.addEventListener('mouseout', item => {
  if (item.target.closest('.albums__image-max')) {
    item.target.classList.remove('albums__image-min-active');
  }
})


function showErrorMessage(message) {
  let popupMessage = `
    <div class="error-wrap" id = "error-message">
      <div class="error">
        <h2 class="error-h2">Произошла ошибка:</h2>
        <p class="error-message">${message}</p>
      </div>
    </div>`;

  document.querySelector('main').insertAdjacentHTML('beforebegin', popupMessage);
  setTimeout(delErrorMessage, 5000);
}

function delErrorMessage() {
  let messageError = document.getElementById('error-message');
  messageError.remove();
}



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

async function getAlbums() {
  try {
    const responce = await fetch(URLALBUMS);
    return await responce.json();
  }
  catch (error) {
    showErrorMessage(`Произошла ошибка при получении данных об альбоме: ${error.message}`);
    return [];
  }
}

async function showAlbums() {
  let photos = await getAlbums();
  let container = document.querySelector('main');
  let albumItem = '';

  photos.forEach(element => {
    albumItem = `
      <div class="album-container" id="${element.id}">
        <div class="album__contant">
          <h2 class="album__h2">
            ${element.title};
          </h2>
        </div>
      </div>`;

    container.insertAdjacentHTML('beforeend', albumItem);
  });
}


showAlbums();




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

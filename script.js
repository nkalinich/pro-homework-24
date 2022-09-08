// Вверху страницы находится инпут и кнопка. Пользователь может ввести туда username любого пользователя гитхаб.
// Когда пользователь ввел логин, он может нажать на кнопку "Найти". В этот момент приложение должно отправить запрос на API Github и получить информацию о пользователе.
// Данные для пользователя берем из запроса https://api.github.com/users/{{login}} , где логин - это логин выбраного пользователя.
// Н-р для пользователя vladimirkr url будет https://api.github.com/users/vladimirkr

// После получения данных нужно показать аватар пользователя (свойство avatar_url), количество репозиториев
// (свойство public_repos), количество фоловеров (свойство followers) и количество наблюдаемых (свойство following)

// Если такого юзернейма не существует гитхаб вернет ошибку (404). Попробуйте обработать ее в .catch


const form = document.getElementById("form");

async function controller(link) {

  let request = await fetch(link);
  let response = await request.json();
  
  return response;
}

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  try {
    const username = document.getElementById("input").value.replaceAll(" ", "").toLowerCase();
    const API = await controller(`https://api.github.com/users/${username}`);
    console.log(API);

    if(API.message) {
      alert(API.message);
    }
    else {
      createCard();

      function createCard() {
        let card = document.createElement("div");
        let avatar = document.createElement("img");
        let info = document.createElement("div");
        let login = document.createElement("p");
        let rep = document.createElement("p");
        let followers = document.createElement("p");
        let following = document.createElement("p");
      
        card.classList.add("card");
        avatar.classList.add("avatar");
        info.classList.add("info");
        login.classList.add("login");
        rep.classList.add("rep");
        followers.classList.add("followers");
        following.classList.add("following");
      
        avatar.src=`${API.avatar_url}`;
  
        avatar.innerText;
        info.innerText;
        login.innerText = "login: " + API.login;
        rep.innerText = "repositories: " + API.public_repos;
        followers.innerText = "followers: " + API.followers;
        following.innerText = "following: " + API.following;
      
        document.body.append(card);
        card.append(avatar);
        card.append(info);
        info.append(login);
        info.append(rep);
        info.append(followers);
        info.append(following);
      }
    }
  }
  catch(err) {
    alert(err);
  }
});
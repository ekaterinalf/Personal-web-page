const downloadButton = document.getElementById("downloadButton");
const divForPhotos = document.getElementById("photos");
const loginBut = document.getElementById("loginBut");
const regBut = document.getElementById("regBut");
const fetch1 = document.getElementById("fetch1");

//fetch к api
if (downloadButton) {
  downloadButton.addEventListener("click", (event) => {
    let script = document.createElement("SCRIPT");
    script.src =
      "https://api.vk.com/method/photos.get?album_id=wall&rev=1&count=15&access_token=90000f93e3efb97339251953282aa81ce286a2e5bf65e51fa91164feb6c018afaa836fc2c719bbe789834&v=5.52&callback=callbackFunc";
    document.getElementsByTagName("head")[0].appendChild(script);
  });

  function callbackFunc(result) {
    console.log(result);
    const arr = result.response.items.map((el) => el.photo_1280);
    let str = "";
    arr.forEach((element) => {
      str = str + `<img src="${element}" class='vkphotos' tabindex='0' border='3'>`;
    });
    divForPhotos.innerHTML = str;
  }
}

//рендер формы логина
if (loginBut) {
  loginBut.addEventListener("click", async (event) => {
    event.preventDefault();
    const request = await fetch("/login");
    const result = await request.text();
    fetch1.innerHTML = result
  });
}

//рендер формы регистрации
if (regBut) {
  regBut.addEventListener("click", async (event) => {
    event.preventDefault();
    const request = await fetch("/registration");
    const result = await request.text();
    fetch1.innerHTML = result
  });
}

document.addEventListener('click', async (event) => {
  //fetch на логин
  if (event.target.id === 'SendLoginForm') {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector("#password").value;
    const newLogin = { email, password };
    const request = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLogin),
    });
    const result = await request.json();
    if (result.err) {
      document.querySelector('p').innerHTML = '<b>Чет не то :(</b>'
    } else {
      window.location.href = `/superpuper/${result.name}`;
    }
  }
  //fetch на регистрацию
  if (event.target.id === 'SendRegForm') {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const instagram = document.querySelector("#instagram").value;
    const password = document.querySelector("#password").value;
    const newUser = { name, email, instagram, password };
    const request = await fetch("/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const result = await request.json();
    console.log(result);
    if (result.err) {
      document.querySelector("p").innerHTML = "<b>Кажется ты уже регался<br>..но это не точно</b>";
    } else {
       window.location.href = `/superpuper/${result.name}`;
    }
  }

})

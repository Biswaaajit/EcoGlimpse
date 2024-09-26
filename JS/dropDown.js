const dropBox = document.querySelector("#dropBox");
const userInput = document.querySelector("#userInput");

dropBox.style.display = "none";

export function setList(item) {
  let arr = [];
  const res = localStorage.getItem("searchList");
  if (res) {
    arr = JSON.parse(res);
  }
  arr.unshift(item);
  let newArr = JSON.stringify(arr);
  localStorage.setItem("searchList", newArr);
}

function builtDropdown() {
  const res = localStorage.getItem("searchList");
  if (!res) return;
  const searchData = JSON.parse(res);
  let length = searchData.length > 6 ? 5 : searchData.length;
  dropBox.innerHTML = "";
  for (let i = 0; i < length; i++) {
    const para = document.createElement("p");
    para.innerText = searchData[i];
    para.classList.add("dropMenu");
    dropBox.appendChild(para);
    para.addEventListener("click", () => {
      userInput.value = para.innerText;
      userInput.focus();
      dropBox.style.display = "none";
    });
  }
  dropBox.style.display = "block";
}

userInput.addEventListener("focus", () => {
  builtDropdown();
});
userInput.addEventListener("blur", (e) => {
  setTimeout(() => {
    dropBox.style.display = "none";
  }, 1000);
});

const dropBox = document.querySelector("#dropBox");
const userInput = document.querySelector("#userInput");

dropBox.style.display = "none";

export function setList(item) {
  let arr = [];
  let newItem = item.toLowerCase();
  const res = localStorage.getItem("searchList");
  if (res) {
    arr = JSON.parse(res);
  }
  if (!arr.includes(newItem)) {
    arr.unshift(newItem);
  }
  let newArr = JSON.stringify(arr);
  localStorage.setItem("searchList", newArr);
}

function builtDropdown(value) {
  const res = localStorage.getItem("searchList");

  //     checking  result

  if (!res) return;

  const resultArr = JSON.parse(res);
  const searchData = resultArr.filter((el) => el.toLowerCase().includes(value));
  if (searchData.length === 0) {
    dropBox.style.display = "none";
    return;
  }
  let length = searchData.length > 6 ? 5 : searchData.length;
  dropBox.innerHTML = "";

  //      looping and creating element

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

//       Event Listeners

userInput.addEventListener("input", (e) => {
  let val = e.target.value ? e.target.value : "";
  builtDropdown(val);
});
userInput.addEventListener("blur", (e) => {
  setTimeout(() => {
    dropBox.style.display = "none";
  }, 1000);
});

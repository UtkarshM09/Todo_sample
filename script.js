const inputbox = document.querySelector(".inputbox input");
//querySelector returns first element that matches the css Selector
const addbtn = document.querySelector(".inputbox button");
const todoList = document.querySelector(".todoList");
const clearAll = document.querySelector(".clearAll");
const onepending = document.querySelector(".onepending");

inputbox.onkeyup = () => {
  let userinput = inputbox.value;
  if (userinput.trim() != 0) {
    addbtn.classList.add("active");
  } else {
    addbtn.classList.remove("active");
  }
};
addbtn.onclick = () => {
  let userinput = inputbox.value;
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  listArr.push(userinput);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  //SYNTAX => localStorage.setItem(keyname, value)
  showTasks();
};

function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  const pendingTasks = document.querySelector(".pendingTasks");
  pendingTasks.textContent = listArr.length;
  if (listArr.length > 0) {
    clearAll.classList.add("active");
  } else {
    pendingTasks.innerHTML = "No";
  }

  let newlitag = "";
  listArr.forEach((element, index) => {
    newlitag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i></i>Remove</span></li>`;
  });
  todoList.innerHTML = newlitag;
  inputbox.value = "";
}
//Adding new li in todoList
//trim() is to remove white spaces
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1);
  //splice is used to delete or remove the particular indexed li
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

//Delete All Tasks
clearAll.onclick = () => {
  listArr = [];
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
};

"use strict";

const table = document.querySelector("tbody");

function findNextDay() {
  let tr = table.children[0];
  if (tr.children.length === 2) {
    return new Date("2022-12-05");
  }
  let lastMember = tr.children[tr.children.length - 1];
  let lastDay = new Date(parseFloat(lastMember.getAttribute("data-time")));
  let lessonDays = [1, 3, 5];

  for (let day of lessonDays) {
    if (day > lastDay.getDay()) {
      lessonDays[0] = day;
      break;
    }
  }
  let nextLessonDay = new Date(lastDay.getTime());
  nextLessonDay.setDate(
    lastDay.getDate() + ((lessonDays[0] + 7 - lastDay.getDay()) % 7)
  );
  return nextLessonDay;
}

document.querySelector(".add-day-btn").addEventListener("click", () => {
  let nextDay = findNextDay();
  let splitDate = nextDay.toDateString().split(" ");
  let dateTitle = `${splitDate[0]} ${splitDate[1]} ${splitDate[2]}`;

  let td = document.createElement("td");
  td.style.width = "100px";
  td.innerHTML = dateTitle;
  td.setAttribute("data-time", nextDay.getTime());
  td.style.padding = "15px";
  td.classList.add("added-day");
  if (splitDate[0] === "Fri") {
    td.style.color = "black";
    // alert("Learning week end 👏👏");
  }
  table.children[0].appendChild(td);

  for (let i = 1; i < table.children.length; i++) {
    td = document.createElement("td");
    td.innerHTML = 0;
    td.setAttribute("data-score-box", 1);
    td.setAttribute("class", "black");

    table.children[i].append(td);
  }
  updateValues();
});

function removeLastDay() {
  if (table.children[0].children.length > 2) {
    for (let i = 0; i < table.children.length; i++) {
      const rows = table.children[i].children;
      const lastRow = rows[rows.length - 1];
      lastRow.remove();
    }
    updateValues();
  }
}

document.querySelector(".remove-day-btn").addEventListener("click", () => {
  removeLastDay();
});

table.addEventListener("click", (event) => {
  let score;
  if (event.target.hasAttribute("data-score-box")) {
    do {
      let promptScore = prompt("Enter Score From 0 to 5");
      score = promptScore;
    } while (score > 5 || score < 0 || isNaN(score));
    event.target.innerHTML = score;
    if (event.target.innerHTML === "") {
      event.target.innerHTML = "0";
    } else if (score > "0") {
      event.target.style.backgroundColor = "green";
    } else if (event.target.innerHTML === "0") {
      event.target.style.backgroundColor = "";
    }
    updateValues();
  }
});

function updateValues() {
  let TotalDays = table.children[0].children.length - 2;
  document.querySelector(".total-value").innerHTML = TotalDays;
  let missedLesson = 0;
  for (let i = 1; i < table.children.length; i++) {
    let tr = table.children[i];
    for (let j = 2; j < tr.children.length; j++) {
      if (tr.children[j].innerHTML === "0") {
        missedLesson++;
      }
    }
  }
  document.querySelector(".missed-value").innerHTML = missedLesson;

  let sum = 0;

  for (let i = 1; i < table.children.length; i++) {
    let row = table.children[i];
    sum += parseFloat(row.children[1].innerHTML);
  }
  let average = sum / 10;

  document.querySelector(".average-value").innerHTML = average;
  console.log(`main ${average}`);
  updateAverage();
}

function updateAverage() {
  for (let i = 1; i < table.children.length; i++) {
    let row = table.children[i];

    if (row.children.length === 2) {
      row.children[1].innerHTML = "0";
      continue;
    }

    let sum = 0;

    for (let j = 2; j < row.children.length; j++) {
      sum += parseFloat(row.children[j].innerHTML);
    }

    let average = sum / (row.children.length - 2);
    row.children[1].innerHTML = average;
    console.log(`second:${average}`);
  }
}

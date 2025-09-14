let courses = [];
let plan = [];
let maxCredit = 18;

document.getElementById("fileInput").addEventListener("change", handleFile);
document.getElementById("loadDefault").addEventListener("click", loadDefault);
document.getElementById("maxCredit").addEventListener("input", e => {
  maxCredit = parseInt(e.target.value);
  updateSummary();
});

// Load default Excel
function loadDefault() {
  fetch("full_routin.xlsx")
    .then(res => res.arrayBuffer())
    .then(ab => processWorkbook(XLSX.read(ab, {type: "array"})));
}

// Handle uploaded file
function handleFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const data = new Uint8Array(ev.target.result);
    const workbook = XLSX.read(data, {type: "array"});
    processWorkbook(workbook);
  };
  reader.readAsArrayBuffer(file);
}

// Process Excel data
function processWorkbook(workbook) {
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  courses = XLSX.utils.sheet_to_json(sheet);
  renderCourseTable();
}

// Render available courses
function renderCourseTable() {
  const tbody = document.querySelector("#courseTable tbody");
  tbody.innerHTML = "";
  courses.forEach((c, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.Code || ""}</td>
      <td>${c.Title || ""}</td>
      <td>${c.Section || ""}</td>
      <td>${c.Credit || 0}</td>
      <td>${c.Day || ""}</td>
      <td>${c.Time || ""}</td>
      <td><button onclick="addCourse(${idx})">Add</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// Add course to plan
function addCourse(idx) {
  const c = courses[idx];
  if (plan.find(p => p.Code === c.Code && p.Section === c.Section)) return;
  plan.push(c);
  updatePlan();
}

// Remove course
function removeCourse(idx) {
  plan.splice(idx, 1);
  updatePlan();
}

// Update plan table + credits + conflicts + timetable
function updatePlan() {
  const tbody = document.querySelector("#planTable tbody");
  tbody.innerHTML = "";
  plan.forEach((c, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.Code}</td>
      <td>${c.Section}</td>
      <td>${c.Credit}</td>
      <td>${c.Day}</td>
      <td>${c.Time}</td>
      <td><button onclick="removeCourse(${idx})">Remove</button></td>
    `;
    tbody.appendChild(tr);
  });
  updateSummary();
  checkConflicts();
  renderTimetable();
}

// Update credit summary
function updateSummary() {
  const total = plan.reduce((sum, c) => sum + (parseFloat(c.Credit) || 0), 0);
  document.getElementById("creditSummary").innerText =
    `Total Credits: ${total} / ${maxCredit}`;
  if (total > maxCredit) {
    document.getElementById("creditSummary").style.color = "red";
  } else {
    document.getElementById("creditSummary").style.color = "black";
  }
}

// Check for schedule conflicts
function checkConflicts() {
  let warning = "";
  for (let i = 0; i < plan.length; i++) {
    for (let j = i + 1; j < plan.length; j++) {
      if (plan[i].Day === plan[j].Day && plan[i].Time === plan[j].Time) {
        warning = `⚠ Conflict between ${plan[i].Code} and ${plan[j].Code}`;
      }
    }
  }
  document.getElementById("conflictWarning").innerText = warning;
}

// Render timetable grid
function renderTimetable() {
  const grid = document.getElementById("timetableGrid");
  grid.innerHTML = "";
  const days = ["Time", "Sun", "Mon", "Tue", "Wed", "Thu"];
  const times = ["8-10", "10-12", "12-2", "2-4", "4-6"];

  // Header row
  days.forEach(d => {
    const div = document.createElement("div");
    div.className = "header";
    div.innerText = d;
    grid.appendChild(div);
  });

  // Rows
  times.forEach(t => {
    days.forEach((d, di) => {
      const div = document.createElement("div");
      div.className = "slot";
      if (di === 0) {
        div.innerText = t;
      } else {
        const course = plan.find(c => c.Day === d && c.Time === t);
        if (course) {
          div.className = "occupied";
          div.innerText = `${course.Code}\n${course.Section}`;
        }
      }
      grid.appendChild(div);
    });
  });
}
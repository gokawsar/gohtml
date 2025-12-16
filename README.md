# 📅 GUB Semester Planner

![Status](https://img.shields.io/badge/Status-Active-success)
![Platform](https://img.shields.io/badge/Platform-Web-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A smart, interactive, and visual semester planning tool designed specifically for students of **Green University of Bangladesh (GUB)**. This application eliminates the hassle of manual schedule mapping by allowing students to visualize their semester routine, detect time conflicts instantly, and save their preferred plans.

## 🚀 Features

* **📂 Excel/CSV Parsing:** Directly load the official university routine files (`.xlsx` or `.csv`).
* **👀 Visual Scheduler:** See your week at a glance with a responsive time-grid view.
* **⚡ Conflict Detection:** Automatically prevents you from selecting overlapping course sections.
* **💾 Save & Load Plans:** Save multiple plan variations to your browser's local storage and switch between them easily.
* **📸 Export to PNG:** Download a high-quality image of your schedule to share or keep on your phone.
* **🔍 Smart Filtering:** Filter courses by Program, Batch, or Course Code to find sections quickly.
* **🌙 Dark Mode UI:** A modern, eye-friendly interface designed for extended planning sessions.

## 🛠️ Tech Stack

* **Core:** HTML5, CSS3 (Custom Properties), Vanilla JavaScript (ES6+).
* **Libraries:**
    * [SheetJS (xlsx)](https://sheetjs.com/) - For parsing Excel and CSV data on the client side.
    * [html2canvas](https://html2canvas.hertzen.com/) - For rendering the schedule grid into downloadable images.

## 🏁 Getting Started

### Prerequisites
You only need a modern web browser (Chrome, Firefox, Edge, Safari). No server installation is required.

### Installation
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/gub-semester-planner.git](https://github.com/yourusername/gub-semester-planner.git)
    ```
2.  **Open the app:**
    Navigate to the folder and open `index.html` in your browser.

### Usage
1.  **Load Routine:** Click **"Load Excel/CSV"** or use the **"Auto-Load"** feature if you have files in a `Schedules/` folder.
2.  **Select Courses:** Click the **"Options"** button on any time slot in the grid.
3.  **Build Schedule:** Choose your preferred sections. The app will highlight the selected times and block conflicting slots.
4.  **Save/Export:** Use **"Save Plan"** to store it locally or **"Save PNG"** to download the image.

## 📂 Project Structure
gub-semester-planner/ 
├── index.html # Main application file (HTML/CSS/JS) 
├── ClassRoutine.csv # Sample routine data 
├── Schedules/ # Directory for auto-loading routines (optional) 
└── README.md # Documentation

## 🤝 Contributing

Contributions are welcome!
1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<p align="center">Made with ❤️ for GUB Students</p>

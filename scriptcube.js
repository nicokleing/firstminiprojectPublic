document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll("#unique-cube-section .unique-cube-box");
    const headingSpan = document.getElementById("current-tech");
    const buttonSpan = document.getElementById("current-tech-btn");
    const uniqueCubeBtn = document.getElementById("unique-cube-btn");

    const colors = [
        "#efd81d", // Data Science
        "#61dbfb", // Machine Learning
        "#41b883", // Data Engineering
        "#b52e31", // Software Engineering
        "#43853d", // Python
        "#cf649a", // BI
        "#e04e39"  // SQL
    ];

    const techs = ["Data Science", "Machine Learning", "Data Engineering", "Software Engineering", "Python", "BI", "SQL"];

    let current = 1;

    const textStyle = () => {
        headingSpan.style.color = colors[current - 1];
        headingSpan.textContent = techs[current - 1];
        buttonSpan.textContent = techs[current - 1];
        uniqueCubeBtn.style.backgroundColor = colors[current - 1];
    };

    let interval = setInterval(() => {
        if (current > boxes.length) current = 1;

        boxes.forEach((box) => {
            if (box.classList.contains(`unique-cube-box-${current}`)) {
                box.classList.add("unique-active");
            } else {
                box.classList.remove("unique-active");
            }
        });
        textStyle();
        current++;
    }, 5000);

    // Function to navigate to the corresponding page
    function navigateToPage(pageName) {
        window.location.href = pageName + ".html";
    }

    uniqueCubeBtn.addEventListener("click", () => {
        const tech = buttonSpan.textContent;
        navigateToPage(tech.replace(" ", ""));
    });

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            boxes.forEach((cube) => {
                cube.classList.remove("unique-active");
            });
            box.classList.add("unique-active");

            current = parseInt(box.classList[1].split("-")[3], 10);

            textStyle();

            clearInterval(interval);
        });
    });
});

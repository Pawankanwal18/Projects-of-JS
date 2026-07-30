const words = [
    "Dream",
    "Believe",
    "Create",
    "Success",
    "Code",
    "JavaScript",
    "React",
    "Focus",
    "Learn",
    "Future",
    "AI",
    "Explore",
    "Build",
    "Think",
    "Innovate",
    "Design",
    "Growth",
    "Passion",
    "Vision",
    "Win"
];

const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#A66CFF",
    "#2ECC71",
    "#F39C12",
    "#FF9FF3",
    "#00C9A7"
];

document.addEventListener("click", (e) => {

    const circle = document.createElement("div");
    circle.className = "circle";

    circle.innerText =
        words[Math.floor(Math.random() * words.length)];

    circle.style.background =
        colors[Math.floor(Math.random() * colors.length)];

    circle.style.left = e.clientX + "px";
    circle.style.top = e.clientY + "px";

    document.body.appendChild(circle);

    requestAnimationFrame(() => {
        circle.classList.add("show");
    });

    // Stay on screen while growing
    setTimeout(() => {
        circle.classList.add("hide");
    }, 5000);

    // Remove after fade-out
    setTimeout(() => {
        circle.remove();
    }, 6200);

});  

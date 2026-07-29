const words = [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node",
    "Python",
    "Coding",
    "Dream",
    "Focus",
    "Create",
    "Success",
    "Learn",
    "Build",
    "Future",
    "Logic",
    "Developer",
    "AI",
    "Believe",
    "Code",
    "Explore"
];

const colors = [
    "#ff4757",
    "#1e90ff",
    "#2ed573",
    "#ffa502",
    "#e84393",
    "#00cec9",
    "#6c5ce7",
    "#fd79a8"
];

document.addEventListener("click", (e) => {
    const circle = document.createElement("div");
    circle.classList.add("circle");

    // Random word
    circle.textContent = words[Math.floor(Math.random() * words.length)];

    // Random color
    circle.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

    circle.style.left = `${e.clientX - 40}px`;
    circle.style.top = `${e.clientY - 40}px`;

    document.body.appendChild(circle);

    // Remove after animation
    setTimeout(() => {
        circle.classList.add("hide");
    }, 1200);

    setTimeout(() => {
        circle.remove();
    }, 1800);
});
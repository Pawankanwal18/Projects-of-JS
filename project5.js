const form = document.getElementById("studentForm");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const firstName = document.getElementById("first").value.trim();
    const lastName = document.getElementById("second").value.trim();
    const age = document.getElementById("third").value.trim();

    if (age <= 0) {
        alert("Please enter a valid age.");
        return;
    }

    alert(
        `Registration Successful!\n\nName: ${firstName} ${lastName}\nAge: ${age}`
    );

    form.reset();
});
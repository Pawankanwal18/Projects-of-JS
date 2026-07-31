// ─── DOM REFERENCES ───────────────────────────────────────────────
const form         = document.getElementById("studentForm");
const successBanner = document.getElementById("successBanner");
const successMsg   = document.getElementById("successMsg");

const fields = {
    firstName : { el: document.getElementById("firstName"), errEl: document.getElementById("firstNameError") },
    lastName  : { el: document.getElementById("lastName"),  errEl: document.getElementById("lastNameError")  },
    email     : { el: document.getElementById("email"),     errEl: document.getElementById("emailError")     },
    age       : { el: document.getElementById("age"),       errEl: document.getElementById("ageError")       },
    course    : { el: document.getElementById("course"),    errEl: document.getElementById("courseError")    },
};

// ─── VALIDATION RULES ─────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name, value) {
    switch (name) {
        case "firstName":
        case "lastName":
            if (!value)               return "This field is required.";
            if (value.length < 2)     return "Must be at least 2 characters.";
            if (!/^[a-zA-Z\s'-]+$/.test(value)) return "Only letters, spaces, hyphens or apostrophes allowed.";
            return "";

        case "email":
            if (!value)               return "Email address is required.";
            if (!EMAIL_RE.test(value)) return "Please enter a valid email address.";
            return "";

        case "age":
            if (!value)               return "Age is required.";
            if (value < 5)            return "Age must be at least 5.";
            if (value > 100)          return "Age must be 100 or below.";
            return "";

        case "course":
            if (!value)               return "Please select a course.";
            return "";

        default:
            return "";
    }
}

// ─── SHOW / CLEAR FIELD ERROR ──────────────────────────────────────
function setFieldError(name, message) {
    const { el, errEl } = fields[name];
    if (message) {
        errEl.textContent = "⚠ " + message;
        el.classList.add("invalid");
        el.classList.remove("valid");
    } else {
        errEl.textContent = "";
        el.classList.remove("invalid");
        el.classList.add("valid");
    }
}

// ─── REAL-TIME VALIDATION (blur & input events) ───────────────────
Object.keys(fields).forEach(name => {
    const input = fields[name].el;

    // Validate on blur (when user leaves the field)
    input.addEventListener("blur", () => {
        const error = validate(name, input.value.trim());
        setFieldError(name, error);
    });

    // Clear error as user types again
    input.addEventListener("input", () => {
        if (fields[name].el.classList.contains("invalid")) {
            const error = validate(name, input.value.trim());
            setFieldError(name, error);
        }
    });
});

// ─── FORM SUBMIT ──────────────────────────────────────────────────
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validate all fields and collect errors
    let hasError = false;
    Object.keys(fields).forEach(name => {
        const error = validate(name, fields[name].el.value.trim());
        setFieldError(name, error);
        if (error) hasError = true;
    });

    if (hasError) {
        // Shake the first invalid field
        const firstInvalid = Object.values(fields).find(f => f.el.classList.contains("invalid"));
        if (firstInvalid) firstInvalid.el.focus();
        return;
    }

    // ── All good: show success ────────────────────────────────────
    const { firstName, lastName, course } = fields;
    const courseLabel = course.el.options[course.el.selectedIndex].text;

    successMsg.textContent = ` Welcome, ${firstName.el.value.trim()} ${lastName.el.value.trim()}! You are enrolled in ${courseLabel}.`;
    successBanner.hidden = false;
    successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Reset & clear valid states after a short delay
    setTimeout(() => {
        form.reset();
        Object.values(fields).forEach(f => f.el.classList.remove("valid", "invalid"));
        successBanner.hidden = true;
    }, 4500);
});
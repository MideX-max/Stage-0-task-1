document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();
  const success = document.getElementById("success-message");

  document.querySelectorAll(".error-message").forEach(e => e.textContent = "");

  let valid = true;

  if (!name) {
    document.getElementById("error-name").textContent = "Name is required.";
    valid = false;
  }

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    document.getElementById("error-email").textContent = "Valid email required.";
    valid = false;
  }

  if (!subject) {
    document.getElementById("error-subject").textContent = "Subject is required.";
    valid = false;
  }

  if (!message) {
    document.getElementById("error-message").textContent = "Message cannot be empty.";
    valid = false;
  } else if (message.length < 10) {
    document.getElementById("error-message").textContent = "Message must be at least 10 characters long.";
    valid = false;
  }

  if (!valid) return;

  const submitBtn = form.querySelector("button");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    const response = await fetch("https://formspree.io/f/xeorwdpj", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message })
    });

    if (response.ok) {
      success.hidden = false;
      form.reset();
    } else {
      alert("⚠️ Oops, something went wrong. Please try again later.");
    }
  } catch (error) {
    alert("Network error. Check your connection and try again.");
  }

  submitBtn.disabled = false;
  submitBtn.textContent = "Send Message";
});

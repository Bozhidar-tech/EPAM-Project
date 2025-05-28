document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-agent-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
      alert(`Dear ${name}, your message is sent to Jessica Smith`);
      contactForm.reset();
    } else {
      alert("Please fill out the required fields.");
    }
  });
});

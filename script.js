document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      toggle.textContent = isOpen ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }));
  }

  const dateField = document.querySelector('input[name="date"]');
  if (dateField) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateField.min = localToday;
  }

  const form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const fields = [
        ["Name", data.get("name")],
        ["Phone", data.get("phone")],
        ["Email", data.get("email") || "Not provided"],
        ["Service", data.get("service")],
        ["Passengers", data.get("passengers")],
        ["Pickup", data.get("pickup")],
        ["Destination", data.get("destination")],
        ["Travel date", data.get("date")],
        ["Preferred time", data.get("time") || "Not specified"],
        ["Additional information", data.get("message") || "None"]
      ];
      const message = "Hello Mashimbye Tours, I would like to enquire about a trip:\n\n" +
        fields.map(([label, value]) => `${label}: ${value}`).join("\n");
      const whatsappNumber = "27833371879";
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    });
  }
});

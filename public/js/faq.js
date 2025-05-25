const faqItems = document.querySelectorAll(".faq");
faqItems.forEach(faq => {
    const question = faq.querySelector(".faqQuestion");
    question.addEventListener("click", () => {
    faq.classList.toggle("active");
    });
});

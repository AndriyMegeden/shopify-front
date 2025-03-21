// class Accordion {
//     constructor() {
//         this.accordionWrap = document.querySelectorAll('.accordion-con');
//         this.accordionItems = document.querySelectorAll('.accordion-item');
//         // Перевіряємо, чи знаходить елементи
//         this.Open();
//     }

//     Open() {
//         this
//     }
// }
// new Accordion();

const accordionWrap = document.querySelectorAll(".accordion-con");
const accordionItems = document.querySelectorAll(".accordion-item");
console.log(this.accordions, this.accordion);

accordionItems.forEach((item) => {
  item.addEventListener("click", () => {
    const content = item.querySelector(".accordion-content");

    const icon = item.querySelector(".accordion img");
    const accordion = item.querySelector(".accordion");

    if (content && icon && accordion) {
      content.classList.toggle("active");
      icon.classList.toggle("rotate");

      if (content.classList.contains("active")) {
        icon.src = "images/minus.svg";

        accordion.style.backgroundColor = "#d7ecec";
        accordion.style.borderBottomLeftRadius = "0px";
        accordion.style.borderBottomRightRadius = "0px";
      } else {
        icon.src = "images/plus.svg";

        accordion.style.backgroundColor = "#f7f8fb";
        accordion.style.borderBottomLeftRadius = "12px";
        accordion.style.borderBottomRightRadius = "12px";
      }
    }
  });
});

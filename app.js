// SCROLL BUTTON

const btnScrollToTop = document.querySelector("#btnScrollToTop");

btnScrollToTop.addEventListener("click", function () {
    window.scrollTo(0, 0);
  });
  
  const scrollButton = () => {
    if (document.documentElement.scrollTop > 500) {
      btnScrollToTop.classList.remove("hidden");
    } else {
      btnScrollToTop.classList.add("hidden");
    }
  };
  
  addEventListener("scroll", scrollButton); 


// ACCORDION
const acc = document.querySelector(".accordion");
const i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}



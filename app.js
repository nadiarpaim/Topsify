// SCROLL BUTTON

const btnScrollToTop = document.querySelector("#btnScrollToTop");

const scrollButton = () => {
  if (document.documentElement.scrollTop > 400) {
    btnScrollToTop.classList.remove("hidden");
  } else {
    btnScrollToTop.classList.add("hidden");
  }
};

const pageScroll = () => {
  window.scrollTo(0, 0);
};

btnScrollToTop.addEventListener("click", pageScroll);
window.addEventListener("scroll", scrollButton);

// ACCORDION

const accordianWrapper = document.querySelectorAll(".accordion-wrapper");

accordianWrapper.forEach((accordion) => {
  const header = accordion.querySelector(".accordion");

  header.addEventListener("click", (event) => {
    event.target.nextElementSibling.classList.toggle("hidden");
  });
});

// NAVBAR

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

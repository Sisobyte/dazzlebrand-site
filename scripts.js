// ==========================
// NAV TOGGLE & FORM HANDLER
// ==========================

// Handle Contact Form Submission
async function handleForm(event) {
  event.preventDefault();
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      successMsg.style.display = 'block';
      successMsg.style.animation = 'fadeIn 0.5s ease-in-out';
      setTimeout(() => successMsg.style.display = 'none', 5000);
    } else {
      alert('Oops! Something went wrong. Please try again.');
    }
  } catch (error) {
    alert('Network error. Please check your connection.');
  }
}

// Attach form submit listener if form exists
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', handleForm);
}



// ==========================
// FULLSCREEN PORTFOLIO LIGHTBOX (NEW)
// ==========================

// 🎯 Select all gallery images
const galleryImages = document.querySelectorAll('.gallery img');

// 🎯 Create the new lightbox structure dynamically
const lightboxWrapper = document.createElement('div');
lightboxWrapper.id = "portfolio-lightbox";
lightboxWrapper.innerHTML = `

  <div class="controls">
    <button id="lightbox-prev" class="lightbox-btn">&#10094;</button>
    <button id="lightbox-next" class="lightbox-btn">&#10095;</button>
  </div>

  <img id="lightbox-display" src="">
`;

document.body.appendChild(lightboxWrapper);

//  Select lightbox elements
const lb = document.getElementById("portfolio-lightbox");
const lbImg = document.getElementById("lightbox-display");
const lbClose = document.getElementById("lightbox-close");
const lbNext = document.getElementById("lightbox-next");
const lbPrev = document.getElementById("lightbox-prev");

// State
let currentIndex = 0;
let imageArray = [];

// Convert NodeList to array
galleryImages.forEach(img => imageArray.push(img.src));

// Open Lightbox
function openLightbox(index) {
  currentIndex = index;
  lbImg.src = imageArray[currentIndex];
  lb.classList.add("show");
  document.body.style.overflow = "hidden"; // lock scrolling
}

// Close Lightbox
function closeLightbox() {
  lb.classList.remove("show");
  setTimeout(() => {
    lb.style.display = "none";
  }, 300);
  document.body.style.overflow = "";
}

// Next Image
function nextImage() {
  currentIndex = (currentIndex + 1) % imageArray.length;
  lbImg.src = imageArray[currentIndex];
}

// Previous Image
function prevImage() {
  currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
  lbImg.src = imageArray[currentIndex];
}

// Attach click events to images
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    lb.style.display = "flex";
    openLightbox(index);
  });
});


// Click outside to close
lb.addEventListener("click", (e) => {
  if (e.target === lb) {
    closeLightbox();
  }
});

// Next/Prev buttons
lbNext.addEventListener("click", nextImage);
lbPrev.addEventListener("click", prevImage);

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("show")) return;

  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "Escape") closeLightbox();
});



// ==========================
// SCROLL FADE-IN ANIMATION
// ==========================

const faders = document.querySelectorAll('.fade-in');

if (faders.length) {
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
}



// ==========================
// NAV TOGGLE (CSS SCALEY ONLY)
// ==========================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}


// ==========================
// VIEW MORE BUTTON
// ==========================
const viewMoreBtn = document.getElementById("view-more-btn");
const hiddenGallery = document.querySelector(".hidden-gallery");

if (viewMoreBtn && hiddenGallery) {
  viewMoreBtn.addEventListener("click", () => {
    hiddenGallery.classList.toggle("show");

    if (hiddenGallery.classList.contains("show")) {
      viewMoreBtn.textContent = "View Less";
    } else {
      viewMoreBtn.textContent = "View More";
    }
  });
}

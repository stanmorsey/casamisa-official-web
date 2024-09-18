/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
  const header = document.getElementById('header');
  if(this.scrollY >= 50) header.classList.add('scroll-header'); 
  else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== SWIPER POPULAR ===============*/
let swiperPopular = new Swiper(".popular__container", {
  spaceBetween: 10,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,
  autoHeight: true,
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
});

let swiperModal = new Swiper('.swiper-modal-container', {
  slidesPerView: 1,  // Ensure one image per view
  centeredSlides: true,
  loop: true, // Loop for endless sliding
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true, // Pagination clickable to navigate
  },
  allowTouchMove: true,  // Enable swipe gestures
});

/*=============== VALUE ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.value__accordion-item');
accordionItems.forEach((item) => {
  const accordionHeader = item.querySelector('.value__accordion-header');
  accordionHeader.addEventListener('click', () => {
      const openItem = document.querySelector('.accordion-open');
      toggleItem(item);
      if(openItem && openItem !== item) {
          toggleItem(openItem);
      }
  });
});

const toggleItem = (item) => {
  const accordionContent = item.querySelector('.value__accordion-content');
  if(item.classList.contains('accordion-open')){
      accordionContent.removeAttribute('style');
      item.classList.remove('accordion-open');
  } else {
      accordionContent.style.height = accordionContent.scrollHeight + 'px';
      item.classList.add('accordion-open');
  }
};

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');
function scrollActive(){
  const scrollY = window.pageYOffset;
  sections.forEach(current =>{
      const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id');
      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
          document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
      } else {
          document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
      }
  });
}
window.addEventListener('scroll', scrollActive);

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); 
  else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun';

if (selectedTheme) {
document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

/*=============== GALLERY MODAL ===============*/
let currentLocation = ''; 

function openGallery(location) {
  const galleryModal = document.getElementById('galleryModal');
  const galleryImages = document.getElementById('galleryImages');

  // Clear existing images
  galleryImages.innerHTML = '';

  // Add images based on the location
  const images = getImagesForLocation(location);
  images.forEach(image => {
      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');

      const img = document.createElement('img');
      img.src = image;
      img.style.width = '100%';
      img.style.height = 'auto';

      swiperSlide.appendChild(img);
      galleryImages.appendChild(swiperSlide);
  });

  // Initialize Swiper
  new Swiper('.swiper-container', {
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,  // Ensure the slider loops
      navigation: {
          nextEl: ".swiper-button-next-gallery",
          prevEl: ".swiper-button-prev-gallery",
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      allowTouchMove: true, // Enable swiping
    });

  // Display the modal
  galleryModal.style.display = 'block';
}


function closeGallery() {
  document.getElementById('galleryModal').style.display = 'none';
}

function getImagesForLocation(location) {
  const images = {
    'Kilimani': ['assets/img/houses/Alina1.jpg', 'assets/img/houses/Alina1.jpg', 'assets/img/houses/Alina3.jpg'],   
    'RiverSide': ['assets/img/houses/Alina5.jpg', 'assets/img/houses/Alina6.jpg', 'assets/img/houses/Alina7.jpg'],
    'Lavington': ['assets/img/houses/Alina8.jpg', 'assets/img/houses/Alina9.jpg', 'assets/img/houses/Alina10.jpg'],
    'Kileleshwa': ['assets/img/houses/Alina11.jpg', 'assets/img/houses/Alina12.jpg', 'assets/img/houses/Alina13.jpg'],
  };
  return images[location] || [];
}

  
  
function openBookingModal() {
  const bookingModal = document.getElementById('bookingModal');
  const bookingTitle = document.getElementById('bookingTitle');
  const bookingDescription = document.getElementById('bookingDescription');
  const bookingInfo = getBookingInfo(currentLocation); // Use the current location

  bookingTitle.innerText = bookingInfo.title;
  bookingDescription.innerText = bookingInfo.description;
  bookingModal.style.display = 'block';
}

function closeBookingModal() {
  document.getElementById('bookingModal').style.display = 'none';
}

function getBookingInfo(location) {
  const info = {
      'Kilimani': {
          title: 'Kilimani Apartments Booking',
          description: 'Located near Yaya Center, offering a luxurious stay with amenities like a gym, swimming pool, and more.',
      },
      'RiverSide': {
          title: 'RiverSide Apartments Booking',
          description: 'Modern apartments in a serene environment with river views, gym access, and secure parking.',
      },
      'Lavington': {
          title: 'Lavington Apartments Booking',
          description: 'Elegant apartments offering a mix of comfort and style with top-tier amenities.',
      },
      'Kileleshwa': {
          title: 'Kileleshwa Apartments Booking',
          description: 'Spacious apartments in a prime location with amenities like a swimming pool and gym.',
      },
  };
  return info[location] || { title: 'Booking', description: 'Please contact us for more information.' };
}

// Data for featured residencies
const featuredResidencies = {
  'three-bedroom': {
    title: '3 Bedroom House',
    description: 'A spacious 3-bedroom house with a beautiful garden and modern amenities.',
    image: 'assets/img/houses/Alina10.jpg'
  },
  'four-bedroom': {
    title: '4 Bedroom House',
    description: 'A luxurious 4-bedroom house with modern design, large living area, and private parking.',
    image: 'assets/img/houses/Alina10.jpg'
  },
  'one-bedroom': {
    title: '1 Bedroom House',
    description: 'A luxurious 1-bedroom house with modern design, large living area, and private parking.',
    image: 'assets/img/houses/Alina10.jpg'
  },
  // Add more properties as needed
};

// Function to open the modal with the appropriate residency details
function openFeaturedModal(type) {
  const modal = document.getElementById('featuredResidencyModal');
  const modalImage = document.getElementById('modalImageFeatured');
  const modalTitle = document.getElementById('modalTitleFeatured');
  const modalDescription = document.getElementById('modalDescriptionFeatured');

  modalImage.src = featuredResidencies[type].image;
  modalTitle.textContent = featuredResidencies[type].title;
  modalDescription.textContent = featuredResidencies[type].description;

  modal.style.display = 'block';
}

// Function to close the modal
function closeModalFeatured() {
  document.getElementById('featuredResidencyModal').style.display = 'none';
}

// Function to show all residencies (can be a link or another modal)
function openAllResidencies() {
  alert('Display all residencies here or link to a new page.');
}

function changeImage(imageSrc) {
  document.getElementById('main-image').src = imageSrc;
}

function showResidencyDetails(id) {
  let modal = document.getElementById('residencyModal');
  let title = document.getElementById('modalTitle');
  let description = document.getElementById('modalDescription');
  let mainImage = document.getElementById('main-image');

  // data based on the selected residency
  const residencies = {
    1: {
      title: "3 Bedroom House",
      description: "The 3 Bedroom House offers a spacious living area, modern amenities, and easy access to nearby facilities.",
      image: "assets/img/houses/Alina10.jpg"
    },
    2: {
      title: "4 Bedroom House",
      description: "The 4 Bedroom House is perfect for families, offering a large space and modern facilities.",
      image: "assets/img/houses/Alina11.jpg"
    },
    3: {
      title: "1 Bedroom House",
      description: "A cozy 1 Bedroom House, ideal for singles or couples, with modern furnishings and close to city amenities.",
      image: "assets/img/houses/Alina12.jpg"
    },
    4: {
      title: "Studios",
      description: "Affordable studio apartments, perfect for students or short-term stays, featuring modern design and amenities.",
      image: "assets/img/houses/Alina7.jpg"
    }
    // Addition of other residencies just in case 
  };

  // Set modal content
  title.innerText = residencies[id].title;
  description.innerText = residencies[id].description;
  mainImage.src = residencies[id].image;

  // Display the modal
  modal.style.display = "block";
}

function closeResidencyModal() {
  let modal = document.getElementById('residencyModal');
  modal.style.display = "none";
}





// Data for featured residencies
const residencies = {
  1: {
    title: "3 Bedroom House",
    description: "The 3 Bedroom House offers a spacious living area, modern amenities, and easy access to nearby facilities.",
    images: [
      "assets/img/houses/Alina1.jpg",
      "assets/img/houses/Alina2.jpg",
      "assets/img/houses/Alina3.jpg",
      "assets/img/houses/Alina4.jpg",
      "assets/img/houses/Alina5.jpg"
    ]
  },
  2: {
    title: "4 Bedroom House",
    description: "The 4 Bedroom House is perfect for families, offering a large space and modern facilities.",
    images: [
      "assets/img/houses/Alina6.jpg",
      "assets/img/houses/Alina7.jpg",
      "assets/img/houses/Alina8.jpg",
      "assets/img/houses/Alina9.jpg",
      "assets/img/houses/Alina10.jpg"
    ]
  },
  3: {
    title: "1 Bedroom House",
    description: "The 1 Bedroom House is cozy and perfect for individuals or couples, offering a modern and stylish living space.",
    images: [
      "assets/img/houses/Alina6.jpg",
      "assets/img/houses/Alina7.jpg",
      "assets/img/houses/sitting.jpg",
      "assets/img/houses/Alina9.jpg",
      "assets/img/houses/Alina10.jpg"
    ]
  },
  4: {
    title: "Studios",
    description: "Our studios are compact yet efficient, ideal for those who value simplicity and accessibility.",
    images: [
      "assets/img/houses/Bedroom.jpg",
      "assets/img/houses/sitting.jpg",
      "assets/img/houses/cafe.jpg",
      "assets/img/houses/Alina4.jpg",
      "assets/img/houses/Alina5.jpg"
    ]
  }
};

// Function to open the modal with the appropriate residency details
function showResidencyDetails(id) {
  const residency = residencies[id];
  const mainImage = document.getElementById('main-image');
  const thumbnails = document.querySelector('.thumbnail-container');

  // Set the main image to the first image in the residency's image list
  mainImage.src = residency.images[0];
  
  // Clear existing thumbnails
  thumbnails.innerHTML = '';

  // Dynamically add the thumbnail images
  residency.images.forEach((imgSrc, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = imgSrc;
    thumbnail.alt = `Thumbnail ${index + 1}`;
    thumbnail.onclick = () => changeImage(imgSrc); // Attach click handler
    thumbnails.appendChild(thumbnail);
  });

  // Set the modal title and description
  document.getElementById('modalTitle').textContent = residency.title;
  document.getElementById('modalDescription').textContent = residency.description;

  // Show the modal
  document.getElementById('residencyModal').style.display = 'block';
}

// Function to change the main image when a thumbnail is clicked
function changeImage(imageSrc) {
  document.getElementById('main-image').src = imageSrc;
}

// Functions to navigate between images
let currentIndex = 0;

// Function to open residency modal
function showResidencyDetails(id) {
  let modal = document.getElementById('residencyModal');
  let title = document.getElementById('modalTitle');
  let description = document.getElementById('modalDescription');
  let mainImage = document.getElementById('main-image');
  let thumbnailContainer = document.querySelector('.thumbnail-container');

  // Set modal content
  const residency = residencies[id];
  title.innerText = residency.title;
  description.innerText = residency.description;
  mainImage.src = residency.images[currentIndex];

  // Populate thumbnails
  thumbnailContainer.innerHTML = '';
  residency.images.forEach((imgSrc, index) => {
    let imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    imgElement.alt = `Thumbnail ${index + 1}`;
    imgElement.onclick = () => changeImage(imgSrc, index);
    thumbnailContainer.appendChild(imgElement);
  });

  // Display the modal
  modal.style.display = 'block';
}

// Function to change the image
function changeImage(imageSrc, index) {
  document.getElementById('main-image').src = imageSrc;
  currentIndex = index;
}

// Function to show next image
function nextImage() {
  currentIndex = (currentIndex + 1) % residencies[1].images.length;
  document.getElementById('main-image').src = residencies[1].images[currentIndex];
}

// Function to show previous image
function prevImage() {
  currentIndex = (currentIndex - 1 + residencies[1].images.length) % residencies[1].images.length;
  document.getElementById('main-image').src = residencies[1].images[currentIndex];
}


window.addEventListener("click", (event) => {
  const modal = document.getElementById('residencyModal'); // Adjust for other modals if necessary
  const modalContent = document.querySelector('.modal-content');

  // Check if the click is outside the modal content but inside the modal
  if (event.target === modal && !modalContent.contains(event.target)) {
    modal.style.display = "none";
  }
});



document.addEventListener("DOMContentLoaded", () => {

  const galleryElement = document.getElementById("main-image"); 


  const hammer = new Hammer(galleryElement);


  hammer.on("swipeleft", () => {
    nextImage(); 
  });

  hammer.on("swiperight", () => {
    prevImage(); 
  });
});






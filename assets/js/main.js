/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER POPULAR ===============*/
let swiperPopular = new Swiper(".popular__container", {
    spaceBetween: 32,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
})

/*=============== VALUE ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.value__accordion-item')

// 1. Select each item
accordionItems.forEach((item) =>{
    const accordionHeader = item.querySelector('.value__accordion-header')

    // 2. Select each header click
    accordionHeader.addEventListener('click', () =>{
        // 7. Create the tag
        const openItem = document.querySelector('.accordion-open')
        
        // 5. Call toggle item function
        toggleItem(item)

        // 8. Check if the class exists
        if(openItem && openItem!== item){
            toggleItem(openItem)
        }
    })
})

// 3. Create a constant type function
const toggleItem = (item) =>{
    // 3.1 Create the tag
    const accordionContent = item.querySelector('.value__accordion-content')

    // 6. If there is another element that contains the class accordion-open remove its class
    if(item.classList.contains('accordion-open')){
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    }else{
        // 4. Add the maximum height of the content
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open')
    }
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.home__title, .popular__container, .subscribe__container, .footer__container`)
sr.reveal(`.home__description, .footer__info`, {delay: 200})
sr.reveal(`.home__search`, {delay: 600})
sr.reveal(`.home__value`, {delay: 700})
sr.reveal(`.home__images`, {delay: 800, origin: 'bottom'})
sr.reveal(`.logos__img`, {interval: 100})
sr.reveal(`.value__images, .contact__content`, {origin: 'left'})
sr.reveal(`.value__content, .contact__images`, {origin: 'right'})

/*=============== IMAGE GALLERY MODAL ===============*/
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
      swiperSlide.appendChild(img);
      galleryImages.appendChild(swiperSlide);
    });
  
    // Initialize Swiper
    new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  
    // Display the modal
    galleryModal.style.display = 'block';
}

function closeGallery() {
    document.getElementById('galleryModal').style.display = 'none';
}

function getImagesForLocation(location) {
    const images = {
      'Kilimani': ['assets/img/kilimani1.jpg', 'assets/img/kilimani2.jpg'],
      'RiverSide': ['assets/img/riverside1.jpg', 'assets/img/riverside2.jpg'],
      'Lavington': ['assets/img/lavington1.jpg', 'assets/img/lavington2.jpg'],
      'Kileleshwa': ['assets/img/kileleshwa1.jpg', 'assets/img/kileleshwa2.jpg'],
    };
    return images[location] || [];
}

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
      swiperSlide.appendChild(img);
      galleryImages.appendChild(swiperSlide);
    });
  
    // Initialize Swiper
    new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  
    // Display the modal
    galleryModal.style.display = 'block';
  }
  
  function closeGallery() {
    document.getElementById('galleryModal').style.display = 'none';
  }
  
  function getImagesForLocation(location) {
    let images = [];
  
    // Determine which images to load based on location
    if (location === 'Kilimani') {
        images = [
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
          ];
    } else if (location === 'RiverSide') {
        images = [
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
          ];
    } else if (location === 'Lavington') {
      images = [
        'assets/img/kitchen.jpg',
        'assets/img/kitchen.jpg',
        'assets/img/kitchen.jpg',
        'assets/img/kitchen.jpg',
        'assets/img/kitchen.jpg',
        'assets/img/kitchen.jpg',
        'assets/img/kitchen.jpg',
        'assets/img/kitchen.jpg',
        'assets/img/kitchen.jpg',
      ];
    } else if (location === 'Kileleshwa') {
        images = [
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
            'assets/img/kitchen.jpg',
          ];
    }
  
    return images;
  }
  

  function openGallery(location) {
    const galleryModal = document.getElementById('galleryModal');
    const galleryImages = document.getElementById('galleryImages');
  
    galleryImages.innerHTML = '';
  
    const images = getImagesForLocation(location);
    images.forEach(image => {
      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');
  
      const img = document.createElement('img');
      img.src = image;
  
      const bookButton = document.createElement('div');
      bookButton.classList.add('book-button');
      bookButton.innerText = 'Book Now';
      bookButton.onclick = () => openBookingModal(location);
  
      swiperSlide.appendChild(img);
      swiperSlide.appendChild(bookButton);
      galleryImages.appendChild(swiperSlide);
    });
  
    new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: false,
    });
  
    galleryModal.style.display = 'block';
  }
  
  function openBookingModal(location) {
    const bookingModal = document.getElementById('bookingModal');
    const bookingTitle = document.getElementById('bookingTitle');
    const bookingDescription = document.getElementById('bookingDescription');
    const bookingInfo = getBookingInfo(location);
  
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
  
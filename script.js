// TravelEase Tours - JS interactions
const tours = [
  {
    id: 'jaipur',
    title: 'Jaipur Heritage Weekend',
    location: 'Jaipur, Rajasthan',
    price: '₹15,499',
    duration: '3D/2N',
    rating: '4.8',
    tags: ['heritage', 'city'],
    desc: 'Stay in a heritage haveli, guided forts tour, and pink city bazaar walk.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'goa',
    title: 'Goa Beach Escape',
    location: 'Goa',
    price: '₹12,999',
    duration: '4D/3N',
    rating: '4.7',
    tags: ['beach', 'relax'],
    desc: 'Beachside resort, sunset cruise, and café trail in North Goa.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'leh',
    title: 'Leh–Ladakh Adventure',
    location: 'Ladakh',
    price: '₹24,500',
    duration: '6D/5N',
    rating: '4.9',
    tags: ['mountain', 'adventure'],
    desc: 'Pangong Lake, Nubra Valley, and monasteries with local homestays.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'alleppey',
    title: 'Alleppey Backwaters',
    location: 'Kerala',
    price: '₹10,999',
    duration: '3D/2N',
    rating: '4.6',
    tags: ['backwater', 'relax'],
    desc: 'Premium houseboat with local cuisine and sunset shikara rides.',
    image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'manali',
    title: 'Manali Snow Trails',
    location: 'Himachal Pradesh',
    price: '₹13,499',
    duration: '5D/4N',
    rating: '4.5',
    tags: ['mountain', 'adventure'],
    desc: 'Solang valley activities, café crawl, and scenic hikes.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'varanasi',
    title: 'Varanasi Spiritual Walks',
    location: 'Varanasi, UP',
    price: '₹9,299',
    duration: '3D/2N',
    rating: '4.4',
    tags: ['heritage', 'city'],
    desc: 'Ghat aarti, sunrise boat ride, and silk weaving trail.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'andaman',
    title: 'Andaman Island Hopping',
    location: 'Port Blair & Havelock',
    price: '₹28,900',
    duration: '6D/5N',
    rating: '4.7',
    tags: ['beach', 'adventure'],
    desc: 'Scuba dive, Radhanagar beach sunsets, and glass-bottom boat.',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'udaipur',
    title: 'Udaipur Lakes & Palaces',
    location: 'Udaipur, Rajasthan',
    price: '₹14,250',
    duration: '3D/2N',
    rating: '4.6',
    tags: ['heritage', 'relax'],
    desc: 'Lake Pichola cruise, city palace tour, and rooftop dining.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80'
  }
];

const featuredIds = ['jaipur', 'leh', 'goa', 'alleppey'];

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const tourGrid = document.getElementById('tour-grid');
const featuredGrid = document.getElementById('featured-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const chipsWrap = document.getElementById('chips');
const bookingForm = document.getElementById('booking-form');
const formMsg = document.getElementById('form-msg');
const bookTourSelect = document.getElementById('book-tour');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLocation = document.getElementById('modal-location');
const modalPrice = document.getElementById('modal-price');
const modalDuration = document.getElementById('modal-duration');
const modalRating = document.getElementById('modal-rating');
const modalBookBtn = document.getElementById('modal-book');

let activeFilter = 'all';
let currentTour = null;

function renderFeatured() {
  featuredGrid.innerHTML = featuredIds
    .map(id => tours.find(t => t.id === id))
    .filter(Boolean)
    .map(
      t => `
      <article class="card reveal">
        <img src="${t.image}" alt="${t.title}">
        <div class="card-body">
          <span class="badge">${t.location}</span>
          <h3>${t.title}</h3>
          <div class="card-meta-row">
            <span>${t.duration}</span>
            <span>${t.price}</span>
          </div>
        </div>
      </article>`
    )
    .join('');
}

function renderChips() {
  const uniqueTags = Array.from(new Set(tours.flatMap(t => t.tags)));
  chipsWrap.innerHTML = ['all', ...uniqueTags]
    .map(tag => `<button class="pill ${tag === 'all' ? 'active' : ''}" data-tag="${tag}">${tag[0].toUpperCase() + tag.slice(1)}</button>`)
    .join('');
}

function renderTours(list) {
  tourGrid.innerHTML = list
    .map(
      t => `
      <article class="card reveal" data-id="${t.id}">
        <img src="${t.image}" alt="${t.title}">
        <div class="card-body">
          <div class="card-meta-row">
            <span class="badge">${t.location}</span>
            <span>${t.duration}</span>
          </div>
          <h3>${t.title}</h3>
          <p class="subtext">${t.desc}</p>
          <div class="card-meta-row">
            <strong>${t.price}</strong>
            <span>★ ${t.rating}</span>
          </div>
        </div>
      </article>`
    )
    .join('');
  attachCardHandlers();
  observeReveals();
}

function filterTours() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = tours.filter(t => {
    const matchesTag = activeFilter === 'all' || t.tags.includes(activeFilter);
    const matchesQuery =
      !query ||
      t.title.toLowerCase().includes(query) ||
      t.location.toLowerCase().includes(query) ||
      t.desc.toLowerCase().includes(query);
    return matchesTag && matchesQuery;
  });
  renderTours(filtered);
}

function attachCardHandlers() {
  tourGrid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      openModal(id);
    });
  });
  document.querySelectorAll('[data-featured]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.featured));
  });
}

function openModal(id) {
  const tour = tours.find(t => t.id === id);
  if (!tour) return;
  currentTour = tour;
  modalImg.src = tour.image;
  modalTitle.textContent = tour.title;
  modalDesc.textContent = tour.desc;
  modalLocation.textContent = tour.location;
  modalPrice.textContent = tour.price;
  modalDuration.textContent = tour.duration;
  modalRating.textContent = `★ ${tour.rating}`;
  modal.classList.add('show');
}

function closeModal() {
  modal.classList.remove('show');
  currentTour = null;
}

function populateSelect() {
  bookTourSelect.innerHTML = `<option value="">Select a tour</option>` + tours
    .map(t => `<option value="${t.id}">${t.title} — ${t.price}</option>`)
    .join('');
}

function handleBooking(e) {
  e.preventDefault();
  const name = document.getElementById('book-name').value.trim();
  const email = document.getElementById('book-email').value.trim();
  const date = document.getElementById('book-date').value;
  const travelers = document.getElementById('book-travelers').value;
  const tourId = bookTourSelect.value;

  if (!name || !email || !date || !tourId || travelers < 1) {
    formMsg.textContent = 'Please fill all fields correctly.';
    formMsg.style.color = '#dc2626';
    return;
  }

  const selected = tours.find(t => t.id === tourId);
  formMsg.textContent = `Thanks ${name}! Your booking for ${selected?.title || 'the tour'} on ${date} is received.`;
  formMsg.style.color = '#16a34a';
  bookingForm.reset();
}

function handleScrollReveal(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}

function observeReveals() {
  const observer = new IntersectionObserver(handleScrollReveal, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Events
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

searchBtn.addEventListener('click', filterTours);
searchInput.addEventListener('keyup', e => {
  if (e.key === 'Enter') filterTours();
});

chipsWrap.addEventListener('click', e => {
  if (e.target.dataset.tag) {
    activeFilter = e.target.dataset.tag;
    chipsWrap.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    e.target.classList.add('active');
    filterTours();
  }
});

bookingForm.addEventListener('submit', handleBooking);
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});
modalBookBtn.addEventListener('click', () => {
  if (currentTour) {
    bookTourSelect.value = currentTour.id;
    closeModal();
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
  }
});

// Init
renderFeatured();
renderChips();
renderTours(tours);
populateSelect();
observeReveals();

// Mobile nav: close on link click
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('show'))
);


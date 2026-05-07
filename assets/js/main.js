document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');

  // ---- Navbar Scroll Effect ----
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ---- Reveal Animation ----
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => revealObserver.observe(el));

  // ---- Hamburger Menu (Unified Nav) ----
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity = '0';
        spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
      } else {
        spans.forEach(s => s.style.cssText = '');
      }
    });

    // Close on link click (only for non-dropdown links)
    navLinks.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
      });
    });

    // Handle mobile dropdown toggle
    const dropdownToggle = document.getElementById('getInvolvedToggle');
    if (dropdownToggle) {
      const dropdownContainer = dropdownToggle.closest('.nav-item-dropdown');
      
      dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdownContainer.classList.toggle('open');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!dropdownContainer.contains(e.target)) {
          dropdownContainer.classList.remove('open');
        }
      });

      // Close mobile menu when clicking a dropdown item
      navLinks.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
          navLinks.classList.remove('open');
          dropdownContainer.classList.remove('open');
          hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
        });
      });
    }
  }

  // ---- Animated Counters (Impact Stats) ----
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  // Intersection Observer for counters
  const impactSection = document.getElementById('impact-map');
  if (impactSection) {
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(impactSection);
  }

  // ---- ScrollSpy & Active State Logic ----
  const navLinksList = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const updateActiveState = () => {
    let scrollPos = window.scrollY + 100;
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    const isHome = currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '';

    // Handle Subpages (non-homepage)
    if (!isHome) {
      navLinksList.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href.replace('../', ''))) {
          link.classList.add('active');
        }
      });
      return;
    }

    // Handle Homepage ScrollSpy
    let currentSectionId = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // If page just loaded and has a hash but hasn't fully scrolled, force the active state based on hash
    if (window.scrollY < 50 && currentHash) {
       const hashSection = currentHash.substring(1);
       if (document.getElementById(hashSection)) {
         currentSectionId = hashSection;
       }
    }

    // Exception for FAQ/Footer area to keep FAQ active if at bottom
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      currentSectionId = 'faq';
    }

    navLinksList.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  // Click handler for smooth scroll and immediate active update
  navLinksList.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
          // Update immediately on click
          navLinksList.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      }
    });
  });

  window.addEventListener('scroll', updateActiveState);
  updateActiveState(); // Run once on load


  // ---- FAQ Accordion Logic ----
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', (e) => {
          e.preventDefault();
          const alreadyActive = item.classList.contains('active');
          
          // Close all FAQ items
          faqItems.forEach(faq => faq.classList.remove('active'));
          
          // If the clicked item wasn't active, open it
          if (!alreadyActive) {
            item.classList.add('active');
          }
        });
      }
    });
  }


  // ---- Interactive Impact Map (Leaflet) ----
  const mapContainer = document.getElementById('impact-map-container');
  if (mapContainer) {
    const map = L.map('impact-map-container', {
      center: [20, 80],
      zoom: 4,
      scrollWheelZoom: false,
      attributionControl: false
    });

    // Minimal Light Map style
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    // Custom Tree Icon
    const treeIcon = L.divIcon({
      html: '<div style="color: #2D5A27; font-size: 1.2rem;"><i class="fas fa-tree"></i></div>',
      className: 'custom-tree-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const locations = [
      // Tamil Nadu (22)
      { coords: [13.0827, 80.2707], name: "Chennai Forest Site" },
      { coords: [11.0168, 76.9558], name: "Coimbatore Green Zone" },
      { coords: [9.9252, 78.1198], name: "Madurai Orchard" },
      { coords: [10.7905, 78.7047], name: "Trichy Community Hub" },
      { coords: [11.6643, 78.1460], name: "Salem Planting Area" },
      { coords: [8.7139, 77.7567], name: "Tirunelveli Eco Project" },
      { coords: [12.9165, 79.1325], name: "Vellore Fruit Belt" },
      { coords: [11.3410, 77.7172], name: "Erode River-side Site" },
      { coords: [8.8053, 78.1460], name: "Thoothukudi Coastal Plantation" },
      { coords: [10.7870, 79.1378], name: "Thanjavur Cultural Orchard" },
      { coords: [10.3673, 77.9803], name: "Dindigul Hill Base Site" },
      { coords: [12.9272, 79.3333], name: "Ranipet Green Belt" },
      { coords: [9.5850, 77.9510], name: "Virudhunagar Farm Site" },
      { coords: [10.9500, 78.0833], name: "Karur River Plantation" },
      { coords: [11.2333, 78.1667], name: "Namakkal Eco Center" },
      { coords: [10.9600, 79.3800], name: "Kumbakonam Heritage Orchard" },
      { coords: [8.1833, 77.4167], name: "Nagercoil Southern Tip Site" },
      { coords: [12.8342, 79.7031], name: "Kanchipuram Temple Grove" },
      { coords: [11.1085, 77.3411], name: "Tiruppur Urban Forest" },
      { coords: [12.7409, 77.8253], name: "Hosur Plateau Plantation" },
      { coords: [10.0734, 78.7733], name: "Karaikudi Heritage Site" },
      { coords: [11.7480, 79.7714], name: "Cuddalore Mangrove Buffer" },

      // Assam (22)
      { coords: [26.1445, 91.7362], name: "Guwahati Brahmaputra Site" },
      { coords: [27.4728, 94.9120], name: "Dibrugarh Tea-side Grove" },
      { coords: [24.8333, 92.7789], name: "Silchar Valley Orchard" },
      { coords: [26.7509, 94.2037], name: "Jorhat Research Plantation" },
      { coords: [26.3483, 92.6841], name: "Nagaon Central Site" },
      { coords: [27.4922, 95.3558], name: "Tinsukia Green Corridor" },
      { coords: [26.6333, 92.8000], name: "Tezpur Himalayan View Site" },
      { coords: [26.9822, 94.6344], name: "Sivasagar Heritage Grove" },
      { coords: [24.8640, 92.3592], name: "Karimganj Border Site" },
      { coords: [26.0203, 89.9667], name: "Dhubri Gateway Forest" },
      { coords: [27.2351, 94.1033], name: "North Lakhimpur High Lands" },
      { coords: [26.1743, 90.6278], name: "Goalpara Hill Plantation" },
      { coords: [26.3244, 91.0044], name: "Barpeta Community Orchard" },
      { coords: [26.5222, 93.9611], name: "Golaghat Wildlife Buffer" },
      { coords: [26.4355, 92.0366], name: "Mangaldoi Farm Site" },
      { coords: [26.3989, 90.2667], name: "Kokrajhar Forest Site" },
      { coords: [24.6833, 92.5667], name: "Hailakandi Southern Assam Site" },
      { coords: [25.8450, 93.4333], name: "Diphu Hill Eco Project" },
      { coords: [27.2833, 95.6833], name: "Margherita Mining Buffer" },
      { coords: [27.5667, 95.5667], name: "Doom Dooma Tea Hub" },
      { coords: [26.7333, 93.1500], name: "Biswanath Eco Zone" },
      { coords: [27.3833, 95.6333], name: "Digboi Oil City Forest" },

      // International (3)
      { coords: [1.3521, 103.8198], name: "Singapore Urban Canopy" },
      { coords: [25.2048, 55.2708], name: "Dubai Desert Oasis" },
      { coords: [51.5074, -0.1278], name: "London Community Orchard" }
    ];

    locations.forEach(loc => {
      L.marker(loc.coords, { icon: treeIcon })
        .addTo(map)
        .bindPopup(`<strong>${loc.name}</strong><br>Status: Growing Strong 🌱`);
    });

    // Handle responsiveness: auto-fit markers on load
    const group = new L.featureGroup(locations.map(loc => L.marker(loc.coords)));
    map.fitBounds(group.getBounds().pad(0.1));
  }


});

// ---- Newsletter Form Handler ----
function handleNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  showToast(`🌱 Thank you! ${email} has been added to our community updates.`, 'green');
  e.target.reset();
}

// ---- Toast Notification ----
function showToast(message, type = 'green') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerText = message;
  
  // Style toast (basic)
  toast.style.cssText = `
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    background: #2D5A27; color: white; padding: 1rem 2rem; border-radius: 50px;
    z-index: 9999; font-weight: 700; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  `;
  
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .3s ease'; setTimeout(() => toast.remove(), 300); }, 4000);
}



window.switchTab = function(event, tabId) {
  event.preventDefault();
  event.stopPropagation();
  
  const container = event.currentTarget.closest('.volunteer-card');
  
  // Update Buttons
  container.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');
  
  // Update Panes
  container.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
  
  // Note: Since IDs must be unique, and we might have multiple cards with same tab names, 
  // it's better to find the pane within the container. 
  // However, in our specific HTML, I used IDs. I should fix the HTML to use classes if I want to reuse this.
  // For now, I'll stick to finding within container.
  const pane = container.querySelector(`.tab-pane[id="${tabId}"]`);
  if (pane) {
    pane.classList.add('active');
  }
};






document.getElementById('shop').addEventListener('click', function() {
    window.location.hash = '#menu';
});
document.getElementById('button').addEventListener('click', function() {
    window.location.hash = '#menu';
});

document.addEventListener("DOMContentLoaded", function () {
  const imageContainer = document.getElementById("image");
  const nextBtn = document.getElementById("nextbtn");

  nextBtn.addEventListener("click", () => {
    // Move slightly left
    imageContainer.style.transition = "transform 0.3s ease";
    imageContainer.style.transform = "translateX(-30px)";

    // After 300ms, return to original position
    setTimeout(() => {
      imageContainer.style.transform = "translateX(0)";
    }, 300);
  });
});



document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('reviewSlider');
  let cards = document.querySelectorAll('.review-card');
  const cardWidth = cards[0].offsetWidth + 20; // width + margin
  let currentPosition = 0;
  const visibleCards = 3;
  let maxPosition = 0;
  
  function calculateMaxPosition() {
      cards = document.querySelectorAll('.review-card');
      maxPosition = -((cards.length - visibleCards) * cardWidth);
      if (maxPosition > 0) maxPosition = 0; // Don't go beyond first card
      updateSlider();
  }
  
  function updateSlider() {
      slider.style.transform = `translateX(${currentPosition}px)`;
      
      // Disable left arrow if at start
      document.querySelector('.custom-arrow.left').disabled = currentPosition >= 0;
      
      // Disable right arrow if at end
      document.querySelector('.custom-arrow.right').disabled = currentPosition <= maxPosition;
  }
  
  window.slideLeft = function() {
      if (currentPosition < 0) {
          currentPosition += cardWidth;
          if (currentPosition > 0) currentPosition = 0;
          updateSlider();
      }
  };
  
  window.slideRight = function() {
      if (currentPosition > maxPosition) {
          currentPosition -= cardWidth;
          if (currentPosition < maxPosition) currentPosition = maxPosition;
          updateSlider();
      }
  };
  
  // Handle form submission
  document.getElementById('review-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const reviewText = document.getElementById('reviewText').value.trim();
      
      if (name && reviewText) {
          // Create new review card
          const newCard = document.createElement('div');
          newCard.className = 'review-card';
          newCard.textContent = `"${reviewText}" - ${name}`;
          
          // Add to slider
          slider.appendChild(newCard);
          
          // Reset form
          this.reset();
          
          // Recalculate positions with new card
          calculateMaxPosition();
          
          // If we were at the end before adding, move to show the new card
          if (currentPosition === maxPosition + cardWidth || cards.length <= visibleCards) {
              currentPosition = maxPosition;
              updateSlider();
          }
      }
  });
  
  // Initialize slider
  calculateMaxPosition();
});

document.addEventListener('DOMContentLoaded', function(){
     document.querySelectorAll('#navbar a').forEach(link =>{
        link.addEventListener('clcik', function(e){
            e.preventDefault();
            const targetId = this.textContent.trim().toLowerCase().replace('','-');
            let targetSection;

            switch(targetId){
                case 'home':
                    targetSection = document.getElementById('home');
                    break;
                case 'menu':
                    targetSection = document.getElementById('menu');
                    break;
                case 'newly-launch':
                    targetSection = document.getElementById('middle');
                    break;
                case 'contact':
                    targetSection = document.getElementById('contact');
                    break;
                default:
                    targetSection = document.getElementById('home');
            }

            if(targetSection) {
                targetSection.scrollIntoView({behavior: 'smooth'});
            }
        });
     })
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const searchBtn = document.getElementById('search-btn');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    const closeSearch = document.getElementById('close-search');
    
    const favoritesBtn = document.getElementById('favorites-btn');
    const favoritesSection = document.getElementById('favorites-section');
    const favoritesList = document.getElementById('favorites-list');
    const closeFavorites = document.getElementById('close-favorites');
    
    const cartBtn = document.getElementById('cart-btn');
    const cartSection = document.getElementById('cart-section');
    const cartItems = document.getElementById('cart-items');
    const closeCart = document.getElementById('close-cart');
    
    const homeBtn = document.getElementById('home-btn');
    const contactBtn = document.getElementById('contact-btn');
    
    let favorites = [];
    let cart = [];

    // Search functionality
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchContainer.style.display = 'block';
        searchInput.focus();
    });
    
    closeSearch.addEventListener('click', function() {
        searchContainer.style.display = 'none';
        document.querySelectorAll('.highlight').forEach(item => {
            item.classList.remove('highlight');
        });
    });
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll('.highlight').forEach(item => {
            item.classList.remove('highlight');
        });
        
        if (searchTerm.length > 0) {
            document.querySelectorAll('.item').forEach(item => {
                const name = item.querySelector('.name').textContent.toLowerCase();
                if (name.includes(searchTerm)) {
                    item.classList.add('highlight');
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }
    });
    
    // Add heart icons to menu items
    document.querySelectorAll('.item').forEach(item => {
        // Create heart icon
        const heartIcon = document.createElement('i');
        heartIcon.className = 'fas fa-heart heart-icon';
        item.style.position = 'relative';
        item.appendChild(heartIcon);
        
        // Create add to cart button
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'add-to-cart-btn';
        addToCartBtn.innerHTML = '<i class="fas fa-plus"></i>';
        item.appendChild(addToCartBtn);
        
        // Heart click handler
        heartIcon.addEventListener('click', function() {
            this.classList.toggle('favorited');
            const itemData = getItemData(item);
            
            if (this.classList.contains('favorited')) {
                favorites.push(itemData);
            } else {
                favorites = favorites.filter(fav => fav.name !== itemData.name);
            }
            updateFavoritesList();
        });
        
        // Add to cart handler
        addToCartBtn.addEventListener('click', function() {
            const itemData = getItemData(item);
            cart.push(itemData);
            updateCart();
        });
    });
    
    // Helper function to get item data
    function getItemData(item) {
        return {
            name: item.querySelector('.name').textContent,
            price: item.querySelector('.price').textContent,
            img: item.querySelector('img').src
        };
    }
    
    // Favorites functionality
    favoritesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        favoritesSection.style.display = 'block';
    });
    
    closeFavorites.addEventListener('click', function() {
        favoritesSection.style.display = 'none';
    });
    
    function updateFavoritesList() {
        favoritesList.innerHTML = favorites.map(fav => `
            <div class="favorite-item">
                <img src="${fav.img}" width="50" height="50">
                <div>
                    <h4>${fav.name}</h4>
                    <p>${fav.price}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Cart functionality
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cartSection.style.display = 'block';
    });
    
    closeCart.addEventListener('click', function() {
        cartSection.style.display = 'none';
    });
    
    function updateCart() {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" width="50" height="50">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Navigation functionality
    homeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    });
    
    contactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
});
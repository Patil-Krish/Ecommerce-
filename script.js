// Akira Perfumes - Interactive Engine
// Developed for premium aesthetic and rich features

// --- PRODUCT DATA DB ---
const productsData = {
    "aura-rose": {
        id: "aura-rose",
        name: "Aura de Rose",
        category: "floral",
        price: 125.00,
        image: "images/img2.jpg",
        description: "An elegant, romantic symphony of hand-picked Turkish roses combined with delicate white musk, evoking the sensation of a fresh morning walk through a private rose garden.",
        notes: { top: "Turkish Rose, Lychee", middle: "Peony, Damask Rose", base: "White Musk, Soft Amber" },
        family: "Floral",
        longevity: "8-10 Hours",
        projection: "Moderate to Strong",
        occasion: "Romantic, Daytime, Weddings",
        season: "Spring / Summer"
    },
    "santal-oud": {
        id: "santal-oud",
        name: "Santal Oud",
        category: "woody",
        price: 140.00,
        image: "images/img7.jpg",
        description: "A mysterious, smoky, and grounded scent featuring premium sandalwood, cardamom, and warm agarwood (oud). Made for the modern sophisticate who values depth.",
        notes: { top: "Cardamom, Pink Pepper", middle: "Sandalwood, Virginia Cedar", base: "Agarwood (Oud), Vetiver" },
        family: "Woody / Spicy",
        longevity: "10-12 Hours",
        projection: "Strong",
        occasion: "Evening, Business, Cold Weather",
        season: "Fall / Winter"
    },
    "jardin-fruite": {
        id: "jardin-fruite",
        name: "Jardin Fruité",
        category: "fruity",
        price: 115.00,
        image: "images/img4.jpg",
        description: "A playful, vibrant burst of sweetness. Sun-ripened pear and peach mingle with sweet vanilla and soft berries, creating a joyful, irresistible trail.",
        notes: { top: "Nashi Pear, Blackberry", middle: "Peach Blossom, Apricot", base: "Bourbon Vanilla, Caramel" },
        family: "Fruity / Sweet",
        longevity: "6-8 Hours",
        projection: "Moderate",
        occasion: "Casual Daywear, Social Events",
        season: "Spring / Summer"
    },
    "celeste": {
        id: "celeste",
        name: "Céleste",
        category: "fresh",
        price: 130.00,
        image: "images/img6.jpg",
        description: "Salty sea breezes meet zesty Mediterranean bergamot and dry amberwood. A clean, energizing, and utterly limitless scent that captures the essence of coastal escape.",
        notes: { top: "Bergamot, Sea Salt", middle: "Marine Accord, Rosemary", base: "Amberwood, Oakmoss" },
        family: "Fresh / Marine",
        longevity: "8-10 Hours",
        projection: "Moderate",
        occasion: "Daywear, Outdoor, Active, Office",
        season: "Summer / Spring"
    },
    "noir-charm": {
        id: "noir-charm",
        name: "Noir Charm",
        category: "woody",
        price: 145.00,
        image: "images/img3.jpg",
        description: "An alluring, sensual blend of dark amber, warm patchouli, and spicy crushed black pepper. Exudes quiet confidence, power, and magnetic attraction.",
        notes: { top: "Black Pepper, Coriander", middle: "Warm Amber, Labdanum", base: "Patchouli, Madagascar Vanilla" },
        family: "Woody / Amber",
        longevity: "10-12 Hours",
        projection: "Strong",
        occasion: "Date Night, Clubbing, Evening Gala",
        season: "Fall / Winter"
    },
    "pamplemousse": {
        id: "pamplemousse",
        name: "Pamplemousse",
        category: "fresh",
        price: 110.00,
        image: "images/img5.jpg",
        description: "An ultra-crisp, sparkling citrus tonic of grapefruit, lime, and crushed green mint leaves. Highly refreshing, clean, and perfect for active days.",
        notes: { top: "Ruby Grapefruit, Lime", middle: "Spearmint, Basil", base: "White Cedar, Vetiver" },
        family: "Citrus / Fresh",
        longevity: "5-7 Hours",
        projection: "Moderate to Intimate",
        occasion: "Active, Post-Gym, Hot Summer Days",
        season: "Summer"
    },
    "velvet-petals": {
        id: "velvet-petals",
        name: "Velvet Petals",
        category: "floral",
        price: 135.00,
        image: "images/img8.jpg",
        description: "A opulent, velvet floral bouquet centering around grandiflorum jasmine, soft pink peony, and creamy sandalwood base. Classic elegance redefined.",
        notes: { top: "Jasmine Grandiflorum", middle: "Pink Peony, Freesia", base: "Creamy Sandalwood, Musk" },
        family: "Floral / Sandalwood",
        longevity: "8-10 Hours",
        projection: "Moderate",
        occasion: "Special Occasions, Evening Wear",
        season: "All Year"
    }
};

// --- INITIAL STATE ---
let cart = [];
let quizAnswers = [];
let currentQuizStep = 0;
let comparedProducts = [];

// --- QUIZ DATA ---
const quizQuestions = [
    {
        question: "What is your ideal escape or environment?",
        options: [
            { text: "A sun-drenched, blooming botanical garden", category: "floral" },
            { text: "Deep, quiet forest trails after a light rain", category: "woody" },
            { text: "A vibrant, bustling tropical market full of fruits", category: "fruity" },
            { text: "A windswept ocean cliff with crashing waves", category: "fresh" }
        ]
    },
    {
        question: "Choose a texture or feeling that resonates with you:",
        options: [
            { text: "Soft, flowing silk and delicate lace", category: "floral" },
            { text: "Warm, cozy cashmere sitting by a fireplace", category: "woody" },
            { text: "Crisp, clean line-dried linen in the summer wind", category: "fresh" },
            { text: "Rich, colorful velvet and sweet indulgence", category: "fruity" }
        ]
    },
    {
        question: "How would your close friends describe you?",
        options: [
            { text: "Romantic, elegant, and gentle", category: "floral" },
            { text: "Grounded, sophisticated, and mysterious", category: "woody" },
            { text: "Playful, enthusiastic, and sweet", category: "fruity" },
            { text: "Clean, minimalist, and adventurous", category: "fresh" }
        ]
    }
];

// --- APP INIT ---
document.addEventListener("DOMContentLoaded", () => {
    // Load Cart from localStorage
    const savedCart = localStorage.getItem("akira_cart");
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartUI();
        } catch (e) {
            cart = [];
        }
    }

    // Set Theme from localStorage or system preference
    initTheme();

    // Set up Intersection Observer for scroll animations
    initScrollAnimations();

    // Setup Event Listeners
    setupEventListeners();

    // Init Scent Quiz
    renderQuizStep();

    // Init Bespoke Scent Lab
    initScentLab();

    // Init Scent Chatbot
    initScentChatbot();
});

// --- THEME ENGINE ---
function initTheme() {
    const savedTheme = localStorage.getItem("akira_theme");
    const themeToggles = [document.getElementById("theme-toggle"), document.getElementById("theme-toggle-mobile")];

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeToggles.forEach(toggle => {
            if (toggle) {
                const icon = toggle.querySelector("span");
                if (icon) icon.textContent = "light_mode";
            }
        });
    } else {
        document.body.classList.remove("dark-theme");
        themeToggles.forEach(toggle => {
            if (toggle) {
                const icon = toggle.querySelector("span");
                if (icon) icon.textContent = "dark_mode";
            }
        });
    }
}

function toggleTheme() {
    const themeToggles = [document.getElementById("theme-toggle"), document.getElementById("theme-toggle-mobile")];
    
    if (document.body.classList.contains("dark-theme")) {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("akira_theme", "light");
        themeToggles.forEach(toggle => {
            if (toggle) {
                const icon = toggle.querySelector("span");
                if (icon) icon.textContent = "dark_mode";
            }
        });
        showToast("Switched to Light Mode");
    } else {
        document.body.classList.add("dark-theme");
        localStorage.setItem("akira_theme", "dark");
        themeToggles.forEach(toggle => {
            if (toggle) {
                const icon = toggle.querySelector("span");
                if (icon) icon.textContent = "light_mode";
            }
        });
        showToast("Switched to Premium Dark Mode");
    }
}

// --- SCROLL ANIMATIONS ---
function initScrollAnimations() {
    const animElements = document.querySelectorAll(".reveal");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    animElements.forEach(el => observer.observe(el));
}

// --- EVENT LISTENERS SETUP ---
function setupEventListeners() {
    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");
    const themeToggleMobile = document.getElementById("theme-toggle-mobile");
    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener("click", toggleTheme);
    }

    // Cart Drawer Toggle
    const cartBtn = document.getElementById("cart-btn");
    const cartBtnMobile = document.getElementById("cart-btn-mobile");
    const closeCartBtn = document.getElementById("close-cart");
    const cartDrawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("drawer-overlay");

    const openCartHandler = (e) => {
        if (e) e.preventDefault();
        if (cartDrawer && overlay) {
            cartDrawer.classList.add("open");
            overlay.classList.add("open");
        }
    };

    if (cartBtn) cartBtn.addEventListener("click", openCartHandler);
    if (cartBtnMobile) cartBtnMobile.addEventListener("click", openCartHandler);

    const closeCartHandler = () => {
        if (cartDrawer && overlay) {
            cartDrawer.classList.remove("open");
            overlay.classList.remove("open");
        }
    };

    if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartHandler);
    if (overlay) overlay.addEventListener("click", closeCartHandler);

    // Quick View Modal Elements
    const qvModal = document.getElementById("quickview-modal");
    const closeQvBtn = document.getElementById("close-quickview");
    const qvOverlay = document.getElementById("qv-overlay");

    const closeQvHandler = () => {
        if (qvModal && qvOverlay) {
            qvModal.classList.remove("open");
            qvOverlay.classList.remove("open");
        }
    };

    if (closeQvBtn) closeQvBtn.addEventListener("click", closeQvHandler);
    if (qvOverlay) qvOverlay.addEventListener("click", closeQvHandler);

    // Product Category Filtering
    const filterLinks = document.querySelectorAll(".product-filter-btn");
    filterLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Toggle active filter styling
            filterLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            const selectedCat = link.getAttribute("data-category");
            filterProducts(selectedCat);
        });
    });

    // Add to Cart buttons delegation (for product grid and featured products)
    document.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("add-to-cart-btn")) {
            const prodId = e.target.getAttribute("data-id");
            addToCart(prodId);
        }

        if (e.target && e.target.classList.contains("quick-view-btn")) {
            const prodId = e.target.getAttribute("data-id");
            openQuickView(prodId);
        }
    });

    // Modal Add To Cart
    const modalAddBtn = document.getElementById("modal-add-to-cart");
    if (modalAddBtn) {
        modalAddBtn.addEventListener("click", () => {
            const prodId = modalAddBtn.getAttribute("data-id");
            addToCart(prodId);
            closeQvHandler();
        });
    }

    // Checkout Button
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length === 0) {
                showToast("Your cart is empty.");
                return;
            }
            showToast("Processing order... Thank you for choosing Akira!");
            cart = [];
            saveCart();
            updateCartUI();
            closeCartHandler();
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector("input[type='email']");
            if (emailInput && emailInput.value) {
                showToast(`Welcome! Discount code sent to ${emailInput.value}`);
                emailInput.value = "";
            }
        });
    }

    // Contact form simulation if any
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showToast("Message sent successfully! We will get back to you soon.");
            contactForm.reset();
        });
    }

    // Mobile Navigation Drawer Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.add("open");
        });
    }

    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });
    }

    // Close mobile menu on clicking any links
    const mobileLinks = document.querySelectorAll("#mobile-menu ul li a");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (mobileMenu) mobileMenu.classList.remove("open");
        });
    });
}

// --- PRODUCT FILTERING LOGIC ---
function filterProducts(category) {
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach(card => {
        const prodCat = card.getAttribute("data-category");
        
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";
        
        setTimeout(() => {
            if (category === "all" || prodCat === category) {
                card.style.display = "block";
                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                }, 50);
            } else {
                card.style.display = "none";
            }
        }, 300);
    });
}

// --- CART ENGINE ---
function addToCart(productId) {
    const productInfo = productsData[productId];
    if (!productInfo) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: productInfo.id,
            name: productInfo.name,
            price: productInfo.price,
            image: productInfo.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    
    // Animate cart badge
    const badge = document.querySelector(".cart-count");
    if (badge) {
        badge.classList.remove("pop");
        void badge.offsetWidth; // Trigger reflow
        badge.classList.add("pop");
    }

    showToast(`Added ${productInfo.name} to Cart`);
}

function updateCartQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;

    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }

    saveCart();
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showToast("Item removed from cart");
}

function saveCart() {
    localStorage.setItem("akira_cart", JSON.stringify(cart));
}

function updateCartUI() {
    const cartCountElements = document.querySelectorAll(".cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalAmount = document.getElementById("cart-total-amount");

    // Total counts
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        if (totalItems > 0) {
            el.style.display = "flex";
        } else {
            el.style.display = "none";
        }
    });

    // Load items in drawer
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <span class="material-symbols-outlined" style="font-size: 48px; opacity: 0.3;">shopping_bag</span>
                <p>Your shopping drawer is empty.</p>
                <p style="font-size: 13px; opacity: 0.6; margin-top: 5px;">Discover the fragrance of originality.</p>
            </div>
        `;
        if (cartTotalAmount) cartTotalAmount.textContent = "$0.00";
        return;
    }

    let itemsHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        // Custom items handling
        let itemImageHTML = `<img src="${item.image}" alt="${item.name}" class="cart-item-img">`;
        let itemDetailsHTML = "";

        if (item.isCustom) {
            const c = item.details.citrus;
            const f = item.details.floral;
            const w = item.details.woody;
            const s = item.details.spicy;
            
            // Calculate mixed color
            const r = Math.round((244 * c + 229 * f + 163 * w + 197 * s) / 100);
            const g = Math.round((240 * c + 169 * f + 133 * w + 120 * s) / 100);
            const b = Math.round((169 * c + 169 * f + 94 * w + 80 * s) / 100);
            const mixedColor = `rgba(${r}, ${g}, ${b}, 0.85)`;

            itemImageHTML = `
                <div class="cart-item-img-wrap" style="width: 75px; height: 75px; border: 1px solid var(--border-color); border-radius: 4px; display: flex; align-items: center; justify-content: center; background-color: var(--bg-primary); position: relative; overflow: hidden;">
                    <div class="mini-bottle" style="width: 22px; height: 36px; border: 1.5px solid var(--text-primary); border-radius: 3px; position: relative; background: transparent; display: flex; align-items: center; justify-content: center; z-index: 2;">
                        <div class="mini-bottle-cap" style="position: absolute; top: -6px; width: 8px; height: 5px; background-color: var(--text-primary); border-radius: 1px; z-index: 3;"></div>
                        <div class="mini-bottle-liquid" style="position: absolute; bottom: 1.5px; left: 1.5px; right: 1.5px; top: 12px; background: ${mixedColor}; border-radius: 0 0 1.5px 1.5px; z-index: 1;"></div>
                    </div>
                </div>
            `;

            itemDetailsHTML = `
                <div class="cart-item-custom-notes" style="font-size: 10px; color: var(--text-muted); margin-top: 4px; letter-spacing: 0.05em; line-height: 1.3;">
                    Citrus: ${c}% | Floral: ${f}%<br>Woody: ${w}% | Spicy: ${s}%
                </div>
            `;
        }

        itemsHTML += `
            <div class="cart-item" data-id="${item.id}">
                ${itemImageHTML}
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                    ${itemDetailsHTML}
                    <div class="cart-item-quantity" style="margin-top: 6px;">
                        <button class="qty-btn minus" onclick="adjustCartQty('${item.id}', -1)">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn plus" onclick="adjustCartQty('${item.id}', 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeCartItem('${item.id}')">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = itemsHTML;
    if (cartTotalAmount) cartTotalAmount.textContent = `$${subtotal.toFixed(2)}`;
}

// Global wrapper functions for cart buttons since they are dynamically rendered
window.adjustCartQty = (id, delta) => {
    updateCartQuantity(id, delta);
};

window.removeCartItem = (id) => {
    removeFromCart(id);
};

// --- QUICK VIEW MODAL ---
function openQuickView(productId) {
    const product = productsData[productId];
    if (!product) return;

    const modal = document.getElementById("quickview-modal");
    const overlay = document.getElementById("qv-overlay");
    if (!modal || !overlay) return;

    // Fill details
    const imgEl = document.getElementById("qv-img");
    const titleEl = document.getElementById("qv-title");
    const descEl = document.getElementById("qv-desc");
    const priceEl = document.getElementById("qv-price");
    const topEl = document.getElementById("qv-notes-top");
    const midEl = document.getElementById("qv-notes-middle");
    const baseEl = document.getElementById("qv-notes-base");
    const addBtn = document.getElementById("modal-add-to-cart");

    if (imgEl) imgEl.src = product.image;
    if (titleEl) titleEl.textContent = product.name;
    if (descEl) descEl.textContent = product.description;
    if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;
    
    if (topEl) topEl.textContent = product.notes.top;
    if (midEl) midEl.textContent = product.notes.middle;
    if (baseEl) baseEl.textContent = product.notes.base;

    if (addBtn) {
        addBtn.setAttribute("data-id", product.id);
    }

    // Manage size selector button clicks in modal
    const sizeBtns = document.querySelectorAll(".size-btn");
    sizeBtns.forEach(btn => {
        btn.classList.remove("active");
        btn.addEventListener("click", () => {
            sizeBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            // Adjust price slightly depending on size selected
            const ozValue = btn.getAttribute("data-size");
            if (ozValue === "100ml") {
                priceEl.textContent = `$${product.price.toFixed(2)}`;
            } else if (ozValue === "50ml") {
                // 50ml is 30% cheaper
                priceEl.textContent = `$${(product.price * 0.75).toFixed(2)}`;
            }
        });
    });
    
    // Default size set to 100ml
    const defaultSize = document.querySelector(".size-btn[data-size='100ml']");
    if (defaultSize) defaultSize.click();

    // Show modal
    modal.classList.add("open");
    overlay.classList.add("open");
}

// --- FRAGRANCE QUIZ ENGINE ---
function renderQuizStep() {
    const quizContent = document.getElementById("quiz-step-content");
    const quizProgress = document.getElementById("quiz-progress-bar");
    if (!quizContent) return;

    if (currentQuizStep < quizQuestions.length) {
        const currentQ = quizQuestions[currentQuizStep];
        
        // Update Progress
        const percent = ((currentQuizStep) / quizQuestions.length) * 100;
        if (quizProgress) quizProgress.style.width = `${percent}%`;

        // Render Question and Choices
        let optionsHTML = "";
        currentQ.options.forEach((opt, index) => {
            optionsHTML += `
                <button class="quiz-option-btn" onclick="selectQuizOption('${opt.category}')">
                    <span class="option-marker">${String.fromCharCode(65 + index)}</span>
                    <span class="option-text">${opt.text}</span>
                </button>
            `;
        });

        quizContent.innerHTML = `
            <div class="quiz-question-container">
                <span class="quiz-step-indicator">Question ${currentQuizStep + 1} of ${quizQuestions.length}</span>
                <h3 class="quiz-question">${currentQ.question}</h3>
                <div class="quiz-options">
                    ${optionsHTML}
                </div>
            </div>
        `;
    } else {
        // Render recommendation result
        if (quizProgress) quizProgress.style.width = "100%";
        calculateQuizResult();
    }
}

window.selectQuizOption = (category) => {
    quizAnswers.push(category);
    currentQuizStep++;
    
    // Add slide-out fade-in animation on step change
    const container = document.querySelector(".quiz-question-container");
    if (container) {
        container.style.opacity = "0";
        container.style.transform = "translateX(-20px)";
        setTimeout(() => {
            renderQuizStep();
        }, 300);
    } else {
        renderQuizStep();
    }
};

function calculateQuizResult() {
    const quizContent = document.getElementById("quiz-step-content");
    if (!quizContent) return;

    // Tally answers to find the most frequent category
    const tallies = { floral: 0, woody: 0, fruity: 0, fresh: 0 };
    quizAnswers.forEach(cat => {
        if (tallies[cat] !== undefined) tallies[cat]++;
    });

    let winningCategory = "floral";
    let maxTally = -1;

    for (const cat in tallies) {
        if (tallies[cat] > maxTally) {
            maxTally = tallies[cat];
            winningCategory = cat;
        }
    }

    // Map winning category to a recommendation product
    const recommendationMap = {
        floral: "aura-rose",
        woody: "santal-oud",
        fruity: "jardin-fruite",
        fresh: "celeste"
    };

    const recommendedId = recommendationMap[winningCategory] || "aura-rose";
    const recommendedProduct = productsData[recommendedId];

    quizContent.innerHTML = `
        <div class="quiz-result-container reveal active">
            <span class="quiz-result-badge">Your Scent Match</span>
            <h3 class="quiz-result-title">You are: ${winningCategory.charAt(0).toUpperCase() + winningCategory.slice(1)}</h3>
            <p class="quiz-result-explanation">Based on your choices, you prefer scents that embody elegance, harmony, and depth. We recommend our signature blend:</p>
            
            <div class="quiz-result-card">
                <img src="${recommendedProduct.image}" alt="${recommendedProduct.name}" class="result-card-img">
                <div class="result-card-details">
                    <h4>${recommendedProduct.name}</h4>
                    <p class="result-card-notes"><strong>Notes:</strong> ${recommendedProduct.notes.top} &bull; ${recommendedProduct.notes.middle}</p>
                    <p class="result-card-desc">${recommendedProduct.description.slice(0, 100)}...</p>
                    <div class="result-card-actions">
                        <button class="style-button primary quick-view-btn" data-id="${recommendedProduct.id}">Quick View</button>
                        <button class="style-button gold add-to-cart-btn" data-id="${recommendedProduct.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
            
            <button class="quiz-reset-btn" onclick="resetQuiz()">Take Quiz Again</button>
        </div>
    `;
}

window.resetQuiz = () => {
    quizAnswers = [];
    currentQuizStep = 0;
    
    const quizContent = document.getElementById("quiz-step-content");
    if (quizContent) {
        quizContent.innerHTML = "";
    }
    renderQuizStep();
};

// --- TOAST NOTIFICATIONS ---
function showToast(message) {
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerHTML = `
        <span class="toast-text">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Fade In
    setTimeout(() => {
        toast.classList.add("visible");
    }, 50);

    // Fade Out & Remove
    setTimeout(() => {
        toast.classList.remove("visible");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3200);
}

// @ts-nocheck
/* -------------------- 9-PAGE LOADER -------------------- */
window.addEventListener('load', () => {
    document.querySelector('.page-loader').classList.add('slide-out-right')
    setTimeout(() => {
        document.querySelector('.page-loader').style.display = 'none'
    }, 1000);
})


/* -------------------- 1-BG ANIMATION EFFECT -------------------- */
function bgAnimationItems() {
    const rows = 7, cols = 10
    // Créer 7 fois (rows) 10 <div> (cols)
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            // console.log(j);
            const div = document.createElement('div')
            div.className = `col-${j+1}`
            document.querySelector('.bg-animation-effect').appendChild(div)
        }
    }
}
bgAnimationItems()

/* -------------------- 6-TOGGLE NAVBAR -------------------- */
const navToggler = document.querySelector('.nav-toggler')
navToggler.addEventListener('click', toggleNavbar)

function toggleNavbar() {
    navToggler.classList.toggle('active')
    document.querySelector('.nav').classList.toggle('open')
    toggleOverlayEffect()
    toggleBodyScrolling()
}


/* -------------------- 8-HIDE & SHOW SECTION -------------------- */
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('link-item') && e.target.hash !== "") {
        // console.log(e.target.hash); // Exemple : #contact
        const hash = e.target.hash;
        if(e.target.classList.contains('nav-item')) {
            // console.log('true');
            activeSection(hash)
            toggleNavbar()
        } else {
            // console.log('false');
            toggleBodyScrolling()
            toggleOverlayEffect()
            document.querySelector('.nav-toggler').classList.add('toggle-hide')
            setTimeout(() => {
                activeSection(hash)
                toggleOverlayEffect()
                toggleBodyScrolling()
                document.querySelector('.nav-toggler').classList.remove('toggle-hide')
            }, 950);
        }
    }
})

function activeSection(sectionId) {
    document.querySelector('section.active').classList.remove('active')
    document.querySelector(sectionId).classList.add('active')
    window.scrollTo(0,0)
}



/* -------------------- 7-TOGGLE OVERLAY EFFECT -------------------- */
function toggleOverlayEffect() {
    document.querySelector('.overlay-effect').classList.toggle('active')
}


/* -------------------- 3-TOGGLE BODY SCROLLING -------------------- */
// toggle barre de scroll : s'affiche ou pas selon le besoin
function toggleBodyScrolling() {
    document.body.classList.toggle("hide-scrolling")
}


/* -------------------- 2-FILTER PORTFOLIO ITEMS -------------------- */
// 2-2 Afficher les items de la catégorie au clic et le message d'info sur la catégorie choisie
const filterBtnsContainer = document.querySelector('.portfolio-filter')
let portfolioItems;
filterBtnsContainer.addEventListener('click', (e) => {
    // console.log(e.target);
    if(e.target.classList.contains("portfolio-filter-btn") && !e.target.classList.contains('active')) {
        filterBtnsContainer.querySelector('.active').classList.remove('active')
        e.target.classList.add('active')
        // Au clic sur un btn categorie, la barre de scroll disparait sur le msg d'info
        toggleBodyScrolling()

        // Message qui apparait pendant 0.8s quand l'utilisteur choisit une catégorie
        document.querySelector('.filter-status').classList.add('active')
        document.querySelector('.filter-status p').innerHTML = `Vous avez sélectionné la catégorie <span>${e.target.innerHTML}</span>.`
        setTimeout(() => {
            filterItems(e.target)
        }, 400);
        setTimeout(() => {
            document.querySelector('.filter-status').classList.remove('active')
            // La barre de scroll revient si besoin de scroller sur la page des items
            toggleBodyScrolling()
        }, 800);

        
    } else {
        e.target.classList.remove('active')
    }
})

// 2-1 Filtrer les items par catégorie
function filterItems(filterBtn) {
    // console.log(filterBtn);
    const selectedCategory = filterBtn.getAttribute("data-filter")
    // console.log(selectedCategory);

    document.querySelectorAll('.portfolio-item').forEach((item) => {
        // console.log(item);
        const category = item.getAttribute('data-category').split(',')
        // console.log(category);
        
        // Si la catégorie 'active' est dans le Array category (diiférent de -1), on affiche ses items
        if(category.indexOf(selectedCategory) !== -1 || selectedCategory === 'tous') {
            item.classList.add('show')
        } else {
            item.classList.remove('show')
        }

    })
    portfolioItems = document.querySelectorAll('.portfolio-item.show')
    // console.log(portfolioItems);
}
// Filtrer les éléments du portfolio de la catégorie active
filterItems(document.querySelector(".portfolio-filter-btn.active"));


/* -------------------- 4-PORTFOLIO ITEM DETAILS POPUP -------------------- */
let portfolioItemIndex;
document.addEventListener('click', (e) => {
    // renvoie l'elt cliqué qui a la class .portfolio-item
    if(e.target.closest('.portfolio-item')) {
        // console.log('Hi');
        const currentItem = e.target.closest('.portfolio-item')
        // renvoi l'index de l'elt cliqué dans le tableau portfolioItems
        portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem)
        // console.log(portfolioItemIndex);
        togglePopup();
        portfolioItemDetails();
        updateNextPrevItem();
    }
})

// Ouvrir/fermer la popup affichant l'item
function togglePopup() {
    document.querySelector('.portfolio-popup').classList.toggle("open")
    // la barre de scroll apparait
    toggleBodyScrolling()
}
document.querySelector('.pp-close-btn').addEventListener('click', togglePopup)

// Remplir lors de l'affichage de la popup le contenu de l'item sélectionné
function portfolioItemDetails() {
    // Récupérer l'image de l'item
    document.querySelector('.pp-thumbnail img').src = portfolioItems[portfolioItemIndex].querySelector('img').src;

    // Récupérer le titre de l'item
    document.querySelector('.pp-header h3').innerHTML = portfolioItems[portfolioItemIndex].querySelector('.portfolio-item-title').innerHTML;

    // Récupérer le body de l'item
    document.querySelector('.pp-body').innerHTML = portfolioItems[portfolioItemIndex].querySelector('.portfolio-item-details').innerHTML;

    // Mettre à jour le compteur dans la popup
    document.querySelector('.pp-counter').innerHTML = `${portfolioItemIndex+1} sur ${portfolioItems.length} ( <span title="categorie">${document.querySelector(".portfolio-filter-btn.active").innerHTML}</span> )`

}

// Mettre à jour le popup footer & les boutons précédent et suivant item
function updateNextPrevItem() {
    if(portfolioItemIndex != 0) {
        document.querySelector('.pp-footer-left').classList.remove('hidden')
        document.querySelector('.pp-footer-left h3').innerHTML = portfolioItems[portfolioItemIndex-1].querySelector('h3').innerHTML

        document.querySelector('.pp-footer-left img').src = portfolioItems[portfolioItemIndex-1].querySelector('img').src
    } else {
        document.querySelector('.pp-footer-left').classList.add('hidden')
    }

    if(portfolioItemIndex != portfolioItems.length-1) {
        document.querySelector('.pp-footer-right').classList.remove('hidden')
        document.querySelector('.pp-footer-right h3').innerHTML = portfolioItems[portfolioItemIndex+1].querySelector('h3').innerHTML

        document.querySelector('.pp-footer-right img').src = portfolioItems[portfolioItemIndex+1].querySelector('img').src
    } else {
        document.querySelector('.pp-footer-right').classList.add('hidden')
    }
}

document.querySelector('.pp-prev-btn').addEventListener('click', () => {
    changePortfolioItem('prev');
})

document.querySelector('.pp-next-btn').addEventListener('click', () => {
    changePortfolioItem('next');
})


// Clic sur les boutons prev/next du popup footer
function changePortfolioItem(direction) {
    // console.log(direction);
    if(direction == "prev") {
        portfolioItemIndex--;
    } else {
        portfolioItemIndex++;
    }

    // Overlay
    document.querySelector('.pp-overlay').classList.add(direction)
    setTimeout(() => {
         // Remonte le contenu du popup en haut de page
        document.querySelector('.pp-inner').scrollTo(0,0)
        // Remplit le contenu de la popup correspondant à l'item sélectionné
        portfolioItemDetails()
        // Met à jour le footer
        updateNextPrevItem()
    }, 400);
    setTimeout(() => {
        document.querySelector('.pp-overlay').classList.remove(direction)
    }, 1000);
   
}

/* -------------------- 5-TOGGLE CONTACT FROM -------------------- */
document.addEventListener('click', (e) => {
    if(e.target.classList.contains("toggle-contact-form-btn")) {
        document.querySelector('.contact-form').classList.toggle('open')
        toggleBodyScrolling()
    }
})

































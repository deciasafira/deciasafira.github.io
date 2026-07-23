document.addEventListener('DOMContentLoaded', () => {

const menuToggle = document.querySelector('.header__menu-toggle');
const mobileMenu = document.querySelector('.header__mobile-menu');
const menuToggleText = document.querySelector('.header__menu-toggle-text');

const footerMenuButton = document.querySelector('.footer__mobile-menu-button');
const footerMobileMenu = document.querySelector('.footer__mobile-menu');

function toggleMobileMenu() {

    if (!mobileMenu || !menuToggleText) return;

    const isOpen = mobileMenu.classList.toggle('is-open');

    document.body.classList.toggle('menu-open');

    menuToggleText.textContent = isOpen ? 'CLOSE' : 'MENU';
}

function toggleFooterMenu() {

    if (!footerMobileMenu || !footerMenuButton) return;

    const footerMenuText = footerMenuButton.querySelector('.footer__mobile-menu-text');

    const isOpen = footerMobileMenu.classList.toggle('is-open');

    document.body.classList.toggle('menu-open');

    if (footerMenuText) {
        footerMenuText.textContent = isOpen ? 'CLOSE' : 'MENU';
    }

}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
}

if (footerMenuButton) {
    footerMenuButton.addEventListener('click', toggleFooterMenu);
}

document.addEventListener('click', (e) => {

    if (!footerMobileMenu || !footerMenuButton) return;

    const clickInsideMenu = footerMobileMenu.contains(e.target);
    const clickOnButton = footerMenuButton.contains(e.target);

    if (
        footerMobileMenu.classList.contains('is-open') &&
        !clickInsideMenu &&
        !clickOnButton
    ) {

        footerMobileMenu.classList.remove('is-open');
        document.body.classList.remove('menu-open');

    }

});

    const heroAnchors = document.querySelectorAll('.hero__anchor');
    const heroFeatures = document.querySelectorAll('.hero__feature');

    heroAnchors.forEach(anchor => {
        anchor.style.cursor = 'pointer';

        anchor.addEventListener('click', () => {
            const targetId = anchor.dataset.target;
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    heroFeatures.forEach(feature => {
        feature.addEventListener('click', () => {
            const targetId = feature.dataset.target;
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const tabs = document.querySelectorAll('.expertise__tab');
    const contents = document.querySelectorAll('.expertise__tab-content');

    tabs.forEach(tab => {

        tab.addEventListener('click', () => {

            const currentTab = tab.dataset.tab;

            tabs.forEach(item => item.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));

            tab.classList.add('active');

            const activeContent = document.querySelector(
                `.expertise__tab-content[data-tab="${currentTab}"]`
            );

            if (activeContent) {
                activeContent.classList.add('active');
            }

        });

    });

    const slider = document.querySelector('.what-we-do__slider');

    if (slider) {

        const track = slider.querySelector('.what-we-do__track');
        const slides = Array.from(slider.querySelectorAll('.what-we-do__slide'));
        const prevButton = slider.querySelector('.what-we-do__arrow--prev');
        const nextButton = slider.querySelector('.what-we-do__arrow--next');
        const dots = Array.from(slider.querySelectorAll('.what-we-do__dot'));

        let currentSlide = 0;

        const updateSlider = (index) => {

            if (!slides.length || !track) return;

            currentSlide = Math.max(0, Math.min(index, slides.length - 1));

            track.style.transform = `translateX(-${currentSlide * 100}%)`;

            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('is-active', slideIndex === currentSlide);
            });

            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle('is-active', dotIndex === currentSlide);
            });

            if (prevButton) {
                prevButton.disabled = currentSlide === 0;
            }

            if (nextButton) {
                nextButton.disabled = currentSlide >= slides.length - 1;
            }

        };

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                updateSlider(currentSlide - 1);
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                updateSlider(currentSlide + 1);
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {

                const targetIndex = Number(dot.dataset.slideTo);

                if (targetIndex < slides.length) {
                    updateSlider(targetIndex);
                }

            });
        });

        updateSlider(0);

    }

});
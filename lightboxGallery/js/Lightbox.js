export class Lightbox {
    constructor() {
        this.$lightbox = document.querySelector('.lightbox');
        this.$inner = document.querySelector('.lightbox__inner');
        this.$lightboxTrack  = document.querySelector('.lightbox__track');
        this.$images = this.$lightboxTrack.querySelectorAll(".lightbox__image");
        this.$closeBtn = document.querySelector('.lightbox__close');

        this.bindEvents();
    }

    show() {
        this.$lightbox.classList.remove('hidden');
    }

    setImages(srcList) {
        this.$images.forEach((image, index) => {
            image.src = srcList[index];
        });
    }

    close() {
        this.$lightbox.classList.add('hidden');
    }

    listenPointerDown(action) {
        this.$lightboxTrack.addEventListener('pointerdown', action);
    }

    listenPointerUp(action) {
        this.$lightboxTrack.addEventListener('pointerup', action);
    }

    listenPointerMove(action) {
        this.$lightboxTrack.addEventListener('pointermove', action);
    }

    animate(direction) {
        return new Promise(resolve => {
            const target = direction ? "-66.6666%" : "0%";

            const onEnd = () => {
                this.$lightboxTrack.removeEventListener('transitionend', onEnd);
                resolve();
            }

            this.$lightboxTrack.addEventListener('transitionend', onEnd);
            this.$lightboxTrack.style.transform = `translateX(${target})`;
        });
    }

    resetTrack (withTransition = false) {
        if (!withTransition) this.setTransition("none");
        this.$lightboxTrack.style.transform = "translateX(-33.3333%)";
        this.$lightboxTrack.offsetHeight;

        this.setTransition('transform .2s ease-in-out');

    }

    setTransition(transition) {
        this.$lightboxTrack.style.transition = `${transition}`;
    }

    moveX(offset) {
        this.$lightboxTrack.style.transform = `translateX(calc(-33.3333% + ${offset}px))`;
    }

    moveY(offset) {
        this.$lightboxTrack.style.transform = `translateY(${offset}px)`;
    }

    bindEvents() {
        this.$closeBtn.addEventListener('click', e => {this.close()});
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });


    }
}
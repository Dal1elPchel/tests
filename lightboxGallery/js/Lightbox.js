export class Lightbox {
    constructor() {
        this.$lightbox = document.querySelector('.lightbox');
        this.$lightboxImage  = document.querySelector('.lightbox__image');
        this.$closeBtn = document.querySelector('.lightbox__close');

        this.bindEvents();
    }

    show(photo_path) {
        this.$lightboxImage.src = photo_path;
        this.$lightbox.classList.remove('hidden');
    }

    close() {
        this.$lightbox.classList.add('hidden');
    }

    listenPointerDown(action) {
        this.$lightboxImage.addEventListener('pointerdown', action);
    }

    listenPointerUp(action) {
        this.$lightboxImage.addEventListener('pointerup', action);
    }

    prepare(photo1, photo2) {}

    bindEvents() {
        this.$closeBtn.addEventListener('click', e => {this.close()});
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
        this.$lightbox.addEventListener('click', e => {
            if (e.target === this.$lightbox) {
                this.close();
            }
        });


    }
}
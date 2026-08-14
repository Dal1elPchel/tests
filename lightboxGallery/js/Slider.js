export class Slider {
    constructor(photoList, lightbox) {
        this.photoList = photoList;
        this.lightbox = lightbox;
        this.currentIndex = 0;

        this.$backBtn = document.querySelector('.lightbox__back');
        this.$nextBtn = document.querySelector('.lightbox__next');

        this.bindEvents();
    }

    setCurrentIndex(index) {
        if (index >= 0 && index < this.photoList.length) this.currentIndex = index;
        this.showCurrent();
    }

    showCurrent() {
        this.lightbox.show(this.photoList[this.currentIndex]);
    }

    next() {
        let nextIndex = this.currentIndex + 1;
        if (nextIndex >= this.photoList.length) {
            this.currentIndex = 0;
        } else {
            this.currentIndex = nextIndex;
        }

        return this;
    }

    prev() {
        let prevIndex = this.currentIndex - 1;
        if (prevIndex < 0) {
            this.currentIndex = this.photoList.length - 1;
        } else {
            this.currentIndex = prevIndex;
        }

        return this;
    }

    bindEvents() {
        this.$backBtn.addEventListener('click', (e) => {
            this.prev().showCurrent();
        });
        this.$nextBtn.addEventListener('click', (e) => {
            this.next().showCurrent();
        });
        this.lightbox.listenPointerDown((e) => {
            this.startX = e.clientX;
        });
        this.lightbox.listenPointerUp((e) => {
            const distance = this.startX - e.clientX;
            if (Math.abs(distance) < 150) return 0;
            if (distance < 0) this.prev().showCurrent();
            else this.next().showCurrent();
        });
    }
}
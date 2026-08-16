export class Slider {
    constructor(photoList, lightbox) {
        this.photoList = photoList;
        this.lightbox = lightbox;
        this.currentIndex = 0;
        this.isAnimating = false;

        this.$backBtn = document.querySelector('.lightbox__back');
        this.$nextBtn = document.querySelector('.lightbox__next');

        this.bindEvents();
    }

    openLightBox(index) {
        this.setCurrentIndex(index);
        this.lightbox.show();
    }

    setCurrentIndex(index) {
        if (index < 0 || index >= this.photoList.length) return;

        this.currentIndex = index
        this.lightbox.setImages([
            this.photoList[this.getPrevIndex()],
            this.photoList[this.currentIndex],
            this.photoList[this.getNextIndex()],
        ]);
    }

    getNextIndex() {
        const nextIndex = this.currentIndex + 1;
        if (nextIndex >= this.photoList.length) {
            return 0;
        } else {
            return nextIndex;
        }
    }

    getPrevIndex() {
        const prevIndex = this.currentIndex - 1;
        if (prevIndex < 0) {
            return this.photoList.length - 1;
        } else {
            return prevIndex;
        }
    }

    async next() {
        if (this.isAnimating) return;

        this.isAnimating = true;
        await this.lightbox.animate(true);
        this.setCurrentIndex(this.getNextIndex());
        this.lightbox.resetTrack();

        this.isAnimating = false;

        return this;
    }

    async prev() {
        if (this.isAnimating) return;

        this.isAnimating = true;
        await this.lightbox.animate(false);
        this.setCurrentIndex(this.getPrevIndex());
        this.lightbox.resetTrack();

        this.isAnimating = false;

        return this;
    }

    bindEvents() {
        this.$backBtn.addEventListener('click', (e) => {
            this.prev();
        });
        this.$nextBtn.addEventListener('click', (e) => {
            this.next();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prev();
            }
            else if (e.key === 'ArrowRight') {
                this.next();
            }
        });
        this.lightbox.listenPointerDown((e) => {
            this.startX = e.clientX;
            this.startY = e.clientY;
        });
        this.lightbox.listenPointerMove((e) => {
            let distance = e.clientX - this.startX;
            this.lightbox.setTransition("none");
            this.lightbox.moveX(distance);
        });
        this.lightbox.listenPointerUp((e) => {
            this.lightbox.setTransition("transform .2s ease-in-out");
            const distance = this.startX - e.clientX;
            if (Math.abs(distance) < 70) {
                this.lightbox.resetTrack(true);
                return;
            }
            if (distance < 0) this.prev();
            else this.next();
        });
    }
}
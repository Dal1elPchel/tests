
export class Downloader {
    constructor(slider) {
        this.$downloadBtn = document.querySelector(".lightbox__download");
        this.slider = slider;

        this.bindEvents();
    }

    download() {
        const photo = this.slider.getCurrentPhoto();
        const link = document.createElement("a");
        link.href = photo;
        link.download = photo;
        link.click();
    }

    bindEvents() {
        this.$downloadBtn.addEventListener("click", (e) => {
            this.download();
        });
    }
}
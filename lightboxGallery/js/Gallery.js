export class Gallery {
    constructor(photo_list) {
        this.photo_list = photo_list || [];
        this.$gallery = document.querySelector('.gallery');
    }

    render() {
        this.photo_list.forEach((photo, index) => {
            let newPhoto = document.createElement("img");
            newPhoto.src = photo;
            newPhoto.alt = "";
            newPhoto.dataset.index = index.toString();
            this.$gallery.appendChild(newPhoto);
        })
    }

    bindEvents(slider) {
        this.$gallery.addEventListener('click', (e) => {
            if (e.target.tagName !== 'IMG') {
                return 0;
            }

            slider.setCurrentIndex(Number(e.target.dataset.index));
        });
    }
}
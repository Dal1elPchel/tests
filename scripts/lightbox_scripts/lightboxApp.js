import {Gallery} from "./Gallery.js";
import {Lightbox} from "./Lightbox.js";
import {Slider} from "./Slider.js";
import {Downloader} from "./Downloader.js";

const GALLERY_LIST = []

for (let i = 1; i <= 15; i++) {
    GALLERY_LIST.push(`../assets/lightbox/${i}.jpg`);
}

const lightboxApp = new Lightbox();

const gallery = new Gallery(GALLERY_LIST);

const slider = new Slider(GALLERY_LIST, lightboxApp);

const downloader = new Downloader(slider);
gallery.render();
gallery.bindEvents(slider);
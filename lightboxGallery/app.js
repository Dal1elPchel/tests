import {Gallery} from "./js/Gallery.js";
import {Lightbox} from "./js/Lightbox.js";
import {Slider} from "./js/Slider.js";

const GALLERY_LIST = []

for (let i = 1; i <= 15; i++) {
    GALLERY_LIST.push(`./assets/${i}.jpg`);
}

const lightbox = new Lightbox();

const gallery = new Gallery(GALLERY_LIST);

const slider = new Slider(GALLERY_LIST, lightbox);

gallery.render();
gallery.bindEvents(slider);
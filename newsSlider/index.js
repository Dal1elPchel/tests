
class Slider {
    constructor(state) {
        this.state = {
            ...state,
            images: state.images || ["assets/1.png", "assets/2.png", "assets/3.png"],
            currentIndex: state.currentIndex || 0
        }
        this.isAnimating = false;

        this.$backBtn = document.getElementById("backBtn");
        this.$forwardBtn = document.getElementById("forwardBtn");
        this.$currentSlide = document.getElementById("currentSlide");
        this.$nextSlide = document.getElementById("nextSlide");
        this.$sliderInner = document.querySelector(".slider__inner");

        this.#render();
        this.#listen();
        this.#autoScroll();
    }

    #render() {
        this.$currentSlide.src = this.state.images[this.state.currentIndex];
    }
    clickBtn(direction) {
        clearTimeout(this.autoScrollInterval);
        if (direction) this.showNext();
        else this.showPrev();
        this.#autoScroll();
    }

    #listen() {
        this.showNext = this.showNext.bind(this);
        this.showPrev = this.showPrev.bind(this);

        this.$forwardBtn.addEventListener("click", () => {this.clickBtn(true)});
        this.$backBtn.addEventListener("click", () => {this.clickBtn(false)});
    }

    getNextIndex() {
        let nextIndex = this.state.currentIndex + 1;

        if (nextIndex >= this.state.images.length) {
            nextIndex = 0;
        }

        return nextIndex;
    }

    getPrevIndex() {
        let nextIndex = this.state.currentIndex - 1;

        if (nextIndex < 0) {
            nextIndex = this.state.images.length - 1;
        }

        return nextIndex;
    }

    #animate(nextIndex, direction) {
        this.isAnimating = true;
        this.$nextSlide.style.transition = "none";
        this.$nextSlide.style.transform = direction
            ? "translateX(100%)"
            : "translateX(-100%)";

        this.$nextSlide.src = this.state.images[nextIndex];

        this.$nextSlide.offsetWidth;

        this.$nextSlide.style.transition = "";

        requestAnimationFrame(() => {
            this.$currentSlide.style.transform = direction
                ? "translateX(-100%)"
                : "translateX(100%)";

            this.$nextSlide.style.transform = "translateX(0)";
        });

        this.$nextSlide.addEventListener("transitionend", () => {
            const newSrc = this.$nextSlide.src;

            this.$currentSlide.style.transition = "none";
            this.$nextSlide.style.transition = "none";

            this.$currentSlide.style.transform = "translateX(0)";
            this.$nextSlide.style.transform = direction
                ? "translateX(100%)"
                : "translateX(-100%)";

            this.$currentSlide.src = newSrc;

            this.$currentSlide.offsetWidth;
            this.$nextSlide.offsetWidth;

            this.$currentSlide.style.transition = "";
            this.$nextSlide.style.transition = "";
            this.isAnimating = false;
        }, { once: true });
    }

    showNext() {

        if (this.isAnimating) {
            return;
        }

        const nextIndex = this.getNextIndex();

        this.#animate(nextIndex, true);

        this.state = {
            ...this.state,
            currentIndex: nextIndex,
        }
    }

    showPrev() {

        if (this.isAnimating) {
            return;
        }
        const nextIndex = this.getPrevIndex();

        this.#animate(nextIndex, false);
        this.state = {
            ...this.state,
            currentIndex: nextIndex,
        }

    }

    #animateProgress() {
        // мгновенно сбрасываем
        this.$sliderInner.style.setProperty("--progress-transition", "0s");
        this.$sliderInner.style.setProperty("--progress", "0%");

        this.$sliderInner.offsetWidth;

        // включаем плавность
        this.$sliderInner.style.setProperty("--progress-transition", "3s");

        requestAnimationFrame(() => {
            this.$sliderInner.style.setProperty("--progress", "100%");
        });
    }

    #autoScroll() {
        this.#animateProgress();
        this.autoScrollInterval = setTimeout(() => {
            this.showNext();
            this.#autoScroll();
        }, 3000);


    }
}

const slider = new Slider({});
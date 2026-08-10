function getTemplate(state) {
    return `
    <div class="slider__before" style="width: ${state.width}px">
            <div class="slider__resize" data-type="resize"></div>
        </div>
        <div class="slider__after"></div>
    `;
}

class Slider {
    constructor(selector, state) {
        this.$slider = document.getElementById(selector);
        this.state = {
            ...state,
            width: state.width || 797/2,
        };
        this.#render(this.state);
        this.#listen();
    }

    #render(state) {
        this.$slider.innerHTML = getTemplate(state);
    }

    #listen() {
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);

        this.$slider.addEventListener('mousedown', this.mouseDownHandler);
        this.$slider.addEventListener('mouseup', this.mouseUpHandler);
    }

    #update(props) {
        this.state = {
            ...this.state,
            ...props,
        }

        this.#render(this.state);
    }

    mouseDownHandler(event) {
        if (event.target.dataset.type === 'resize') {
            this.$slider.addEventListener('mousemove', this.mouseMoveHandler);
        }
        this.pointX = event.clientX;
    }

    mouseUpHandler(event) {
        this.$slider.removeEventListener('mousemove', this.mouseMoveHandler);
    }

    mouseMoveHandler(event) {
        let newPoint = event.clientX - this.pointX;
        this.#update({width: this.state.width + newPoint});
        this.pointX = event.clientX;
    }
}

const slider = new Slider("slider", {});
class Element {
    constructor(selector) {
        this.element = this._getElement(selector);
        this.pageX = 0;
        this.currYDeg = 0;
        this._rotate = this._rotate.bind(this);
        this._removeDraggable = this._removeDraggable.bind(this);
    }

    _getElement(query) {
        return document.querySelector(query);
    }

    setStyle(styleObj) {
        for (const key of Object.keys(styleObj)) {
            this.element.style[key] = styleObj[key];
        }

        return this;
    }

    _rotate({ pageX }) {
        if (pageX === this.pageX) return;

        this.currYDeg = pageX > this.pageX ? this.currYDeg - 2 : this.currYDeg + 2;
        this.setStyle({ transform: `rotateY(${this.currYDeg % 360}deg)` });
        this.pageX = pageX;
    }

    _removeDraggable() {
        document.removeEventListener('mousemove', this._rotate);
        this.element.onmouseup = null;
    }

    setDraggable() {
        this.element.style.cursor = 'col-resize';
        this.element.addEventListener('mousedown', () => {
            document.addEventListener('mousemove', this._rotate);
            this.element.addEventListener('mouseup', this._removeDraggable);
            this.element.addEventListener('mouseleave', this._removeDraggable);
        });

        return this;
    }
}

const cube = new Element('.cube').setDraggable();

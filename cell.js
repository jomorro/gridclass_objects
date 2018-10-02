function Cell(config) {

    this.config = config;
    this.rowIndex = config.rowIndex;
    this.columnIndex = config.columnIndex;

    this.createElement();

}

Cell.prototype = {

    createElement: function () {
        this.element = document.createElement("div");
        this.element.dataset.rowIndex = this.rowIndex;
        this.element.dataset.columnIndex = this.columnIndex;
        this.element.classList.add("cell");
        this.element.style.height = this.config.height;
        this.element.style.width = this.config.width;
        this.element.addEventListener("click", this.changeColor);
    },

    changeColor: function () {
        this.style.background = "red";
    },
}

Cell.prototype.constructor = Cell;
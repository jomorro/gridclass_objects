function Grid(config) {
    this.config = config;

    if (!this.config.offsets) {
        this.config.offsets = {
            top: [-1, 0],
            topRight: [-1, 1],
            right: [0, 1],
            bottomRight: [1, 1],
            bottom: [1, 0],
            bottomLeft: [1, -1],
            left: [0, -1],
            topLeft: [-1, -1],
        }
    }

    this.createGrid();
    this.fillGrid();
    this.displayGrid();

}

Grid.prototype = {

    createGrid: function () {
        this.gridArray = new Array(this.config.rowCount).fill()
            .map(() => new Array(this.config.columnCount).fill())

        this.createGridElement();
    },

    createGridElement: function () {
        this.element = document.createElement("div");
        this.element.classList.add("grid");
        this.element.id = this.config.gridId;
    },

    fillGrid: function () {
        this.cellArray = [];

        for (let rowIndex = 0; rowIndex < this.config.rowCount; rowIndex++) {

            const row = this.gridArray[rowIndex];
            this.createRowElement(row);
            this.cellArray.push([])

            for (let columnIndex = 0; columnIndex < this.config.columnCount; columnIndex++) {

                const cellConfig = {
                    rowIndex,
                    columnIndex,
                    height: this.config.cellHeight,
                    width: this.config.cellWidth,
                }

                const cell = row[columnIndex] = new Cell(cellConfig);
                row.element.appendChild(cell.element);
                this.cellArray[rowIndex].push(cell)
            }

            this.element.appendChild(row.element);

        }
    },

    findNeighborCells: function (cell) {
        cell.neighborCellArray = []
        Object.values(this.offsets).forEach((offset) => {
            const [rowOffset, colOffset] = offset;
            const neighborRowIndex = cell.rowIndex + rowOffset;
            const neighborColumnIndex = cell.columnIndex + colOffset;
            const neighborCell = this.findCellByIndexes(neighborRowIndex, neighborColumnIndex)

            if (neighborCell) {
                cell.neighborCellArray.push(neighborCell)
            }
        })
    },

    createRowElement: function (row) {
        row.element = document.createElement("div");
        row.element.classList.add("row");
    },

    displayGrid: function () {
        this.config.parentElement.appendChild(this.element);
    },

    findCellByIndexes: function (rowIndex, columnIndex) {
        const row = this.gridArray[rowIndex]
        return row && row[columnIndex];
    },


}

Grid.prototype.constructor = Grid;
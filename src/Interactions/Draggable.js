class Draggable {
    constructor() {

    }

    DragStart() {
        console.log("Start drag");
    }

    DragMove(position) {
        console.log("Move drag", position, this);
    }

    DragEnd() {
        console.log("End drag");
    }


}
export default Draggable
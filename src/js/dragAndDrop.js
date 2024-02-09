let selectedPuzzle = "img1";

// Restart the puzzle.
// Can also change the puzzle images
// based on the selected option.
function restartPuzzle() {
    selectedPuzzle = document.getElementById("puzzle-select").value;
    let imagesDiv = document.getElementById("images");
    let puzzleDiv = document.getElementById("puzzle");

    // Remove existing images
    while (imagesDiv.firstChild) {
        imagesDiv.removeChild(imagesDiv.firstChild);
    }

    // Remove completed image from puzzle div
    while (puzzleDiv.firstChild) {
        puzzleDiv.removeChild(puzzleDiv.firstChild);
    }

    // Move puzzle container to right
    document.getElementById('game').className = "d-flex flex-wrap justify-content-around flex-row";

    // Add empty puzzle pieces back inside puzzle div
    for (let i = 0; i < 3; i++) {
        let divRow = document.createElement("div");
        divRow.className = "row";
        for (let j = 0; j < 3; j++) {
            let divSquare = document.createElement("div");
            divSquare.id = "div" + (i + j * 3 + 1);
            divSquare.className = "col-4";
            divSquare.ondrop = drop;
            divSquare.ondragover = allowDrop;
            divRow.appendChild(divSquare);
        }
        puzzleDiv.appendChild(divRow);
    }

    // Remove the message of completion if it exists.
    document.getElementById("completion-message").innerHTML = "";

    // Load images for the selected puzzle
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let img = document.createElement("img");
            img.id = "drag" + (i + j * 3 + 1);
            img.alt = "drag" + (i + j * 3 + 1);
            img.src = "./assets/splitted/" + selectedPuzzle + "/" + i + j + ".jpg";
            img.draggable = true;
            img.ondragstart = drag;
            imagesDiv.appendChild(img);
        }
    }
}

function checkPuzzle() {
    let puzzlePieces = document.querySelectorAll('#puzzle div div');
    let correct = true;

    puzzlePieces.forEach(function (piece, index) {
        // console.log(piece.firstElementChild.id);
        // console.log(index+1);
        if (piece.firstElementChild.id !== ('drag' + (index + 1))) {
            correct = false;
        }
    });
    // console.log(correct);

    if (correct) {
        document.getElementById("completion-message").innerHTML = "<p>Congratulations! You've completed the puzzle!</p>";
        document.getElementById("completion-message").firstChild.className = "alert alert-success m-3";
        document.getElementById("completion-message").firstChild.role = "alert";
        document.getElementById("puzzle").innerHTML = "<img id='img-completed' alt='img-completed' src='./assets/original/" + selectedPuzzle + ".jpg'>";
        document.getElementById('game').className = "d-flex flex-wrap justify-content-around flex-column";
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let targetElement = ev.target;
    
    // Check if the target element is an image
    // Otherwise, the puzzle piece is dropped inside the image
    if (targetElement.tagName.toLowerCase() !== 'img') {
        // Check if the target div already has a puzzle piece
        if (targetElement.childElementCount === 0) {
            targetElement.appendChild(document.getElementById(data));

            // Check if the puzzle is complete after each drop
            checkPuzzle();
        }
    }
}

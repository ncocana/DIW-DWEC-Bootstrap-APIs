let selectedPuzzle="img1";function restartPuzzle(){selectedPuzzle=document.getElementById("puzzle-select").value;for(var l=document.getElementById("images"),e=document.getElementById("puzzle");l.firstChild;)l.removeChild(l.firstChild);for(;e.firstChild;)e.removeChild(e.firstChild);document.getElementById("game").className="d-flex flex-wrap justify-content-around flex-row";for(let t=0;t<3;t++){var d=document.createElement("div");d.className="row";for(let e=0;e<3;e++){var a=document.createElement("div");a.id="div"+(t+3*e+1),a.className="col-4",a.ondrop=drop,a.ondragover=allowDrop,d.appendChild(a)}e.appendChild(d)}document.getElementById("completion-message").innerHTML="";for(let t=0;t<3;t++)for(let e=0;e<3;e++){var n=document.createElement("img");n.id="drag"+(t+3*e+1),n.alt="drag"+(t+3*e+1),n.src="./assets/splitted/"+selectedPuzzle+"/"+t+e+".jpg",n.draggable=!0,n.ondragstart=drag,l.appendChild(n)}}function checkPuzzle(){var e=document.querySelectorAll("#puzzle div div");let l=!0;e.forEach(function(e,t){e.firstElementChild.id!=="drag"+(t+1)&&(l=!1)}),l&&(document.getElementById("completion-message").innerHTML="<p>Congratulations! You've completed the puzzle!</p>",document.getElementById("completion-message").firstChild.className="alert alert-success m-3",document.getElementById("completion-message").firstChild.role="alert",document.getElementById("puzzle").innerHTML="<img id='img-completed' alt='img-completed' src='./assets/resized/"+selectedPuzzle+".jpg'>",document.getElementById("game").className="d-flex flex-wrap justify-content-around flex-column")}function allowDrop(e){e.preventDefault()}function drag(e){e.dataTransfer.setData("text",e.target.id)}function drop(e){e.preventDefault();var t=e.dataTransfer.getData("text"),e=e.target;"img"!==e.tagName.toLowerCase()&&0===e.childElementCount&&(e.appendChild(document.getElementById(t)),checkPuzzle())}
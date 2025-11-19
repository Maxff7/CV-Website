var modal = document.getElementById("info-modal");
var closeButton = document.getElementById("close-info-modal");

closeButton.onclick = CloseModal;
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function OpenModal() {
    modal.style.display = "flex";
}

function CloseModal() {
    modal.style.display = "none";
}

function UseProjectData(data) {
    var infoArray = data.projects;
    console.log("InfoArray", infoArray)
    var buttonArray = [];

    var container = document.getElementById("projects-container")

    for (var i = 0; i < infoArray.length; ++i) {
        var buttonDiv = document.createElement('button');
        buttonDiv.id = 'project-button' + i;
        buttonDiv.className = 'project-box';

        var imageObject = document.createElement('img');
        imageObject.src = infoArray[i]["project-image-url"];
        imageObject.id = 'project-image' + i;

        var titleDiv = document.createElement('div');
        titleDiv.id = 'title-div' + i;
        titleDiv.className = 'title-text';
        titleDiv.innerHTML = infoArray[i]["project-name"];

        buttonDiv.appendChild(imageObject);
        buttonDiv.appendChild(titleDiv);

        buttonDiv.onclick = function() {
            OpenModal();
        };

        buttonArray.push(buttonDiv);

        container.appendChild(buttonDiv);
    }
}

fetch('./Projects.json')
    .then(response => response.json())
    .then(data => {
        console.log("Data", data);
        UseProjectData(data);
    }).catch(error => console.error("Error loading JSON:", error));
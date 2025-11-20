var modal = document.getElementById("info-modal");
var modalContent = document.getElementById("modal-info-content");
var closeButton = document.getElementById("close-info-modal");

closeButton.onclick = CloseModal;
window.onclick = function (event) {
    if (event.target == modal) {
        CloseModal();
    }
}

function OpenModal(infoArray) {
    console.log(infoArray);

    modal.style.display = "flex";
    modalContent.innerHTML = null;

    // Add Title
    var modalTitleDiv = document.createElement('div');
    modalTitleDiv.className = 'modal-title';
    modalTitleDiv.innerHTML = infoArray["project-name"];

    // Add Description
    var modalDescDiv = document.createElement('div');
    modalDescDiv.className = 'modal-description';
    modalDescDiv.innerHTML = infoArray["description"];

    // Add Images
    var modalImage1 = document.createElement('img');
    modalImage1.src = infoArray["modal-image-url-1"]
    modalImage1.className = 'modal-image-1';
    
    var modalImage2 = document.createElement('img');
    modalImage2.src = infoArray["modal-image-url-2"]
    modalImage2.className = 'modal-image-2';

    // Add to modal content
    modalContent.appendChild(modalTitleDiv);
    modalContent.appendChild(modalDescDiv);
    modalContent.appendChild(modalImage1);
    modalContent.appendChild(modalImage2);
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
        // Add button for project
        var buttonDiv = document.createElement('button');
        buttonDiv.id = 'project-button' + i;
        buttonDiv.className = 'project-box';

        // Add project image
        var imageObject = document.createElement('img');
        imageObject.src = infoArray[i]["project-image-url"];
        imageObject.id = 'project-image' + i;

        // Add button title
        var titleDiv = document.createElement('div');
        titleDiv.id = 'title-div' + i;
        titleDiv.className = 'title-text';
        titleDiv.innerHTML = infoArray[i]["project-name"];

        // Add project type
        var typeDiv = document.createElement('div');
        typeDiv.id = 'type-div' + i;
        typeDiv.className = 'project-type';
        typeDiv.innerHTML = infoArray[i]["project-type"];

        buttonDiv.appendChild(imageObject);
        buttonDiv.appendChild(titleDiv);
        buttonDiv.appendChild(typeDiv);

        buttonDiv.projectInfo = infoArray[i]

        buttonDiv.onclick = function() {
            OpenModal(this.projectInfo);
        }

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
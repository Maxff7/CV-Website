var modal = document.getElementById("info-modal");
var modalContent = document.getElementById("modal-info-content");
var closeButton = document.getElementById("close-info-modal");

closeButton.onclick = CloseModal;
window.onclick = function (event) {
    if (event.target == modal) {
        CloseModal();
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function OpenModal(infoArray) {
    console.log(infoArray);

    modal.style.display = "flex";
    modalContent.innerHTML = "";

    // Title always exists
    var modalTitleDiv = document.createElement("div");
    modalTitleDiv.className = "modal-title";
    modalTitleDiv.innerHTML = infoArray["project-name"];
    modalContent.appendChild(modalTitleDiv);

    // Description
    if (infoArray["description"] && infoArray["description"].trim() !== "") {
        var modalDescDiv = document.createElement("div");
        modalDescDiv.className = "modal-description";
        modalDescDiv.innerHTML = infoArray["description"];
        modalContent.appendChild(modalDescDiv);
    }

    // Image 1
    if (infoArray["modal-image-url-1"] && infoArray["modal-image-url-1"] !== "") {
        var img1 = document.createElement("img");
        img1.src = infoArray["modal-image-url-1"];
        img1.className = "modal-image-1";
        modalContent.appendChild(img1);
    }

    // Image 2
    if (infoArray["modal-image-url-2"] && infoArray["modal-image-url-2"] !== "") {
        var img2 = document.createElement("img");
        img2.src = infoArray["modal-image-url-2"];
        img2.className = "modal-image-2";
        modalContent.appendChild(img2);
    }

    // Links GitHub And Itch
    if (
        (infoArray["github-url"] && infoArray["github-url"] !== "") ||
        (infoArray["itch-url"] && infoArray["itch-url"] !== "")
    ) {
        var linkContainer = document.createElement("div");
        linkContainer.className = "modal-links";

        if (infoArray["github-url"]) {
            var gitBtn = document.createElement("a");
            gitBtn.href = infoArray["github-url"];
            gitBtn.target = "_blank";
            gitBtn.className = "modal-link-button";
            gitBtn.innerHTML = "Check out the Git";
            linkContainer.appendChild(gitBtn);
        }

        if (infoArray["itch-url"]) {
            var itchBtn = document.createElement("a");
            itchBtn.href = infoArray["itch-url"];
            itchBtn.target = "_blank";
            itchBtn.className = "modal-link-button";
            itchBtn.innerHTML = "Test the Project";
            linkContainer.appendChild(itchBtn);
        }

        modalContent.appendChild(linkContainer);
    }
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
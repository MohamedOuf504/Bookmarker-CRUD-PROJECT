var bookmarkerInput = document.getElementById("siteNameInput");
var urlInput = document.getElementById("urlInput");
var mainBtn = document.getElementById("main-btn");

var bookmarkerContainer = [];
if (localStorage.getItem("bookmarker") != null) {
    bookmarkerContainer = JSON.parse(localStorage.getItem("bookmarker"));
    display();
} else {
    var bookmarkerContainer = [];
}




function addmarker() {
    var markerValue = bookmarkerInput.value;
    var urlValue = urlInput.value;

    var onebookmarker = {
        bookmarker: markerValue,
        url: urlValue,
    };
    bookmarkerContainer.push(onebookmarker);
    localStorage.setItem("bookmarker", JSON.stringify(bookmarkerContainer));
}




mainBtn.onclick = function () {
    addmarker();
    resetInput();
    display();
    color();
};

function color() {
    mainBtn.classList.remove("btn-danger");
    mainBtn.classList.add("btn-success");
}

bookmarkerInput.onkeypress = function () {
    mainBtn.classList.add("btn-danger");
    mainBtn.classList.remove("btn-success");
};

function display() {
    var allmarker = "";
    for (var i = 0; i < bookmarkerContainer.length; i++) {
        allmarker += `
            <div class=" position-relative bookmark-obj  border d-flex  flex-md-row flex-column justify-content-between justify-content-center align-items-center" >
            <div class="id position-absolute translate-middle">
                                    <h3 class="text-center" >
                                        ${i + 1}
                                    </h3>
                            </div>
                            <div class="mx-2">
                                <h5 class="text-white  p-md-4   ">${bookmarkerContainer[i].bookmarker
            }</h5>
                            </div>
                            <div class="ps-sm-5" >
                                <i id="del-btn" onclick="deleteMarker(${i}) "  class="       fs-2    btn  btn-danger far fa-trash-alt"></i> 
                                <i  id="update-btn" onclick="update(${i}) "     class="           fs-2     btn btn-primary  far fa-edit"></i> 
                                <a href="${bookmarkerContainer[i].url}" target="_blank"> <i class=" me-2   fs-2   btn btn-success fas fa-external-link-alt"></i></a>

                            </div>
                            </div>`;
    }
    document.getElementById("place-print").innerHTML = allmarker;
}
function resetInput() {
    bookmarkerInput.value = "";
    urlInput.value = "";
}

function deleteMarker(index) {
    bookmarkerContainer.splice(index, 1);
    localStorage.setItem("bookmarker", JSON.stringify(bookmarkerContainer));
    display();
}

function searchMarker(val) {
    var allmarker = "";

    for (var i = 0; i < bookmarkerContainer.length; i++) {
        if (bookmarkerContainer[i].bookmarker.toLowerCase().includes(val.toLowerCase()))
        {
        allmarker += `
        <div class=" position-relative bookmark-obj  border d-flex  flex-md-row flex-column justify-content-between justify-content-center align-items-center" >
        <div class="id position-absolute translate-middle-x">
                                <h3 class="text-center" >
                                    ${i + 1}
                                </h3>
                        </div>
                        <div class="mx-2">
                            <h5 class="text-white  p-4 ">${bookmarkerContainer[i].bookmarker}</h5>
                        </div>
                        <div class="ps-sm-5" >
                            <i id="del-btn" onclick="deleteMarker(${i}) "  class="       fs-2    btn  btn-danger far fa-trash-alt"></i> 
                            <i  id="update-btn" onclick="update(${i}) "     class="           fs-2     btn btn-primary  far fa-edit"></i> 
                            <a href="${bookmarkerContainer[i].url}" target="_blank"> <i class=" me-2   fs-2   btn btn-success fas fa-external-link-alt"></i></a>

                        </div>
                        </div>`;
        }
    }
document.getElementById("place-print").innerHTML = allmarker;
    }
function update(index) {
    bookmarkerInput.value = bookmarkerContainer[index].bookmarker;
    urlInput.value = bookmarkerContainer[index].url;
    mainBtn.innerHTML = "Up date";
    mainBtn.classList.remove("btn-danger");
    mainBtn.classList.remove("btn-success");
    mainBtn.classList.add("btn-primary");
    mainBtn.setAttribute("onclick", "updatemarker(" + index + ")");
    
}

function updatemarker(index) {
    bookmarkerContainer[index].bookmarker = bookmarkerInput.value;
    bookmarkerContainer[index].url = urlInput.value;
    localStorage.setItem("bookmarker", JSON.stringify(bookmarkerContainer));
    resetInput();
    display();
    mainBtn.innerHTML = "Add Marker";
    mainBtn.classList.remove("btn-primary");
    mainBtn.classList.add("btn-success");
}



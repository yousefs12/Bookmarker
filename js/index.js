var siteCode = document.querySelector("#siteCode")
var siteName = document.querySelector("#siteName");
var siteUrl = document.querySelector("#siteUrl");
var validUrl = document.querySelector("#validUrl")
var invalidUrl = document.querySelector("#invalidUrl")
var invalidName = document.querySelector("#invalidName")
var submitFormBtn = document.querySelector("#submitFormBtn");
var updateFormBtn = document.querySelector("#updateFormBtn");
var cancelFormBtn = document.querySelector("#cancelFormBtn")
var bookmarkerContent = document.querySelector("#bookmarkerContent");
var bookmarks = [];

var urlPattern = /^www\.\w{5,20}\.com$/i;

siteName.addEventListener("input", validatingName);
siteUrl.addEventListener("input", validatingUrl);
submitFormBtn.addEventListener("click", addBookmark);
updateFormBtn.addEventListener("click", updateBookmark);
cancelFormBtn.addEventListener("click", cancelUpdate);


// Checking Local Storage
if (localStorage.getItem("bookmarks")){
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks(bookmarks);
}

// Validation Inputs
function validatingName(){
    if (siteName.value){
        invalidName.classList.replace("d-block", "d-none");
        return true;
    } else {
        invalidName.classList.replace("d-none", "d-block");
    }
}

function validatingUrl(){
    if (urlPattern.test(siteUrl.value)){
        validUrl.classList.replace("d-none", "d-block");
        invalidUrl.classList.replace("d-block", "d-none");
        return true;

    } else {
        invalidUrl.classList.replace("d-none", "d-block");
        validUrl.classList.replace("d-block", "d-none");
    }
}

function validation(){
    var name = validatingName();
    var url = validatingUrl();

    if(name && url){
        return true;
    }
}

// Clearing The Form
function clearForm(){
    siteCode.value = "";
    siteName.value = "";
    siteUrl.value = "";
    invalidUrl.classList.replace("d-block", "d-none");
    validUrl.classList.replace("d-block", "d-none");
}

//Displaying The Bookmarks
function displayBookmarks(arr){
    var $bookmarks = ``;
    for (var i = 0; i < arr.length; i++){
        $bookmarks += `
            <div class="bookmark p-2 mx-5 border-bottom border-1">
                <span class="d-inline-block w-25">${arr[i].name}</span>
                <button class="btn btn-primary">
                    <a href="https://${arr[i].url}" class="text-white text-decoration-none">Visit</a>
                </button>
                <button onclick="readyToUpdate(${i})" class="btn btn-info text-white">Update</button>
                <button onclick="deleteBookmark(${i})" class="btn btn-danger">Delete</button>
            </div>`
    }
    bookmarkerContent.innerHTML = $bookmarks;
}

// Adding Bookmarks
function addBookmark(){
    if (validation()){
        var $bookmark = {
            name: siteName.value,
            url: siteUrl.value
        }
        bookmarks.push($bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        displayBookmarks(bookmarks);
        clearForm();
    }
}

// Deleting Bookmarks
function deleteBookmark(i){
    bookmarks.splice(i, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks(bookmarks);
}

//Updating Bookmark Button
function readyToUpdate(i){
    siteName.value = bookmarks[i].name;
    siteUrl.value = bookmarks[i].url;
    siteCode.value = i;

    submitFormBtn.classList.replace("d-inline-block", "d-none");
    updateFormBtn.classList.replace("d-none", "d-inline-block");
    cancelFormBtn.classList.replace("d-none", "d-inline-block");
}

// Updating Form Button
function updateBookmark(){
    bookmarks[siteCode.value].name = siteName.value;
    bookmarks[siteCode.value].url = siteUrl.value;
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks(bookmarks);
    clearForm();
    submitFormBtn.classList.replace("d-none", "d-inline-block");
    updateFormBtn.classList.replace("d-inline-block", "d-none");
    cancelFormBtn.classList.replace("d-inline-block", "d-none");
}

// Canceling Update Form Button
function cancelUpdate(){
    clearForm();
    submitFormBtn.classList.replace("d-none", "d-inline-block");
    updateFormBtn.classList.replace("d-inline-block", "d-none");
    cancelFormBtn.classList.replace("d-inline-block", "d-none");
}
// listen for form submit
document.querySelector('#myForm').addEventListener('submit', saveBookmark);
window.addEventListener('load',fetchBookmarks);
document.querySelector('#bookmarkResults').addEventListener('click', e => e.target.id === 'deleteBookmark' ? deleteBookmark(e) : false ); 

function saveBookmark(e){
    e.preventDefault();

    const siteName = document.querySelector('#siteName').value;
    const siteUrl= document.querySelector('#siteUrl').value;

    if(!validateForm(siteName,siteUrl)) {
        return false
    }

    let bookmark = {
        name : siteName,
        url : siteUrl
    }

    if(localStorage.getItem('bookmarks') === null) {
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }

    document.querySelector('#myForm').reset();

    fetchBookmarks();
}

function deleteBookmark(e) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let current_item = e.target.dataset.value;

    bookmarks.splice(current_item,1);

    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    fetchBookmarks();
}

function fetchBookmarks() {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        const bookmarkResult = document.querySelector('#bookmarkResults');
        
        bookmarkResult.innerHTML = ``;
        for(let i = 0; i < bookmarks.length; i++) {
            let name = bookmarks[i].name;
            let url = bookmarks[i].url;

            bookmarkResult.innerHTML += `
            <div class="rounded-3 bg-light p-3">
                <h3 class="mb-0"> ${name}
                    <a href="${url}" class="btn btn-info text-white" target="_blank">Visit</a>
                    <a href="#" id="deleteBookmark" class="btn btn-danger" data-value="${i}">Remove</a>
                </h3>
            </div>`;
        }
}

function validateForm(siteName,siteUrl) {
    let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if(!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    if(!(siteUrl.match(regex))) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}
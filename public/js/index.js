const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653'

function addBookmarkFetch(title, description, burl, rating) {
    let url = '/bookmarks';
    let data = {
        title : title,
        description : description,
        url : burl,
        rating : Number(rating)
    }
    console.log(API_TOKEN);
    let settings = {
        method : 'POST',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }
    
    let results = document.querySelector('.results');

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })

        .then( responseJSON => {
            fetchBookmarks();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}

function fetchBookmarks() {
    let url = '/bookmarks';
    let settings = {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`
        }
    }
    let results = document.querySelector( '.results' );
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            results.innerHTML = "";
            for ( let i = 0; i < responseJSON.length; i ++ ){
                document.querySelector(".results").innerHTML += `
                    <div class="bookmark">
                        <p>
                            ID: ${responseJSON[i].id}
                        </p>
                        <p>
                            Title: ${responseJSON[i].title}
                        </p>
                        <p>
                            Description: ${responseJSON[i].description}
                        </p>
                        <p>
                            URL: ${responseJSON[i].url}
                        </p>
                        <p>
                            Rating: ${responseJSON[i].rating}
                        </p>
                    </div>`;
            }
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}

function DeleteBookmarkFetch(id){
    let url = '/bookmark/' + id;

    let settings = {
        method : 'DELETE',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`
        }
    }

    let results = document.querySelector('.results');

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })

        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}

function UpdateBookmarkFetch(bid,title,description,burl,rating) {
    let url = '/bookmark/' + bid;

    let data = {
        id : bid,
        title : title,
        description : description,
        url : burl,
        rating : Number(rating)
    }
    let settings = {
        method : 'PATCH',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }
    
    let results = document.querySelector('.results');

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })

        .then( responseJSON => {
            fetchBookmarks();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        }); 
}

function SearchBookmarkFetch(serchTitle){
    let url = '/bookmark?title='+serchTitle;
    console.log(serchTitle);
    console.log(url);
    let settings = {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
        },
    }
    let results = document.querySelector( '.results' );
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            results.innerHTML = "";
            for ( let i = 0; i < responseJSON.length; i ++ ){
                document.querySelector(".results").innerHTML += `
                    <div class="bookmark">
                        <p>
                            ID: ${responseJSON[i].id}
                        </p>
                        <p>
                            Title: ${responseJSON[i].title}
                        </p>
                        <p>
                            Description: ${responseJSON[i].description}
                        </p>
                        <p>
                            URL: ${responseJSON[i].url}
                        </p>
                        <p>
                            Rating: ${responseJSON[i].rating}
                        </p>
                    </div>`;
            }
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}

//Watch
function watchBookmarksform() {
    let submitbotton = document.querySelector('.Bookmark-form')

    submitbotton.addEventListener('submit', (event) => {
        event.preventDefault();
        fetchBookmarks();
    });
}

function watchAddBookmarkForm() {
    let submitbotton = document.querySelector('.add-bookmark-form')

    submitbotton.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let title = document.getElementById( 'bookmarkTitle' ).value;
        let description = document.getElementById('bookmarkDescription').value;
        let url = document.getElementById('bookmarkURL').value;
        let rating = document.getElementById('bookmarkRating').value;
        addBookmarkFetch(title, description, url, rating );
    })
}

function watchDeleteOneForm(){
    let submitbotton = document.querySelector('.delete-bookmark-form')

    submitbotton.addEventListener('submit', (event) => {
        event.preventDefault();
        let id = document.getElementById('deletebookmarkID').value;
        DeleteBookmarkFetch(id);
    })
}

function watchUpdateForm(){
    let submitbotton = document.querySelector('.patch-bookmark-form')

    submitbotton.addEventListener('submit', (event) => {
        event.preventDefault();
        let bid = document.getElementById( 'paramPatchBookmarkID' ).value;
        let title = document.getElementById( 'patchbookmarkTitle' ).value;
        let description = document.getElementById('patchbookmarkDescription').value;
        let url = document.getElementById('patchbookmarkURL').value;
        let rating = document.getElementById('patchbookmarkRating').value;
        UpdateBookmarkFetch(bid,title,description,url,rating)
    })
}

function watchOneBookmarkForm(){
    let submitbotton = document.querySelector('.getone-bookmark-form')

    submitbotton.addEventListener('submit', (event) => {
        event.preventDefault();
        let serchTitle = document.getElementById('GetTitle').value
        SearchBookmarkFetch(serchTitle);
    })
}

function init(){
    
    watchBookmarksform();
    watchAddBookmarkForm();
    watchDeleteOneForm();
    watchUpdateForm();
    watchOneBookmarkForm();
}

init();
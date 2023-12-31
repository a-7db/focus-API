const api_key = 'iZn3VEXKyqrcRGzS5hOyGcMAVOQl8RuDRSBwvkdSR4MllMkj197Unea1'
const auth = function (request) { request.setRequestHeader('Authorization', api_key)}
const collection = 'https://api.pexels.com/v1/collections/'
const photo = 'https://api.pexels.com/v1/photos/'
const all_collections = 'https://api.pexels.com/v1/collections/featured'
const get_search = 'https://api.pexels.com/v1/search?query='


function show_collection(){
    const id = getIdURL('collection-no')

    let request = new XMLHttpRequest()
    request.open('GET', collection + (id ? id : '8xntbhr'))
    request.responseType = 'json'
    auth(request)
    request.send()


    request.onload = function(){
        let photos = request.response.media
        document.getElementById('img').innerHTML = ''
        
        for(let photo of photos){
            if (photo.type === 'Photo') {
                let content = `
                <article style="cursor: pointer">
                    <span class="image">
                        <img src="${photo.src.landscape}" alt="${photo.alt}" />
                    </span>
                    <a onclick="user_selected(${photo.id})">
                        <h2>${photo.photographer}</h2>
                        <div class="content">
                            <p>${photo.alt}</p>
                        </div>
                    </a>
                </article>
                `
                document.getElementById('img').innerHTML += content
            }

        }
    }
}

function user_selected(id){
    window.location = `photo.html?photoId=${id}`
}

function photo_details() {
    const id = getIdURL('photoId')

    let request = new XMLHttpRequest()
    request.open('GET', `${photo + id}`)
    request.responseType = 'json'
    auth(request)
    request.send()
    document.getElementById('details').innerHTML = ''

    request.onload = function () {
        let details = request.response

        let content = `
                    <h1>${details.photographer}</h1>
                    <span class="image main"><img src="${details.src.original}" alt="${details.alt}" /></span>
                    <h4>${details.photographer}</h4>
                    <p>${details.alt}</p>
        `
        document.getElementById('details').innerHTML += content
    }
}

function getIdURL(param){
    const url = new URLSearchParams(window.location.search)
    return url.get(param)

}


function menu(){
    let request = new XMLHttpRequest()
    request.open('GET', all_collections)
    request.responseType = 'json'
    auth(request)
    request.send()

    let el = document.getElementById('collections')
    el.innerHTML = `<li><a href="index.html?collection-no=8xntbhr">Home</a></li>`
    request.onload = function(){
        let data = request.response
        for(let elment of data.collections){
            let href = `href="index.html?collection-no=${elment.id}"`
            let content = `<li><a ${href} >${elment.title}</a></li>`
            
            el.innerHTML += content
        }
    }
}

menu()

function collection_id(id){
    window.location = `index.html?collection-no=${id}`
    console.log(id);
}


function search(){
    const search_box = document.getElementById('search_box')
    search_box.addEventListener('keyup', function(){
        if (search_box.value != '') {
            let request = new XMLHttpRequest()
            request.open('GET', get_search + search_box.value)
            request.responseType = 'json'
            auth(request)
            request.send()
            document.getElementById('autocomplete').innerHTML = ""
            request.onload = () => {
                if (request.status > 199 && request.status < 300) {
                    let data = request.response

                    
                    if(data.total_results > 0){
                        for (let obj of data.photos) {
                            let content = `
                        <a style="cursor: pointer;" onclick="user_selected(${obj.id})">
                            <dev style="background-color: rgb(249, 249, 249); display: block; padding: 5px;">
                                ${obj.alt}
                            </dev>
                        </a>
                        `
                        document.getElementById('autocomplete').innerHTML += content
                    }
                } 
                else
                {
                        document.getElementById('autocomplete').innerHTML = 'Not Found!'

                    }
                }
            }
        }else{
            document.getElementById('autocomplete').innerHTML = ""

        }
    })
}
search()
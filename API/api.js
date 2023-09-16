const api_key = 'iZn3VEXKyqrcRGzS5hOyGcMAVOQl8RuDRSBwvkdSR4MllMkj197Unea1'
const collection = 'https://api.pexels.com/v1/collections/8xntbhr'
const photo = 'https://api.pexels.com/v1/photos/'


function get_home_api(){
    let request = new XMLHttpRequest()
    request.open('GET', collection)
    request.responseType = 'json'
    request.setRequestHeader('Authorization', api_key)
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
    const id = getIdURL()

    let request = new XMLHttpRequest()
    request.open('GET', `${photo + id}`)
    request.responseType = 'json'
    request.setRequestHeader('Authorization', api_key)
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

function getIdURL(){
    const url = new URLSearchParams(window.location.search)
    return url.get('photoId')

}
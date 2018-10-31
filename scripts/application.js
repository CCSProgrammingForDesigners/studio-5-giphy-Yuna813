const api_key = "HSqqxx8q7xd94JmOrjVX4B076HRAUc4u"

const tags = document.getElementsByClassName('tags')

const addImagesToResponses = (images) => {
    const responses = document.getElementsByClassName('responses')[0]
    //clear out current responses before loading new images
    responses.innerHTML = ""
    for (const image of images) {
        responses.insertAdjacentHTML('beforeend', `<li><img src = "${image.images.fixed_width.url}">`)
    }
}


const testTag = document.getElementById('testTag')
testTag.addEventListener('click', e => {
    e.preventDefault()
    const tag = e.target.dataset.tag
    fetch(`http://api.giphy.com/v1/gifs/search?q=${tag}&api_key=${api_key}&limit=9`).then(response => {
        return response.json();
    }).then(data => {
        console.log(data.data)
        const images = data.data
        addImagesToResponses(images)
    })
})

fetch(`http://api.giphy.com/v1/gifs/random?api_key=${api_key}`).then(response => {
    return response.json();
}).then(data => {
    // This is where we have access to the data
    console.log(data.data.images.original.url)
    const url = data.data.images.original.url
    const largeImage = document.getElementsByClassName('large-image')[0]
    largeImage.insertAdjacentHTML('beforeend', `<img src = "${url}">`)
})

fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=9`).then(response => {
    return response.json();
}).then(data => {
    console.log(data.data)
    const images = data.data
    addImagesToResponses(images)
})

//TODO: Find a way to add an event listener to each tag link
//something something add event listener to array
for (const tag of tags) {
    tag.addEventListener('click', e => {
        e.preventDefault();
        const search = e.target.dataset.tag;
        fetch(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${api_key}&limit=9`).then(response => {
            return response.json();
        }).then(data => {
            console.log(data.data)
            const images = data.data
            addImagesToResponses(images)
        })
    })
}

//TODO: Hookup search box to site using "onchange" event listener
const input = document.getElementById('searchInput');
searchInput.addEventListener('change', e => {
    fetch(`http://api.giphy.com/v1/gifs/search?q=${input.value}&api_key=${api_key}&limit=9`).then(response => {
        return response.json();
    }).then(data => {
        console.log(data.data)
        const images = data.data
        addImagesToResponses(images)
    })
})
const imageInput = document.getElementById('image')


imageInput.addEventListener('change', function(){
    const reader = new FileReader()
    reader.addEventListener('load',() => {
        document.getElementById('image1').setAttribute('src', reader.result)
    } )
    reader.readAsDataURL(this.files[0])
})

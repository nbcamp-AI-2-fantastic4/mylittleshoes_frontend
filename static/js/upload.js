const backend_url = "http://127.0.0.1:8000/"
const frontend_url = "http://127.0.0.1:5500/"

async function imageUpload() {
    const formData = new FormData();

    const imageData = {
        image_one: document.getElementById("a-upload-file").files[0],
        image_two: document.getElementById("b-upload-file").files[0],
    }

    const response = await fetch(`${backend_url}/upload`, {
        method: "POST",
        body: formData(imageData),
    })

    if (response.status == 200) {
        window.location.replace(`${frontend_url}/result.html`)
    } else {
        alert(response.status)
    }
}
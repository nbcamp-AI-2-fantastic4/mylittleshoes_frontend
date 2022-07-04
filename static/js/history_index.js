const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

window.onload = async function loadHistory(){
    histories = await ShowHistory()
    const history_list = document.getElementById("history")

    histories.forEach(history => {
        const newHistory = document.createElement("div");
        const imageResult = document.createElement("img");
        imageResult.setAttribute("src", `${backend_base_url}${history.image.image_result}`)
        newHistory.setAttribute("id",history.id)
        newHistory.innerText = history.user
        newHistory.appendChild(imageResult)
        history_list.appendChild(newHistory)
        console.log(history.image.image_result)
    });
}
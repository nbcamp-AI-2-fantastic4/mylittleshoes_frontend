backend_url = "http://127.0.0.1:8000";
frontend_url = "http://127.0.0.1:5500";

async function imageResult() {
  const imageData = {
    image_one: document.getElementById("a-upload-file").value,
    image_two: document.getElementById("b-upload-file").value,
    image_result: document.getElementById(""),
  };

  const response = await fetch(`${backend_url}/upload`, {
    method: "POST",
    body: formData(imageData),
  });

  if (response.status == 200) {
    window.location.replace(`${frontend_url}/result.html`);
  } else {
    alert(response.status);
  }
}

// 사용된 이미지 열고 닫기(버튼)
// function openCloseImg() {
//     console.log("연결 확인")
//     if (document.getElementById("img_box").style.display == "flex") {
//         document.getElementById("img_box").style.display = "none";
//         document.getElementById("show_hide_button").textContent = "사용된 이미지 보기";
//     } else {
//         document.getElementById("img_box").style.display = "flex";
//         document.getElementById("show_hide_button").textContent = "사용된 이미지 숨기기";
//     }
// }

// 사용된 이미지 열고 닫기(버튼)
$(function () {
  $(document).ready(function () {
    $(".show_hide_button").click(function () {
      $(".img_box").slideToggle("normal");
      // $(".img_box").fadeToggle("slow");
    });
  });
});

$(document).ready(function () {
  console.log(localStorage.getItem("output", ""));
});

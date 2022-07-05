backend_url = "http://127.0.0.1:8000";
frontend_url = "http://127.0.0.1:5500";

// 이미지 업로드
async function imageUpload() {
  const formData = new FormData();

  image_one = document.getElementById("a-upload-file").files[0];
  image_two = document.getElementById("b-upload-file").files[0];

  formData.append("image_one", image_one);
  formData.append("image_two", image_two);

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8000/upload/",
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function (response) {
      document
        .getElementById("result-file")
        .setAttribute("src", backend_url + "/out.png");
      document.getElementById("result_box").style.display = "block";
    },
    error: function (error) {
      alert(error.responseText);
    },
  });
}

function replay() {
  document.getElementById("result_box").style.display = "none";

  document.getElementById("first-img").setAttribute("src", "");
  document.getElementById("first-img").style.display = "none";
  document.getElementById("first-p").style.display = "block";
  document.getElementById("first-button").style.display = "block";

  document.getElementById("second-img").setAttribute("src", "");
  document.getElementById("second-img").style.display = "none";
  document.getElementById("second-p").style.display = "block";
  document.getElementById("second-button").style.display = "block";
}

// 결과 저장
async function image_save() {
  user = localStorage.getItem("user");
  const data = {
    user: user,
  };

  console.log(data);

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8000/upload/result/",
    data: JSON.stringify(data),
    success: function (response) {
      alert(response["message"]);
      console.log(response["message"]);
      replay();
    },
    error: function (error) {
      alert(error.responseText);
      console.log(error.responseText);
    },
  });
}

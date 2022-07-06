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
    },
    error: function (error) {
      alert(error.responseText);
    },
  });
}

// 결과 저장
async function image_save() {
  user = localStorage.getItem("user");
  const data = {
    user: user,
  };

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8000/upload/result/",
    data: JSON.stringify(data),
    success: function (response) {
      alert(response["message"]);
      console.log(response["message"]);
      location.reload();
    },
    error: function (error) {
      alert(error.responseText);
      console.log(error.responseText);
    },
  });
}

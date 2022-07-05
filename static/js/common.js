// 로그아웃 기능
async function logout() {
  $.ajax({
    type: "DELETE",
    url: "http://127.0.0.1:8000/user/logout/",
    data: {},
    success: function (response) {
      alert(response.message);
      location.href = "log_in.html";
    },
    error: function (error) {
      alert(error.responseText);
    },
  });
}

// 현재 로그인한 유저 정보 받아오기
async function user_info() {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/user/info/",
    data: {},
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      alert(error.responseText);
      location.href = "log_in.html";
    },
  });
}

$(document).ready(function () {});

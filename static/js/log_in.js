// 로그인 버튼 클릭시 함수 실행
async function handleSignin() {
  email = document.getElementById("floatingInput").value;
  password = document.getElementById("floatingPassword").value;

  const signinData = {
    email: email,
    password: password,
  };

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8000/user/login/",
    data: signinData,
    success: function (response) {
      alert(response["message"]);
      location.href = "upload.html";
    },
    error: function (error) {
      alert(error.responseText);
    },
  });
}

async function handleSignup() {
  username = document.getElementById("floatingInputNM").value;
  fullname = document.getElementById("floatingInputFM").value;
  email = document.getElementById("floatingInput").value;
  password = document.getElementById("floatingPassword").value;
  password_confirm = document.getElementById("floatingPassword2").value;

  if (password != password_confirm) {
    alert("비밀번호를 확인해주세요!");
    return 0;
  }

  const signupData = {
    email: email,
    username: username,
    fullname: fullname,
    password: password,
    userprofile: {
      age: 0,
      intro: "temp",
    },
  };

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8000/user/register/",
    data: JSON.stringify(signupData),
    success: function (response) {
      alert(response.message);
      location.href = "log_in.html";
    },
    error: function (error) {
      alert(error.responseText);
    },
  });
}

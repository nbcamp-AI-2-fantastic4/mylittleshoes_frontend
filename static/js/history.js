//모달 html div id 를 변수에 저장
const modal = document.getElementById("modal_open");

// 모달 창 열기 // onclick 으로 openModal() 함수 실행하며 받은 인자들 ( django views에서 받은 값들이 들어있다.)
function openModal(history_id) {
  // class명으로 쓰는 이유는 여러개의 모달이 존재해서 하나의 id로 열 수 없기 때문
  $(".modal_overlay").fadeIn();
  // 모달의 display 속성 변경해주기
  modal.style.display = "flex";
  // 모달 열리면서 스크롤 막기
  document.body.style.overflowY = "hidden";

  //팝업창을 가운데로 띄우기 위해 현재 화면의 가운데 값과 스크롤 값을 계산하여 팝업창 CSS 설정
  $(".modal_overlay").css({
    top:
      ($(window).height() - $(".modal_overlay").outerHeight()) / 2 +
      $(window).scrollTop() +
      "px",
    left:
      ($(window).width(2000) - $(".modal_overlay").outerWidth()) / 2 +
      $(window).scrollLeft() +
      "px",
  });

  showComment(history_id);
}

$(function () {
  // 모달 창 닫기(닫기버튼)
  $("button[id='close_modal']").click(function () {
    $("div[id = 'modal_open']").fadeOut();

    document.body.style.overflowY = "scroll";
  });
  // 모달 창 닫기(영역밖 클릭)
  $(document).on("click", function (e) {
    if ($("#modal_open").is(e.target)) {
      $("div[id = 'modal_open']").fadeOut();
      document.body.style.overflowY = "scroll";
    }
  });
});

const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500";

// history 조회
$(document).ready(function () {
  showHistory();
});

async function showHistory() {
  $.ajax({
    type: "GET",
    url: `${backend_base_url}/history/`,
    data: {},
    success: function (response) {
      let history_info = response["result_history"];
      let temp_html_2 = "";
      for (let i = 0; i < history_info.length; i++) {
        let history_id = history_info[i]["id"];
        let img_result = history_info[i]["image"]["image_result"];
        let username = history_info[i]["user"];
        let created_at = history_info[i]["created_at"];
        let like = history_info[i]["like"];

        let temp_html = `<div class="card-box col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <div class="card shadow-sm border-0 rounded">
                                <div class="card-body p-0">
                                    <div class="card-img" onclick="openModal(id=${history_id})">
                                        <img src="${backend_base_url}${img_result}" alt="" class="w-100 card-img-top" style="width:350px; height:350px;">
                                    </div>
                                    <div class="p-4">
                                        <p class="card-name mb-0">
                                            ${username}
                                            <li class="like-box list-inline-item m-0">
                                                <a href="#" class="social-link" style="margin-right:15px; border:none;">
                                                    <i class="likes fa-solid fa-heart"></i>
                                                </a>${like}
                                            </li>
                                        </p>
                                        <p class="card-date small text-muted">${created_at}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        if (i % 2 == 0 && i != history_info.length - 1) {
          temp_html_2 = '<div class="history_row">' + temp_html;
        } else if (i % 2 == 0 && i == history_info.length - 1) {
          temp_html_2 = '<div class="history_row">' + temp_html + "</div>";
          $("#history").append(temp_html_2);
          temp_html_2 = "";
        } else if (i % 2 == 1) {
          temp_html_2 = temp_html_2 + temp_html + "</div>";
          $("#history").append(temp_html_2);
          temp_html_2 = "";
        }
      }
    },
  });
}

// history 저장
// 이미지 아이디 받을방법이나 백엔드에서 .last로 받을수있나
async function saveHistory(image_id) {
  let form_data = new FormData();

  form_data.append("exposure_start", "2022-06-30");
  form_data.append("exposure_end", "2023-06-30");

  $.ajax({
    type: "POST",
    url: `${backend_base_url}/history/`,
    data: form_data,
    cache: false,
    contentType: false,
    processData: false,
    success: function (response) {
      alert(response["result"]);
    },
  });
}

// history 상세 조회
async function showComment(history_id) {
  $.ajax({
    type: "GET",
    url: `${backend_base_url}/history/comment/${history_id}/`,
    data: {},
    success: function (response) {
      $("#comment_img").empty();
      $("#comment").empty();
      $("#comment_btn").attr("value", history_id);

      let history_info = response["result_history"];
      let comment_info = response["result_comment"];
      console.log(comment_info);

      let image_one = history_info["image"]["image_one"];
      let image_two = history_info["image"]["image_two"];
      let image_result = history_info["image"]["image_result"];

      let temp_html_img = `<div class="modal_body" >
                            <div class="img_used">
                                <div class="img_first">
                                    <img src="${backend_base_url}${image_one}" style="width:250px; height:200px;"/>
                                </div>
                                <div class="img_second">
                                    <img src="${backend_base_url}${image_two}" style="width:250px; height:200px;"/>
                                </div>
                            </div>  
                            <div class="img_result">
                                <img src="${backend_base_url}${image_result}" style="width:300px; height:200px;"/>
                            </div>
                        </div>`;
      $("#comment_img").append(temp_html_img);

      for (let i = 0; i < comment_info.length; i++) {
        let username = comment_info[i]["user"];
        let content = comment_info[i]["content"];

        let temp_html = `
                                ${username} : ${content}
                                <hr>
                                `;
        $("#comment").append(temp_html);
      }
    },
  });
}

// comment 저장
async function saveComment() {
  let history_id = $("#comment_btn").attr("value");
  let content = document.getElementById("comment_text").value;
  let user = localStorage.getItem("user");

  const data = {
    content: content,
    user: user,
  };

  $.ajax({
    type: "POST",
    url: `${backend_base_url}/history/comment/${history_id}/`,
    data: JSON.stringify(data),
    success: function (response) {
      showComment(history_id);
      $("#comment_text").val("");
      console.log(response);
    },
    error: function (error) {
      console.log(error.responseText);
    },
  });
}

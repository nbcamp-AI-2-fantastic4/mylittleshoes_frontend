$(document).ready(function () {
  showShoes();
});

function show_list(all_list) {
  $("#result-box").empty();
  for (let i = 0; i < all_list.length; i++) {
    let shoes_img = all_list[i]["image"];
    let shoes_name = all_list[i]["name"];
    let shoes_brand = all_list[i]["brand"]["name"];
    let shoes_color = all_list[i]["color"];
    let shoes_height = all_list[i]["height"];
    let temp_html = `<div class="recommend_box">                         
                        <!--신발 이미지 넣는 곳-->
                        <div class="recommend_img_box">
                            <img src="http://127.0.0.1:8000${shoes_img}"
                                class="information" id="shoes_img">
                        </div>
                        <div class="recommend_info_box">
                            <h2> < 스 타 일  정  보 ></h2>
                            <div class="recommend_info_list">
                                <li><span>Name : </span>  ${shoes_name}</li>
                                <li><span >Brand : </span >   ${shoes_brand}</li>
                                <li><span >Color : </span >   ${shoes_color}</li>
                                <li><span >height : </span >   ${shoes_height}</li>
                            </div>
                        </div>
                    </div>`;
    $("#result-box").append(temp_html);
  }
}

function showShoes() {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/recommend/",
    data: {},
    success: function (response) {
      all_list = response;
      show_list(all_list);
    },
  });
}

async function show_by_brand(barnd_name) {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/recommend/brand/",
    data: {
      brand: barnd_name,
    },
    success: function (response) {
      show_list(response);
    },
  });
}

async function show_by_color(color_name) {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/recommend/color/",
    data: {
      color: color_name,
    },
    success: function (response) {
      show_list(response);
    },
  });
}

async function show_by_height(height_name) {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/recommend/height/",
    data: {
      height: height_name,
    },
    success: function (response) {
      show_list(response);
    },
  });
}

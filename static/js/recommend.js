$(document).ready(function () {
    showShoes();
});

function showShoes() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/recommend/",
        data: {},
        success: function (response) {
            all_list= response
            console.log(response)
            // let all_list = response["allshoes"];
            for (let i = 0; i < all_list.length; i++) {
                let shoes_img = all_list[i]["image"];
                let shoes_name = all_list[i]["name"];
                let shoes_brand = all_list[i]["brand"]["name"];
                let shoes_color = all_list[i]["color"].slice(0, 90) + "...";
                let shoes_height = all_list[i]["height"];
                let temp_html = `
                                     <div id="container">                         
                                          <!--신발 이미지 넣는 곳-->
                                          <div class="product-details" id="marble_img">
                                              <img src="http://127.0.0.1:8000${shoes_img}" name="${i}"
                                                    class="information" id="shoes_img">
                                              <div class="info" id="marble_info">
                                                 <h2> 신발정보!</h2>
                                                  <ul>
                                                      <li><strong >Name : </strong >  ${shoes_name}</li>
                                                      <li><strong >Brand : </strong >   ${shoes_brand}</li>
                                                      <li><strong >Color : </strong >   ${shoes_color}</li>
                                                      <li><strong >height : </strong >   ${shoes_height}</li>

                                                      
                                                  </ul>
                                              </div>
                                          </div>
                                      </div>`;
                $("#result-box").append(temp_html);
            }
        },
    });
}

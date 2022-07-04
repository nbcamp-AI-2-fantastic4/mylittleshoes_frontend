//모달 html div id 를 변수에 저장
const modal = document.getElementById('modal_open');


// 모달 창 열기 // onclick 으로 openModal() 함수 실행하며 받은 인자들 ( django views에서 받은 값들이 들어있다.)
function openModal() {

    // class명으로 쓰는 이유는 여러개의 모달이 존재해서 하나의 id로 열 수 없기 때문
    $(".modal_overlay").fadeIn();
    // 모달의 display 속성 변경해주기
    modal.style.display = 'flex';
    // 모달 열리면서 스크롤 막기
    document.body.style.overflowY = 'hidden';

    //팝업창을 가운데로 띄우기 위해 현재 화면의 가운데 값과 스크롤 값을 계산하여 팝업창 CSS 설정
    $(".modal_overlay").css({
        "top": (($(window).height()-$(".modal_overlay").outerHeight())/2+$(window).scrollTop())+"px",
        "left": (($(window).width(2000)-$(".modal_overlay").outerWidth())/2+$(window).scrollLeft())+"px"
     });
}

$(function(){
    // 모달 창 닫기(닫기버튼)
    $("button[id='close_modal']").click(function(){
        $("div[id = 'modal_open']").fadeOut();
        document.body.style.overflowY = 'scroll';
    });
    // 모달 창 닫기(영역밖 클릭)
    $(document).on("click", function(e){
        if( $("#modal_open").is(e.target)) {
        $("div[id = 'modal_open']").fadeOut();
        document.body.style.overflowY = 'scroll';
    }
    });
});



// const backend_base_url = "http://127.0.0.1:8000"
// const frontend_base_url = "http://127.0.0.1:5500"

$(document).ready(function () {
  ShowHistory();
});


async function ShowHistory() {
    const response = await fetch(`${backend_base_url}/history/`, {
        // headers:{
        //     Accept:"application/json",
        //     'Content-type':'application/json'
        // },
        method: 'GET',
    })
    response_json = await response.json()
    console.log(response_json)
    return response_json

    // if (response.status ==200){
    //     window.location.replace(`${frontend_base_url}/hitory.html`);
    // }else{
    //     alert(response.status)
    // }
}



// function ShowHistory() {
//   $.ajax({
//     type: "GET",
//     url: "http://127.0.0.1:8000/history/",
//     data: {},
//     success: function (response) {
        // console.log(response["result_history"])
        // let history_info = response["result_history"]
        // console.log(history_info)
        // for (let i=0; i<history_info.length; i++){
        //     let username = history_info[i]["user"];
        //     console.log(username)
        // }


    //   let all_list = response["all_result"];
    //   for (let i = 0; i < all_list.length; i++) {
    //     let user_img = all_list[i]["user_img"];
    //     let hero_img = all_list[i]["hero_img"];
    //     let hero = all_list[i]["hero"];
    //     let description = all_list[i]["description"].slice(0, 90) + "...";
    //     let accuracy = all_list[i]["accuracy"];
    //     let temp_html = `<div id="container">                         
    //                         <div class="product-details">                            
    //                             <h1>My Little Hero</h1>                            
    //                             <img src="http://127.0.0.1:5000/${user_img}" name="${i}"
    //                                     class="information" id="user_img">                          
    //                         </div>
    //                         <!--마블 이미지 넣는 곳-->
    //                         <div class="product-image" id="marble_img">
    //                             <img src="http://127.0.0.1:5000/${hero_img}"
    //                                     alt="">
    //                             <div class="info" id="marble_info">
    //                                 <h2> Description</h2>
    //                                 <ul>
    //                                     <li><strong >Name : </strong >  ${hero}</li>
    //                                     <li style="padding-right: 10px;"><strong>Description  </strong><br>${description}</li>
    //                                     <li><strong >Accuracy : </strong >${accuracy}</li>
    //                                 </ul>
    //                             </div>
    //                         </div>
    //                     </div>`;
    //     $("#result-box").append(temp_html);
    //   }
//     },
//   });
// }

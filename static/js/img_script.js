const aImgBox = document.querySelector(".a_img"),
    aButton = aImgBox.querySelector("button"),
    aInput = aImgBox.querySelector("input");

const bImgBox = document.querySelector(".b_img"),
    bButton = bImgBox.querySelector("button"),
    bInput = bImgBox.querySelector("input");

// 전역 변수
let afile;
let bfile;

// a_img에 해당되는 버튼 클릭 시 입력도 클릭
aButton.onclick = () => {
    aInput.click();
}

// b_img에 해당되는 버튼 클릭 시 입력도 클릭
bButton.onclick = () => {
    bInput.click();
}

// a_img에서 선택한 파일 가져오기
aInput.addEventListener("change", function () {
    afile = this.files[0];
    aImgBox.classList.add();
    aShowFile();
});

// b_img에서 선택한 파일 가져오기
bInput.addEventListener("change", function () {
    bfile = this.files[0];
    bImgBox.classList.add();
    bShowFile();
});

// 선택한 파일을 이미지로 보여주기(첫번째)
function aShowFile() {
    console.log("A 이미지 등록")
    let fileType = afile.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            const img = document.getElementById("first-img");

            img.src = fileURL;
            aImgBox.appendChild(img);

            var p = document.getElementById("first-p");
            var button = document.getElementById("first-button");

            img.style.display = "block";
            p.style.display = "none";
            button.style.display = "none";
        }
        fileReader.readAsDataURL(afile);
    } else {
        alert("이미지 파일이 아닙니다!");
        aImgBox.classList.remove("active");
    }
}

// 선택한 파일을 이미지로 보여주기(두번째)
function bShowFile() {
    console.log("B 이미지 등록")
    let fileType = bfile.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            const img = document.getElementById("second-img");

            img.src = fileURL;
            bImgBox.appendChild(img);

            var p = document.getElementById("second-p");
            var button = document.getElementById("second-button");

            img.style.display = "block";
            p.style.display = "none";
            button.style.display = "none";
        }
        fileReader.readAsDataURL(bfile);
    } else {
        alert("이미지 파일이 아닙니다!");
        bImgBox.classList.remove("active");
    }
}

function removeImgButton(afile, bfile) {
    console.log("확인용")
    var a_p = document.getElementById("first-p");
    var a_button = document.getElementById("first-button");
    var a_img = document.getElementById("first-img");

    a_img.src = ""
    a_img.style.display = "none";
    a_p.style.display = "block";
    a_button.style.display = "block";

    var b_p = document.getElementById("second-p");
    var b_button = document.getElementById("second-button");
    var b_img = document.getElementById("second-img");

    b_img.src = ""
    b_img.style.display = "none";
    b_p.style.display = "block";
    b_button.style.display = "block";
}
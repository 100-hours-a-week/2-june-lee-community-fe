
// document.getElementById('drop').addEventListener('click',function(){
//     alert("Oh...");
//     console.log("Oh...")
// });
// const hhhh = () =>{
//     alert("Haha");
// };
// hhhh();

// const headerDropdownMenu = () => {
//     const wrap = document.createElement('div');

//     const modifyInfoLink = '회원정보수정';
//     const modifyPasswordLink = '비밀번호수정';
//     const logoutLink = '로그아웃';

//     modifyInfoLink.href = '/modifyInfo.html';
//     modifyPasswordLink.href = '/modifyPassword.html';
//     logoutLink.addEventListener('click', () => {
//         window.location.href = '/loginpage.html';
//     });

//     wrap.classList.add('drop');

//     wrap.appendChild(modifyInfoLink);
//     wrap.appendChild(modifyPasswordLink);
//     wrap.appendChild(logoutLink);

//     return wrap;
// };


// window.addEventListener('click', e => {
//     const dropMenu = document.querySelector('.drop');
//     if (dropMenu && !dropMenu.classList.contains('none')) {
//         dropMenu.classList.add('none');
//     }
// });

// export default Header;

// header.js
const curFile = window.location.pathname;
if(curFile !== '/posts.html'){

    document.addEventListener("DOMContentLoaded", function () {
        // 헤더 HTML 동적으로 생성
        const headerHTML = `
            <header>
                <a href="/posts.html">
                    <img class="back" src="./public/navigate_before.svg" alt="뒤로가기">
                </a>
                <h1 style="display: inline">아무 말 대잔치</h1>
                <div class="profile">
                    <img src="./public/image/default.jpg" alt="프로필 이미지">
                    <div class="drop none">
                        <a href="./modifyInfo.html">회원정보 수정</a>
                        <a href="./modifyPassword.html">비밀번호 수정</a>
                        <a href="./loginpage.html">로그아웃</a>
                    </div>
                </div>
            </header>
        `;
    
        // body의 첫 번째 자식으로 헤더 추가
        document.body.insertAdjacentHTML("afterbegin", headerHTML);
    
        // 드롭다운 메뉴 동작
        const profileImg = document.querySelector(".profile img");
        const dropdown = document.querySelector(".profile .drop");
    
        profileImg.addEventListener("click", function () {
            dropdown.classList.toggle("none");
        });
    
        // 외부 클릭 시 드롭다운 닫기
        document.addEventListener("click", function (e) {
            if (!document.querySelector(".profile").contains(e.target)) {
                dropdown.classList.add("none");
            }
        });
    });
}
else{
    // alert(curFile);
    document.addEventListener("DOMContentLoaded", function () {
        // 헤더 HTML 동적으로 생성
        const headerHTML = `
            <header>
                <h1 style="display: inline">아무 말 대잔치</h1>
                <div class="profile">
                    <img src="./public/image/default.jpg" alt="프로필 이미지">
                    <div class="drop none">
                        <a href="./modifyInfo.html">회원정보 수정</a>
                        <a href="./modifyPassword.html">비밀번호 수정</a>
                        <a href="./loginpage.html">로그아웃</a>
                    </div>
                </div>
            </header>
        `;
    
        // body의 첫 번째 자식으로 헤더 추가
        document.body.insertAdjacentHTML("afterbegin", headerHTML);
    
        // 드롭다운 메뉴 동작
        const profileImg = document.querySelector(".profile img");
        const dropdown = document.querySelector(".profile .drop");
    
        profileImg.addEventListener("click", function () {
            dropdown.classList.toggle("none");
        });
    
        // 외부 클릭 시 드롭다운 닫기
        document.addEventListener("click", function (e) {
            if (!document.querySelector(".profile").contains(e.target)) {
                dropdown.classList.add("none");
            }
        });
    });
    
}
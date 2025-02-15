
// import headerDropdownMenu from `../component/header/header.js`;
const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:4000'
        : 'http://localhost:4000';
};

let allBoardData =[];
let currentPage = 1;  // 현재 페이지 번호
const itemsPerPage = 3; // 한 번에 가져올 게시글 개수
let isFetching = false; // 중복 요청 방지
const boardContainer = document.getElementById('boardContainer'); // 데이터를 추가할 컨테이너
async function getAuth() {
    const response = await fetch('http://localhost:4000/api/users/auth/check', {
        method: 'GET',
        credentials: 'include' // 쿠키 포함
    });

    if (response.ok) {
        console.log('인증 성공');
    } else {
        console.log('인증 실패');
        window.location.href=`http://localhost:3000/loginpage.html`;
    }
}
async function fetchAllBoardData() {

    try {
        const response = await fetch(`${getServerUrl()}/api/boards`); // JSON 파일 불러오기
        // alert(response);
        // const boardData = await response.json(); // JSON 데이터 파싱

        ////////////최종 완성 후 정렬옵션 선택하는 버튼 만들기/////////////////// 

        // const response = await fetch(`${getServerUrl()}/api/boards`);
        allBoardData = await response.json();
        allBoardData.sort((a,b)=>{return b.id - a.id});
        loadBoardList(); // 첫 페이지 데이터 렌더링
    } catch (error) {
        console.error("게시글 데이터를 불러오지 못했습니다.", error);
    }
}

async function loadBoardList() {
    if(isFetching || (currentPage - 1) * itemsPerPage >= allBoardData.length) return;
    isFetching = true;
    try{
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = allBoardData.slice(startIndex, endIndex); // 현재 페이지 데이터 추출

        // 각 boardItem을 HTML로 변환
        pageData.forEach(async (item) => {

            const response = await fetch(`http://localhost:4000/api/users/${item.writerId}`, {
                method: 'GET',
                credentials: 'include' // 쿠키 포함
            });
            if (response.ok) {
                console.log('프로필 로딩 성공');
            } else {
                console.log('프로필 로딩 실패');
            }
            const resp = await response.json();
            const writerImg = await resp.profileImage;
            let totalViews=item.views;
            let totalLikes=item.likes;
            let totalComments=item.comment.length;
            if(item.views>=1000){
                totalViews=Math.floor(item.views/1000)+"k";
            }
            if(item.comments>=1000){
                totalComments=Math.floor(item.views/1000)+"k";
            }
            if(item.likes>=1000){
                totalLikes=Math.floor(item.views/1000)+"k";
            }
            const boardHTML = `
                <section class="boardList">
                    <a href="/post.html?id=${item.id}" id="boardItem">
                        <div class="boardItem">
                            <h2 class="title">${item.title}</h2>

                            <div class="info">
                                <h3 class="views">좋아요 <b>${totalLikes}</b></h3>
                                <h3 class="views">댓글 <b>${totalComments}</b></h3>
                                <h3 class="views">조회수 <b>${totalViews}</b></h3>
                                <p class="date">${item.date}</p>
                            </div>

                            <div class="writerInfo">
                                <picture class="img">
                                    <img src="${item.profileImage ? `http://localhost:4000${item.profileImage}` : '/public/image/default.jpg'}" alt="img">
                                </picture>
                                <h2 class="writer">${item.writer}</h2>
                            </div>
                        </div>
                    </a>
                </section>
            `;
            boardContainer.innerHTML += boardHTML; // HTML 추가
        // alert(boardContainer[1].title);
        });
        ++currentPage;
    } catch(error){
        console.error("게시글 데이터 로드 에러", error);
    } finally{
        isFetching = false;
    }
// console.log(boardContainer);
// return boardContainer;
}

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadBoardList(); // 추가 데이터 로드
    }
});

// 페이지 로드 시 함수 호출
getAuth();
fetchAllBoardData();
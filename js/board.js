
// import headerDropdownMenu from `../component/header/header.js`;
const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        : '.';
};
// JSON 데이터를 가져와 렌더링하는 함수
async function loadBoardList() {
    const boardContainer = document.getElementById('boardContainer'); // 데이터를 추가할 컨테이너
    const response = await fetch(`${getServerUrl()}/js/data.json`); // JSON 파일 불러오기
    const boardData = await response.json(); // JSON 데이터 파싱

    // 각 boardItem을 HTML로 변환
    boardData.forEach((item) => {
        const boardHTML = `
            <section class="boardList">
                <a href="./component/board/boardItem.js" id="boarditem">
                    <div class="boardItem">
                        <h2 class="title">${item.title}</h2>
                        <div class="info">
                            <h3 class="views">좋아요 <b>${item.likes}</b></h3>
                            <h3 class="views">댓글 <b>${item.comments}</b></h3>
                            <h3 class="views">조회수 <b>${item.views}</b></h3>
                            <p class="date">${item.date}</p>
                        </div>
                        <div class="writerInfo">
                            <picture class="img">
                                <img src="${item.image}" alt="img">
                            </picture>
                            <h2 class="writer">${item.writer}</h2>
                        </div>
                    </div>
                </a>
            </section>
        `;
        boardContainer.innerHTML += boardHTML; // HTML 추가
    });
console.log(boardContainer);
}

document.getElementById('drop').addEventListener('click',function(){
    // alert("Oh...");
    // console.log("Oh...")
    // headerDropdownMenu();
});

// 페이지 로드 시 함수 호출
loadBoardList();

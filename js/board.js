
// import headerDropdownMenu from `../component/header/header.js`;
const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:4000'
        : 'http://localhost:4000';
};
// JSON 데이터를 가져와 렌더링하는 함수
async function loadBoardList() {
    const boardContainer = document.getElementById('boardContainer'); // 데이터를 추가할 컨테이너
    const response = await fetch(`${getServerUrl()}/api/boards`); // JSON 파일 불러오기
    // alert(response);
    const boardData = await response.json(); // JSON 데이터 파싱

    ////////////완성 후 정렬옵션 선택하는 버튼 만들기/////////////////// 
    boardData.sort(function(a,b){
        return b.id - a.id;
    });

    // 각 boardItem을 HTML로 변환
    boardData.forEach((item) => {
        let totalViews=item.views;
        let totalLikes=item.likes;
        let totalComments=item.comments;
        if(item.views>=1000){
            totalViews=(item.views/1000)+"k";
        }
        if(item.comments>=1000){
            totalComments=(item.views/1000)+"k";
        }
        if(item.likes>=1000){
            totalLikes=(item.views/1000)+"k";
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
                                <img src="${item.image}" alt="img">
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
// console.log(boardContainer);
// return boardContainer;
}


// 페이지 로드 시 함수 호출
loadBoardList();

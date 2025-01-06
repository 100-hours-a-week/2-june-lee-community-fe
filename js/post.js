const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        : '.';
};

// document.getElementById('submit').addEventListener('click',function(){
//     window.location.href = `${getServerUrl()}/post.html`;
// });

// JSON 데이터를 가져와 렌더링하는 함수
async function loadPost() {
    const postContainer = document.getElementById('postContainer'); // 데이터를 추가할 컨테이너
    const response = await fetch(`${getServerUrl()}/js/data.json`); // JSON 파일 불러오기
    const boardData = await response.json(); // JSON 데이터 파싱

    // 각 boardItem을 HTML로 변환 -> 나중에 수정/삭제는 본인아이디꺼만 되도록 수정
    boardData.forEach((item) => {
        const boardHTML = `
        <body>
            <section class="wrap">
                <section class="head">
                    <h1 class="title">${item.title}</h1>
                    <div class="writerWrap">
                        <picture class="profileImg">
                            <img src="${item.image}" alt="img"/>
                        </picture>
                        <h2 class="nickname">${item.writer}</h2>
                        <h3 class="createdAt">${item.date}</h3>
                        <div class="mod">
                            <button id="modifyBtn">수정</button>
                            <button id="deleteBtn">삭제</button>
                        </div>
                    </div>
                </section>
                <section class="body">
                    <div class="contentImg"></div>
                    <article class="content">${item.content}</article>
                    <article class="bodyWrap">
                        <div class="commentWrap">
                            <div class="likeCount">
                                <h3></h3>
                                <p>좋아요 <br> ${item.likes}</p>
                            </div>
                            <div class="viewCount">
                                <h3></h3>
                                <p>조회수 <br>${item.views}</p>
                            </div>
                            <div class="commentCount">
                                <h3></h3>
                                <p>댓글 <br> ${item.views}</p>
                            </div>
                        </div>
                    </article>
                </section>
                <section class="comment">
                    <div class="commentInputWrap">
                        <textarea placeholder="댓글을 남겨주세요!"></textarea>
                        <div>
                            <button class="commentInputBtn">댓글 등록</button>
                        </div>
                    </div>
                    <div class="commentList"></div>
                </section>
            </section>
            <div class="background"></div>
        </body>
        <script src="./js/board.js" type="module"></script>
        `;
        postContainer.innerHTML = boardHTML; // HTML 추가
    });
    console.log(postContainer);
}
// 페이지 로드 시 함수 호출
loadPost();

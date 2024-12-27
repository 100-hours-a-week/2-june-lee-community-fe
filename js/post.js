const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        : '.';
};

document.getElementById('submit').addEventListener('click',function(){
    window.location.href = `${getServerUrl()}/post.html`;
});

// JSON 데이터를 가져와 렌더링하는 함수
async function loadBoard() {
    const boardContainer = document.getElementById('boardContainer'); // 데이터를 추가할 컨테이너
    const response = await fetch(`${getServerUrl()}/js/data.json`); // JSON 파일 불러오기
    const boardData = await response.json(); // JSON 데이터 파싱

    // 각 boardItem을 HTML로 변환
    boardData.forEach((item) => {
        const boardHTML = `
            <h2>게시글 수정</h2>
            <div class="inputBox">
                <label>제목*</label>
                <input
                    type="text"
                    id="title"
                    value="${item.title}"
                />
            </div>
            <div class="inputBox">
                <label>내용*</label>
                <textarea id="content">${item.content}</textarea>
                <p class="helperText" name="content"></p>
            </div>
            <div class="inputBox">
                <label class="non-border">이미지</label>
                <label id="imagePreviewText"></label>
                <input
                    class="non-border"
                    type="file"
                    id="image"
                    placeholder="파일을 선택해주세요."
                    accept="image/*"
                    value="${item.image}"
                />
            </div>
        `;
        boardContainer.innerHTML += boardHTML; // HTML 추가
    });
    console.log(boardContainer);
}
// 페이지 로드 시 함수 호출
loadBoard();

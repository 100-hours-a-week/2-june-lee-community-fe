const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        : 'http://localhost:3000';
};
const loadPost = async () => {
    try {
        // URL에서 ID 추출
        const params = new URLSearchParams(window.location.search);
        const boardId = params.get('id'); // 예: ?id=1
        if (!boardId) {
            alert('잘못된 접근입니다.');
            window.location.href =`${getServerUrl()}/posts.html`;
            return;
        }

        const response = await fetch(`http://localhost:4000/api/boards/${boardId}`);
        if(!response.ok){
            alert("게시글 로딩에 문제가 있습니다.");
            window.location.href =`${getServerUrl()}/posts.html`;
        }
        const board = await response.json();
        // console.log('게시글 상세:', board);
        editPost(board);
    } 
    catch (error) {
        console.error('게시글 상세 데이터를 가져오지 못했습니다:', error);
    }
};

// JSON 데이터를 가져와 렌더링하는 함수
const editPost=(item) =>{
    const boardContainer = document.getElementById('boardContainer'); // 데이터를 추가할 컨테이너

    // 각 boardItem을 HTML로 변환
    const boardHTML = `
        <h2>게시글 수정</h2>
        <div class="inputBox">
            <label>제목*</label>
            <input
                type="text"
                id="titleModify"
                value="${item.title}"
                maxlength="26";
            />
        </div>
        <div class="inputBox">
            <label>내용*</label>
            <textarea 
                id="contentModify" 
                placeholder="내용을 입력해 주세요."
                cols="40"
            >${item.content}</textarea>
            <p class="helperText" name="content" id="helperModify"></p>
        </div>
        <div class="inputBox">
            <br/>
            <label class="non-border" id="imagePreviewText">이미지</label>
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
    boardContainer.innerHTML = boardHTML; // HTML 추가
    // console.log(boardContainer);
}

const inputBtn=document.getElementById('board-modify');
let modifyFlag=false;

inputBtn.addEventListener('click', async () => {
    const inputTitle=document.getElementById('titleModify');
    const inputContent=document.getElementById('contentModify');
    const inputImage=document.getElementById('image')
    const helperText=document.getElementById('helperModify');
    // alert("good");
    if(inputTitle.value && inputContent.value){
        modifyFlag=true;
        inputBtn.style.display='block';
    }
    if(modifyFlag){
        const params = new URLSearchParams(window.location.search);
        const boardId = params.get('id'); // 예: ?id=1
        console.log('boardId:', boardId);
        const tmp = await fetch(`http://localhost:4000/api/boards/${boardId}`);
        const inputData = await tmp.json();

        const response = await fetch(`http://localhost:4000/api/boards/${boardId}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": inputData.id,
                "title": inputTitle.value,
                "content": inputContent.value,
                "likes": inputData.likes,
                "views": inputData.views,
                "date":inputData.date,
                "writer": inputData.writer,
                "image": inputImage.files[0]?.name || inputData.image,
                "comment": inputData.comment || []
            }),
        });
        if(!response.ok){
            console.error('게시글이 등록되지 않았습니다.');
            return;
        }
        window.location.href =`${getServerUrl()}/posts.html`;
    }
    else{
        helperText.innerHTML='제목, 내용을 모두 입력해주세요';
        helperText.style.display='block';
    }
});
// 페이지 로드 시 함수 호출
loadPost();
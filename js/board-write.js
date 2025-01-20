const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        : 'http://localhost:3000';
};
const inputTitle=document.getElementById('titleWrite');
const inputContent=document.getElementById('contentWrite');
const inputBtn=document.getElementById('board-write');
const helperText=document.getElementById('helperWrite');

let writeFlag=false;
inputTitle.addEventListener('blur',()=>{
    if(inputTitle.value.length > 26){
        inputTitle.innerHTML=inputTitle.value.substr(0,26);
    }
    if(inputTitle.value && inputContent.value){
        writeFlag=true;
        inputBtn.style.backgroundColor='#7f6aee';
        helperText.style.display='none';
    }
    else{
        writeFlag=false;
        inputBtn.style.backgroundColor='#aca0eb';
    }
});
inputContent.addEventListener('blur',()=>{
    if(inputTitle.value && inputContent.value){
        writeFlag=true;
        inputBtn.style.backgroundColor='#7f6aee';
        helperText.style.display='none';
    }
    else{
        writeFlag=false;
        inputBtn.style.backgroundColor='#aca0eb';
        // helperText.style.display='block';
    }
});
inputBtn.addEventListener('click',()=>{
    if(writeFlag) window.location.href =`${getServerUrl()}/posts.html`;
    else{
        helperText.innerHTML='제목, 내용을 모두 입력해주세요';
        helperText.style.display='block';
    }
});

const loadPost = async () => {
    try {
        // URL에서 ID 추출
        const params = new URLSearchParams(window.location.search);

        const response = await fetch(`http://localhost:4000/api/boards/${boardId}`);
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
    boardContainer.innerHTML = boardHTML; // HTML 추가
    console.log(boardContainer);
}
// 페이지 로드 시 함수 호출
loadPost();

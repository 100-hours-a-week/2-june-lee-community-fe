const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        : 'http://localhost:3000';
};

// document.getElementsById('likeCount').addEventListener('click',function(){
//     // window.location.href = `${getServerUrl()}/post.html`;
//     alert("haha");
// });

// document.getElementById('modifyBtn').addEventListener('click',function(){
//     window.location.href = `${getServerUrl()}//board-modify.html?id=${item.id}`;
// });

// const loadPost = async () => {
async function loadPost(){
    try {
        // URL에서 ID 추출
        const params = new URLSearchParams(window.location.search);
        const boardId = params.get('id'); // 예: ?id=1
        if (!boardId) {
            alert('잘못된 접근입니다.');
            return;
        }

        const response = await fetch(`http://localhost:4000/api/boards/${boardId}`);
        const board = await response.json();
        const boardComments = board.comment;
        // console.log(boardComments[0]);
        // console.log('게시글 상세:', board);
        makePost(board);
        ///////////////////////////////////
        const tmp = await fetch(`http://localhost:4000/api/boards/${boardId}`);
        const inputData = await tmp.json();

        const addView = await fetch(`http://localhost:4000/api/boards/${boardId}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": inputData.id,
                "title": inputData.value,
                "content": inputData.value,
                "likes": inputData.likes,
                "views": inputData.views+1,
                "date":inputData.date,
                "writer": inputData.writer,
                "image":  inputData.image,
                "comment": inputData.comment || []
            }),
        });
        ///////////////////////////////////
        try {
            if (Array.isArray(boardComments)) {
                const commentList = document.querySelector('.commentList');
                boardComments.forEach((comment) => {
                    const commentElement = CommentItem({
                        comment_content: comment.ccontent,  //댓글 내용
                        user_id: board.writer,  //누가 썼는지
                        created_at: comment.ccdate, //언제 썼는지
                        profileImage: './public/image/default.jpg', // 기본 이미지
                        nickname: comment.cwriter,
                    }, board.writer, boardId, comment.cid);
                    commentList.appendChild(commentElement);
                    // console.log(comment.ccontent);
                    ;
                });
            }
        } catch (error) {
            console.error('댓글 데이터를 가져오지 못했습니다:', error);
        }
        // makeComment(boardComments);
    } catch (error) {
        // console.error('게시글 상세 데이터를 가져오지 못했습니다:', error);
    }
};

// JSON 데이터를 가져와 렌더링하는 함수
const makePost=(item) =>{
    const postContainer = document.getElementById('postContainer'); // 데이터를 추가할 컨테이너
    // const response = await fetch(`${getServerUrl()}/api/boards`); // JSON 파일 불러오기
    // const boardData = await response.json(); // JSON 데이터 파싱

    // 각 boardItem을 HTML로 변환 -> 나중에 수정/삭제는 본인아이디꺼만 되도록 수정
        
        let totalViews=item.views;
        let totalLikes=item.likes;
        let totalComments=item.comment.length;
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
                <section class="head">
                    <h1 class="title">${item.title}</h1>
                    <div class="writerWrap">
                        <picture class="profileImg">
                            <img src="${item.image}" alt="img"/>
                        </picture>
                        <h2 class="nickname">${item.writer}</h2>
                        <h3 class="createdAt">${item.date}</h3>
                        <div class="mod">
                            <button id="modifyBtn"><a href="/board-modify.html?id=${item.id}">수정</a></button>
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
                                <p id=likeCount>좋아요 <br> ${totalLikes}</p>
                            </div>
                            <div class="viewCount">
                                <h3></h3>
                                <p>조회수 <br>${totalViews}</p>
                            </div>
                            <div class="commentCount">
                                <h3></h3>
                                <p>댓글 <br> ${totalComments}</p>
                            </div>
                        </div>
                    </article>
                </section>
                <section class="comment">
                    <div class="commentInputWrap">
                        <textarea placeholder="댓글을 남겨주세요!" id="tarea"></textarea>
                        <div>
                            <button class="commentInputBtn">댓글 등록</button>
                        </div>
                    </div>
                    <div class="commentList"></div>
                </section>
            <div class="background"></div>
        `;
        postContainer.innerHTML = boardHTML; // HTML 추가
    console.log(postContainer);
}

const CommentItem = (data, writerId, postId, commentId) => {
    const CommentDelete = () => {
        Dialog(
            '댓글을 삭제하시겠습니까?',
            '삭제한 내용은 복구 할 수 없습니다.',
            async () => {
                const response = await deleteComment(postId, commentId);
                if (!response.ok) {
                    Dialog('삭제 실패', '댓글 삭제에 실패하였습니다.');
                    return;
                }

                if (response.status === HTTP_OK)
                    location.href = '/post.html?id=' + postId;
            },
        );
    };

    const CommentModify = () => {
        // 댓글 내용을 보여주는 p 태그 찾기
        const p = commentInfoWrap.querySelector('p');
        // 현재 댓글 내용 저장
        // const originalContent = p.innerHTML.replace(/<br>/g, '\n');
        const originalContent = p.innerHTML;

        // textarea 생성 및 설정
        const textarea = document.getElementById('tarea');
        // const textarea = document.createElement('textarea');
        textarea.value = originalContent;
        // textarea.style.width = '100%'; // textarea 너비 설정
        // textarea.style.height = '100px'; // textarea 높이 설정
        textarea.maxLength = 1500; // 최대 글자 수 제한

        // textarea.classList.add('comment');
        // textarea.classList.add('commentInputWrap');
        // 사용자가 입력할 때마다 글자 수 체크
        textarea.addEventListener('input', () => {
            if (textarea.value.length > 1500) {
                // 1500자를 초과하는 경우, 초과분을 자름
                textarea.value = textarea.value.substring(0, 1500);
                // 사용자에게 경고 메시지를 보여주는 방법도 고려할 수 있음
                // alert('댓글은 1500자를 초과할 수 없습니다.');
            }
        });

        // 수정 완료(저장) 버튼 생성 및 설정
        // const saveButton = document.createElement('button');
        const saveButton = document.querySelector('.commentInputBtn');
        saveButton.textContent='댓글 수정';
        saveButton.onclick = async () => {
            if (textarea.value.length === 0) {
                Dialog('수정 실패', '댓글은 1자 이상 입력해주세요.');
                return;
            }
            // 서버로 수정된 댓글 내용 전송하는 로직
            const updatedContent = textarea.value;
            const sendData = {
                commentContent: updatedContent,
            };

            const response = await updateComment(postId, commentId, sendData);
            if (!response.ok)
                return Dialog('수정 실패', '댓글 수정에 실패하였습니다.');

            location.href = '/post.html?id=' + postId;
        };

        // 취소 버튼 생성 및 설정
        const cancelButton = document.createElement('button');
        cancelButton.textContent = '취소';
        cancelButton.onclick = () => {
            // textarea를 원래의 p 태그로 다시 변경
            p.innerHTML = originalContent; // 원래 내용으로 복원
            // p.innerHTML = originalContent.replace(/\n/g, '<br>'); // 원래 내용으로 복원
            commentInfoWrap.replaceChild(p, textarea); // textarea를 p로 교체
            commentInfoWrap.removeChild(saveButton); // 저장 버튼 제거
            commentInfoWrap.removeChild(cancelButton); // 취소 버튼 제거
        };

        // p 태그를 textarea로 대체
        // commentInfoWrap.replaceChild(textarea, p);
        // // textarea 옆에 저장 버튼 추가
        // commentInfoWrap.appendChild(saveButton);
        // // 저장 버튼 옆에 취소 버튼 추가
        // commentInfoWrap.appendChild(cancelButton);
    };

    const commentItem = document.createElement('div');
    commentItem.className = 'commentItem';

    const picture = document.createElement('picture');

    const img = document.createElement('img');
    img.className = 'commentImg';
    img.src = data.profileImage === null ? DEFAULT_PROFILE_IMAGE : data.profileImage;
    picture.appendChild(img);

    const commentInfoWrap = document.createElement('div');
    commentInfoWrap.className = 'commentInfoWrap';

    const infoDiv = document.createElement('div');

    const h3 = document.createElement('h3');
    h3.textContent = data.nickname;
    infoDiv.appendChild(h3);

    const h4 = document.createElement('h4');
    const date = new Date(data.created_at);
    const formattedDate = `${date.getFullYear()}-${padTo2Digits(date.getMonth() + 1)}-${padTo2Digits(date.getDate())} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(date.getSeconds())}`;
    h4.textContent = formattedDate;
    infoDiv.appendChild(h4);

    // if (parseInt(data.user_id, 10) === parseInt(writerId, 10)) {
        const buttonWrap = document.createElement('span');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.onclick = CommentDelete;
        const modifyButton = document.createElement('button');
        modifyButton.textContent = '수정';
        modifyButton.onclick = CommentModify;

        buttonWrap.appendChild(modifyButton);
        buttonWrap.appendChild(deleteButton);

        infoDiv.appendChild(buttonWrap);
    // }

    const p = document.createElement('p');
    p.innerHTML = data.comment_content.replace(/(?:\r\n|\r|\n)/g, '<br>');

    commentInfoWrap.appendChild(infoDiv);
    commentInfoWrap.appendChild(p);

    commentItem.appendChild(picture);
    commentItem.appendChild(commentInfoWrap);

    return commentItem;
};

const Dialog = (title, description, submitCallBack, type = 'alert') => {
    const wrap = document.createElement('div');
    const titleWrap = document.createElement('h2');
    const descriptionWrap = document.createElement(
        type == 'alert' ? 'p' : 'textarea',
    );

    const buttonWrap = document.createElement('div');
    const cancelButton = document.createElement('button');
    const submitButton = document.createElement('button');

    wrap.classList.add('dialog');
    titleWrap.classList.add('dialog-title');
    descriptionWrap.classList.add('dialog-description');
    if (type == 'textarea') {
        descriptionWrap.classList.add('dialog-description-textarea');
    }
    buttonWrap.classList.add('dialog-button-wrap');
    cancelButton.classList.add('dialog-button');
    cancelButton.classList.add('dialog-button-cancel');
    submitButton.classList.add('dialog-button');
    submitButton.classList.add('dialog-button-submit');

    wrap.appendChild(titleWrap);
    wrap.appendChild(descriptionWrap);
    wrap.appendChild(buttonWrap);
    buttonWrap.appendChild(cancelButton);
    buttonWrap.appendChild(submitButton);

    titleWrap.textContent = title;
    descriptionWrap.textContent = description;
    cancelButton.textContent = '취소';
    submitButton.textContent = '확인';

    const Background = document.createElement('div');
    Background.classList.add('dialog-background');
    Background.appendChild(wrap);

    document.body.appendChild(Background);

    cancelButton.addEventListener('click', () => {
        Background.remove();
    });
    submitButton.addEventListener('click', () => {
        if (submitCallBack) {
            if (type == 'alert') submitCallBack();
            else submitCallBack(descriptionWrap.value);
        }
        Background.remove();
    });
};
const padTo2Digits = number => {
    return number.toString().padStart(2, '0');
};
// 페이지 로드 시 함수 호출
loadPost();

const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        : 'http://localhost:3000';
};

const helperText =document.getElementById('nickh');

let nickCnt=new Map();
nickCnt.set('ggg',1);
const nicknametmp='gg';
document.getElementById('signupBtn').addEventListener('click',function(){
    const nickname = document.getElementById('nickname').value;
    // alert("Ins");
    if(nickname.trim().length===0){
        helperText.innerHTML='닉네임을 입력해주세요.';
        helperText.style.display='block';
    }
    else if (nickname.trim()!==nickname){
        helperText.innerHTML='닉네임에 공백을 사용할 수 없습니다.';
        helperText.style.display='block';
    }
    else if (nickCnt.get(nickname) > 0){
        helperText.innerHTML='중복된 닉네임입니다.'; // 인증인가시 구현예정
        helperText.style.display='block';
    }
    else if(nickname.length>10){
        helperText.innerHTML='닉네임은 최대 10자 까지 작성 가능합니다.';
        helperText.style.display='block';
    }
    else{
        const message='수정완료';
        showToast(message,2000)
        setTimeout(() => {
            window.location.href =`${getServerUrl()}/posts.html`;
        }, 2500);
    }
    // fetch(`${getServerUrl()}/post.html`);
    // .then((response) => {
        // if(response.ok) 
            // window.location.href =`${getServerUrl()}/post.html`;
            // if(logInFlag) window.location.href =`${getServerUrl()}/posts.html`;
        
        // else alert("뭔가에러가있어요");
    // });
    
    // alert("???");
});

const showToast = (message, duration = 3000) => {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.classList.add('toastMessage');
    toast.textContent = message;

    container.appendChild(toast);

    // 메시지를 보여주기
    setTimeout(() => {
        toast.style.opacity = 1;
        // 조금 더 위로 올라가는 효과를 줄 수 있음
        toast.style.bottom = '30px';
    }, 100);

    // 메시지 숨기기 및 콜백 실행
    setTimeout(() => {
        toast.style.opacity = 0;
        // 원래 위치로 돌아가며 사라지는 효과
        toast.style.bottom = '20px';
        setTimeout(() => {
            // 페이드 아웃이 끝난 후 요소 제거
            toast.remove();
        }, 500); // CSS transition 시간에 맞춰 설정
    }, duration);
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
document.getElementById('withdrawBtn').onclick = async() => { // 인증-인가에서 구현예정
// document.addEventListener('click', async(event) => {
    // if(event.target.closest('#withdrawBtn')){
    // alert("d");
        Dialog(
            '회원탈퇴 하시겠습니까?',
            '작성된 게시글과 댓글은 삭제됩니다.',
            async () => {
                // alert("midcheck");
                const response = await deleteComment(postId, commentId);
                if (!response.ok) {
                    Dialog('삭제 실패', '댓글 삭제에 실패하였습니다.');
                    return;
                }
            
                if (response.status === HTTP_OK)
                    location.href = '/post.html?id=' + postId;
            },
        );
    // }
};
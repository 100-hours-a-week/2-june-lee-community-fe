const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        : 'http://localhost:3000';
};

const helperText =document.getElementById('nickh');

const nickname = document.getElementById('nickname');
const signupBtn = document.getElementById('signupBtn');
let nickCnt=new Map();
nickCnt.set('ggg',1);

nickname.addEventListener('blur', async ()=>{
    if((nickname.value.trim())){
        signupBtn.style.backgroundColor='#7f6aee';
        // allcomplete=true;
    }
    else{
        signupBtn.style.backgroundColor='#aca0eb';
        // allcomplete=false;
    }
});
const imagePreview = document.getElementById('imagePreview');
const inputImg = document.getElementById('profile-photo');
inputImg.addEventListener('change',()=>{
    const imFile=inputImg.files[0];
    if (!imFile.type.startsWith('image/')) {
        imagePreview.style.display = 'none';
        return;
    }
    
    // 파일 읽기 및 미리보기 표시
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            // `profileUploadButton` 크기에 맞게 canvas 생성
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const width = profileUploadButton.clientWidth; // 부모 요소 너비
            const height = profileUploadButton.clientHeight; // 부모 요소 높이

            canvas.width = width;
            canvas.height = height;

            // 이미지 크기 조정하여 canvas에 그리기
            ctx.drawImage(img, 0, 0, width, height);

            // canvas를 이미지 URL로 변환
            const resizedImage = canvas.toDataURL('image/jpeg');

            // 미리보기 이미지 업데이트
            imagePreview.src = resizedImage;
            imagePreview.style.display = 'block';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(imFile); 
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block'; // 미리보기 표시
    };
    reader.readAsDataURL(imFile);
    
    if((nickname.value.trim())){
        signupBtn.style.backgroundColor='#7f6aee';
        // allcomplete=true;
    }
    else{
        signupBtn.style.backgroundColor='#aca0eb';
        // allcomplete=false;
    }
});
document.getElementById('signupBtn').addEventListener('click', async () => {

    const response = await fetch('http://localhost:4000/api/users', {
        method: 'GET',
        credentials: 'include' // 쿠키 포함
    });

    if (response.ok) {
        console.log('인증 성공');
    } else {
        console.log('인증 실패');
        window.location.href=`http://localhost:3000/loginpage.html`;
    }

    // alert("Ins");
    if(nickname.value.trim().length===0){
        helperText.innerHTML='닉네임을 입력해주세요.';
        helperText.style.display='block';
    }
    else if (nickname.value.trim()!==nickname.value){
        helperText.innerHTML='닉네임에 공백을 사용할 수 없습니다.';
        helperText.style.display='block';
    }
    else if (nickCnt.get(nickname.value) > 0){
        helperText.innerHTML='중복된 닉네임입니다.'; // 인증인가시 구현예정
        helperText.style.display='block';
    }
    else if(nickname.value.length>10){
        helperText.innerHTML='닉네임은 최대 10자 까지 작성 가능합니다.';
        helperText.style.display='block';
    }
    else{
        const formData = new FormData();
        formData.append('nickname', nickname.value);
        if(inputImg.files[0]) formData.append('profileImage', inputImg.files[0]);
        
        const modifyInform = await fetch(`http://localhost:4000/api/users`, {
            method: 'PATCH',
            body: formData, // FormData 전송
            credentials: 'include' // 쿠키 포함
        });
        if (modifyInform.ok) {
            const message='수정완료';
            showToast(message,2000)
            console.log('수정 성공');
            setTimeout(async () => {
                window.location.href =`${getServerUrl()}/posts.html`;
            }, 2500);
        } else {
            console.log('수정 실패');
            // window.location.href=`http://localhost:3000/loginpage.html`;
        }
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
                    Dialog('탈퇴 실패', '회원탈퇴에 실패하였습니다.');
                    return;
                }
            
                // if (response.status === HTTP_OK)
                //     location.href = '/post.html?id=' + postId;
            },
        );
    // }
};
const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        : 'http://localhost:3000';
};
const inputTitle=document.getElementById('titleWrite');
const inputContent=document.getElementById('contentWrite');
const inputBtn=document.getElementById('board-write');
const inputImage=document.getElementById('image');
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
inputBtn.addEventListener('click',async()=>{
    
    if(writeFlag){
        const response = await fetch('http://localhost:4000/api/users/', {
            method: 'GET',
            credentials: 'include' // 쿠키 포함
        });
    
        if (response.ok) {
            console.log('인증 성공');
            const data = await response.json();
        } else {
            console.log('인증 실패');
            window.location.href=`http://localhost:3000/loginpage.html`;
        }
    
        // console.log('asdf');
        const formData = new FormData();
        formData.append('title', inputTitle.value);
        formData.append('content', inputContent.value);
        formData.append('likes', 0); // 초기값
        formData.append('views', 0); // 초기값
        formData.append('writer', response.json().nickname); // 작성자

        // 이미지 파일 추가
        if (inputImage.files[0]) {
            formData.append('image', inputImage.files[0]);
        }
        if (response.json().profileImg) {
            formData.append('profileImage', response.json().profileImg);
        }
        formData.append('comment',[]);
        // try {
            const postWrite = await fetch(`http://localhost:4000/api/boards`, {
                method: 'POST',
                body: formData, // FormData 전송
            });
    
        if(!postWrite.ok){
            console.error('게시글이 등록되지 않았습니다.');
        }
        else window.location.href =`${getServerUrl()}/posts.html`;
    }
    else{
        helperText.innerHTML='제목, 내용을 모두 입력해주세요';
        helperText.style.display='block';
    }
});
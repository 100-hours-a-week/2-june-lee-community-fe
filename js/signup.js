
const inputImg=document.getElementById('profile-photo');
const inputEmail=document.getElementById('email');
const inputPwd=document.getElementById('pw');
const inputPwck=document.getElementById('pwck');
const inputNkname=document.getElementById('nickname');
const inputBtn = document.getElementById('signupBtn');
const helperTextPhoto=document.getElementById('profileh');
const helperTextEmail=document.getElementById('emailh');
const helperTextPwd=document.getElementById('pwh');
const helperTextPwck=document.getElementById('pwckh');
const helperTextNkname=document.getElementById('nicknameh');
let imck=false;
let emck=false;
let pwck=false;
let pwkck=false;
let nkck=false;
let allcomplete=false;
function isValidPwd(value){
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(value);
}
function isValidEmail(value){
    return /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
}
const imagePreview = document.getElementById('imagePreview');
inputImg.addEventListener('change',()=>{
    const imFile=inputImg.files[0];
    if(!imFile){
        helperTextPhoto.innerText='이미지를 선택해주세요';
        helperTextPhoto.style.display='block';
        imagePreview.style.display='none'
        imck=false;
        return;
    }
    else{
        if (!imFile.type.startsWith('image/')) {
            helperTextPhoto.innerText = '이미지 파일만 업로드 가능합니다.';
            helperTextPhoto.style.display = 'block';
            imagePreview.style.display = 'none';
            imck=false;
            return;
        }
        imck=true;
        helperTextPhoto.style.display = 'none'; // 헬퍼 텍스트 숨김
        
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
    }
    if((imck && emck && pwck && pwkck && nkck)){
        inputBtn.style.backgroundColor='#7f6aee';
        allcomplete=true;
    }
    else{
        inputBtn.style.backgroundColor='#aca0eb';
        allcomplete=false;
    }
});
inputEmail.addEventListener('blur',()=>{
    if(!inputImg.value.trim()){
        helperTextPhoto.style.display='block';
        imck=false;
    }
    else{
        helperTextPhoto.style.display='none';
        imck=true;
    }
    //////////////////////////////////////////
    if(!inputEmail.value.trim()){
        helperTextEmail.innerHTML="이메일을 입력해주세요.";
        helperTextEmail.style.display='block';
        emck=false;
    }
    else if(!isValidEmail(inputEmail.value.trim())){
        helperTextEmail.innerText='올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
        helperTextEmail.style.display='block';
        emck=false;
    }
    else{
        helperTextEmail.style.display='none';
        emck=true;
    }
    // else if(!isValidEmail(inputEmail.value.trim())){
    //     helperTextEmail.innerText='중복된 이메일입니다.';
    //     helperTextEmail.style.display='block';
    // }
    if((imck && emck && pwck && pwkck && nkck)){
        inputBtn.style.backgroundColor='#7f6aee';
        allcomplete=true;
    }
    else{
        inputBtn.style.backgroundColor='#aca0eb';
        allcomplete=false;
    }

});
inputPwd.addEventListener('blur', ()=>{
    const check=isValidPwd(inputPwd.value.trim());
    const lengPwd=inputPwd.value.trim().length;
    
    if(!inputImg.value.trim()){
        helperTextPhoto.style.display='block';
        imck=false;
    }
    else{
        helperTextPhoto.style.display='none';
        imck=true;
    }
    //////////////////////////////////////////
    if(lengPwd===0){
        helperTextPwd.style.display = 'block';
        helperTextPwd.innerHTML="비밀번호를 입력해주세요.";
        pwck=false;
    }
    else if (!check) {
        helperTextPwd.innerHTML='비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        helperTextPwd.style.display = 'block';
        pwck=false;
    }
    else if((inputPwd.value.trim() && inputPwck.value.trim()) && inputPwd.value.trim() !== inputPwck.value.trim()){
        helperTextPwd.style.display='block';
        helperTextPwck.style.display='block';

        helperTextPwd.innerHTML='비밀번호가 다릅니다.';
        //검토받으면 확인창에서만 나오게 지울예정

        helperTextPwck.innerHTML='비밀번호가 다릅니다.';
        pwkck=false;
    }
    else {
        helperTextPwd.style.display='none';
        helperTextPwck.style.display='none';
        pwck=true;
        pwkck=true;
    }
    if((imck && emck && pwck && pwkck && nkck)){
        inputBtn.style.backgroundColor='#7f6aee';
        allcomplete=true;
    }
    else{
        inputBtn.style.backgroundColor='#aca0eb';
        allcomplete=false;
    }
});
inputPwck.addEventListener('blur', ()=>{
    const lengPwd=inputPwck.value.trim().length;
    
    if(!inputImg.value.trim()){
        helperTextPhoto.style.display='block';
        imck=false;
    }
    else{
        helperTextPhoto.style.display='none';
        imck=true;
    }
    //////////////////////////////////////////

    if(lengPwd===0){
        helperTextPwck.innerHTML="비밀번호를 한번 더 입력해주세요.";
        helperTextPwck.style.display = 'block';
        pwkck=false;
    }
    else if((inputPwd.value.trim() !== inputPwck.value.trim())){
        helperTextPwck.innerHTML='비밀번호가 다릅니다.';
        helperTextPwck.style.display='block';
        pwkck=false;
    }
    else {
        helperTextPwck.style.display='none';
        pwkck=true;
    }
    if((imck && emck && pwck && pwkck && nkck)){
        inputBtn.style.backgroundColor='#7f6aee';
        allcomplete=true;
    }
    else{
        inputBtn.style.backgroundColor='#aca0eb';
        allcomplete=false;
    }
});
inputNkname.addEventListener('blur',()=>{
    if(!inputImg.value.trim()){
        helperTextPhoto.style.display='block';
        imck=false;
    }
    else{
        helperTextPhoto.style.display='none';
        imck=true;
    }
    //////////////////////////////////////////

    if(!inputNkname.value.trim()){
        helperTextNkname.innerHTML="닉네임을 입력해주세요.";
        helperTextNkname.style.display = 'block';
        nkck=false;
    }
    else if(inputNkname.value !== inputNkname.value.trim()){
        helperTextNkname.innerHTML="띄어쓰기를 없애주세요.";
        helperTextNkname.style.display = 'block';
        nkck=false;
    }
    // else if(inputNkname.value !== inputNkname.value.trim()){
    //     helperTextNkname.innerHTML="중복된 닉네임입니다.";
    //     helperTextNkname.style.display = 'block';
    // }
    else if(inputNkname.value.length > 10){
        helperTextNkname.innerHTML="닉네임은 최대 10자 까지 작성 가능합니다.";
        helperTextNkname.style.display = 'block';
        nkck=false;
    }
    else{
        helperTextNkname.style.display='none';
        nkck=true;
    }
    if((imck && emck && pwck && pwkck && nkck)){
        inputBtn.style.backgroundColor='#7f6aee';
        allcomplete=true;
    }
    else{
        inputBtn.style.backgroundColor='#aca0eb';
        allcomplete=false;
    }
});

const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        // : 'http://localhost:3000';
        : '.';
};
// document.getElementById('backtologin').addEventListener('click',function(){
//     window.location.href=`${getServerUrl}/loginpage.html`;
// });
document.getElementById('signupBtn').addEventListener('click',async function(){
    if(!(imck && emck && pwck && pwkck && nkck)) return;


    // const formData = new FormData();
    // formData.append('nickname', inputNkname.value); // 작성자
    // formData.append('email', inputEmail.value);
    // formData.append('password', inputPwd.value);

    // // 이미지 파일 추가
    // if (inputImg.files[0]) {
    //     formData.append('image', inputImg.files[0]);
    // }
    // const response = await fetch(`http://localhost:4000/api/boards`, {
    //     method: 'POST',
    //     body: formData, 
    // });
    // fetch(`${getServerUrl()}/post.html`);
    // .then((response) => {
        // if(response.ok) 
            window.location.href =`${getServerUrl()}/loginpage.html`;
        
        // else alert("뭔가에러가있어요");
    // });
    
    // alert("???");
});

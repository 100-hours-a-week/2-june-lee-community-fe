
const inputImg=document.getElementById('profile-photo');
const inputEmail=document.getElementById('email');
const inputPwd=document.getElementById('pw');
const inputPwck=document.getElementById('pwck');
const inputNkname=document.getElementById('nickname');
const helperTextPhoto=document.getElementById('profileh');
const helperTextEmail=document.getElementById('emailh');
const helperTextPwd=document.getElementById('pwh');
const helperTextPwck=document.getElementById('pwckh');
const helperTextNkname=document.getElementById('nicknameh');

function isValidPwd(value){
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(value);
}
function isValidEmail(value){
    return /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
}
inputImg.addEventListener('change',()=>{
    if(!inputImg.value){
        helperTextPhoto.style.display='block';
    }
    else helperTextPhoto.style.display='none';
});
inputEmail.addEventListener('blur',()=>{
    if(!inputImg.value.trim()){
        helperTextPhoto.style.display='block';
    }
    else helperTextPhoto.style.display='none';
    //////////////////////////////////////////
    if(!inputEmail.value.trim()){
        helperTextEmail.innerHTML="이메일을 입력해주세요.";
        helperTextEmail.style.display='block';
    }
    else if(!isValidEmail(inputEmail.value.trim())){
        helperTextEmail.innerText='올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
        helperTextEmail.style.display='block';
    }
    else{
        helperTextEmail.style.display='none';
    }
    // else if(!isValidEmail(inputEmail.value.trim())){
    //     helperTextEmail.innerText='중복된 이메일입니다.';
    //     helperTextEmail.style.display='block';
    // }

});
inputPwd.addEventListener('blur', ()=>{
    const check=isValidPwd(inputPwd.value.trim());
    const lengPwd=inputPwd.value.trim().length;
    
    if(!inputImg.value.trim()){
        helperTextPhoto.style.display='block';
    }
    else helperTextPhoto.style.display='none';
    //////////////////////////////////////////
    if(lengPwd===0){
        helperTextPwd.style.display = 'block';
        helperTextPwd.innerHTML="비밀번호를 입력해주세요.";
    }
    else if (!check) {
        helperTextPwd.innerHTML='비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        helperTextPwd.style.display = 'block';
    }
    else if((inputPwd.value.trim() && inputPwck.value.trim()) && inputPwd.value.trim() !== inputPwck.value.trim()){
        helperTextPwd.style.display='block';
        helperTextPwck.style.display='block';

        helperTextPwd.innerHTML='비밀번호가 다릅니다.';
        //검토받으면 확인창에서만 나오게 지울예정

        helperTextPwck.innerHTML='비밀번호가 다릅니다.';
    }
    else {
        helperTextPwd.style.display='none';
        helperTextPwck.style.display='none';
    }
});
inputPwck.addEventListener('blur', ()=>{
    const lengPwd=inputPwck.value.trim().length;
    
    if(!inputImg.value.trim()) helperTextPhoto.style.display='block';
    else helperTextPhoto.style.display='none';
    //////////////////////////////////////////

    if(lengPwd===0){
        helperTextPwck.innerHTML="비밀번호를 한번 더 입력해주세요.";
        helperTextPwck.style.display = 'block';
    }
    else if((inputPwd.value.trim() !== inputPwck.value.trim())){
        helperTextPwck.innerHTML='비밀번호가 다릅니다.';
        helperTextPwck.style.display='block';
    }
    else {
        helperTextPwck.style.display='none';
    }
});
inputNkname.addEventListener('blur',()=>{
    if(!inputImg.value.trim()) helperTextPhoto.style.display='block';
    else helperTextPhoto.style.display='none';
    //////////////////////////////////////////

    if(!inputNkname.value.trim()){
        helperTextNkname.innerHTML="닉네임을 입력해주세요.";
        helperTextNkname.style.display = 'block';
    }
    else if(inputNkname.value !== inputNkname.value.trim()){
        helperTextNkname.innerHTML="띄어쓰기를 없애주세요.";
        helperTextNkname.style.display = 'block';
    }
    // else if(inputNkname.value !== inputNkname.value.trim()){
    //     helperTextNkname.innerHTML="중복된 닉네임입니다.";
    //     helperTextNkname.style.display = 'block';
    // }
    else if(inputNkname.value.length > 10){
        helperTextNkname.innerHTML="닉네임은 최대 10자 까지 작성 가능합니다.";
        helperTextNkname.style.display = 'block';
    }
    else{
        helperTextNkname.style.display='none';
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
document.getElementById('signupBtn').addEventListener('click',function(){
    const img = document.getElementById('profile-photo').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pw').value;
    const pwck = document.getElementById('pwck').value;
    const nkname = document.getElementById('nickname').value;

    // fetch(`${getServerUrl()}/post.html`);
    // .then((response) => {
        // if(response.ok) 
            window.location.href =`${getServerUrl()}/loginpage.html`;
        
        // else alert("뭔가에러가있어요");
    // });
    
    // alert("???");
});

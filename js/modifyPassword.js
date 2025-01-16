const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        : 'http://localhost:3000';
};

const inputPwd = document.getElementById('pw');
const inputPwck = document.getElementById('pwck');
const helperTextPwd = document.getElementById('pwh');
const helperTextPwck = document.getElementById('pwckh');
const signupBtn = document.getElementById('signupBtn');
let modifyFlag=false;
function isValidPwd(value){
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(value);
}

inputPwd.addEventListener('blur', ()=>{
    const check=isValidPwd(inputPwd.value.trim());
    const lengPwd=inputPwd.value.trim().length;
    
    //////////////////////////////////////////
    if(lengPwd===0){
        helperTextPwd.style.display = 'block';
        helperTextPwd.innerHTML="비밀번호를 입력해주세요.";
        signupBtn.style.backgroundColor='#ACA0EB';
        modifyFlag=false;
    }
    else if (!check) {
        helperTextPwd.innerHTML='비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        helperTextPwd.style.display = 'block';
        signupBtn.style.backgroundColor='#ACA0EB';
        modifyFlag=false;
    }
    else if((inputPwd.value.trim() && inputPwck.value.trim()) && inputPwd.value.trim() !== inputPwck.value.trim()){
        helperTextPwd.style.display='block';
        helperTextPwck.style.display='block';

        helperTextPwd.innerHTML='비밀번호 확인과 다릅니다.';
        //검토받으면 확인창에서만 나오게 지울예정

        helperTextPwck.innerHTML='비밀번호와 다릅니다.';
        signupBtn.style.backgroundColor='#ACA0EB';
        modifyFlag=false;
    }
    else if(check && (inputPwd.value.trim() && inputPwck.value.trim()) && inputPwd.value.trim() !== inputPwck.value.trim()){
        helperTextPwd.style.display='none';
        helperTextPwck.style.display='none';
        modifyFlag=true;
        signupBtn.style.backgroundColor='#7F6AEE';
    }
});
inputPwck.addEventListener('blur', ()=>{
    const lengPwd=inputPwck.value.trim().length;
    const check=isValidPwd(inputPwd.value.trim());

    if((inputPwd.value.trim() && inputPwck.value.trim()) && inputPwd.value.trim() !== inputPwck.value.trim()){
        helperTextPwck.innerHTML='비밀번호와 다릅니다.';
        helperTextPwck.style.display='block';
        signupBtn.style.backgroundColor='#ACA0EB';
        modifyFlag=false;
    }
    else if(check){
        helperTextPwd.style.display='none';
        helperTextPwck.style.display='none';
        modifyFlag=true;
        signupBtn.style.backgroundColor='#7F6AEE';
    }
});
signupBtn.addEventListener('click',()=>{
    if(modifyFlag){
        window.location.href=`${getServerUrl()}/posts.html`;
    }
});
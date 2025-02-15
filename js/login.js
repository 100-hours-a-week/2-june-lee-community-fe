const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        : '.';
};

// fetch(`${getServerUrl}/js/data.json`)
// response=>response.json()
// 입력 필드 선택
let inputFieldId = document.getElementById('id');
let inputFieldPwd = document.getElementById('pw');
let helperText = document.querySelector('.helperText');
const loginButton = document.getElementById('login');
let logInFlag=false;
function isValidPwd(value){
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(value);
}

inputFieldId.addEventListener('blur', ()=>{
    if(inputFieldId.value.trim() && isValidPwd(inputFieldPwd.value.trim())){
        logInFlag=true;
        loginButton.style.backgroundColor='#7f6aee';
        // console.log(inputFieldId.value);
        // console.log(inputFieldPwd.value);
    }
    else{
        logInFlag=false;
        loginButton.style.backgroundColor='#aca0eb';
    }
});

// 포커스를 잃었을 때 (blur 이벤트)
inputFieldPwd.addEventListener('blur', () => {
    const check=isValidPwd(inputFieldPwd.value.trim());
    const lengPwd=inputFieldPwd.value.trim().length;
    if(lengPwd===0){
        helperText.style.display = 'block';
        helperText.innerHTML="비밀번호를 입력하세요";
    }
    else if (!check) {
        helperText.innerHTML='비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        helperText.style.display = 'block';
    }
    else {
        helperText.style.display = 'none';
    }

    if(inputFieldId.value.trim() && isValidPwd(inputFieldPwd.value.trim())){
        logInFlag=true;
        loginButton.style.backgroundColor='#7f6aee';
    }
    else{
        logInFlag=false;
        loginButton.style.backgroundColor='#aca0eb';
    }
});

inputFieldPwd.addEventListener('input', () => {
    const lengPwd=inputFieldPwd.value.trim().length;
    const check= isValidPwd(inputFieldPwd.value.trim());
    if(lengPwd===0){
        helperText.style.display = 'block';
        helperText.innerHTML="비밀번호를 입력하세요";
    }
    else if (!check) {
        helperText.innerHTML='비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        helperText.style.display = 'block';
    }
    else {
        // 입력값이 있으면 헬퍼 텍스트 숨김
        helperText.style.display = 'none';
    }
});

// 입력 값이 변경될 때 (실시간으로 반응하려면 선택적 추가)
// inputFieldPwd.addEventListener('input', () => {
//     if (inputFieldPwd.value.trim() !== '') {
//         helperText.style.display = 'none';
//     }
// });


document.getElementById('login').addEventListener('click',async ()=>{
    const email = document.getElementById('id').value;
    const password = document.getElementById('pw').value;
    // fetch(`${getServerUrl()}/post.html`);
    // .then((response) => {
        // if(response.ok) 
            // window.location.href =`${getServerUrl()}/post.html`;
    if(logInFlag){
        const response = await fetch('http://localhost:4000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include' // 쿠키 포함
        });
    
        if (response.ok) {
            console.log('로그인 성공');
            window.location.href=`${getServerUrl()}/posts.html`;
        } else {
            console.log('로그인 실패');
        }
        // window.location.href =`${getServerUrl()}/posts.html`;
    }
        
        // else alert("뭔가에러가있어요");
    // });
    
    // alert("???");
});

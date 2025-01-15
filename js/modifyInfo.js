const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        : 'http://localhost:3000';
};

// fetch(`${getServerUrl}/js/data.json`)
// response=>response.json()
// 입력 필드 선택
const helperText =document.getElementById('nickh');
// let inputFieldId = document.getElementById('id');
// let inputFieldPwd = document.getElementById('pw');
// // let helperText = document.querySelector('.helperText');
// const loginButton = document.getElementById('login');
// let logInFlag=false;
// function isValidPwd(value){
//     return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(value);
// }

// inputFieldId.addEventListener('blur', ()=>{
//     if(inputFieldId.value.trim() && isValidPwd(inputFieldPwd.value.trim())){
//         logInFlag=true;
//         loginButton.style.backgroundColor='#7f6aee';
//         // console.log(inputFieldId.value);
//         // console.log(inputFieldPwd.value);
//     }
//     else{
//         logInFlag=false;
//         loginButton.style.backgroundColor='#aca0eb';
//     }
// });

// // 포커스를 잃었을 때 (blur 이벤트)
// inputFieldPwd.addEventListener('blur', () => {
//     const check=isValidPwd(inputFieldPwd.value.trim());
//     const lengPwd=inputFieldPwd.value.trim().length;
//     if(lengPwd===0){
//         helperText.style.display = 'block';
//         helperText.innerHTML="비밀번호를 입력하세요";
//     }
//     else if (!check) {
//         helperText.innerHTML='비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
//         helperText.style.display = 'block';
//     }
//     else {
//         helperText.style.display = 'none';
//     }

//     if(inputFieldId.value.trim() && isValidPwd(inputFieldPwd.value.trim())){
//         logInFlag=true;
//         loginButton.style.backgroundColor='#7f6aee';
//     }
//     else{
//         logInFlag=false;
//         loginButton.style.backgroundColor='#aca0eb';
//     }
// });

let nickCnt=new Map();
nickCnt.set('ggg',1);
const nicknametmp='ggg';
document.getElementById('signupBtn').addEventListener('click',function(){
    const nickname = nicknametmp;//document.getElementById('nickname').value;
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
        helperText.innerHTML='중복된 닉네임입니다.';
        helperText.style.display='block';
    }
    else if(nickname.length>10){
        helperText.innerHTML='닉네임은 최대 10자 까지 작성 가능합니다.';
        helperText.style.display='block';
    }
    else{
        window.location.href =`${getServerUrl()}/posts.html`;
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
// function loada(){
//     alert("hi");
// };
// loada();

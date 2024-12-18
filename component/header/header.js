
document.getElementById('drop').addEventListener('click',function(){
    alert("Oh...");
    console.log("Oh...")
});

const headerDropdownMenu = () => {
    const wrap = document.createElement('div');

    const modifyInfoLink = '회원정보수정';
    const modifyPasswordLink = '비밀번호수정';
    const logoutLink = '로그아웃';

    modifyInfoLink.href = '/modifyInfo.html';
    modifyPasswordLink.href = '/modifyPassword.html';
    logoutLink.addEventListener('click', () => {
        window.location.href = '/loginpage.html';
    });

    wrap.classList.add('drop');

    wrap.appendChild(modifyInfoLink);
    wrap.appendChild(modifyPasswordLink);
    wrap.appendChild(logoutLink);

    return wrap;
};

window.addEventListener('click', e => {
    const dropMenu = document.querySelector('.drop');
    if (dropMenu && !dropMenu.classList.contains('none')) {
        dropMenu.classList.add('none');
    }
});

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

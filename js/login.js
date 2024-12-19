const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        : '.';
};

// fetch(`${getServerUrl}/js/data.json`)
// response=>response.json()


document.getElementById('login').addEventListener('click',function(){
    const email = document.getElementById('id').value;
    const password = document.getElementById('pw').value;
    // fetch(`${getServerUrl()}/post.html`);
    // .then((response) => {
        // if(response.ok) 
            // window.location.href =`${getServerUrl()}/post.html`;
            window.location.href =`${getServerUrl()}/posts.html`;
        
        // else alert("뭔가에러가있어요");
    // });
    
    // alert("???");
});

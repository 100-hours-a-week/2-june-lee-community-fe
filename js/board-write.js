
const getServerUrl = () => {
    const host = window.location.hostname;
    return host.includes('localhost')
        ? 'http://localhost:3000'
        : '.';
};

let data = {};

const loadData = ()=>{
    const response=fetch(`${getServerUrl()}/js/data.json`);
    data=response.json();
    
};


document.getElementById('submit').addEventListener('click',function(){
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').value;
    // .then((response) => {
        // if(response.ok) 
    // addPost(0, "2024-12-02", title, content, 0,  "NULL", "june", 0, 0)
            addPost(0, title, content, 0, image,0, 0, 0);
            window.location.href =`${getServerUrl()}/post.html`;
        // else alert("뭔가에러가있어요");
    // });
    
    // alert("???");
});

const addPost = (postId, date, postTitle, hits, imgUrl, writer, commentCount, like) => {
    if(!date || !postTitle || !writer ||
       hits === undefined || commentCount === undefined
    ) return;
    const post = document.createElement('div');

    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    const formattedDate = `${year}-${padTo2Digits(month)}-${padTo2Digits(day)} ${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    const profileImagePath = imgUrl === null ? '../public/image/profile/default.jpg' : imgUrl;

    post.innerHTML = `
    <a href="/board.html?id=${postId}">
        <div class="boardItem">
            <h2 class="title">${postTitle}</h2>
            <div class="info">
                <h3 class="views">좋아요 <b>${like}</b></h3>
                <h3 class="views">댓글 <b>${commentCount}</b></h3>
                <h3 class="views">조회수 <b>${hits}</b></h3>
                <p class="date">${formattedDate}</p>
            </div>
            <div class="writerInfo">
            <picture class="img">
                <img src="${profileImagePath}" alt="img">
            </picture>
            <h2 class="writer">${writer}</h2>
        </div>
        </div>
    </a>
`;
    document.getElementById('boardItem').appendChild(post);
    data.posts.push(post);
}
document.addEventListener('DOMContentLoaded',loadData);
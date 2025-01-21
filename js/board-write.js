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
        console.log('asdf');
        const response = await fetch(`http://localhost:4000/api/boards`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title": `${inputTitle.value}`,
                "content": `${inputContent.value}`,
                "likes": 0,
                "views": 0,
                "writer": "june",
                "image": inputImage.files[0]?.name || '',
                "comment": []
            }),
        });
        if(!response.ok){
            console.error('게시글이 등록되지 않았습니다.');
        }
        else window.location.href =`${getServerUrl()}/posts.html`;
    }
    else{
        helperText.innerHTML='제목, 내용을 모두 입력해주세요';
        helperText.style.display='block';
    }
});
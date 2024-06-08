const form=document.querySelector('.form');
const data=document.querySelector('.empty')
form.addEventListener('submit',function(e){
    e.preventDefault()
    const pay=new FormData(form);
    const payload=new URLSearchParams(pay);
    const options={
        method:'POST',
        body:payload
    };
    fetch('../api',options)
    .then((res)=>res.json())
    .then((responseData)=>{
        console.log(responseData)
        data.innerHTML=responseData.name
    })
    .catch(err=>{
        console.log(err)
    })
});

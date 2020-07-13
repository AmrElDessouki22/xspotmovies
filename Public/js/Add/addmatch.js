const first = document.getElementById('first')
const sec = document.getElementById('sec')
const image_poster = document.getElementById('imageposter')
const time = document.getElementById('time')
const embbed = document.getElementById('video')
const save = document.getElementById('save')
save.addEventListener('click',save_)

function save_()
{
    const body = {firstteam:first.value,secoundteam:sec.value,
        posterlink:image_poster.value,time:time.value,video:embbed.value
}
addfilm(body)
}
async function addfilm(body_){
    const response = await fetch(url+'/addmatch',{
        method:"POST",
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
        body:JSON.stringify(body_)
    })    
    if(response.status != 200){
        alert('something going wrong')
    }else{
        location.href='../dashboard/football'
    }
}
const id = document.getElementById('id')
const first = document.getElementById('first')
const sec = document.getElementById('sec')
const image_poster = document.getElementById('imageposter')
const time = document.getElementById('time')
const embbed = document.getElementById('video')
const update = document.getElementById('update')
getitem()
update.addEventListener('click',updatefilm)
async function updatefilm(){
    
    
    const response = await fetch(url+'/updatematch/'+id.value,
    {
        method:'PATCH',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
        body:JSON.stringify({firstteam:first.value,secoundteam:sec.value,
            posterlink:image_poster.value,time:time.value,video:embbed.value
        })
    })
    if(response.status==200)
    {
        location.href=url+'/dashboard/football'
    }else
    {

    }

}


async function getitem()
{
    const response = await fetch(url+'/getmatche/'+id.value,
    {
        method:'GET',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
    })
    if(response.status==200)
    {
        setdata(await response.json())
    }else
    {

    }

} 


function setdata(json)
{
    
    first.value = json.firstteam
    sec.value = json.secoundteam
    image_poster.value = json.posterlink
    time.value = json.time
    embbed.value = json.video
}
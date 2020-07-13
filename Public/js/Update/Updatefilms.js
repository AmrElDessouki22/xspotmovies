const id = document.getElementById('id')
const name = document.getElementById('name')
const year = document.getElementById('year')
const image_poster = document.getElementById('image_poster')
const type = document.getElementById('type')
const Description = document.getElementById('Description')
const actor1 = document.getElementById('actor1')
const actor2 = document.getElementById('actor2')
const actor3 = document.getElementById('actor3')
const actor4 = document.getElementById('actor4')
const embbed = document.getElementById('embbed')
const update = document.getElementById('update')
getitem()
update.addEventListener('click',updatefilm)
async function updatefilm(){
    
    
    const response = await fetch(url+'/updateonlyfilm/'+id.value,
    {
        method:'PATCH',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
        body:JSON.stringify({name:name.value,year:year.value,
            posterlink:image_poster.value,type:type.value,
            description:Description.value,Cast:[
                {actors:actor1.value},
                {actors:actor2.value},
                {actors:actor3.value},
                {actors:actor4.value}
            ],videoembbed:embbed.value
        })
    })
    if(response.status==200)
    {
        location.href=url+'/dashboard/films'
    }else
    {

    }

}


async function getitem()
{
    const response = await fetch(url+'/getfilm/'+id.value,
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
    console.log(json.videoembbed);
    
    name.value = json.name
    year.value = json.year
    image_poster.value = json.posterlink
    Description.value = json.description
    type.value = json.type
    try{
        actor1.value = json.Cast[0].actors
    }catch{
        actor1.value = ''
    }
    try{
        actor2.value = json.Cast[1].actors
    }catch{
        actor2.value = ''
    }
    try{
        actor3.value = json.Cast[2].actors
    }catch{
        actor3.value = ''
    }
    try{
        actor4.value = json.Cast[3].actors
    }catch{
        actor4.value = ''
    }
    
    embbed.value = json.videoembbed
}
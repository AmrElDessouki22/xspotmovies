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
const countiner = document.getElementById('videos')
const addepisodarr = document.getElementById('appon')
videos=[]
var i_ =0;

getitem()
update.addEventListener('click',updateseries)
async function updateseries(){
    
    
    const response = await fetch(url+'/updateonlyseries/'+id.value,
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
            ],videoembbed:getallvideosarray() // we need update episodes from inter not from get request ... videos is false answer
        })
    })
    if(response.status==200)
    {
        location.href=url+'/dashboard/series'
    }else
    {

    }

}


async function getitem()
{
    const response = await fetch(url+'/getseries/'+id.value,
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
    for(let i =0;i<json.videoembbed.length;i++)
    {
        
        const arrvideos = '<div><h2>'+(i+1)+'</h2><input id='+(i+1)+' value='+json.videoembbed[i].epsiod+' type="text" placeholder="video link html"></div>'
        countiner.innerHTML += arrvideos
        i_=i+1
        
    }
  

    
}
addepisodarr.addEventListener('click',addepisode)
function addepisode(){
    i_ = i_+1    
    const arrvideos = '<div><h2>'+(i_)+'</h2><input id="'+(i_)+'" type="text" placeholder="video link html"></div>'
    countiner.innerHTML += arrvideos
}
function getallvideosarray()
{
    for(let i=1;i<i_+1;i++)
    {
        let item = document.getElementById(i)
        videos.push({epsiod:item.value})
    }
    
    return videos
}
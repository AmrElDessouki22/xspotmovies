const name = document.getElementById('name')
const year = document.getElementById('year')
const image_poster = document.getElementById('image_poster')
const type = document.getElementById('type')
const Description = document.getElementById('Description')
const actor1 = document.getElementById('actor1')
const actor2 = document.getElementById('actor2')
const actor3 = document.getElementById('actor3')
const actor4 = document.getElementById('actor4')
const embbed = document.getElementById('0')
const save = document.getElementById('save')
const items = document.getElementById('items')
const addepisodarr = document.getElementById('addepisodarr')
const numbersofepisods= document.getElementById('numbersofepisods')
var realepsiodenumber = 0;
addepisodarr.addEventListener('click',addepisodes_)
function addepisodes_()
{
    realepsiodenumber = numbersofepisods.value
    items.innerHTML =''
    for(let i = 0;i<numbersofepisods.value;i++)
{
    
    const episodes_items = '<h2>'+(i+1)+'</h2><input id="'+(i+1)+'" type="text" placeholder="video link html">'
    items.innerHTML += episodes_items
}
}
save.addEventListener('click',save_)
function save_()
{
    const body = {name:name.value,year:year.value,
    posterlink:image_poster.value,type:type.value,
    description:Description.value,Cast:[
        {actors:actor1.value},
        {actors:actor2.value},
        {actors:actor3.value},
        {actors:actor4.value}
    ],videoembbed:getvideosembbed()
}
addseries(body)
}
function getvideosembbed()
{
    var arr = []
    for(let i =0;i<realepsiodenumber;i++)
    {
        let id = document.getElementById((i+1).toString())
        arr.push({epsiod:id.value})
    }
    return arr;
}
async function addseries(body_){
    const response = await fetch(url+'/addseries',{
        method:"POST",
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
        body:JSON.stringify(body_)
    })    
    if(response.status != 200){
        alert('something going wrong')
        
        
       
    }else{
        location.href='../dashboard/series'
    
        
    }
}
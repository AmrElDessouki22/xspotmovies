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
const save = document.getElementById('save')
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
    ],videoembbed:embbed.value
}
addfilm(body)
}
async function addfilm(body_){
    const response = await fetch(url+'/addfilm',{
        method:"POST",
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
        body:JSON.stringify(body_)
    })    
    if(response.status != 200){
        alert('something going wrong')
        
        
       
    }else{
        location.href='../dashboard/films'
    
        
    }
}
const countiner = document.getElementById('countiner')
var films_=[]
//http://localhost:3000
//https://xspot.herokuapp.com
const urll = 'https://xspot.herokuapp.com'
const update_endpoint = document.getElementById('helper').getAttribute('update-endpoint')
const get_endpoint = document.getElementById('helper').getAttribute('end-point')
const finsh_endpoint = document.getElementById('helper').getAttribute('finsh-endpoint')
const reomve_endpoint = document.getElementById('helper').getAttribute('reomve-endpoint')
const add_item = document.getElementById('helper').getAttribute('add-item')
const additem = document.getElementById('additem')
additem.addEventListener('click',additem_)
function additem_(){

    location.href=add_item

}
getitems()
async function getitems(){
    
   const response = await fetch(urll+get_endpoint,{
       method:"GET",
       headers:{'Content-Type':'application/json'}
       })  
     
   if(response.status != 200){

       alert('Something going wrong')
       
      
   }else{
       
    setdata(await response.json())
       
   }
}
async function setdata(films)
{

    films_ = films
    for(let i =0;i<films.length;i++)
    {  
        let name =  get_endpoint!='/getmatche'?films[i].name:films[i].firstteam+' vs '+films[i].secoundteam
        let posterlink = films[i].posterlink
        
        const div = '  <div><div class="piceone"><img src="'+posterlink+'" alt=""></div><div class="picetwo"><h1>'+name+'</h1></div><div class="picethree"><h1 onclick="update('+i+');">update</h1><h1 onclick="remove('+i+');">remove</h1></div></div>'
    
        countiner.innerHTML += div
    }
}
async function update(index)
{
    location.href=update_endpoint+films_[index]._id
    
}
async function remove(index)
{
    const response =await fetch(urll+reomve_endpoint+films_[index]._id,{
        method:"Post",
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
    })
    if(response.status == 200)
    {
        location.href = urll+'/dashboard'+finsh_endpoint
    }

    
}







//nav
const films = document.getElementById('films')
films.addEventListener('click',films__)
function films__(){
    location.href=urll+'/dashboard/films'
}
const series = document.getElementById('series')
series.addEventListener('click',series__)
function series__(){
    location.href=urll+'/dashboard/series'
}
const football = document.getElementById('football')
football.addEventListener('click',football__)
function football__(){
    location.href=urll+'/dashboard/football'
}
const logout = document.getElementById('logout')
logout.addEventListener('click',logout_)
async function logout_(){
    
   const response = await fetch(urll+'/logoutadmin',{
       method:"POST",
       headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
   })  
   console.log(response.status);
     
   if(response.status != 200){
       alert('something going wrong')
   }else{
       location.href='../dashboard/login'
   }
}
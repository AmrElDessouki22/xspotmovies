
const logout = document.getElementById('logout')
const film = document.getElementById('film')
const series = document.getElementById('series')
const football = document.getElementById('football')
film.addEventListener('click',film_)
function film_()
{
    location.href='../dashboard/films'
}
series.addEventListener('click',series_)
function series_()
{
    location.href='../dashboard/series'
}
football.addEventListener('click',football_)
function football_(){
    location.href='../dashboard/football'

}
logout.addEventListener('click',logout_)
async function logout_(){
    
   const response = await fetch(url+'/logoutadmin',{
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
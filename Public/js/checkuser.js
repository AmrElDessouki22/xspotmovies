//http://localhost:3000
//https://xspot.herokuapp.com
const url = 'https://xspot.herokuapp.com'
var from = document.getElementById("checkuser").getAttribute("data-name");
checkuser()
 async function checkuser(){
    const response = await fetch(url+'/checkuser',{
        method:"GET",
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+document.cookie.split('=')[1]},
    })    
    if(response.status != 200){
        console.log('hello');
        
        if(from !='login')
        {
            console.log('hello2');

            location.href='../dashboard/login'
        }
        console.log(response.status);
        
       
    }else{
        console.log(response.status);
        if(from =='login'){
            location.href='../dashboard/catigory'

        }else{
            console.log('admin');
            
        }
        
        
    }
}
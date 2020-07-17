
const loginbutton = document.getElementById('login')
const email = document.getElementById('email')
const password = document.getElementById('password')
loginbutton.addEventListener('click',login)
 async function login(){
     const body_ = {email:email.value,password:password.value}
     
    const response = await fetch('http://xspot.herokuapp.com'+'/loginAdmin',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(body_)
    })  
    console.log(response.status);
      
    if(response.status != 200){

        alert('cant login')
        
       
    }else{
        location.href='../dashboard/catigory'
    }
}
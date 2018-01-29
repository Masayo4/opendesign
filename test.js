'use strict';
var damage =500;
var num =0;

window.addEventListener('load', function (){
  var head = document.querySelector('#head');

  // WebI2C Initialized
  navigator.requestI2CAccess()
    .then(function(i2cAccess){
      var port = i2cAccess.ports.get(1);
      var ads1015 = new ADS1015(port,0x48);
      ads1015.init().then(()=>{
        console.log("new");
        setInterval(() => {
          ads1015.read(0).then((value) => {
            console.log('value:', value);
            mini(value);

          }, (err) => {
            if(err.code != 4){
              head.innerHTML = "ERROR";
            }
            console.log('error: code:'+err.code+" message:"+err.message);
          });
        },100);
      }, (err)=> {
        console.log("ADS1015.init error"+err.message);
      });
    });
}, false);



function monstershow(){
  num =Math.floor(Math.random()*10);
  if(num>4){
    num =0;
  }
    window.location.href="monster"+num+".html";
  }

function mini(x){
  if(x ==0){
  damage = damage -5;
  console.log(damage);
}
  if(damage<0){
    window.location.href="clear.html"
  }
}

function showpage(){
      document.getElementById("load").style.display="none";
       // switch to stereoscopic mode directly on page load, this needs to be after the a-scene loads.
       var scene = document.querySelector('a-scene');
       if (scene.hasLoaded) {
           scene.enterVR();
       } else {
           scene.addEventListener('loaded', function () {
               setTimeout(function () {
                   scene.enterVR();
               }, 10000);
           });
       };
   };

//setTimeout(showpage(),10000)


var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0; /*作為計分用*/

hole.addEventListener('animationiteration', () =>{
    /*Math.random() 返回介於０（包含）～１(不包含)之間的數字*/
    var random = -(Math.random()*300+150); /*要隨機產生 通過洞的位置 讓top的數值出現在 -450~-150之間 */
    hole.style.top = random + "px";
    counter++;
})

setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    /*不懂 哈哈*/
    
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500-characterTop); /*顯示character距離上邊界的距離*/
    
    if (jumping == 0){
    character.style.top = (characterTop+3)+"px";
    }
    if((characterTop>510)||((blockLeft<20)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+130)))){
        alert("Game Over! Your Score:" + counter);
        character.style.top = 100 + "px";
        counter = 0;
    }
    /*製造地心引力 讓character位置不斷掉下去*/
},10);

function jump(){
    jumping = 1; /* 點一下 jumping的數值就變成1 打破地心引力的if==0 character不會下墜*/
    let jumpCount = 0; /* 計算jumpInterval 執行了幾次 避免他持續跳動*/
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){ /*這個if 是避免character上升超出上面的邊界*/ /*另一個是當循環執行15次之後會停止上升 讓操控有一點滯留感 避免覺得點一下就爆衝高度 操控體驗更好*/
        character.style.top = (characterTop-4)+"px";/*點了之後就會往上移動*/
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);/*當interval執行20次之後 循環就會停止 避免character無限往上跑*/
            jumping = 0; /*讓jumping變數變回０ 地心引力才會重新作用*/
            jumpCount = 0; /*全部重新開始*/
        }
        jumpCount ++
    },10);
}
    
   
let points = [[-2, 0], [-1,-1], [0, -1],[1,0],[1,2],[0,3],[-1,3],[-2,2],[-3,2],[-4,1],[-4,-2],[-5,-4],[-4,-4],[-3,-2],[-2,-1],[-2,-3], [-2,-4], [-1, -4],[0,-4],[0,-2],[2,-2],[2,-4], [4, -4],[4,1],[3,2],[1,2],[1,2]]; //list資料，

var fill_colors = "d8e2dc-ffe5d9-ffcad4-f4acb7-9d8189".split("-").map(a=>"#"+a)
var line_colors = "22223b-4a4e69-9a8c98-c9ada7-f2e9e4".split("-").map(a=>"#"+a)


var score = 0


function preload(){  //程式碼準備執行之前，所執行的程式碼內容，比setup()更早執行
  elephant_sound = loadSound("sound/elephant.wav")
  bullet_sound = loadSound("sound/Launchingwire.wav")
}

//++++++畫points所有點的物件變數
var liura //目前要處理的物件，暫時放在liura變數內
var liukko = []  //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此。

//++++++設定飛彈物件的變數
var bullet //目前要處理的物件，暫時放在bullet變數內
var bullets = []  //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此。
//+++++++++++++++++

//++++++設定怪獸物件的變數
var monster 
//+++++++++++++++++

//++++++設定砲台位置
var shipP //目前要處理的物件，暫時放在mon變數內
var monsters = []  //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此。
//+++++++++++++++++

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP= createVector(width/2,height/2)  //預設砲台的位置為(width/2,height/2)
  for(var i=0;i<20;i=i+1){  //i=0,1,2,3,4,5,6,7,8,9
    liura = new Obj({})  //產生一個Obj class元件
    liukko.push(liura)  //把liura的物件放入到liukko陣列內
  }
  for(var i=0;i<10;i=i+1){  //i=0,1,2,3,4,5,6,7,8,9
    monster = new Monster({})  //產生一個Obj class元件
    monsters.push(monster)  //把liura的物件放入到liukko陣列內
  }

}

function draw() {
  background(200);
  // for(var j=0;j<liukko.length;j=j+1){
  //   liura = liukko[j]
  //   liura.draw()
  //   liura.update()
  // }

  if(keyIsPressed){

    if(key=="ArrowLeft" || key=="a"){  //按下鍵盤的往左鍵
      shipP.x = shipP.x - 5
    }
    if(key=="ArrowRight" || key=="d"){  //按下鍵盤的往右鍵
      shipP.x = shipP.x + 5
    }
    if(key=="ArrowUp" || key=="w"){  //按下鍵盤的往上鍵
      shipP.y = shipP.y - 5
    }
    if(key=="ArrowDown" || key=="s"){  //按下鍵盤的往下鍵
      shipP.y = shipP.y + 5
    }

  }
  //大象的顯示
  for(let liura of liukko) //只要是陣列的方式都可以用這個處理
  {
    liura.draw()
    liura.update()
    for(let bullet of bullets){   //檢查每一個飛彈物件
      if(liura.isBallInRanger(bullet.p.x,bullet.p.y)){  //飛彈物件有沒有碰觸到
        liukko.splice(liukko.indexOf(liura),1)  //從倉庫liukko取出被滑鼠按到的物件編號(liukko.indexOf(liura))，只取一個
        bullets.splice(bullets.indexOf(bullet),1)
        score = score - 1
        elephant_sound.play()
      }
    }
  }
 
  //飛彈的顯示
  for(let bullet of bullets) //只要是陣列的方式都可以用這個處理
  {
    bullet.draw()
    bullet.update()
  }

  //怪物的顯示
  for(let monster of monsters) //只要是陣列的方式都可以用這個處理
  {
    if(monster.dead == true && monster.timenum>5){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){   //檢查每一個飛彈物件
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){  //飛彈物件有沒有碰觸到
        // monsters.splice(monsters.indexOf(monster),1)  //從倉庫liukko取出被滑鼠按到的物件編號(liukko.indexOf(liura))，只取一個
        bullets.splice(bullets.indexOf(bullet),1)
        score = score + 1
        monster.dead = true
        // elephant_sound.play()
      }
  }

  textSize(50)
  text(score,50,50) //在座標(50,50)上，顯示socre分數內容
  push()  //重新規劃原點(0,0)，在視窗的中間
    let dx = mouseX - width/2
    let dy = mouseY - height/2
    let angle = atan2(dy,dx)
    translate(shipP.x,shipP.y)  //把砲台的中心點放在視窗的中間
    fill("#EF6F6C")
    noStroke()
    rotate(angle)
    triangle(-25,-25,-25,25,50,0)  //設定三個點，畫成一個三角形
    ellipse(0,0,50)

  pop()  //恢復原本設定，原點(0,0)在視窗的左上角
 }
}

function mousePressed(){



//   //++++++++++++++++++++++++產生一個物件+++++++++++++++++++++++++++++
//   liura = new Obj({
//     p:{x:mouseX,y:mouseY}
//   })  //在滑鼠按下的地方，產生一個新的Obj class元件
//   liukko.push(liura)  //把liura的物件放入到liukko陣列內(丟到倉庫)
//   //++++++++++++++++++++++++產生一個物件+++++++++++++++++++++++++++++

//在物件上按下滑鼠，分數加一
//   for(let liura of liukko){  //檢查每一個物件
//     if(liura.isBallInRanger(mouseX,mouseY)){
//       liukko.splice(liukko.indexOf(liura),1)  //從倉庫liukko取出被滑鼠按到的物件編號(liukko.indexOf(liura))，只取一個
//       score = score + 1
//     }
//   }
//   //++++++++++++++++++++++++++++++++++

//   //++++++++++++++++++++++++按一下產生一個飛彈+++++++++++++++++++++++++++++
  bullet = new Bullet({
  r:20
  }) //在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)
  bullets.push(bullet) //把bullet的物件放入到bullets陣列內
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){  //按下空白鍵，發射飛彈，其實跟按下滑鼠的功能一樣
    bullet = new Bullet({}) //在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)
    bullets.push(bullet) //把bullet的物件放入到bullets陣列內
    bullet_sound.play()
  }
  
}
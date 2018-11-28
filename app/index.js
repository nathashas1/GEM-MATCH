
document.addEventListener("DOMContentLoaded", () => {
});


window.addEventListener("load", () => {

  var ctx, balls = [];
  var orange = document.getElementById("orange");
  var red = document.getElementById("red");
  var blue = document.getElementById("blue");
  var green = document.getElementById("green");
  var grey = document.getElementById("grey");
  var purple = document.getElementById("purple");
  var imageList = [orange, red, blue, green, grey, purple];

  function Ball(x,y) {
  }

  function hide() {
    const overlay = document.querySelector(".overlay-container");
    overlay.style.left = "100vw";
    overlay.style.opacity = 0;
    // const main = document.querySelector(".maincontainer");
    //   main.style.width = "100%";
  }

  function unhide() {
    const overlay = document.querySelector(".overlay-container");
    overlay.style.left = "0";
    overlay.style.opacity = 1;
    const main = document.querySelector(".maincontainer");
      main.style.width = "100%";
      initialize();
  }
  window.unhide = unhide;

  const button = document.querySelector(".start");
  button.addEventListener("click", ()=> {
    hide();
  });

  const restartbutton = document.querySelector(".unhide");
  restartbutton.addEventListener("click", unhide);

  let score = 0;
  let moves = 10;
  function initialize(){
    //Create ball Objects

    score = 0;
    moves = 10;
    for (let x = 0; x < 10; x++) {
      balls[x] = [];
      for (let y = 0; y < 10; y++) {
        balls[x][y] = new Ball(x,y);
      }
    }

    //Set Color
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        while (true) {
          var colorNum = Math.floor(Math.random() * 6);
          if (checkColor(x, y, colorNum)) {
            balls[x][y].color = colorNum;
            break;
          }
        }
      }
    }
    // initialize canvas
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 600, 600);
    paint();
    document.getElementById("canvas").addEventListener("click", clickHandler);
  }

  function checkColor(x, y, c) {
    let flag =true;

    if(x > 1) {
      let c0 = balls[x-2][y].color;
      let c1 = balls[x-1][y].color;
      if (c0 === c1 && c1 === c) {
        flag = false;
      }
    }

    if(y > 1) {
      let c0 = balls[x][y-2].color;
      let c1 = balls[x][y-1].color;
      if (c0 === c1 && c1 === c) {
        flag = false;
      }
    }
    return flag;
  }



  // function replacecheckColor(x, y, c) {
  //   let flag =true;
  //
  //   if(x > 1) {
  //     let c0 = balls[x-1][y].color;
  //
  //       if (c0 === c) {
  //         flag = false;
  //       }
  //     }
  //   if(y > 1) {
  //     let c0 = balls[x][y-1].color;
  //     if (c0 === c) {
  //       flag = false;
  //     }
  //   }
  //   return flag;
  // }


  // function realpaint() {
  //   for (let x = 0; x < 10; x++) {
  //     for (let y = 0; y < 10; y++) {
  //       // drawImage(image, x, y, width, height)
  //
  //       if (balls[x][y] === undefined) {
  //         balls[x][y] = new Ball(x,y);
  //         while (true) {
  //           var colorNum = Math.floor(Math.random() * 6);
  //           if (checkColor(x, y, colorNum)) {
  //             balls[x][y].color = colorNum;
  //             break;
  //           }
  //         }
  //
  //       }
  //       ctx.drawImage(imageList[balls[x][y].color], x*60, y*60+100, 60, 60);
  //     }
  //   }
  //   ctx.font = 'bold 20px open Sans';
  //   ctx.textAlign = 'center';
  //   ctx.fillText('Moves Left : 10', 150, 50);
  //   ctx.clearRect(400, 0, 100, 100);
  //   ctx.fillText(score, 450, 50);
  // }

  function paint(deletedCount) {



        // drawImage(image, x, y, width, height)

        for (let j = 0; j < 10; j++) {
          for (let k = 9; k > 0; k--) {

            if (balls[j][k] === undefined) {
              console.log("in undefined");
              let tempStore = balls[j][k-deletedCount];
              balls[j][k] = tempStore;
              balls[j][k-deletedCount] = undefined;
            }
          }
        }


        for (let x = 0; x < 10; x++) {
          for (let y = 0; y < 10; y++) {

            if (balls[x][y] === undefined) {

              balls[x][y] = new Ball(x,y);

            }
          }
        }


        for (let x = 0; x < 10; x++) {
          for (let y = 0; y < 10; y++) {
            if (balls[x][y].color === undefined) {
              while (true) {
                var colorNum = Math.floor(Math.random() * 6);
                if (checkColor(x, y, colorNum)) {
                  balls[x][y].color = colorNum;
                  break;
                }
              }
            }
          }
        }
        for (let x = 0; x < 10; x++) {
          for (let y = 0; y < 10; y++) {
            ctx.drawImage(imageList[balls[x][y].color], x*60, y*60+100, 60, 60);
          }
        }


    ctx.font = 'bold 20px open Sans';
    ctx.textAlign = 'center';
    ctx.clearRect(200, 0, 300, 100);
    ctx.fillText('Moves Left :' , 150, 50);
    ctx.fillText(moves, 220, 50);
    ctx.clearRect(400, 0, 100, 100);
    ctx.fillText(score, 450, 50);

    if (score > 300){
      document.getElementById("canvas").removeEventListener("click", window.myClickHandler);
      ctx.font = "60pt Calibri";
        ctx.fillText("You won!", 300, 400);
    }
    else if (moves === 0){
      ctx.font = "60pt Calibri";
        ctx.fillText("Game Over!", 300, 400);
    }
   }


  function checkStatus(){
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 8; y++) {
        match = [];
        let callpaintx = false;
            if (balls[x][y].color === balls[x][y+1].color && balls[x][y].color === balls[x][y+2].color) {
              match.push([x,y]);
              match.push([x,y+1]);
              match.push([x,y+2]);
            }

            let n = 0;
            while (n < match.length && match.length > 2) {
              delete balls[match[n][0]][match[n][1]];
              n+=1 ;
              callpaintx = true;
            }
            if (callpaintx){
              score += 30;
              paint(3);
            }
           }
         }

         for (let y = 0; y < 10; y++) {
           for (let x = 0; x < 8; x++) {
             match = [];
             let callpainty = false;
                 if (balls[x][y].color === balls[x+1][y].color && balls[x][y].color === balls[x+2][y].color) {
                   match.push([x,y]);
                   match.push([x+1,y]);
                   match.push([x+2,y]);
                 }
                 let n = 0;
                 while (n < match.length && match.length > 2) {

                   delete balls[match[n][0]][match[n][1]];
                   callpainty = true;
                   n+=1 ;
                 }
                 if (callpainty) {
                   score += 30;
                   paint(1);
                 }
                }
              }
            }



            window.setInterval(function(){
              checkStatus();
            }, 1000);







  initialize();
    // document.getElementById("canvas").addEventListener("click", clickHandler);


  let match = [];
  let x1 = -1;
  let y1 = -1;
  let x2 = -1;
  let y2 = -1;
  let color1 = -1;
  let color2 = -1 ;
  // document.getElementById("canvas").addEventListener("click", clickHandler);
  window.myClickHandler = clickHandler;
  function clickHandler(e) {
    if (x1 === -1) {
      x1 = Math.floor(e.offsetX/60);
      y1 = Math.floor(e.offsetY/60)-2;
      color1 = balls[x1][y1].color;
    } else {
      x2 = Math.floor(e.offsetX/60);
      y2 = Math.floor(e.offsetY/60)-2;
      color2 = balls[x2][y2].color;
      let adjacent = checkAdjacent();
      if (adjacent) {
        swap(x1,y1,x2,y2);
      }
      x1 = -1;
      y1 = -1;
    }
  }

    function checkAdjacent() {
      if ((x1 === x2 && (y2 === y1+1 || y2 === y1 - 1)) || (y1 === y2 && (x2 === x1+1 || x2 === x1 - 1))) {
        return true;
      }
        return false;
    }

    function swap(bx1,by1,bx2,by2) {

      //check in x coordinate
      match = [];
      let flag = true;
      let yflag = true;
      let count = 0;
      let i = 1;
      let flagbreak = false;
      while (flag){
        while (true) {

          // same line x


          // if ((y2 === y1 && balls[bx1][by1].color === balls[bx2][by2].color) && (bx2+1 !== 10) && (balls[bx2+1][by2].color === balls[bx1][by1].color) && (bx2+1 !== bx1)) {
          //   count = 3;
          //   console.log("im first x");
          //   match.push([bx1,by1]);
          //   match.push([bx2,by2]);
          //   match.push([bx2+1,by2]);
          //   flagbreak = true;
          //   console.log("match", match);
          //   break;
          // }
          //
          // if (( y2 === y1 && balls[bx1][by1].color === balls[bx2][by2].color) && (bx1+1 !== 10) && (balls[bx1+1][by1].color === balls[bx1][by1].color) && (bx1+1 !== bx2)) {
          //   count = 3;
          //   console.log("im second x");
          //   match.push([bx1,by1]);
          //   match.push([bx1+1,by1]);
          //   match.push([bx2,by2]);
          //     flagbreak = true;
          //   break;
          // }
          //
          // if (( y2 === y1 && balls[bx1][by1].color === balls[bx2][by2].color) && (bx1-1 !== -1) && (balls[bx1-1][by1].color === balls[bx1][by1].color)  && (bx1-1 !== bx2)) {
          //   count = 3;
          //     console.log("im third x");
          //   match.push([bx1,by1]);
          //   match.push([bx2,by2]);
          //   match.push([bx1-1,by1]);
          //     flagbreak = true;
          //   break;
          // }
          //
          // if (( y2 === y1 && balls[bx1][by1].color === balls[bx2][by2].color) && (bx2-1 !== -1) && (balls[bx2-1][by2].color === balls[bx1][by1].color)  && (bx2-1 !== bx1)) {
          //   count = 3;
          //     console.log("im third x");
          //   match.push([bx1,by1]);
          //   match.push([bx2,by2]);
          //   match.push([bx2-1,by2]);
          //     flagbreak = true;
          //   break;
          // }

          //

          if ((bx2-i === -1) || (bx2-i === bx1) || (balls[bx2-i][by2].color !== balls[bx1][by1].color)) {
            break;
          }

          if (balls[bx2-i][by2].color === balls[bx1][by1].color) {
            count += 1;
            match.push([bx2-i,by2]);
            i+=1;
          }
         }
        i = 1;
        while(true){

          if (flagbreak){
            break;
          }

          if ((bx2+i === 10) || (bx2+i === bx1) || (balls[bx2+i][by2].color !== balls[bx1][by1].color)) {
            break;
          }
          if (balls[bx2+i][by2].color === balls[bx1][by1].color) {
            count += 1;
            match.push([bx2+i,by2]);
            i+=1;
          }
        }
        flag = false;
    }
    if (match.length >= 2) {
      if(!match.includes([bx2,by2])) {
            match.push([bx2,by2]);
        }
        console.log("match", match);
     // match.push([bx2,by2]) ;
     yflag = false;
   }

    if (match.length > 2){
      console.log("xmatch", match);
      let temp = balls[bx1][by1];
      balls[bx1][by1] = balls[bx2][by2];
      balls[bx2][by2] = temp;
      score += match.length*10;
      moves -= 1;
    }
    let n = 0;

    let deletedCountx = 0;
    let paintflagx = false;
    while (n < match.length && match.length > 2) {
      delete balls[match[n][0]][match[n][1]];
      paintflagx = true;
      n+=1 ;
    }

    if (paintflagx) {
    paint(1);
    }

      match = [];

    //check in y coordinate
    // let yflag = true;
    let ycount = 0;
    let j = 1;
    while (yflag){
      while (true) {


        // same line y
        // if ((x1 === x2 && balls[bx1][by1].color === balls[bx2][by2].color) &&  (by2+1 !== 10) && (balls[bx2][by2+1].color === balls[bx1][by1].color) && (by2+1 !== y1)) {
        //   count = 3;
        //   console.log("im first y");
        //   match.push([bx1,by1]);
        //   match.push([bx1,by1+1]);
        //   match.push([bx1,by1+2]);
        //   flagbreak = true;
        //   break;
        // }
        //
        // if ((x1 === x2 && balls[bx1][by1].color === balls[bx2][by2].color) && (by1+1 !== 10) && (balls[bx1][by1+1].color === balls[bx1][by1].color) && (by1+1 !== y2)) {
        //   count = 3;
        //   console.log("im second y");
        //   match.push([bx1,by1]);
        //   match.push([bx1,by1-1]);
        //   match.push([bx1,by1+1]);
        //     flagbreak = true;
        //   break;
        // }
        //
        // if ((x1 === x2 && balls[bx1][by1].color === balls[bx2][by2].color) && (by1-1 !== -1) && (balls[bx1][by1-1].color === balls[bx1][by1].color) && (by1-1 !== y2)) {
        //   count = 3;
        //   console.log("im third y");
        //   match.push([bx1,by1]);
        //   match.push([bx1,by1-1]);
        //   match.push([bx1,by1-2]);
        //     flagbreak = true;
        //   break;
        // }
        //
        // if ((x1 === x2 && balls[bx1][by1].color === balls[bx2][by2].color) && (by2-1 !== -1) && (balls[bx2][by2-1].color === balls[bx1][by1].color) && (by2-1 !== y1)) {
        //   count = 3;
        //   console.log("im third y");
        //   match.push([bx1,by1]);
        //   match.push([bx1,by1-1]);
        //   match.push([bx1,by1-2]);
        //     flagbreak = true;
        //   break;
        // }

        //


        if ((by2-j === -1) || (by2-j === by1) || (balls[bx2][by2-j].color !== balls[bx1][by1].color)) {
            break;
          }


        if (balls[bx2][by2-j].color === balls[bx1][by1].color) {
          ycount += 1;
           match.push([bx2,by2-j]);
          j+=1;
        }
      }

      j = 1;
      while(true){

        if (flagbreak){
          break;
        }

        if ((by2+j === 10) || (by2+j === by1) || (balls[bx2][by2+j].color !== balls[bx1][by1].color)) {
          break;
        }
        if (balls[bx2][by2+j].color === balls[bx1][by1].color) {
          ycount += 1;
          match.push([bx2,by2+j]);
          j+=1;
        }
      }
      yflag = false;
  }

  if (match.length >= 2) {
   match.push([bx2,by2]);
  }

  if (match.length > 2){
    console.log("ymatch", match);
    let temp = balls[bx1][by1];
    balls[bx1][by1] = balls[bx2][by2];
    balls[bx2][by2] = temp;
    score += match.length*10;
    moves -= 1;
  }
  let m = 0;

  let deletedCounty = match.length;
  let paintflagy = false;
  while (m < match.length && match.length > 2) {
    delete balls[match[m][0]][match[m][1]];
    paintflagy = true;
    m+=1 ;
  }


  if (paintflagy){
  paint(deletedCounty);
  }

}

});

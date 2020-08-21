let b_size;    //碁盤サイズ  19,13,9路盤
let handi;     //手合割  互先、定先、２子～９子
let imgSize;    //碁盤サイズに合わせたマス目・碁石のイメージサイズ

let tesuu;    //手数(０～)
let teban;    //手番(黒番：１、 白番：２)

let canvas;    //碁盤画像を描画するキャンパス
let context;    //キャンパスの内容

let BMPS = [];   //
let board = [];  //



//碁盤サイズごとのマス目・碁石のイメージサイズ
const IMG_SIZE = 
{
  19: 35,
  13: 50,
   9: 70
}

//碁盤マス目の配置情報
const GOBAN = 
{
  19:
  [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 9, 4, 4, 4, 4, 4, 9, 4, 4, 4, 4, 4, 9, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 9, 4, 4, 4, 4, 4, 9, 4, 4, 4, 4, 4, 9, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 9, 4, 4, 4, 4, 4, 9, 4, 4, 4, 4, 4, 9, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8]
  ],
  13:
  [

  ],
  9:
  [

  ]
};

//置石の配置情報
const OKIISHI =
{

};

//マス目・碁石画像の読み込み
BMPS = [];
function loadBMPS()
{ 
        //     " 0.bmp",   // 左上カギカッコ
        //     " 1.bmp",   // T字
        //     " 2.bmp",   // 右上カギカッコ
        //     " 3.bmp",   // 左T字
        //     " 4.bmp",   // ＋
        //     " 5.bmp",   // 右T字
        //     " 6.bmp",   // 左下カギカッコ
        //     " 7.bmp",   // 下T字
        //     " 8.bmp",   // 右下カギカッコ
        //     " 9.bmp",   // ＋星
        //     "10.bmp",   // 黒石
        //     "11.bmp"    // 白石
  for(let i=0; i<12; i++)
  {
    BMPS[i] = document.createElement('img');
    BMPS[i].src = "./images/" + i + ".bmp";
  }
}

//碁盤初期化
// 0:空点,  1:黒石,  2:白石
board = [];
function initBoard()
{
  for(let y=0; y<b_size; y++)
  {
    board[y] = [];
    for(let x=0; x<b_size; x++)
    {
      board[y][x] = 0;
    }
  }
}

//碁盤表示
function showGoban()
{
  for(let y=0; y<b_size; y++)
  {
    for(let x=0; x<b_size; x++)
    {
      //マス目
      context.drawImage(BMPS[GOBAN[b_size][y][x]], imgSize*x, imgSize*y, imgSize, imgSize);
    }
  }
}

//局面表示
function drawMove()
{
  for(let y=0; y<b_size; y++)
  {
    for(let x=0; x<b_size; x++)
    {
      if( board[y][x]==0 )
      {
        //マス目
          context.drawImage(BMPS[GOBAN[b_size][y][x]], imgSize*x, imgSize*y, imgSize, imgSize);
      }

      else if( board[y][x]==1 )
      {
        //黒石
          context.drawImage(BMPS[10], imgSize*x, imgSize*y, imgSize, imgSize);
      }

      else if( board[y][x]==2 )
      {
        //白石
          context.drawImage(BMPS[11], imgSize*x, imgSize*y, imgSize, imgSize);
      }

      else
      {
        alert("データ相違");
      }
      
    }
  }
}

//石が打たれた場合(クリック)の処理
function onClick(e)
{
  let x = Math.floor(e.clientX / imgSize);
  let y = Math.floor(e.clientY / imgSize);

  //碁盤内に打たれたか？
  if( x<0 ||
      x>=b_size ||
      y<0 ||
      y>=b_size)
  {
    //碁盤内でない場合は、何もしない
    return;
  }

  //打てるかどうかの判定
  if( !legalCheck() )
  {
    //打てない場合は何もしない
    return;
  }

  //打てる
  board[y][x] = teban;

  //呼吸点のない石があれば取り去る
  deleteStone();

  //打った後の局面表示
  drawMove();

  //次の手番へ
  tesuu ++;
  teban = 3 - teban;

}

//打てるかどうかのチェック
function legalCheck()
{
  return true;  //とりあえず、ノーチェック
}

//石消し判定
function deleteStone()
{
  return true;  //とりあえず、ノーチェック
}




//Main Program
b_size = 19;
handi = 0;
imgSize = IMG_SIZE[b_size];

tesuu = 0;
teban = 1;

canvas = document.getElementById("my-igo");
context = canvas.getContext("2d");

initBoard();
loadBMPS();


canvas.addEventListener("click", onClick);









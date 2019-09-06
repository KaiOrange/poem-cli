const color = require('colors-cli/safe')

const COLOR_TITLE = ['样式','前景色','背景色','前景色（明亮）','背景色（明亮）'];
const COLOR_STYLE = ['bold', 'faint', 'italic', 'underline', 'blink', 'overline', 'inverse', 'conceal', 'strike'];
const COLOR_FOREGROUND = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
const COLOR_BACKGROUND = ['black_b', 'red_b', 'green_b', 'yellow_b', 'blue_b', 'magenta_b', 'cyan_b', 'white_b'];
const COLOR_FOREGROUND_BRIGHT = ['black_bt', 'red_bt', 'green_bt', 'yellow_bt', 'blue_bt', 'magenta_bt', 'cyan_bt', 'white_bt'];
const COLOR_BACKGROUND_BRIGHT = ['black_bbt', 'red_bbt', 'green_bbt', 'yellow_bbt', 'blue_bbt', 'magenta_bbt', 'cyan_bbt', 'white_bbt'];
const STYLE = [ COLOR_STYLE, COLOR_FOREGROUND, COLOR_BACKGROUND, COLOR_FOREGROUND_BRIGHT, COLOR_BACKGROUND_BRIGHT];

function printSupportStyle(){
  console.log('所支持的样式有：\n');
  let message = '';

  for (let i = 0; i < COLOR_TITLE.length; i++) {
    message = STYLE[i].reduce(function (pre,next){
      return pre + color[next](next) + ' '
    }, COLOR_TITLE[i] + "： ");
    console.log(message);
  }
  // 换行
  console.log();
}

function checkStyle(styleName){
  return STYLE.join(',').split(',').indexOf(styleName) !== -1;
}

function getColorMethod(commandStr = ''){
  let command = commandStr.replace(/\,/g,'.').split(".");
  let colorMethod = color
  for (let i = 0; i < command.length; i++) {
    if (checkStyle(command[i])) {
      colorMethod = colorMethod[command[i]];
    } else {
      console.error('参数错误（' + command[i] + '）！\n');
      printSupportStyle();
      throw new Error('参数错误（' + command[i] + '）！');
    }
  }
  return colorMethod;
}

module.exports = {
  printSupportStyle,
  checkStyle,
  getColorMethod
}
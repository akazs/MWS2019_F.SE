function leng10Checker(str){
 //console.log(str.length);
 return str.length > 10;
}
function mixChecker(str) {
 var comma = "."
 var swi = 0;
 var Eflag = true;
 for(i=0; i<str.length; i++){
   if(!(str.charAt(i) === comma)){
     if(Eflag){
       if(str.charAt(i).match(/[^a-z]/gi)){
         swi++;
         Eflag = false;
       }
     }else{
       if(str.charAt(i).match(/[^0-9]/gi)){
         swi++;
         Eflag = true;
       }
     }
   }
 }
 //console.log(swi/(str.length-1))
 return (swi/(str.length-1)) > 0.2;
}

function check_blacklist_posibility(str){
  if (leng10Checker(str) && mixChecker(str)) {
    //10文字以上の文字列,英数字の混在の切り替え率
    return true;
  }else{
    false;
  }
}

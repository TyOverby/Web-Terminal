var bodyText;
var inputElement;
var path;

function prepareAction(){

   bodyText = $("#content");
   inputElement = $("#textbox");
   
   inputElement.keypress(function(e){
      if(e.which == 13){
         onEnter(inputElement.val());
         inputElement.val("");
      }
   });
}

function onEnter(text){
   bodyText.html(bodyText.html()+text+"<br />");
   
   var args = text.split(" ");
   if(args[0] == "clear"){
         bodyText.html("");
   }
   else{
      runCommand(args);
   }
}

function runCommand(input){
   
}

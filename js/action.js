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
   appendToBody(text,true);
   
   var args = text.match(/\w+|"(?:\\"|[^"])+"/g);
   if(args[0] == "clear"){
         bodyText.html("");
   }
   else{
      runCommand(args);
   }
}

function runCommand(input){
    args = input;
    cmd = args.splice(0,1);
    data={'cmd':cmd,'args':args}
    $.post("/",data,function(d){
        appendToBody(d)
        console.log(d);
    },"html");
}

function appendToBody(str,before){
    var bef="";
    if(before){
        bef = $("#before").html();
    } 

    bodyText.html(bodyText.html()+bef+str+"<br />");
}

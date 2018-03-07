//LEER XML de xml/numeracos.xml
var url="https://rawgit.com/christiancampos123/Formulario/master/XML/XML2.xml";
var texto;
var a = 0;
var c = 0;
window.onload = function(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			gestionarXml(this);
		}
	};
	
	xhttp.open("GET", url, true);
	xhttp.send();
	formElement = document.getElementById("miFormulario");
	
    formElement.onsubmit = function(){
        inicializar();
		if (comprobarPreg()==true){
		corrText();
        corrSelect();
		corrRadio();
		corrSelectMult();
		corrCheck();
        mostrarNota();
		}
        return false;
    }
}
// para la correccion mas adelante

	var numeraco;
	var numRespuestas = [];
	var respuestas = [];
	var nota;
	nota=0;
 

//**********************************************************************
// xmlDOC es el documento leido XML. 
function gestionarXml(datosXml){
	
	var xmlDoc = datosXml.responseXML; //Parse XML to xmlDoc

	//NUMBER 1
	var tope = xmlDoc.getElementsByTagName("title").length;
	for(texto=0;texto<tope;texto++){

		document.getElementsByTagName("h3")[texto].innerHTML = xmlDoc.getElementsByTagName("title")[texto].childNodes[0].nodeValue;
		}
	
	//guardamos las respuestas de la pregunt 3,4,5 y 6 con el bucle interno avanzamos en las opcions, y con el externo las numeracos.
	for (numnumeraco=2; numnumeraco<6; numnumeraco++) {
			var opcionesSelect = [];
			var nopt = xmlDoc.getElementsByTagName("question")[numnumeraco].getElementsByTagName('option').length;
			for (i = 0; i < nopt; i++) {
				opcionesSelect[i] = xmlDoc.getElementsByTagName("question")[numnumeraco].getElementsByTagName('option')[i].innerHTML;
			}
			ponerDatosSelectHtml( opcionesSelect, numnumeraco);
		}
		
	//imprimimos lo guardado de los selects, y los selects multiples.
	function ponerDatosSelectHtml( opcionesSelect, numnumeraco) {

		var select = document.getElementsByTagName("select")[numnumeraco-2];
		for (i = 0; i < opcionesSelect.length; i++) {
			var option = document.createElement("option");
			option.text = opcionesSelect[i];
			option.value = i;
			select.options.add(option);
		}
	  }
	
	//guardamos las numeracos de las checkbox
	//declaramos la variable "z" que usaremos a la hora de imprimir.
	var z=0;
	for (numnumeraco=6; numnumeraco<8; numnumeraco++) {
			var opcionesSelect = [];
			var nopt = xmlDoc.getElementsByTagName("question")[numnumeraco].getElementsByTagName('option').length;
			for (i = 0; i < nopt; i++) {
				opcionesSelect[i] = xmlDoc.getElementsByTagName("question")[numnumeraco].getElementsByTagName('option')[i].innerHTML;
			}
			ponerDatosChekboxHtml( opcionesSelect, numnumeraco);
		}
	
	//imprimimos lo guardado de las checkbox	
	function ponerDatosChekboxHtml( opcionesSelect, numnumeraco) {
			var radioCont = document.getElementsByClassName("clasecheckbox")[numnumeraco-6];
			for (i = 0; i < opcionesSelect.length; i++, z++) {
				var input = document.createElement("input");
				var label = document.createElement("label");
				label.innerHTML=opcionesSelect[i];
				label.htmlFor = ("checkbox" + z);
				input.type="checkbox";
				input.id = ("checkbox" + z)
				input.value=i;
				input.name=("checkbox"+ c);
				radioCont.appendChild(input);
				radioCont.appendChild(label);
				radioCont.appendChild(document.createElement("br"));
				radioCont.appendChild(document.createElement("br"));
				
			}
			c++;
		}	
		
	//recuperamos los radios  
	var x=0;  
	for (numnumeraco=8; numnumeraco<10; numnumeraco++) {
		var opcionesSelect = [];
		var nopt = xmlDoc.getElementsByTagName("question")[numnumeraco].getElementsByTagName('option').length;
		for (i = 0; i < nopt; i++) {
			opcionesSelect[i] = xmlDoc.getElementsByTagName("question")[numnumeraco].getElementsByTagName('option')[i].innerHTML;
		}
		ponerDatosRadioHtml( opcionesSelect, numnumeraco);
	}
		
	function ponerDatosRadioHtml( opt, numnumeraco) {
		var radioCont = document.getElementsByClassName("radio")[numnumeraco-8];
		for (i = 0; i < opcionesSelect.length; i++) {
			var input = document.createElement("input");
			var label = document.createElement("label");
			label.innerHTML=opt[i];
			input.type="radio";
			input.id = ("radius" + x);
			label.htmlFor = ("radius" + x);
			input.value=i;
			input.name=("nombre"+a);
			radioCont.appendChild(input);
			radioCont.appendChild(label);
			radioCont.appendChild(document.createElement("br"));
			radioCont.appendChild(document.createElement("br"));
			x++;
		}
		a++;
	}

	
	//recogemos todas las respuestas
	
    for (numeraco = 0; numeraco < 10; numeraco++) {
        numRespuestas[numeraco] = xmlDoc.getElementsByTagName("question")[numeraco].getElementsByTagName("answer").length;
        respuestas[numeraco] = [];

        for (i = 0; i < numRespuestas[numeraco]; i++) {
            respuestas[numeraco][i] = xmlDoc.getElementsByTagName("question")[numeraco].getElementsByTagName("answer")[i].innerHTML;

        }

    }
}	
	
		//Corregir text
		
		
	function corrText(){
		for(numeraco=0; numeraco<2; numeraco++){
			
			if(respuestas[numeraco][0]==document.getElementsByTagName("input")[numeraco].value){
				
				nota++
				
				}else{
					
				nota = nota;
			}
		}
	}
	
	function corrSelect(){
		for(numeraco=2; numeraco<4; numeraco++){
			
			if(respuestas[numeraco][0]==document.getElementsByTagName("select")[numeraco-2].value){
				
				nota++
				
				}else{
					
				nota = nota-0.3;
			}
		}
	}
	
	function corrSelectMult(){
	for(numeraco=4;numeraco<6;numeraco++){
        
        var sel = document.getElementsByTagName("select")[numeraco-2];
        var Valida=[]; //booleana. true o false.

        for(i=0; i<(sel.length); i++){		
            
            var opt=sel.options[i];			

            if(opt.selected){				
            	Valida[i]=false;
            	for(j=0; j<numRespuestas[numeraco]; j++){
            			//asi miramos si es correcta o no.
						if(i==respuestas[numeraco][j]) Valida[i]=true;
					}
					if(Valida[i]){
					//en caso de correcta sumamos puntuacion, en caso contrario restamos.
					//restamos y sumamos en funcion de la longitud de las respuestas, es decir que si.
					//tiene 4 respuestas posibles como es mi caso suma 0.25 por cada una, en caso contrario resta.
					//si tuviera 5 serian 0.2 por ejemplo.
            		nota +=1.0/numRespuestas[numeraco];
					
					}else{
					
						nota -=1.0/numRespuestas[numeraco];
                 

					}
				}           
			}
		}
	}
//corregir checkbooox

	function corrCheck(){
        var checkbox;
for(numeraco=6;numeraco<8;numeraco++){
    var Valida=[];

    if(numeraco==6){
        checkbox=document.getElementsByName("checkbox0");
        }else{
        checkbox=document.getElementsByName("checkbox1");
    }

    for(i=0; i<(checkbox.length); i++){

        if(checkbox[i].checked){

            Valida[i]=false;
            for (j = 0; j<numRespuestas[numeraco]; j++) {
                if(i==respuestas[numeraco][j]) Valida[i]=true;
            }

            if(Valida[i]){
                nota +=1.0/numRespuestas[numeraco];

                }else{
                nota -=1.0/numRespuestas[numeraco];

                // incorrecto=true;
				}
			}
		}
	}
}


	function corrRadio(){
			var radio;
		for(numeraco=8; numeraco<10; numeraco++){
			
			if(numeraco == 8){
				
				radio = formElement.nombre0;
				
				}else{
					
				radio = formElement.nombre1;
				
			}
			
			if(radio.value == respuestas[numeraco][0]){
				nota ++;
			}else{
				nota = nota - 0.3;
			}
		}
	}
	
	
function mostrarNota(){
	document.getElementById("notaza").style.display = "block";
	document.getElementById("masGrande").style.display = "none";
	document.getElementById("botonRepeat").style.display = "block";
	document.getElementById("botonReturn").style.display = "block";
	document.getElementById("notaza").innerHTML = "Tu nota es:" + nota.toFixed(2);		
} 
	
//Mira si las preguntas estan respondidas.

function comprobarPreg(){
	var f=formElement;
	// text
	for(numeraco=0;numeraco<2;numeraco++){
		if (f.elements[numeraco].value=="") {
			f.elements[numeraco].focus();
			alert("Tienes que contestar todas las preguntas");
			return false;
		}
	}
    //select normal
	for(numeraco=2;numeraco<4;numeraco++){
		if (f.elements[numeraco].selectedIndex==0) {
			f.elements[numeraco].focus();
			alert("Tienes que contestar todas las preguntas");
			return false;
		}
	}
	
	
	//select multiple
	for(numeraco=4;numeraco<6;numeraco++){
		var multipleRespondido=false;
        for(i=1;i<(f.elements[numeraco].length);i++){
            var opt=f.elements[numeraco].options[i];
            if(opt.selected){
                multipleRespondido=true;
			}
		}
        if (!multipleRespondido) {
			f.elements[numeraco].focus();
			alert("Tienes que contestar todas las preguntas");
			return false;
		}
	}
	//Checkbox
    for(numeraco=6;numeraco<8;numeraco++){
        var checked=false;
        var nombre;
        if (numeraco==6){
            nombre=f.checkbox0;
			} else {
			nombre=f.checkbox1;
		}
        for (i = 0; i < nombre.length; i++) {  
            if (nombre[i].checked) {
				checked=true;
			}
		}
        if (!checked) {
			nombre[0].focus();
			alert("Tienes que contestar todas las preguntas");
			return false;
		}
	}
	// radio
	for(numeraco=8;numeraco<10;numeraco++){
		var nombreRadio;
        if (numeraco==8){
            nombreRadio=f.nombre0;
			} else {
            nombreRadio=f.nombre1;
		}
        if (nombreRadio.value=="") {
            nombreRadio[0].focus();
            alert("Tienes que contestar todas las preguntas");
            return false;
		}   
	}
	return true;
}
	
	
	function inicializar(){
		nota=0;
	}
	
	

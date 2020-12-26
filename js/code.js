$(document).ready(function(){


    $("#img-recap").click(function(){
			$(this).fadeOut(500,function(){
				$("#img-recap-ok").addClass("d-block");
				$("#img-recap-ok").fadeIn(300);
			})

    });

	$(".my-fields").val("");



	// Paso 1
	$("#btn-subir-archivo").click(function(){
		if( $("#tipo-doc").val() != '' &&  $("#documento").val() != '' ){
			$(".pasos").addClass("d-none");
			$("#paso-2").removeClass("d-none");

			// Label archivo actual
			$(".archivo-actual").text( $("#documento").val().substr( $("#documento").val().lastIndexOf('\\')+1 , $("#documento").val().length) );


			// OpenCv - Agregar imagen para analizar
			var imgToVal = document.getElementById('imageSrc');
			var doc = document.getElementById('documento');
			imgToVal.src = URL.createObjectURL( doc.files[0] );


			//Mostrar el archivo para validar
			setTimeout(function(){
				$(".pasos").addClass("d-none");
				$("#paso-3").removeClass("d-none");
			}, 4000);
		}else{
			alert("Complete los campos Tipo de documento y Archivo");
		}
		
	});


	//Validar archivo
	$("#btn-validar-archivo").click(function(){
		$(".titulos").addClass("d-none");
		$(".pasos").addClass("d-none");
		$("#validando-archivo").removeClass("d-none");
		$("#title-proceso").removeClass("d-none");
		
		
		var resp = validarImg();
		console.log( resp );

		//Mostrar el resultado de la validacion
		$(".titulos").addClass("d-none");
		$(".pasos").addClass("d-none");
		$("#resultado-proceso").removeClass("d-none");

		// Mostrar ok o fail
		if( resp == "not blur" ){
			$("#resultado-validacion-ok").removeClass("d-none");

			//Agregado al listado final
			$(".tipo-archivo").text( $("#tipo-doc").val() );
				var str_archivos = $("#listado-archivos").attr("archivos");
				var fields = new Array();

				if( str_archivos != '' ){
					fields = str_archivos.split("|-|");
					if( Array.isArray(fields) ==  true ){
						fields.push( $("#tipo-doc").val() + '-_-' + $("#documento").val().substr( $("#documento").val().lastIndexOf('\\')+1 , $("#documento").val().length) );
						$("#listado-archivos").attr("archivos", fields.join("|-|") );
					}
				}else{
					$("#listado-archivos").attr("archivos",  $("#tipo-doc").val() + '-_-' + $("#documento").val().substr( $("#documento").val().lastIndexOf('\\')+1 , $("#documento").val().length) );	
				}
				$("#btn-atras").addClass("d-none");		

		}else if ( resp == "blur"  ){
			$("#resultado-validacion-fail").removeClass("d-none");
			$("#tipo-doc").val("");
			$("#documento").val("");
		}

		//Mostrar Listado
		if( $("#listado-archivos").attr("archivos") != '' ){
			$("#mostrar-listado-docs").removeClass("d-none");

			$("#tipo-doc").val("");
			$("#documento").val("");
			$("#imageSrc").attr("src","");
		}


	});

	
	$("#aceptar-resultado").click(mostrarResultados);
	$("#mostrar-listado-docs").click(mostrarResultados);


	//Subir otro archivo
	$("#btn-subir-otro").click(function(){
		$(".titulos").addClass("d-none");
		$(".pasos").addClass("d-none");

		$("#title-carga").removeClass("d-none");
		$("#paso-1").removeClass("d-none");

		if( $("#listado-archivos").attr("archivos") != '' ){
			$("#paso1-ver-docs-validados").removeClass("d-none");
		}
	});


	//Volver despues de error
	$("#volver-subir-page").click(function(){
		$(".titulos").addClass("d-none");
		$(".pasos").addClass("d-none");

		$("#title-carga").removeClass("d-none");
		$("#paso-1").removeClass("d-none");

		if( $("#listado-archivos").attr("archivos") != '' ){
			$("#paso1-ver-docs-validados").removeClass("d-none");
		}
	});


	$("#mostrar-listado-docs").click(mostrarResultados);
	$("#paso1-ver-docs-validados").click(mostrarResultados);
	

});


function mostrarResultados(){
	$(".titulos").addClass("d-none");
	$(".pasos").addClass("d-none");

	$("#title-carga").removeClass("d-none");
	$("#paso-listado").removeClass("d-none");


	//Obtener y mostrar los archivos
	var str_fields = $("#listado-archivos").attr("archivos").split("|-|");

	if( Array.isArray(str_fields) ==  true && str_fields.length > 1 ){
		$("#listado-archivos").html("");
		for(var i = 0; i < str_fields.length; i++){
			var row = str_fields[i].split("-_-");
			$("#listado-archivos").append('<li class="list-group-item d-flex justify-content-between lh-condensed"><div><strong>' + row[0] + ':</strong></div><span class="text-muted">' + row[1] + '</span></li>');	
		}
	}else{
		var row = str_fields[0].split("-_-");
		$("#listado-archivos").html('<li class="list-group-item d-flex justify-content-between lh-condensed"><div><strong>' + row[0] + ':</strong></div><span class="text-muted">' + row[1] + '</span></li>');
	}
}

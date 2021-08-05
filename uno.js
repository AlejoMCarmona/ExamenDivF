/*
Se necesita llevar el registro de un vacunatorio. Para ello se podrá registrar los datos de las personas vacunadas mientras el usuario quiera.
De cada vacunado se solicita:
-nombre (entre 3 y 10 caracteres)
-edad ( mayor o igual a 12)
-vacuna (“rusa”, “china”, “americana”)
Si la edad esta entre 12 y 17 años ambos incluidos solo se permite la vacuna americana
-dosis (“p” en caso de ser la primer dosis o “s” en caso de ser la segunda dosis)
-sexo( “f” o “m” )
Informar:
a- Promedio de edad de los que se vacunaron con la china
b- Nombre y vacuna de la hombre con más joven
c- De las personas que recibieron la vacuna americana que porcentaje son menores de edad
d- Porcentaje de los que están vacunados con 1 dosis sobre el total de vacunados
e- Vacuna mas inoculada
*/
function mostrar() {
	let nombre,
		edad,
		vacuna,
		dosis,
		sexo,
		acumEdadChina = 0,
		promedioEdadVacunaChina = 0,
		flagHMasJoven = 1,
		edadHMasJoven,
		nombreHMasJoven,
		vacunaHMasJoven,
		contMenoresVA = 0,
		porcMenoresVA,
		cantTotalVacunados,
		contPDosis = 0,
		porcPDosis,
		contVA = 0,
		contVR = 0,
		contVC = 0,
		vacunaMasInoculada,
		respuesta;

	do {
		nombre = prompt("Ingrese el nombre (entre 3 y 10 caracteres)");
		while (nombre.length < 3 || nombre.length > 10) {
			nombre = prompt("ERROR. Reingrese el nombre (entre 3 y 10 caracteres)");
		}

		edad = parseInt(prompt("Ingrese la edad (mayor o igual a 12 años)"));
		while (isNaN(edad) || edad < 12) {
			edad = parseInt(prompt("ERROR. Reingrese la edad (mayor o igual a 12 años)"));
		}

		if (edad > 17) {
			vacuna = prompt("Ingrese la vacuna (rusa/china/americana)").toLowerCase();
			while (vacuna != "rusa" && vacuna != "china" && vacuna != "americana") {
				vacuna = prompt("ERROR. Reingrese la vacuna (rusa/china/americana)").toLowerCase();
			}
		} else {
			vacuna = "americana";
			contMenoresVA++;
		}

		dosis = prompt("Ingrese si es la primera o segunda dosis (p/s)").toLowerCase();
		while (dosis != 'p' && dosis != 's') {
			dosis = prompt("ERROR. Reingrese si es la primera o segunda dosis (p/s)").toLowerCase();
		}

		sexo = prompt("Ingrese el sexo (Femenino = 'f'; Masculino = 'm')").toLowerCase();
		while (sexo != 'f' && sexo != 'm') {
			sexo = prompt("ERROR. Reingrese el sexo (Femenino = 'f'; Masculino = 'm')").toLowerCase();
		}

		if (sexo == 'm' && (flagHMasJoven || edad < edadHMasJoven)) { //punto b)
            edadHMasJoven = edad;
			nombreHMasJoven = nombre;
			vacunaHMasJoven = vacuna;
            flagHMasJoven = 0;
        }

		if (dosis == 'p') {
			contPDosis++;
		}

		switch (vacuna) {
			case "americana":
				contVA++;
				break;
			case "rusa":
				contVR++;
				break;
			case "china":
				contVC++;
				acumEdadChina += edad;
		}

		respuesta = prompt("¿Desea seguir ingresando datos? (Sí = 's'; No = 'n')").toLowerCase();
		while (respuesta != 's' && respuesta != 'n') {
			respuesta = prompt("ERROR. ¿Desea seguir ingresando datos? (Sí = 's'; No = 'n')").toLowerCase();;
		}
	} while (respuesta == 's');

	if (contVC > 0) { //punto a)
		promedioEdadVacunaChina = acumEdadChina / contVC;
	}

	if (contVA > 0) { //punto c)
		porcMenoresVA = contMenoresVA * 100 / contVA;
	}

	//punto d)
	cantTotalVacunados = contVA + contVC + contVR;
	porcPDosis = contPDosis * 100 / cantTotalVacunados;

	//punto e)
	if (contVA > contVC && contVA > contVR) {
        vacunaMasInoculada = "Americana";
    } else if (contVC >= contVA && contVC > contVR) {
        vacunaMasInoculada = "China";
    } else {
        vacunaMasInoculada = "Rusa";
    }

	document.write("a) Promedio de edad de los que se vacunaron con la china: " + promedioEdadVacunaChina + "<br>");

	if (flagHMasJoven) {
		document.write("b) No se vacunaron hombres.<br>");
	} else {
		document.write("b) Del hombre más joven vacunado:<br>Nombre: " + nombreHMasJoven + " // Vacuna: " + vacunaHMasJoven + "<br>");
	}

	if (contVA > 0) {
		document.write("c) Porcentaje de menores de edad inoculados con la vacuna americana: " + porcMenoresVA.toFixed(4) + "%<br>");
	} else {
		document.write("c) No hubo vacunados con la vacuna americana.<br>");
	}

	document.write("d) Porcentaje de vacunados con una dosis sobre el total de vacunados: " + porcPDosis.toFixed(4) + "%<br>" +
				   "e) Vacuna más inoculada: " + vacunaMasInoculada);
}
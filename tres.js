/*
Llegan vuelos con vacunas de distintos lugares del mundo
Mientras el usuario quiera se debe registrar de cada vuelo:
-Origen (“Oriente”, “Occidente”, “Secreto”)
-Cantidad de vacunas (entre 500000 y 2500000)
-Costo del vuelo (entre 1 millón y 5 millones de pesos)
Informar:
a- El origen que envió menor cantidad de vacunas
b- El promedio por vuelo de vacunas llegadas de Occidente
c- El total sin descuentos a pagar por los gastos de los viajes
d- Si en total se recibieron mas de 10 millones de vacunas se hace un descuento de 25%, Si se recibieron entre 5 y 10 millones el descuento es del 15% con menor cantidad no hay descuento.
Informar si hubo descuento de cuanto fue y el importe final con descuento
*/

function mostrar() {
	let origen,
		cantV,
		costo,
		acumVOriente = 0,
		acumVOccidente = 0,
		acumVSecreto = 0,
		contVuelosOccidente = 0,
		origenMenorCantidadV,
		promedioVVOccidente = 0,
		importeBrutoViajes = 0,
		cantTotalVacunas,
		descuento = 0,
		importeNetoViajes,
		respuesta;

	do {
		origen = prompt("Ingrese el origen de las vacunas (origen/occidente/secreto)").toLowerCase();
		while (origen != "oriente" && origen != "occidente" && origen != "secreto") {
			origen = prompt("ERROR. Reingrese el origen de las vacunas (origen/occidente/secreto)").toLowerCase();
		}

		cantV = parseInt(prompt("Ingrese cantidad de vacunas (entre 500000 y 2500000)"));
		while (isNaN(cantV) || cantV < 500000 || cantV > 2500000) {
			cantV = parseInt(prompt("ERROR. Reingrese cantidad de vacunas (entre 500000 y 2500000)"));
		}

		costo = parseFloat(prompt("Ingrese el costo del vuelo (entre $1000000 y $5000000)"));
		while (isNaN(costo) || costo < 1000000 || costo > 5000000) {
			costo = parseFloat(prompt("ERROR. Reingrese el costo del vuelo (entre $1000000 y $5000000)"));
		}

		importeBrutoViajes += costo; //punto c)

		switch (origen) {
			case "oriente":
				acumVOriente += cantV;
				break;
			case "occidente":
				acumVOccidente += cantV;
				contVuelosOccidente++;
				break;
			case "secreto":
				acumVSecreto += cantV;
		}

		respuesta = prompt("¿Desea seguir ingresando datos? (Sí = 's'; No = 'n')").toLowerCase();
		while (respuesta != 's' && respuesta != 'n') {
			respuesta = prompt("ERROR. ¿Desea seguir ingresando datos? (Sí = 's'; No = 'n')").toLowerCase();;
		}
	} while (respuesta == 's');

	//punto a)
	if (acumVOriente < acumVOccidente && acumVOriente < acumVSecreto) {
		origenMenorCantidadV = "Oriente";
	} else if (acumVOccidente <= acumVOriente && acumVOccidente < acumVSecreto) {
		origenMenorCantidadV = "Occidente";
	} else {
		origenMenorCantidadV = "Secreto";
	}

	//punto b)
	if (contVuelosOccidente > 0) {
		promedioVVOccidente = acumVOccidente / contVuelosOccidente;
	}

	//punto d)
	cantTotalVacunas = acumVOccidente + acumVOriente + acumVSecreto;

	if (cantTotalVacunas > 10000000) {
		descuento = 25;
	} else if (cantTotalVacunas >= 5000000) {
		descuento = 15;
	}

	importeNetoViajes = importeBrutoViajes - importeBrutoViajes * descuento / 100;

	document.write("a) Origen que envió menor cantidad de vacunas: " + origenMenorCantidadV + "<br>" +
		"b) Promedio de vacunas que llegaron por vuelo de occidente: " + promedioVVOccidente.toFixed(4) + "<br>" +
		"c) Importe total sin descuentos a pagar por los gastos de los viajes: $" + importeBrutoViajes + "<br>");

	if (descuento == 0) {
		document.write("d) No hubo descuento sobre el total a pagar por los gastos de los viajes.");
	} else {
		document.write("d) Importe a pagar con descuento: $" + importeNetoViajes + ". Hubo un descuento del " + descuento + "%");
	}
}
/*
El centro de hisopado de Ezeiza recibe una tripulación de 8 personas.
Al ser hisopadas se ingresan sus datos en la aplicación:
-nacionalidad ("argentina", "extranjero")
-resultado("positivo", "negativo")
-edad(entre 18 y 65)
-cepa("delta", "alfa", "beta", "ninguna")
Para poder ingresar ninguna el resultado debe ser negativo
Luego del ingreso informar:
a- Porcentaje de positivos
b- Porcentaje de negativos
c- Cuál es la cepa menos encontrada
d- Edad del menor argentino contagiado
e- Cantidad de personas extranjeras contagiadas con la delta
 */

function mostrar() {
    let nacionalidad,
        resultado,
        edad,
        cepa,
        porcPositivos = 0,
        porcNegativos = 0,
        contPos = 0,
        contNeg = 0,
        contD = 0,
        contA = 0,
        contB = 0,
        cepaMenosEncontrada,
        flagMenorAC = 1,
        edadMenorAC,
        contExtranjerosCD = 0;

    for (let i = 0; i < 8; i++) {

        nacionalidad = prompt("Ingrese la nacionalidad (argentina/extranjero)").toLowerCase();
        while (nacionalidad != "argentina" && nacionalidad != "extranjero") {
            nacionalidad = prompt("ERROR. Reingrese la nacionalidad (argentina/extranjero)").toLowerCase();
        }

        resultado = prompt("Ingrese el resultado del hisopado (positivo/negativo)").toLowerCase();
        while (resultado != "positivo" && resultado != "negativo") {
            resultado = prompt("ERROR. Reingrese el resultado del hisopado (positivo/negativo)").toLowerCase();
        }

        edad = parseInt(prompt("Ingrese la edad (entre 18 y 65 años)"));
        while (isNaN(edad) || edad < 18 || edad > 65) {
            edad = parseInt(prompt("ERROR. Reingrese la edad (entre 18 y 65 años)"));
        }

        if (resultado == "positivo") {
            cepa = prompt("Ingrese la cepa (delta/alfa/beta)").toLowerCase();
            while (cepa != "delta" && cepa != "alfa" && cepa != "beta") {
                cepa = prompt("ERROR. Reingrese la cepa (delta/alfa/beta)").toLowerCase();
            }
            contPos++;
        } else {
            cepa = "ninguna";
            contNeg++;
        }

        switch (cepa) {
            case "delta":
                contD++;
                if (nacionalidad == "extranjero") { //punto e)
                    contExtranjerosCD++;
                }
                break;
            case "beta":
                contB++;
                break;
            case "alfa":
                contA++;
        }

        if (nacionalidad == "argentina" && resultado == "positivo" && (flagMenorAC || edad < edadMenorAC)) { //punto d)
            edadMenorAC = edad;
            flagMenorAC = 0;
        }

    }

    if (contPos > 0) { //punto a)
        porcPositivos = contPos * 100 / 8;
    }

    if (contNeg > 0) { //punto b)
        porcNegativos = contNeg * 100 / 8;
    }

    //punto c)
    if (contA < contB && contA < contD) {
        cepaMenosEncontrada = "Alfa";
    } else if (contB <= contA && contB < contD) {
        cepaMenosEncontrada = "Beta";
    } else {
        cepaMenosEncontrada = "Delta";
    }

    document.write("a) Porcentaje de positivos: " + porcPositivos + "%<br>" +
                   "b) Porcentaje de negativos: " + porcNegativos + "%<br>" +
                   "c) Cepa menos encontrada: " + cepaMenosEncontrada + "<br>");

    if (flagMenorAC) {
        document.write("d) No hubo ningún argentino contagiado.<br>");
    } else {
        document.write("d) Edad del menor argentino contagiado: " + edadMenorAC + "<br>");
    }

    document.write("e) Cantidad de personas extranjeras contagiadas con la cepa 'delta': " + contExtranjerosCD);
}
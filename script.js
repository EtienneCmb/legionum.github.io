function calculerUFC() {
  var n = parseFloat(document.getElementById("n").value);
  var n_1 = parseFloat(document.getElementById("n_1").value);
  var n_2 = parseFloat(document.getElementById("n_2").value);

  // Vérifier si les checkboxes sont cochées et mettre la valeur à 0 si nécessaire
  if (document.getElementById("n_checkbox").checked) {
    n = -1;
  }
  if (document.getElementById("n_1_checkbox").checked) {
    n_1 = -1;
  }
  if (document.getElementById("n_2_checkbox").checked) {
    n_2 = -1;
  }

  var ufc = 0.0;
  var message = "";

  if (n === 0 && n_1 === 0 && n_2 === 0) {
    message = "Legionella non détectées (UFC/L < 10)";
  } else if (n === -1 && n_1 === -1 && n_2 === -1) {
    message = "Présence d'une flore interférente empêchant la détection des Legionella (Résultat ininterprétable).";
  } else {
    if (n === 0 && n_1 === 0 && n_2 <= 100) {
      ufc = n_2 * 10;
    } else if (n === 0 && n_1 <= 100 && n_2 === 0) {
      ufc = n_1 * 100
    } else if (n === 0 && n_1 <= 100 && n_2 <= 100) {
      ufc = (n_1 + n_2) * 1000 / 110;
    } else if (n <= 150 && n_1 <= 100 && n_2 <= 100) {
      ufc = Math.max(n * 5000, (n_1 + n_2) * 1000 / 110);
    } else if (n === 0 && n_1 === 0 && n_2 > 100) {
      message = "UFC/L > 1 000";
    } else if (n === 0 && n_1 <= 10 && n_2 > 100) {
      message = "UFC/L > 1 000";
    } else if ([0, 1, 2].includes(n) && n_1 > 100 && n_2 > 100) {
      message = "UFC/L > 10 000";
    } else if (n > 150) {
      message = "UFC/L > 750 000";
    } else if (n === -1 && n_1 <= 100 && n_2 <= 100) {
      ufc = (n_1 + n_2) * 1000 / 110;
    } else if (n <= 150 && n_1 === -1 && n_2 <= 100) {
      ufc = n * 5000;
    } else if (n <= 150 && n_1 <= 100 && n_2 === -1) {
      ufc = Math.max(n * 5000, n_1 * 100);
    } else if (n === -1 && n_1 === -1 && n_2 <= 100) {
      ufc = n_2 * 10;
    } else if (n <= 150 && n_1 === -1 && n_2 === -1) {
      ufc = n * 5000;
    } else if (n === -1 && n_1 <= 100 && n_2 === -1) {
      ufc = n_1 * 100;
    }

    if (message === "") {
      message = "Concentration : " + Math.round(ufc * 10000) / 10000 + " UFC/L";
    }
  }

  if (n === -1) {
    n = "Envahie flore"
  }
  if (n_1 === -1) {
    n_1 = "Envahie flore"
  }
  if (n_2 === -1) {
    n_2 = "Envahie flore"
  }

  prepend = "n=" + n + "</p><p>n'=" + n_1 + "</p><p>n''=" + n_2 + "</p><p>";
  message = prepend + "<strong>" + message + "</strong>"
  document.getElementById("resultat").innerHTML = message;
}

function toggleInput(inputId) {
  var checkbox = document.getElementById(inputId + "_checkbox");
  var inputField = document.getElementById(inputId);
  inputField.disabled = checkbox.checked;
  if (checkbox.checked) {
    inputField.value = 0; // Mettre la valeur à 0 si la checkbox est cochée
  }
}

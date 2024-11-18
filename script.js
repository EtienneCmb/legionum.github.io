function calculerUFC() {
  // --------------------------------------------------------------------------
  //                             PREPROCESSING
  // --------------------------------------------------------------------------
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
  var warning = "Peu probable. Une analyse des causes pouvant amener à ce résultat est recommandée ("

  // --------------------------------------------------------------------------
  //                         WITHOUT ENVAHIE FLORE
  // --------------------------------------------------------------------------
  if (n < 1) {

    if (n_1 < 1) {

      if (n_2 < 1) {
        message = "<10 UFC/L";
      } else if (1 <= n_2 && n_2 <= 100) {
        ufc = n_2 * 10;
      } else if (n_2 > 100) {
        message = ">1 000 UFC/L";
      }

    } else if (1 < n_1 && n_1 <= 10) {

      if (n_2 < 1) {
        message = warning + (n_1 * 100) + " UFC/L)";
      } else if (1 <= n_2 && n_2 <= 100) {
        ufc = (n_1 + n_2) * 1000 / 110;
      } else if (n_2 > 100) {
        message = ">1 000 UFC/L";
      }

    } else if (10 < n_1 && n_1 <= 100) {

      if (n_2 < 1) {
        message = warning + (n_1 * 100) + " UFC/L)";
      } else if (1 <= n_2 && n_2 <= 100) {
        ufc = (n_1 + n_2) * 1000 / 110;
      } else if (n_2 > 100) {
        ufc = n_1 * 100;
      }

    } else if (n_1 > 100) {

      if (n_2 < 1) {
        message = warning + ">10 000 UFC/L)";
      } else if (1 <= n_2 && n_2 <= 100) {
        message = warning + ">10 000 UFC/L)";
      } else if (n_2 > 100) {
        message = ">10 000 UFC/L";
      }

    }

  } else if (1 <= n && n <= 150) {

    if (n_1 < 1) {

      message = warning + (n * 5000) + " UFC/L)";

    } else if (1 < n_1 && n_1 <= 100) {

      if (n_2 < 1) {
        message = warning + Math.max(n * 5000, n_1 * 100) + " UFC/L)";
      } else if (1 <= n_2 && n_2 <= 100) {
        ufc = Math.max(n * 5000, (n_1 + n_2) * 1000 / 110);
      } else if (n_2 > 100) {
        ufc = Math.max(n * 5000, n_1 * 100);
      }

    } else if (n_1 > 100) {

      if (n_2 < 100) {
        if (n * 5000 > 10000) {
          message = warning + (n * 5000) + " UFC/L)";
        } else {
          message = warning + ">10 000 UFC/L)";
        }
      } else if (n_2 > 100) {
        if (n * 5000 > 10000) {
          ufc = n * 5000;
        } else {
          message = ">10 000 UFC/L";
        }
      }

    }

  } else if (n > 150) {
    message = ">750 000 UFC/L";
  }

  // --------------------------------------------------------------------------
  //                             WITH ENVAHIE FLORE
  // --------------------------------------------------------------------------
  if (n == -1 || n_1 == -1 || n_2 == -1) {
    if (n == -1 && n_1 == -1 && n_2 == -1) {
      message = "Présence d'une flore interférente empêchant la détection des Legionella.";
    } else if (n == 0 && n_1 == -1 && n_2 == -1) {
      message = "Présence d'une flore interférente portant le seuil de détection des Legionella à 5 000 UFC/L. Legionella non détectées.";
    } else if (n == -1 && n_1 == 0 && n_2 == -1) {
      message = "Présence d'une flore interférente portant le seuil de détection des Legionella à 100 UFC/L. Legionella non détectées.";
    } else if (n == 0 && n_1 == 0 && n_2 == -1) {
      message = "Présence d'une flore interférente portant le seuil de détection des Legionella à 100 UFC/L. Legionella non détectées.";
    } else if (n == -1 && n_1 == -1 && n_2 == 0) {
      message = "Legionella non détectées.";
    } else if (n == -1 && n_1 <= 100 && n_2 <= 100) {
      ufc = (n_1 + n_2) * 1000 / 110;
    } else if (n <= 150 && n_1 == -1 && n_2 <= 100) {
      ufc = n * 5000;
    } else if (n <= 150 && n_1 <= 100 && n_2 == -1) {
      ufc = Math.max(n * 5000, n_1 * 100);
    } else if (n == -1 && n_1 == -1 && n_2 <= 100) {
      ufc = n_2 * 10;
    } else if (n <= 150 && n_1 == -1 && n_2 == -1) {
      ufc = n * 5000;
    } else if (n == -1 && n_1 <= 100 && n_2 == -1) {
      ufc = n_1 * 100;
    }
  }


  // --------------------------------------------------------------------------
  //                               POST-PROCESSING
  // --------------------------------------------------------------------------
  if (message === "") {
    message = "Concentration : " + roundToNearest(ufc) + " UFC/L";
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

function roundToNearest(number) {
  // Convert the number to scientific notation
  const scientificNotation = number.toExponential();

  // Extract the exponent and mantissa
  const [mantissa, exponent] = scientificNotation.split('e');

  // Round the mantissa to the nearest ten
  const roundedMantissa = Math.round(parseFloat(mantissa) * 10) / 10;

  // Reconstruct the number in scientific notation
  const roundedScientificNotation = roundedMantissa + 'e' + exponent;

  // Convert the rounded scientific notation back to a number
  return parseFloat(roundedScientificNotation);
}

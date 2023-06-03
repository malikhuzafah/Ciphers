alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

$(() => {
  $("#typeSelect").on("change", () => {
    console.log("change");
    if ($("#typeSelect").val() === "encrypt") {
      $("#encryptBtn").html("Encrypt");
      $("#textLabel").text("Enter Plain Text");
      $("#resultLabel").text("Cipher Text");
      $("#plainTextArea").attr("placeholder", "Enter plain text...");
      $("#resultTextArea").attr(
        "placeholder",
        "Cipher text will appear here..."
      );
    } else {
      $("#encryptBtn").html("Decrypt");
      $("#textLabel").text("Enter Cipher Text");
      $("#resultLabel").text("Plain Text");
      $("#plainTextArea").attr("placeholder", "Enter cipher text...");
      $("#resultTextArea").attr(
        "placeholder",
        "Plain text will appear here..."
      );
    }
  });

  $("#encryptBtn").click(() => {
    var plainText = $("#plainTextArea").val();
    var key = $("#key").val();
    var type = $("#typeSelect").val();
    var cipher = $("#cipherSelect").val();
    if (type === "encrypt") {
      if (cipher === "transposition") {
        if (parseInt(key) === NaN) {
          alert("Key must be a number for transposition cipher");
        }
        $("#resultTextArea").html(transpositionEn(plainText, parseInt(key)));
      } else if (cipher === "ceaser") {
        if (parseInt(key) === NaN) {
          alert("Key must be a number for ceaser cipher");
        }
        $("#resultTextArea").html(ceaserEn(plainText, parseInt(key)));
      } else if (cipher === "vigenere") {
        if (containsNumbers(key)) {
          alert("Key must not contain any number character!");
        }
        $("#resultTextArea").html(vigenereEn(plainText, key));
      } else if (cipher === "railFence") {
        if (parseInt(key) === NaN) {
          alert("Key must be a number for rail fence cipher");
        }
        $("#resultTextArea").html(railFenceEn(plainText, parseInt(key)));
      } else {
        alert("Select a cipher");
        return;
      }
    } else {
      if (cipher === "transposition") {
        if (parseInt(key) === NaN) {
          alert("Key must be a number for transposition cipher");
        }
        $("#resultTextArea").html(transpositionDe(plainText, parseInt(key)));
      } else if (cipher === "ceaser") {
        if (parseInt(key) === NaN) {
          alert("Key must be a number for ceaser cipher");
        }
        $("#resultTextArea").html(ceaserDe(plainText, parseInt(key)));
      } else if (cipher === "vigenere") {
        $("#resultTextArea").html(vigenereDe(plainText, key));
      } else if (cipher === "railFence") {
        if (parseInt(key) === NaN) {
          alert("Key must be a number for rail fence cipher");
        }
        $("#resultTextArea").html(railFenceDe(plainText, parseInt(key)));
      } else {
        alert("Select a cipher");
        return;
      }
    }
  });
});

function ceaserEn(plainText, key) {
  var result = "";
  for (var i = 0; i < plainText.length; i++) {
    var code = alphabets.indexOf(plainText.charAt(i));
    code += key;
    if (code > 25) code = code % 26;
    result += alphabets[code];
  }
  return result;
}

function ceaserDe(cipherText, key) {
  var result = "";
  for (var i = 0; i < cipherText.length; i++) {
    var code = alphabets.indexOf(cipherText.charAt(i));
    code -= key;
    if (code < 0) code = code + 26;
    result += alphabets[code];
  }
  return result;
}

function transpositionEn(plainText, key) {
  var result = "";
  var count = 0;
  var i = 0;
  var c = 0;
  while (count < plainText.length) {
    result += plainText[i];
    i += key;
    if (i >= plainText.length) {
      c++;
      i = c;
    }
    count++;
  }
  return result;
}

function transpositionDe(cipherText, key) {
  var rowLen = parseInt(cipherText.length / key);
  var flag = cipherText.length % key == 0;
  var exLen = parseInt(cipherText.length % key);
  var result = "";
  var count = 0;
  var i = 0;
  var c = 0;
  while (count < cipherText.length) {
    result += cipherText[i];
    if (exLen > 0) {
      exLen--;
      i += rowLen + 1;
    } else {
      i += rowLen;
    }
    if (i >= cipherText.length) {
      if (!flag) {
        exLen++;
      }
      i = ++c;
    }
    count++;
  }
  return result;
}

function vigenereEn(plainText, key) {
  var result = "";
  var count = 0;
  for (var i = 0; i < plainText.length; i++) {
    if (count >= key.length) {
      count = 0;
    }
    var code =
      alphabets.indexOf(key[count++]) + alphabets.indexOf(plainText[i]);
    if (code > 25) {
      code = code % 26;
    }
    result += alphabets[code];
  }
  return result;
}

function vigenereDe(cipherText, key) {
  var result = "";
  var count = 0;
  for (var i = 0; i < cipherText.length; i++) {
    if (count >= key.length) {
      count = 0;
    }
    var code =
      alphabets.indexOf(cipherText[i]) - alphabets.indexOf(key[count++]);
    if (code < 0) {
      code += 26;
    }
    result += alphabets[code];
  }
  return result;
}

function railFenceEn(plainText, key) {
  console.log("rail");
  result = "";
  var flag = key % 2 == 0;
  var inc = key + 1;
  var count = 0;
  var i = 0;
  var c = 0;
  while (count < plainText.length) {
    console.log("i: " + i);
    result += plainText[i];
    i += inc;
    if (i >= plainText.length) {
      inc = inc > key ? (inc = parseInt(key / 2) + 1) : key + 1;
      c++;
      i = c;
    }
    count++;
  }
  return result;
}

function containsNumbers(str) {
  return /[0-9]/.test(str);
}

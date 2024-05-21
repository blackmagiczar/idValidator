function validateID() {
  document.getElementById("identity").style.backgroundColor = "white";
  const id = document.getElementById("identity");

  isValidID(id.value);
}
function isValidID(id) {
  //check if ID is 13 digits long
  if (id.length < 13) {
    document.getElementById("length").innerHTML = "Length: " + id.length;
    document.getElementById("errorOut").innerHTML = "";
  }
  if (id.length > 13) {
    console.log("too long");
    alert("lomg");
    document.getElementById("errorOut").innerHTML = "That's one long ID Number";
  }
  if (id.length == 13) {
    document.getElementById("length").innerHTML = "Length: " + id.length;
    //verify Luhn
    let sum = 0;

    //sum and double odds
    for (let i = id.length - 2; i >= 0; i -= 2) {
      let curr = Number(id[i]);
      curr *= 2;
      if (curr > 9) {
        curr -= 9;
      }
      sum += curr;
    }
    for (let i = id.length - 1; i >= 0; i -= 2) {
      sum += Number(id[i]);
    }

    if (sum % 10 == 0) {
      console.log("Valid ID");
      let currYear = new Date();
      //currYear = currYear.getFullYear();
      let year = Number("20" + id[0] + id[1]);

      if (year > currYear.getFullYear()) {
        year = Number("19" + id[0] + id[1]);
      }
      let dob = year + "/" + id[2] + id[3] + "/" + id[4] + id[5];
      let gender = id[6] > 4 ? "Male" : "Female";
      let age = currYear.getFullYear() - year;
      let citizenship = id[10] == 0 ? "SA Citizen" : "Non-SA Citizen";
      document.getElementById(
        "errorOut"
      ).innerHTML = `ID Number is valid.<br/> Date of Birth: ${dob}.<br/> Gender: ${gender}<br/> Age: ${age}<br/> Citizenship: ${citizenship}`;
      document.getElementById("identity").style.backgroundColor = "green";
      return 0;
    } else {
      document.getElementById("identity").style.backgroundColor = "red";
      console.log("invalid ID");
      document.getElementById("errorOut").innerHTML = "ID Number is invalid.";
      return -1;
    }
  }
  //check if there are non-numbers in the id
  let isCorrect = true;
  for (let i = 0; i < id.length; i++) {
    if (isNaN(Number(id[i]))) {
      isCorrect = false;
    }
  }
  if (!isCorrect) {
    document.getElementById("errorOut").innerHTML =
      "ID numbers consist of only numbers.";
    document.getElementById("identity").style.backgroundColor = "red";
  } else {
    document.getElementById("errorOut").innerHTML = "";
  }
  //1234567890123
  //check if valid date of birth YYMMDD
  //validate YY
  //validate MM
  if (id.length >= 4) {
    const mm = id[2] + id[3];
    if (Number(mm) > 12 || Number(mm) == 0) {
      document.getElementById("identity").style.backgroundColor = "red";
      document.getElementById("errorOut").innerHTML = "Enter a valid month";
    }
  }
  //validate DD
  if (id.length >= 6) {
    if (Number(id[4] + id[5]) > 31 || Number(id[4] + id[5]) == 0) {
      document.getElementById("identity").style.backgroundColor = "red";
      document.getElementById("errorOut").innerHTML = "Enter a valid day";
    }
    //verify days to months
    //30 days
    let isDayValid = false,
      isFebValid = false;
    const fun = () => {
      //console.log(Number(id[2] + id[3]));
      if (Number(id[4] + id[5]) == 30) {
        switch (Number(id[2] + id[3])) {
          case 4:
          case 6:
          case 9:
          case 11:
            isDayValid = true;
            break;
          default:
            document.getElementById("errorOut").innerHTML =
              "Enter a valid day for February";
            document.getElementById("identity").style.backgroundColor = "red";
            isDayValid = false;
            break;
        }
      } else if (Number(id[2] + id[3]) == 2) {
        console.log(id[4] + id[5]);
        if (Number(id[4] + id[5]) == 30) {
          console.log(30);
          document.getElementById("errorOut").innerHTML =
            "Enter a valid day for February";
          document.getElementById("identity").style.backgroundColor = "red";
          throw "no no";
        } else if (Number(id[4] + id[5]) == 29) {
          let currYear = new Date();
          //currYear = currYear.getFullYear();
          let year = Number("20" + id[0] + id[1]);

          if (year > currYear.getFullYear()) {
            year = Number("19" + id[0] + id[1]);
          }
          //check leap year

          console.log(year + " % 4: " + (year % 4));

          if (year % 4 == 0) {
            isFebValid = true;
          } else if (year % 400 == 0) isDayValid = true;
          else isFebValid = false;
        }

        if (Number(id[4] + id[5]) < 29) {
          isFebValid = true;
        }

        if (!isFebValid) {
          document.getElementById("errorOut").innerHTML =
            "Enter a valid day for February";
          document.getElementById("identity").style.backgroundColor = "red";
        } else {
          document.getElementById("errorOut").innerHTML = "";
        }
      }
    };

    fun();
    //validate Citizenship
  }
}

//validate checksum(Luhn)

if (typeof module === "object") {
  module.exports = { isValidID };
}

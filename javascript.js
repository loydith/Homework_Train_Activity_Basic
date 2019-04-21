
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD995ufODSk4pzXh-F-cadj7nZGMSr3lEE",
    authDomain: "train-time-76ba6.firebaseapp.com",
    databaseURL: "https://train-time-76ba6.firebaseio.com",
    projectId: "train-time-76ba6",
    storageBucket: "train-time-76ba6.appspot.com",
    messagingSenderId: "635159679223"
  };
  firebase.initializeApp(config);
  //create the variables 
  var database = firebase.database();
    var name;
    var destination;
    var nextArrival;
    var frequency;

    $("#update").hide();
    $("#remove").hide();

//click on the button Submit
   $("#submit").on("click", function(event){
       event.preventDefault();
        name = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        nextArrival = $("#train-time-input").val().trim();
        frequency = $("#frecuency-input").val().trim();

        database.ref().push({
            name:name,
            destination:destination,
            nextArrival:nextArrival,
            frequency:frequency,
        });
        
        update = $("<td>").text($("#update").show());
        remove = $("<td>").text($("#remove").show());
                
    });
    database.ref().on("child_added", function(childSnapshot){
        var t = childSnapshot.val();
        console.log(t.name);
        console.log(t.destination);
        console.log(t.nextArrival);
        console.log(t.frequency);
        //create a new row
        var newRow = $("<tr>");
        var nameRow = $("<td>").text(t.name);
        var destinationRow = $("<td>").text(t.destination);
        var frecuencyRow = $("<td>").text(t.frequency);

        // set up the site moment.com 
        var train = moment(t.nextArrival, "HH:mm").subtract(1, "years");
        var time = moment().diff(moment(train), "minutes");
        var time1 = time % t.frequency;
        var minAway = $("<td>").text(t.frequency - time1);
        var nexTArrival = moment().add(minAway, "minutes");
        var nextTrainArrival = $("<td>").text(moment(nexTArrival).format("hh:mm"));

        

        //append the data in each row
        newRow.append(nameRow);
        newRow.append(destinationRow);
        newRow.append(frecuencyRow);
        newRow.append(nextTrainArrival);
        newRow.append(minAway);
        nameRow.append(update);
        newRow.append(remove);
        

        $("#train-table").append(newRow);

    });





   
    
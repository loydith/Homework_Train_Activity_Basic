
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
    var firstTrain;
    var frequency;
    

//click on the button Submit
   $("#submit").on("click", function(event){
       event.preventDefault();
        name = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#first-train-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        database.ref().push({
            name:name,
            destination:destination,
            firstTrain:firstTrain,
            frequency:frequency,
        });
        $("#remove").show();   
        remove = $("<td>").text($("#remove").show());
    });
    database.ref().on("child_added", function(childSnapshot){
        var t = childSnapshot.val();
        console.log(t.name);
        console.log(t.destination);
        console.log(t.firstTrain);
        console.log(t.frequency);

        $("#train-name-input").val();
        $("#destination-input").val();
        $("#first-train-input").val();
        $("#frequency-input").val();
        


        //create a new row
        var newRow = $("<tr>");

        var nameRow = $("<td>").text(t.name);
        var destinationRow = $("<td>").text(t.destination);
        var firsttrainRow = $("<td>").text(t.firstTrain);
        var frequencyRow = $("<td>").text(t.frequency);

        // set up the site moment.com 
       
        var trainTimeCalc = moment(t.firstTrain, "HH:mm:ss a").subtract(1, "years");
        var time = moment().diff(moment(trainTimeCalc), "minutes");
        var remainder = time % t.frequency;
        var minAway = $("<td>").text(t.frequency - remainder);
        var nextArrival = moment().add(minAway, "minutes");
        var nextTrainArrival = $("<td>").text(moment(nextArrival).format("hh:mm:ss a"));


        //append the data in each row
        newRow.append(nameRow);
        newRow.append(destinationRow);
        newRow.append(firsttrainRow);
        newRow.append(frequencyRow);
        newRow.append(nextTrainArrival);
        newRow.append(minAway);
        // nameRow.append(update);
        newRow.append(remove);
        

        $("#train-table > tbody").append(newRow);

    });

    $("#remove").on("click", function(){
        $("<td>").remove("");
    });


// moment js, for formated time //
// var trainTimeCalc = moment(trainFirstTime, "HH:mm").subtract(1, "years");


// calculate difference, between start time and current time //
// var diffTime = moment().diff(moment(trainTimeCalc), "minutes");

// calculates the remaining minutes //
// var tRemainder = diffTime % trainFrequency;

// the next train arrival time in minutes //
// var minAway = trainFrequency - tRemainder;

// the next arrival time of train
// var nexTArrival = moment().add(minAway, "minutes");
// var nextTrainArrival = moment(nexTArrival).format("hh:mm");

   ///////////////////////

//    var trainTime = moment.unix(firstTime).format("hh:mm");
   //calculate difference between times
//    var difference =  moment().diff(moment(trainTime),"minutes");
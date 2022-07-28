import AWS from 'aws-sdk';

export default function UploadFile(){
    const element = document.getElementById("fileToUpload");
    element?.addEventListener("change", function (event: any) {ProcessImage(); }, false);
  
  //Calls DetectFaces API and shows estimated ages of detected faces
  function DetectFaces(imageData: any) {
    AWS.config.region = "eu-west-2";
    var rekognition = new AWS.Rekognition();
    var params = {
      Image: {
        Bytes: imageData
      },
      Attributes: [
        'ALL',
      ]
    };
    rekognition.detectFaces(params, function (err: any, data: any) {
        var result : any = document.getElementById("opResult");
      if (err) console.log(err, err.stack); // an error occurred
      else {
       var table = "<table><tr><th>Low</th><th>High</th></tr>";
        // show each face and build out estimated age table
        for (var i = 0; i < data.FaceDetails.length; i++) {
          table += '<tr><td>' + data.FaceDetails[i].AgeRange.Low +
            '</td><td>' + data.FaceDetails[i].AgeRange.High + '</td></tr>';
        }
        table += "</table>";
        result.innerHTML = table;
      }
    });
  }
  //Loads selected image and unencodes image bytes for Rekognition DetectFaces API
  function ProcessImage() {
    AnonLog();
    var control : any = document.getElementById("fileToUpload");
    var file = control?.files[0];

    // Load base64 encoded image for display 
    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e: any) {
        //Call Rekognition  
        AWS.config.region = "eu-west-2";  
        var rekognition = new AWS.Rekognition();
        var params = {
          Image: {
          Bytes: e.target.result
        },
        Attributes: [
        'ALL',
      ]
    };
    rekognition.detectFaces(params, function (err: any, data: any) {
      var result : any = document.getElementById("opResult");
      if (err) console.log(err, err.stack); // an error occurred
      else {
       var table = "<table><tr><th>Low</th><th>High</th></tr>";
        // show each face and build out estimated age table
        for (var i = 0; i < data.FaceDetails.length; i++) {
          table += '<tr><td>' + data.FaceDetails[i].AgeRange.Low +
            '</td><td>' + data.FaceDetails[i].AgeRange.High + '</td></tr>';
        }
        table += "</table>";
        result.innerHTML = table;
      }
    });

      };
    })(file);
    reader.readAsArrayBuffer(file);
  }
  //Provides anonymous log on to AWS services
  function AnonLog() {
    
    // Configure the credentials provider to use your identity pool
    AWS.config.region = 'eu-west-2'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-west-2:371cdf1c-657e-4e3f-a6a0-3cdcf905bfdc',
    });
    // Make the call to obtain credentials
    AWS.config.getCredentials(function () {
      // Credentials will be available when this function is called.
      var accessKeyId = AWS.config.credentials?.accessKeyId;
      var secretAccessKey = AWS.config.credentials?.secretAccessKey;
      var sessionToken = AWS.config.credentials?.sessionToken;
    });
  }

    return (
        <>
            <input type="file" name="fileToUpload" id="fileToUpload" accept="image/*" onChange={ProcessImage}/>
            <p id="opResult"></p>
        </>
    );
}
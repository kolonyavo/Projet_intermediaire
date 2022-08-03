import Anonlog from "./Anonlog";
import AWS from 'aws-sdk';

//Loads selected image and unencodes image bytes for Rekognition DetectFaces API
export default function ProcessImage() {
    Anonlog();
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
                Bytes: e.target?.result,
            },
            Attributes: [
            'ALL',
            ]
            };

            rekognition.detectFaces(params, function (err: any, data: any) {
                var ageRange : any = document.getElementById("opResult");
                if (err) console.log(err, err.stack);
                else {
                    var table = "";
                    table += '<ul>Low : ' + data.FaceDetails[0].AgeRange.Low + '</ul>' +
                    '<ul>High : ' + data.FaceDetails[0].AgeRange.High + '</ul>';
                    ageRange.innerHTML = table;
                }
                var beard : any = document.getElementById("opBeard");
                if (err) console.log(err, err.stack);
                else {
                    var table = "";
                    table += '<ul>Value : ' + data.FaceDetails[0].Beard.Value + '</ul>' +
                    '<ul>Confidence : ' + data.FaceDetails[0].Beard.Confidence + '</ul>';
                    beard.innerHTML = table;
                }
                var boundingBox : any = document.getElementById("opBoundingBox");
                if (err) console.log(err, err.stack);
                else {
                    var table = "";
                    table += '<ul>Width : ' + data.FaceDetails[0].BoundingBox.Width + '</ul>' +
                    '<ul>Height : ' + data.FaceDetails[0].BoundingBox.Height + '</ul>'+
                    '<ul>Left : ' + data.FaceDetails[0].BoundingBox.Left + '</ul>' +
                    '<ul>Top : ' + data.FaceDetails[0].BoundingBox.Top + '</ul>';
                    boundingBox.innerHTML = table;
                }
                var confidence : any = document.getElementById("opConfidence");
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    var table = "";
                    // show each face and build out estimated age table
                    for (var i = 0; i < data.FaceDetails.length; i++) {
                    table += '<ul>' + data.FaceDetails[i].Confidence+ '</ul>';
                    }
                    confidence.innerHTML = table;
                }
                var emotion : any = document.getElementById("opEmotion");
                if (err) console.log(err, err.stack);
                else {
                    var table = "";
                    var emotions = data.FaceDetails[0].Emotions;
                    table += '<ul>' + JSON.stringify(emotions)+ '</ul>';
                    emotion.innerHTML = table;
                }
                var eyeglasses : any = document.getElementById("opEyeglasses");
                if (err) console.log(err, err.stack);
                else {
                    var table = "";
                    table += '<ul>Value : ' + data.FaceDetails[0].Eyeglasses.Value + '</ul>' +
                    '<ul>Confidence : ' + data.FaceDetails[0].Eyeglasses.Confidence + '</ul>';
                    eyeglasses.innerHTML = table;
                }
                var eyeopen : any = document.getElementById("opEyesOpen");
                if (err) console.log(err, err.stack);
                else {
                    var table = "";
                    table += '<ul>Value : ' + data.FaceDetails[0].EyesOpen.Value + '</ul>' +
                    '<ul>Confidence : ' + data.FaceDetails[0].EyesOpen.Confidence + '</ul>';
                    eyeopen.innerHTML = table;
                }
                var gender : any = document.getElementById("opGender");
                if (err) console.log(err, err.stack);
                else {
                    var table ="";
                    table += '<ul>Value : ' + data.FaceDetails[0].Gender.Value + '</ul>' +
                    '<ul>Confidence : ' + data.FaceDetails[0].Gender.Confidence + '</ul>';
                    gender.innerHTML = table;
                }
                var mouthopen : any = document.getElementById("opMouthOpen");
                if (err) console.log(err, err.stack);
                else {
                    var table = "";
                    table += '<ul>Value : ' + data.FaceDetails[0].MouthOpen.Value + '</ul>' +
                    '<ul>Confidence : ' + data.FaceDetails[0].MouthOpen.Confidence + '</ul>';
                    mouthopen.innerHTML = table;
                }
                var landmark : any = document.getElementById("opLandmarks");
                if (err) console.log(err, err.stack);
                else {
                    var table = "";
                        var test = data.FaceDetails[0].Landmarks;
                        table += '<ul>' + JSON.stringify(test)+ '</ul>';
                    landmark.innerHTML = table;
                }
                var pose : any = document.getElementById("opPose");
                if (err) console.log(err, err.stack);
                else {
                    var table = "";
                    table += '<ul>Roll : ' + data.FaceDetails[0].Pose.Roll + '</ul>' +
                    '<ul>Yaw : ' + data.FaceDetails[0].Pose.Yaw + '</ul>'+
                    '<ul>Pitch : ' + data.FaceDetails[0].Pose.Pitch + '</ul>';
                    pose.innerHTML = table;
                }
                var mustache : any = document.getElementById("opMustache");
                if (err) console.log(err, err.stack);
                else {
                    var table ="";
                    table += '<ul>Value : ' + data.FaceDetails[0].Mustache.Value + '</ul>' +
                    '<ul>Confidence : ' + data.FaceDetails[0].Mustache.Confidence + '</ul>';
                    mustache.innerHTML = table;
                }
                var quality : any = document.getElementById("opQuality");
                if (err) console.log(err, err.stack);
                else {
                    var table = "";
                    table += '<ul>Brightness : ' + data.FaceDetails[0].Quality.Brightness + '</ul>' +
                    '<ul>Sharpness : ' + data.FaceDetails[0].Quality.Sharpness + '</ul>';
                    quality.innerHTML = table;
                }
                var smile : any = document.getElementById("opSmile");
                if (err) console.log(err, err.stack);
                else {
                    var table = "";
                    table += '<ul>Value : ' + data.FaceDetails[0].Smile.Value + '</ul>' +
                    '<ul>Confidence : ' + data.FaceDetails[0].Smile.Confidence + '</ul>';
                    smile.innerHTML = table;
                }
                var sunglasses : any = document.getElementById("opSunglasses");
                if (err) console.log(err, err.stack);
                else {
                    var table = "";
                    table += '<ul>Value : ' + data.FaceDetails[0].Sunglasses.Value + '</ul>' +
                    '<ul>Confidence : ' + data.FaceDetails[0].Sunglasses.Confidence + '</ul>';
                    sunglasses.innerHTML = table;
                }
            });
        };
    })(file);
    reader.readAsArrayBuffer(file);
}
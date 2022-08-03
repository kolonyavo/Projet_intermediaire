import { useEffect, useState } from 'react';
import './all.css';
import ProcessImage from './ProcessImage';
import CSS from "csstype";
import AWS from 'aws-sdk';
import Anonlog from './Anonlog';
import Infos from './Infos';

export default function AnalyzeImage(){

  const [showMessage, setShowMessage] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setShowMessage(false);
    }, 10000);
  }, []);

  const element = document.getElementById("fileToUpload");
  element?.addEventListener("change", function (event) {ProcessImage(); }, false);

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [boundingBox, setBoundingBox] = useState<any>()
  
  // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
      if (!selectedFile) {
        setPreview(undefined)
        return
      }
      const objectUrl: any = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile]);

    //Preview the image
    function onSelectFile (e: any){
      ProcessImageBoundingBox();
      ProcessImage();
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0]);
    };

function ProcessImageBoundingBox() {
      Anonlog();
      var uploadFile: HTMLElement|any = document.getElementById("fileToUpload");
      var file = uploadFile?.files[0];
  
      // Load base64 encoded image for display 
      var reader = new FileReader();
      reader.onload = (function (theFile) {
          return function (e: null|any) {
              //Call Rekognition  
              AWS.config.region = "eu-west-2";  
              var rekognition = new AWS.Rekognition();
              var params = {
                  Image: {
                  Bytes: e.target.result,
              },
              Attributes: [
              'ALL',
              ]
              };
  
              rekognition.detectFaces(params, function (err: any, data: any) {
                  if (err) console.log(err, err.stack);
                  else {
                    setBoundingBox(data.FaceDetails[0])
                  }
              });
          };
      })(file);
      reader.readAsArrayBuffer(file);
  }

    const box: CSS.Properties = {
      border: '3px solid rgb(3, 88, 39)',
      position: 'absolute',
      left: boundingBox?.BoundingBox.Left * 100 + '%',
      top: boundingBox?.BoundingBox.Top * 100 +'%',
      width: boundingBox?.BoundingBox.Width * 100 +'%',
      height: boundingBox?.BoundingBox.Height * 100 +'%'
    }

    return (
        <div className='column'>
          <div className='App'> 
            <input type="file" name="fileToUpload" id="fileToUpload" accept='image/*' onChange={onSelectFile}/>
          </div>
          <div className='row'>
            <div className='photo'>
              <div style={box}/>
              {selectedFile &&  <img src={preview} className='img'/>}
            </div>
            {selectedFile && <Infos/>}
            
          </div>
        </div>
    );   
}
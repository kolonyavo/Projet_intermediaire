import './all.css';

export default function Infos(){
    return (
        <div className='infos'>
        <div className='right'>
        <h3>BoundingBox</h3>
        <p id='opBoundingBox'></p>
        </div>
        <div className='right'>
        <h3>AgeRange</h3>
        <p id='opResult'></p>
        </div>
        <div className='right'>
        <h3>Smile</h3>
        <p id='opSmile'></p>
        </div>
        <div className='right'>
        <h3>Eyeglasses</h3>
        <p id='opEyeglasses'></p>
        </div>
        <div className='right'>
        <h3>Sunglasses</h3>
        <p id='opSunglasses'></p>
        </div>
        <div className='right'>
        <h3>Gender</h3>
        <p id='opGender'></p>
        </div>
        <div className='right'>
        <h3>Beard</h3>
        <p id='opBeard'></p>
        </div>
        <div className='right'>
        <h3>Mustache</h3>
        <p id='opMustache'></p>
        </div>
        <div className='right'>
        <h3>EyesOpen</h3>
        <p id='opEyesOpen'></p>
        </div>
        <div className='right'>
        <h3>MouthOpen</h3>
        <p id='opMouthOpen'></p>
        </div>
        <div className='right'>
        <h3>Emotion</h3>
        <p id='opEmotion'></p>
        </div>
        <div className='rightN'>
        <h3 className='landmark'>Landmarks</h3>
        <p id='opLandmarks'></p>
        </div>
        <div className='right'>
        <h3>Pose</h3>
        <p id='opPose'></p>
        </div>
        <div className='right'>
        <h3>Quality</h3>
        <p id='opQuality'></p>
        </div>
        <div className='right'>
        <h3>Confidence</h3>
        <p id='opConfidence'></p>
        </div>
        </div>
    );
}
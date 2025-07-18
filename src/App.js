import { Component } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

// function App() {
  
//   return (
//     <div>
//       <Navigation />
//       <Logo />
//       <Rank />
//       <ImageLinkForm />
//       <ParticlesBg className='particles' type="cobweb" bg={true} />
//     </div>
//   );
// }

// export default App;

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: null,
      imageUrl: null,
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        first_name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  // adding a lifecycle method in a process of connecting frontend to backend
  componentDidMount = () => {
    fetch('https://smart-brain-api-dkfq.onrender.com')
      .then(response => response.json())
      .then(console.log);
  }

  loadUser = (data) => {
    this.setState({
      user: {
      id: data.id,
      first_name: data.first_name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
      }
    });
  }

  onInputChange = (event) => {
  console.log(event.target.value);
  this.setState({input: event.target.value});
  }

  resetState = () => {
    this.onRouteChange('signin');
    this.setState({
      input: null,
      imageUrl: null,
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        first_name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    })
  }

  onButtonSubmit = () => {
  //  console.log('click');
    this.setState({imageUrl: this.state.input})
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    //fetch("https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs", setupClarifaiApi(this.state.input))
    fetch('https://smart-brain-api-dkfq.onrender.com/imageurl', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        imageUrl: this.state.input
      })
    })
    .then(response => response.json())
    .then(result => {
        if(result) {
          fetch('https://smart-brain-api-dkfq.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(result => result.json())
          .then(data => {
            console.log(data);
            console.log('State User First Name', this.state.user.first_name);
            console.log('State User entries', this.state.user.entries);
           // this.setState(Object.assign(this.state.user, {entries: count})); // good if updating a single attribute of state user.
            this.loadUser(data);
           })
        }
        this.displayFaceBox(this.calculateFaceLocation2(result)); 
    })
    .catch(error => console.log('error', error));
  }

  // // Used for Single Face Detection
  // calculateFaceLocation = (topRow, leftCol, bottomRow, rightCol) => {
  //   const image = document.getElementById('inputImage');
  //   const width = Number(image.width);
  //   const height = Number(image.height);
  //   console.log(width, height);
  //   return {
  //     left_col: leftCol * width,
  //     top_row: topRow * height,
  //     right_col: width - (rightCol * width),
  //     bottom_row: height - (bottomRow * height)
  //   }
  // }

  // displayFlexBox = (box2) => {
  //   console.log(box2);
  //   this.setState({box: box2});
  // }

  displayFaceBox = (box2) => {
    this.setState({box: box2});
  }

  calculateFaceLocation2 = (result) => {
    const regions = result.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    let box2 = [];
    regions.forEach((region,i) => {
      const boundingBox = region.region_info.bounding_box;
      box2.push(
        {
      top_row: boundingBox.top_row.toFixed(3) * height,
      left_col: boundingBox.left_col.toFixed(3) * width,
      bottom_row: height - (boundingBox.bottom_row.toFixed(3) * height),
      right_col: width - (boundingBox.right_col.toFixed(3) * width)
        }
    );
    });
    return box2;
  }

  onRouteChange = (route) => {
    if(route === 'signin' || route === 'register')
      this.setState( {isSignedIn: false} );
    else
      this.setState( {isSignedIn: true} );
    this.setState( {route: route} );
  }

  render() {
      return (
        <div>
          <ParticlesBg className='particles' type='cobweb' bg={true} />
          <Navigation onRouteChange={this.onRouteChange} resetState={this.resetState} isSignedIn={this.state.isSignedIn} />
          {
          this.state.route === 'signin'
          ?<SignIn onRouteChange = {this.onRouteChange} loadUser={this.loadUser}/>
          :(
            this.state.route === 'register'
            ?<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            :<div>
              <Logo />
              <Rank name={this.state.user.first_name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit} />
              <ErrorBoundary>    
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
              </ErrorBoundary>
            </div>
            )  
          }
        </div>
      );    
  }
}

export default App;
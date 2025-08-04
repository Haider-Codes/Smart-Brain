import { React, Component } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
// converting Register.js to a smart component (Very similar to what we did in Signin component)

class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            showPassword: false
        };
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onFirstNameChange = (event) => {
        this.setState({first_name: event.target.value});
    }

    onLastNameChange = (event) => {
        this.setState({last_name: event.target.value});
    }

    onRegisterSubmit = () => {
        // adding validations
        if(!this.state.first_name.trim()) {
            this.onError("first-name-error");
        }
        else if(!this.state.last_name.trim()) {
            document.getElementById("first-name-error").style.display = "none";
            this.onError("last-name-error");
        }
        else if(!(this.state.email.trim() && this.state.email.includes("@"))) {
            document.getElementById("first-name-error").style.display = "none";
            document.getElementById("last-name-error").style.display = "none";
            this.onError("email-error");
        }
        else if(!(this.state.password.trim() && (this.state.password.length >= 8) && (this.state.password.search(/[A-Z]/) !== -1) 
        && (this.state.password.search(/[A-Z]/) !== -1) && (this.state.password.search(/[a-z]/) !== -1) && (this.state.password.search(/[0-9]/) !== -1)) ) {
            document.getElementById("first-name-error").style.display = "none";
            document.getElementById("last-name-error").style.display = "none";
            document.getElementById("email-error").style.display = "none";
            this.onError("password-error");
        }
        else {
        //    document.getElementById("password-error").style.display = "none";
            fetch('https://smart-brain-api-dkfq.onrender.com/register', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(response => response.json())
            .then(user => {
                if(user.email === this.state.email) {
                //    console.log("User is: ", user);
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
            .catch(error => console.log("Error is", error));
        }
    }
    onError = (e) => {
        const error = document.getElementById(e);
        error.style.display = "inline";
    }

    handler = (e) => {
        const reg_submit = document.getElementById("submit");
        if(e.key === "Enter") {
            e.preventDefault();
            reg_submit.click();
        }
    }

    render() {
        return(
            <div className='center w-100'>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-s mw6 shadow-5">
                    <main className="pa4 black-80 ">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f3 fw6 ph0 mh0 center">Registration Form</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="first-name">First Name</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                           type="text" 
                                           name="first-name"
                                           onChange={this.onFirstNameChange} 
                                           onKeyDown={()=> document.getElementById("first-name").addEventListener("keypress", this.handler)} 
                                           id="first-name" />
                                    <span id="first-name-error" style={{display: 'none'}} >
                                        <p className="center f5 red fw6">First Name is required!</p>    
                                    </span>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="last-name">Last Name</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                           type="text" 
                                           name="last-name"
                                           onChange={this.onLastNameChange}  
                                           onKeyDown={()=> document.getElementById("last-name").addEventListener("keypress", this.handler)}
                                           id="last-name" />
                                    <span id="last-name-error" style={{display: 'none'}}>
                                        <p className="center f5 red fw6">Last Name is required!</p>    
                                    </span>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email Id</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                           type="email" 
                                           name="email-address"
                                           onChange={this.onEmailChange}  
                                           onKeyDown={()=> document.getElementById("email-address").addEventListener("keypress", this.handler)}
                                           id="email-address" />
                                    <span id="email-error" style={{display: 'none'}}>
                                        <p className="center f5 red fw6">Please enter a valid email</p>    
                                    </span>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <div className="center relative">
                                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                            type={this.state.showPassword === true ? "text" : "password"} 
                                            name="password"
                                            onChange={this.onPasswordChange}  
                                            onKeyDown={()=> document.getElementById("password").addEventListener("keypress", this.handler)}
                                            id="password" />
                                            {
                                                this.state.showPassword === false
                                                ?
                                                (                                                
                                                <span className="eye-icon" onClick={()=>{this.setState({showPassword: true})}}>
                                                    <HiEye />
                                                </span>    
                                                )
                                                :
                                                (
                                                <span className="eye-icon" onClick={()=>{this.setState({showPassword: false})}}>
                                                    <HiEyeOff />
                                                </span>
                                                )
                                            }
                                    </div>
                                    <span id="password-error" style={{display: 'none'}}>
                                        <p className="center f5 red fw6">Password should comprise of minimum 8 characters</p>    
                                    </span>
                                </div>
                            </fieldset>
                            <div className="center">
                                <input id="submit" className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onRegisterSubmit} type="submit" value="Register" />
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default Register;
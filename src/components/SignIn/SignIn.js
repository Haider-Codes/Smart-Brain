import { React, Component } from 'react';
import { HiEye } from 'react-icons/hi';
import { HiEyeOff } from 'react-icons/hi';
// converting SignIn component into a smart component (basically converting it from React Hook to React Class with states)
class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            showPassword: false
        };
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSignInSubmit = (event) => {
        console.log(event);
        console.log("Email State: ", this.state.signInEmail);
        console.log("Password State: ", this.state.signInPassword);
        if(this.state.signInEmail && this.state.signInPassword) {
            fetch('https://smart-brain-api-dkfq.onrender.com/signin', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            })
            .then(response => response.json())
            .then(user => {
                if(user.id) {
                    console.log("User is: ",user);
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
                else {
                    this.onError(user);
                }
            })
            .catch(error => {
                this.onError(error);
            })
        }
        else{
            this.onError("Please enter valid email or password!");
        }
    }
    onError = (e) => {
        const err = document.getElementById("error");
        err.style.display = 'block';
        console.log("error is:", e)
        const label = document.getElementById("errorLabel");
        label.innerHTML = e;
    }

    handler = (event)=>{
        const submit_button = document.getElementById("formSubmit");
        if(event.key === "Enter") {
            event.preventDefault();
            submit_button.click();
        }
    }

    render() {
        const { onRouteChange } = this.props;
        return(
            <div className='center w-100'>
                <article className="br3 ba dark-gray b--black-10 mv5 w-100 w-50-m w-25-s mw6 shadow-5">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f3 fw6 ph0 mh0 center">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                           type="email" 
                                           name="email-address"
                                           onChange={this.onEmailChange}
                                           onKeyDown={()=>document.getElementById("email-address").addEventListener("keypress", this.handler)}
                                           id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <div className="center relative">
                                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                            type={this.state.showPassword === true ? "text" : "password"} 
                                            name="password"
                                            onChange={this.onPasswordChange}
                                            onKeyDown={()=>document.getElementById("password").addEventListener("keypress", this.handler)}  
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
                                </div>
                            </fieldset>
                            <div className="center">
                                <input id="formSubmit" className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onSignInSubmit} type="submit" value="Sign in" />
                            </div>
                            <div className="lh-copy mt3 center">
                                <a href="#0" onClick={()=>onRouteChange('register')} className="f6 link dim black db">Sign up/Register</a>
                            </div>
                            <span style={{display: 'none'}} id="error" className="mv3 validation shadow-5">
                                <label id="errorLabel" className=" center white fw6 lh-copy f5"></label>
                            </span>
                        </div>
                    </main>
                </article>
            </div>
        );
       
    }
}


// const SignIn = ( {onRouteChange} ) => {
//     return(
//         <div className='center w-100'>
//             <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5">
//                 <main className="pa4 black-80 ">
//                     <div className="measure">
//                         <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//                             <legend className="f3 fw6 ph0 mh0 center">Sign In</legend>
//                             <div className="mt3">
//                                 <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
//                                 <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
//                             </div>
//                             <div className="mv3">
//                                 <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
//                                 <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password " />
//                             </div>
//                         </fieldset>
//                         <div className="center">
//                             <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={()=>onRouteChange('home')} type="submit" value="Sign in" />
//                         </div>
//                         <div className="lh-copy mt3 center">
//                             <a href="#0" onClick={()=>onRouteChange('register')} className="f6 link dim black db">Sign up/Register</a>
//                         </div>
//                     </div>
//                 </main>
//             </article>
//         </div>
//     );
// }

export default SignIn;
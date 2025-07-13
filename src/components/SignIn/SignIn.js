import { React, Component } from 'react';

// converting SignIn component into a smart component (basically converting it from React Hook to React Class with states)
class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        };
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSignInSubmit = () => {
        fetch('http://localhost:3001/signin', {
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

    onError = (e) => {
        const err = document.getElementById("error");
        err.style.display = 'block';
        console.log("error is:", e)
        const label = document.getElementById("errorLabel");
        label.innerHTML = e;
    }

    render() {
        const { onRouteChange } = this.props;
        return(
            <div className='center w-100'>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5">
                    <main className="pa4 black-80 ">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f3 fw6 ph0 mh0 center">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                           type="email" 
                                           name="email-address"
                                           onChange={this.onEmailChange}  
                                           id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                           type="password" 
                                           name="password"
                                           onChange={this.onPasswordChange}  
                                           id="password " />
                                </div>
                            </fieldset>
                            <div className="center">
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onSignInSubmit} type="submit" value="Sign in" />
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
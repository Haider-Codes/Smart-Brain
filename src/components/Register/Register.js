import { React, Component } from 'react';
// converting Register.js to a smart component (Very similar to what we did in Signin component)

class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
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
        fetch('http://localhost:3001/register', {
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

    render() {
        return(
            <div className='center'>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5">
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
                                           id="first-name" />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="last-name">Last Name</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                           type="text" 
                                           name="last-name"
                                           onChange={this.onLastNameChange}  
                                           id="last-name" />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email Id</label>
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
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onRegisterSubmit} type="submit" value="Register" />
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default Register;
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    // hokes
    const [loginError,setLoginError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);

    // event handler function for Login button
    const handleLogin = e => {
        e.preventDefault();
        // input field value
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        console.log(email,password);

        // previous error or success remove
        setLoginError('');
        setSuccess('');

        // sign in option add from firebase
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if(result.user.emailVerified){
                    setSuccess('You login has successfully done')
                }
                else{
                    alert('Please check your email and verify your account')
                }
            })
            .catch(error => {
                if(error.message === 'Firebase: Error (auth/invalid-credential).'){
                    setLoginError('Please enter your valid password')
                }
            })
    }

    // event handler function for Forget password 
    const handleForgetPassword = () =>{
        const myEmail = emailRef.current.value;
        if(!myEmail){
            console.log('Please enter your email');
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(myEmail)){
            console.log('Please enter a valid email address');
            return;
        }
        sendPasswordResetEmail(auth,myEmail)
        .then(() =>{
            alert('Please check your email')
        })
        .catch(error =>{
            console.error(error.message);
        })
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body w-full">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input ref={emailRef} name="email" type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            loginError && <p className="text-red-500 text-xl ml-8">{loginError}</p>
                        }
                        {
                            success && <p className="text-green-500 text-xl ml-8">{success}</p>
                        }
                        <p className="mb-10 ml-8">New to this website? Please <Link className="btn btn-secondary" to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
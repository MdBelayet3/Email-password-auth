import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {

    //useState hokes
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        // input field value
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email,  password, accepted);

        // error or success message remove
        setRegisterError('');
        setSuccess('');

        // password validation included password length, uppercase letter, lowercase letter and any special character
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at lest one upper case character');
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setRegisterError('Your password should have at lest one small case character');
            return;
        }
        else if (!/[^A-Za-z0-9]/.test(password)) {
            setRegisterError('Your password should have at lest one special character');
            return;
        }
        // terms and condition validate
        else if(!accepted){
            setRegisterError("Please accept our term and condition");
            return;
        }

        // User create use firebase 
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('Success ! Your registration has successfully done')
                
                // update profile
                updateProfile(result.user,{
                    displayName: name,
                     photoURL: "https://example.com/jane-q-user/profile.jpg",
                })

                // send verification email
                sendEmailVerification(result.user)
                .then(() =>{
                    alert('Please check your email and verify your account')
                })
            })
            .catch(error => {
                setRegisterError(error.message);

            })
    }

    return (
        <div>
            <h1 className="text-3xl  my-6">Please Register</h1>
            <div>
                <form onSubmit={handleRegister} className="md:w-96">
                    <input required className="border border-black rounded-3xl py-2 px-6 mb-3 w-full" type="text" name="name" id="" placeholder="Your name" /><br />
                    <input required className="border border-black rounded-3xl py-2 px-6 mb-3 w-full" type="email" name="email" id="" placeholder="Email address" /><br />
                    <div className="relative">
                        <input required className=" py-2 px-6 border border-black rounded-3xl mb-3 w-full " type={showPassword ? "text" : "password"} name="password" id="" placeholder="Password" /><br />
                        <span className="hover:cursor-pointer absolute bottom-6 left-[340px] text-xl" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                    </div>
                    <div className="mb-1 mt-2 ml-2 text-xl">
                        <input className="mr-3 size-5" type="checkbox" name="terms" id="" />
                        <label htmlFor="terms">Accept our <a href="">Terms and Condition</a></label>
                    </div>
                    <br />
                    <input className="btn btn-secondary border border-black rounded-3xl py-2 px-4 mb-3 w-full" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-500 text-xl">{registerError}</p>
                }
                {
                    success && <p className="text-green-500 text-xl">{success}</p>
                }
                <p className="mb-10 ml-8">Already have an account? Please <Link className="btn btn-primary" to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
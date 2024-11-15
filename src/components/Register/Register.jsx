import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase";

const Register = () => {

    const handleRegister = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        createUserWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result);
        })
        .catch(error =>{
            console.error(error);
        })
    }

    return (
        <div>
            <h1 className="text-3xl  my-6">Please Register</h1>
            <div>
            <form onSubmit={handleRegister} className="md:w-96">
                <input required className="border border-black rounded-3xl py-2 px-6 mb-3 w-full" type="email" name="email" id="" placeholder="Email address" /><br />
                <input required className="border border-black rounded-3xl py-2 px-6 mb-3 w-full" type="password" name="password" id="" placeholder="Password" /><br />
                <input className="btn btn-secondary border border-black rounded-3xl py-2 px-4 mb-3 w-full" type="submit" value="Register" />
            </form>
            </div>
        </div>
    );
};

export default Register;
import React, {useContext} from 'react';
import Input from '../../Shared/components/FormElements/Input'
import { useForm } from "../../Shared/hooks/formhook"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import {AuthContext} from "../../Shared/components/context/AuthContext"
import { Button } from "react-bootstrap";

const SignUp = () => {
    const [formState, inputHandler] = useForm({
        name : {
            value: '',
            isValid: false
        },

        email : {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }

    }, false);

    const auth = useContext(AuthContext)

    const authSubmitHandler = async event => {
        event.preventDefault();

       try{
            const response = await fetch('http://localhost:5000/api/users/signup', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formState.inputs.name.value,
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
            })
        })
        
      const responseData = await response.json(); 
    

       console.log(responseData);
    }catch(err){
            console.log(err);
        } 
        console.log(formState);
        auth.login();
      };
    
    return (
      <form onSubmit={authSubmitHandler}>
        <Input
          element = "input"
          id = "name"
          type = "text"
          label = "Name"
          errorText = "Empty name, please try again."
          validator = {[VALIDATOR_REQUIRE()]}
          onInput = {inputHandler}
        />
        <Input
          element = "input"
          id = "email"
          type = "email"
          label = "Email"
          errorText = "Wrong email, please try again."
          validator = {[VALIDATOR_REQUIRE()]}
          onInput = {inputHandler}
        />
        <Input
          element = "input"
          id = "password"
          type = "password"
          label = "Password"
          errorText = "Wrong password, please try again."
          validator = {[VALIDATOR_MINLENGTH(5)]}
          onInput = {inputHandler}
        />
        <Button type="Submit" disabled={!formState.isValid}>Sign Up</Button>
      </form>
    );
}


export default SignUp;
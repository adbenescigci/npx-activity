import React from 'react';
import Sign from './SignInUp';

import {firebase, googleAuthProvider } from '../firebase/firebase';
import 'firebase/auth';

export default class LoginPage extends React.Component {

    constructor (props){
        super(props)

        this.onHandleAccount = this.onHandleAccount.bind(this)
        this.onLoginWithMail = this.onLoginWithMail.bind(this)

        this.state= {
            signUp: true,
            errorCode:'',
            errorMessage:'',
            sign:'Girisi',
        }
}

onSignUp = ()=>{
    this.setState(()=>({
        signUp:false,
        errorCode:'',
        errorMessage:'',
        sign:'Kaydi',
    }))
}
goToLogin = ()=>{
    this.setState(()=>({
        signUp:true,
        errorCode:'',
        errorMessage:'',
        sign:'Girisi',
    }))
}

onLogin = ()=>{
    firebase.auth().signInWithPopup(googleAuthProvider)
}


onHandleAccount= (email,password)=>{
    let errorCode,errorMessage;

    return firebase.auth().createUserWithEmailAndPassword(email,password)
    .catch((error) =>{
        errorCode = error.code;
        errorMessage = error.message;

        this.setState(()=>({ errorCode, errorMessage}))
        console.log(this.state.errorCode)
      });
}

onLoginWithMail= (email,password)=>{
    let errorCode,errorMessage;
    
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .catch((error) => {
        errorCode = error.code;
        errorMessage = error.message;

        this.setState(()=>({ errorCode, errorMessage}))
        console.log(this.state.errorCode)
      });
}

render () {
    return (
        <div> 

            <div className='box-layout'>
                <div className='box-title'> <h1> Vird e Hoşgeldiniz </h1></div>
                <div className='box-layout__box'>
                    <h3 className='box-layout__title'> Kullanici {this.state.sign} Yapiniz</h3>
                  { this.state.signUp        ?
                    <div>  
                        <button className='button' onClick={this.onLogin}> Google Hesabiyla Giris </button>
                        <Sign 
                            error={this.state.errorCode} 
                            type ='Mail ile Giris' 
                            email={this.onLoginWithMail}
                        />
                
                        {this.state.errorCode ? `Hatali Giris:  ${this.state.errorCode}` : '' }
                            
                        <br/>
                        Hesabiniz yoksa 
                        <button className='button__out' onClick={this.onSignUp}> Hesap Al </button>

                    </div>
                                :
                    <div>
                        <Sign 
                            error={this.state.errorCode} 
                            type ='Kaydol' 
                            email={this.onHandleAccount}
                        /> 
                        {this.state.errorCode ? `Hatali Giris:  ${this.state.errorCode}` : '' }
                        <button className='button__out' onClick={this.goToLogin}> Girişe Dön </button>
                    </div>        
                    } 
                    </div>
            </div>     
        </div>
    )
}

}
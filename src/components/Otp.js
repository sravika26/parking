// import React from 'react'
// import firebase from '../firebase'

// export default function Otp(){
//   const handleChange = (e) =>{
//     const {name, value } = e.target
//     this.setState({
//         [name]: value
//       })
//   }
//   const configureCaptcha = () =>{
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//       'size': 'invisible',
//       'callback': (response) => {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         onSignInSubmit();
//         console.log("Recaptca varified")
//       },
//       defaultCountry: "IN"
//     });
//   }
//   const onSignInSubmit = (e) => {
//     e.preventDefault()
//     this.configureCaptcha()
//     const phoneNumber = "+91" + this.state.mobile
//     console.log(phoneNumber)
//     const appVerifier = window.recaptchaVerifier;
//     firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
//         .then((confirmationResult) => {
//           // SMS sent. Prompt user to type the code from the message, then sign the
//           // user in with confirmationResult.confirm(code).
//           window.confirmationResult = confirmationResult;
//           console.log("OTP has been sent")
//           // ...
//         }).catch((error) => {
//           // Error; SMS not sent
//           // ...
//           console.log("SMS not sent")
//         });
//   }
//   const onSubmitOTP = (e) =>{
    
//     e.preventDefault()
//     const code = this.state.otp
//     console.log(code)
//     window.confirmationResult.confirm(code).then((result) => {
//       // User signed in successfully.
//       const user = result.user;
//       console.log(JSON.stringify(user))
//       alert("User is verified")
//       // ...
//     }).catch((error) => {
//       // User couldn't sign in (bad verification code?)
//       // ...
//     });
//   }
//     return (
//       <div>
//         <h2>Login Form</h2>
//         <form onSubmit={onSignInSubmit}>
//           <div id="sign-in-button"></div>
//           <input type="number" name="mobile" placeholder="Mobile number" required onChange={handleChange}/>
//           <button type="submit">Submit</button>
//         </form>

//         <h2>Enter OTP</h2>
//         <form onSubmit={onSubmitOTP}>
//           <input type="number" name="otp" placeholder="OTP Number" required onChange={handleChange}/>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     )
// }
import React, { useState } from 'react';

import { auth, firebase } from '../firebase';

const Otp = () => {
	// Inputs
	const [mynumber, setnumber] = useState("");
	const [otp, setotp] = useState('');
	const [show, setshow] = useState(false);
	const [final, setfinal] = useState('');

	// Sent OTP
	const signin = () => {

		if (mynumber === "" || mynumber.length < 10) return;
    console.log("1");
		let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
		auth.signInWithPhoneNumber(mynumber, verify).then((result) => {
			setfinal(result);
			alert("code sent");
			setshow(true);
		})
			.catch((err) => {
				alert(err);
				window.location.reload();
        console.log("error");
			});
    console.log("2");
	}

	// Validate OTP
	const ValidateOtp = () => {
		if (otp === null || final === null)
			return;
		final.confirm(otp).then((result) => {
			// success
      console.log("gg")
		}).catch((err) => {
			alert("Wrong code");
		})
	}

	return (
		<div style={{ "marginTop": "200px" }}>
			<center>
				<div style={{ display: !show ? "block" : "none" }}>
					<input value={mynumber} onChange={(e) => {
					setnumber(e.target.value) }}
						placeholder="phone number" />
					<br /><br />
					<div id="recaptcha-container"></div>
					<button onClick={signin}>Send OTP</button>
				</div>
				<div style={{ display: show ? "block" : "none" }}>
					<input type="text" placeholder={"Enter your OTP"}
						onChange={(e) => { setotp(e.target.value) }}></input>
					<br /><br />
					<button onClick={ValidateOtp}>Verify</button>
				</div>
			</center>
		</div>
	);
}

export default Otp;


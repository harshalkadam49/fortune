import {
   Box,
   Button,
   Paper,
   Stack,
   TextField,
   Typography,
 } from "@mui/material";
 import { useRef, useState } from "react";
 import { signIn, signin } from "next-auth/client";
 
 export default function SignUp() {
   const [isSignIn, setIsSignIn] = useState(false);
   const [nameInput, setNameInput] = useState("");
   const [emailInput, setEmailInput] = useState("");
   const [passwordInput, setPasswordInput] = useState("");
   const [errors, setErrors] = useState("");
   const [open, setOpen] = useState(false);
 
   const handleClose = (event, reason) => {
     if (reason === "clickaway") {
       return;
     }
 
     setOpen(false);
   };
 
   //  hitting the api
   async function createUser(name, email, password) {
     const response = await fetch("/api/auth/signUp", {
       method: "POST",
       body: JSON.stringify({ name, email, password }),
       headers: { "Content-Type": "application/json" },
     });
 
     const data = await response.json();
 
     if (!response.ok) {
       setErrors(data.message);
       setOpen(true);
       throw new Error(data.message || "something went wrong");
     } else {
       setErrors(data.message);
       setOpen(true);
       return data;
     }
   }
 
   const onToggleFormType = () => {
     setIsSignIn(!isSignIn);
   };
 
   async function submithandler(event) {
     event.preventDefault();
 
     const entredName = nameInput;
     const entredEmail = emailInput;
     const entredPassword = passwordInput;
 
     if (isSignIn) {
       // for log in user
       const result = await signIn("credentials", {
         redirect: false,
         email: entredEmail,
         password: entredPassword,
       });
       setOpen(true);
       if (result.error) {
         setErrors(result.error);
       } else {
         setErrors("logged in succesfully");
       }
     } else {
       try {
         const result = await createUser(
           entredName,
           entredEmail,
           entredPassword
         );
         return result;
       } catch (errors) {
         return errors;
       }
     }
   }
   return (
     <>
       <Box>
         <Paper
           sx={{
             width: { lg: "50%", xs: "90%" },
             mx: "auto",
             p: "2rem",
             mt: "5%",
             background: "#EEEBFF",
           }}
         >
           {isSignIn ? (
             <form onSubmit={submithandler}>
               <Stack spacing={3}>
                 <Typography variant="h5">Sign In</Typography>
                 <TextField
                   required
                   value={emailInput}
                   id="email"
                   placeholder="Email"
                   variant="outlined"
                   onChange={(e) => setEmailInput(e.target.value)}
                 />
                 <TextField
                   required
                   value={passwordInput}
                   id="password"
                   placeholder="Password"
                   variant="outlined"
                   onChange={(e) => setPasswordInput(e.target.value)}
                 />
                 <Button type="submit" variant="contained">
                   Sign In
                 </Button>
               </Stack>
             </form>
           ) : (
             <form onSubmit={submithandler}>
               <Stack spacing={3}>
                 <Typography variant="h5">Sign Up</Typography>
                 <TextField
                   required
                   value={nameInput}
                   id="name"
                   placeholder="Name"
                   variant="outlined"
                   onChange={(e) => setNameInput(e.target.value)}
                 />
                 <TextField
                   required
                   value={emailInput}
                   id="email"
                   placeholder="Email"
                   variant="outlined"
                   onChange={(e) => setEmailInput(e.target.value)}
                 />
                 <TextField
                   required
                   value={passwordInput}
                   id="password"
                   placeholder="Password"
                   variant="outlined"
                   onChange={(e) => setPasswordInput(e.target.value)}
                 />
                 <Button type="submit" variant="contained">
                   Sign Up
                 </Button>
               </Stack>
             </form>
           )}
 
           <Stack direction="row" justifyContent="center" pt="2rem" spacing={3}>
             {isSignIn ? (
               <Button onClick={onToggleFormType}>Create new user</Button>
             ) : (
               <Button onClick={onToggleFormType}>Already a user</Button>
             )}
           </Stack>
         </Paper>
       </Box>
     </>
   );
 }
 
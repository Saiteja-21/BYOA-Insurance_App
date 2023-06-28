import React, { useState } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import loginimage from "../images/undraw_unlock_re_a558.svg";
// import loginimage from "../images/undraw_login.svg";
import { useNavigate } from "react-router-dom";

const service = "https://insurance-app-1rvb.onrender.com";

function Signup() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handlelogin = async () => {
    let obj = {
      email: email,
      password: password,
    };
    const response = await fetch(service + "/admin/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const data = await response.json();
    console.log(data.token);
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/adminpage");
    } else {
      window.alert(data.message);
    }
  };

  return (
    <div className="card">
      <Card
        sx={{
          width: "100%",
          height: "auto",
          margin: "15%",
          display: "grid",
          padding: "2em",
          columnGap: "em",
          gridTemplateColumns: "repeat(2,1fr)",
          "@media (max-width:920px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box
         sx={{
          width: "100%",
          backgroundColor: "#EFE2BA",
          margin: "15px 15px 15px 15px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
        }}
        >
        
          <img src={loginimage} alt="no" style={{ width: "100%",height:'400px',  "@media (max-width:920px)": {
            height:'100px'
          }, }} />
        </Box>
        <Box
           sx={{display:'grid',
           gridTemplateColumns:'1fr',
           gridTemplateRows:'repeat(auto-fit,minmax(min-content,auto))',
           justifyItems:'center',
           rowGap:'1em',
        
       
        width: "100%",
      }}
    >
          <Avatar sx={{ backgroundColor: "#4056A1" }}>
            <PersonOutlineIcon />
          </Avatar>
          <h2>Login in as admin</h2>

          <TextField
            id="standard-basic"
            label="email"
            variant="standard"
            onChange={(e) => setemail(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="password"
            variant="standard"
            onChange={(e) => setpassword(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handlelogin}
            sx={{
              width: "90%",
             
              backgroundColor: "#F13C20",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
          >
            login
          </Button>

          <span style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "10px" }}>Don't have an account?</p>
            <p
              style={{ marginLeft: "5px", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Signup
            </p>
          </span>

          <p style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Userlogin
          </p>
        </Box>
      </Card>
    </div>
  );
}

export default Signup;

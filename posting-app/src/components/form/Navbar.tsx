import React, { useState } from "react";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{bgcolor: 'red', height: '30%'}}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Home" onClick={() => navigate("/")} />
          <Tab label="Todos" onClick={() => navigate("/Todos")} />
          <Tab label="Posts" onClick={() => navigate("/Posts")} />
        </Tabs>
      </AppBar>
    </Box>
  );
};

export default Navbar;

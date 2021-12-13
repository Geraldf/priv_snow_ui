import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StoryList from "./sites/StoryList";
import Home from "./sites/Home";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#fefefe",
  //   },
  //   secondary: purple,
  // },
  // typography: {
  //   fontFamily: "Quicksand",
  //   fontWeightLight: 400,
  //   fontWeightRegular: 500,
  //   fontWeightMedium: 600,
  //   fontWeightBold: 700,
  // },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rel" element={<StoryList />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

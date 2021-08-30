import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import LeaveEditScreen from "./screens/LeaveEditScreen";
import TeamAbsence from "./screens/TeamAbsence";
import RegisterScreen from "./screens/RegisterScreen";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./screens/ResetPassword";
import UserProfile from "./screens/UserProfile";
import ManageTeams from "./screens/ManageTeams";
import UserListScreen from "./screens/UserListScreen";
import AllTeamsLeaves from "./screens/AllTeamsLeaves";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/resetpassword" component={ResetPassword} />
          <PrivateRoute path="/leaves/:id/edit" component={LeaveEditScreen} />
          <PrivateRoute path="/leaves/team" component={TeamAbsence} />
          <PrivateRoute path="/user/profile" component={UserProfile} />
          <PrivateRoute path="/teams/all" component={ManageTeams} />
          <PrivateRoute path="/users/all" component={UserListScreen} />
          <PrivateRoute path="/leaves/all" component={AllTeamsLeaves} />
          <PrivateRoute path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

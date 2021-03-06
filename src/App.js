import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import CheckUser from './CheckUser'
import InterIns from './pages/InterIns'
import { Interview } from './pages/Interview'
import { GetUrl } from "./pages/GetUrl";

export default function App() {
    return (
        <Router basename="/questionnaires/interview">
            <Switch>
                <Route path="/get_personal_url">
                    <GetUrl/>
                </Route>
                <Route path="/login">
                    <CheckUser />
                </Route>
                <ProtectedRoute path="/interins">
                    <InterIns />
                </ProtectedRoute>
                <ProtectedRoute path="/inter">
                    <Interview />
                </ProtectedRoute>
                <Route path="*">
                    <Redirect from="/" to="interins" />
                </Route>
            </Switch>
        </Router>
    )
}

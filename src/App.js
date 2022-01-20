import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import CheckUser from './CheckUser'
import InterIns from './pages/InterIns'
import { Interview } from './pages/Interview'

export default function App() {
    return (
        <Router basename="questionnaires/interview">
            <Switch>
                <Route path="/login">
                    <CheckUser />
                </Route>
                {/* <Route path="/interins">
                    <InterIns />
                </Route>
                <Route path="/inter">
                    <Interview />
                </Route> */}
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

import React, { Component } from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import * as storeActions from "./../stores/actions";
import clsx from "clsx";
import "./../../sass/LoadingScreen.scss";

class LoadingScreen extends Component {
    close() {
        if (!this.props.application.loading) {
            return;
        }

        this.props.close();
    }

    render() {
        const variants = {
            show: { display: "block", y: 0, transition: { duration: 0.3, ease: "easeOut" }},
            hide: {y: "100vh", transition: { duration: 0.3, ease: "easeOut", delay: 0.1 }, transitionEnd: {display: "none"}}
        };

        return (
            <motion.div className={clsx("loadingScreen")}
                        id={"loadingScreen"}
                        initial={"show"}
                        animate={(!this.props.application.loading) ? "hide": "show"}
                        variants={variants}
                        // onAnimationComplete={this.close.bind(this)}
            >
                <div className="profile-main-loader">
                    <div className="loader">
                        <svg className="circular-loader" viewBox="25 25 50 50">
                            <circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#f57c00"
                                    strokeWidth="2"/>
                        </svg>
                    </div>
                    <div className={clsx("loaderRoute")} />
                </div>
            </motion.div>
        );
    }
}

const mapStateToProps = state => {
    return {
        application: state.application,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        close: () => dispatch(storeActions.hideAppLoading()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);

import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Pages, findPageByPath } from "./../utils/Pages";
import ErrorBoundary from "./../components/ErrorBoundary";
import * as storeActions from "./../stores/actions";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
});

class Content extends Component {
    routes = [];

    constructor(props) {
        super(props);

        this.createRoutes();
    }

    createRoutes() {
        const defaultPage = Pages.home;
        const defaultRoute = <Route path={defaultPage.url} exact={true} key={'default_route'} component={defaultPage.component} />;
        this.routes.push(defaultRoute);

        const favoritesPage = Pages.favorites;
        const favoritesRoute = <Route path={favoritesPage.url} exact={true} key={'favorites_route'} component={favoritesPage.component} />;
        this.routes.push(favoritesRoute);

        const detailsPage = lazy(() => import("./../pages/DetailsPage"));
        const detailsRoute = <Route path={'/details/:id?'} exact={true} key={'details_route'} component={detailsPage} />;
        this.routes.push(detailsRoute);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.location.pathname === this.props.history.location.pathname) {
        //     return;
        // }
        let locationPathname = this.props.history.location.pathname;
        if (locationPathname === this.props.application.page?.url) {
            return;
        }

        let page = findPageByPath(locationPathname);
        if (!page) {
            return;
        }
        this.props.setPage(page);

        if ("home" === page.code) {
            return this.props.hideLoading();
        }

        // request page content
        if ("favorites" === page.code) {
            return this.props.requestFavorites();
        }
    }

    render() {
        const classes = this.props.classes;

        return (
            <Container>
                <div className={"content"}>
                    <div className={classes.offset} />
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch location={this.props.location} key={this.props.location.key}>
                                { this.routes }
                            </Switch>
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </Container>
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
        hideLoading: () => dispatch(storeActions.hideAppLoading()),
        requestFavorites: () => dispatch(storeActions.requestFavoriteMovies()),
        setPage: (page) => dispatch(storeActions.setApplicationPage(page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Content)));

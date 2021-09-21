import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
    Button,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import * as storeActions from "./../stores/actions";
import RoundLoading from "./RoundLoading";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

class RemoveFavoriteDialog extends Component {
    closeHandler(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (!this.props.favorites.deleteDialog) {
            return;
        }

        if (this.props.favorites.removing) {
            return;
        }

        this.props.close();
    }

    deleteHandler() {
        if (!this.props.favorites.deleteDialog) {
            return;
        }

        if (this.props.favorites.removing) {
            return;
        }

        this.props.delete();
    }

    showDialogContent() {
        const loadingComponent = (
            <DialogContent dividers className={"removeDialogContent"}>
                <RoundLoading />
            </DialogContent>
        );

        if (this.props.favorites.removing) {
            return loadingComponent;
        }

        if (!(this.props.favorites.deleteObject?.id > 0)) {
            return loadingComponent;
        }

        let object = this.props.favorites.deleteObject;

        return (
            <DialogContent dividers className={"removeDialogContent"}>
                <div className={"rdcElement"}>
                    <Typography component={'h1'} gutterBottom>{object?.original_title}</Typography>
                    <Typography component={'p'} gutterBottom>from <b>{object?.release_date}</b></Typography>
                    <Typography gutterBottom>Are you sure that you want to remove this movie from favorite list?</Typography>
                </div>
            </DialogContent>
        );
    }

    render() {
        let classes = this.props.classes;

        return (
            <Dialog onClose={this.closeHandler.bind(this)} aria-labelledby="remove-favorite-dialog" open={this.props.favorites.deleteDialog}>
                <DialogTitle id="customized-dialog-title" onClose={this.closeHandler.bind(this)}>
                    <Typography>Remove movie from favorite list</Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={this.closeHandler.bind(this)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                { this.showDialogContent() }
                <DialogActions>
                    <Button onClick={this.deleteHandler.bind(this)}
                            color="primary"
                            startIcon={<DeleteIcon />}>
                        remove
                    </Button>
                    <Button
                        autoFocus
                        onClick={this.closeHandler.bind(this)}
                        startIcon={<CancelIcon />}
                        color="secondary">
                        cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
    return {
        favorites: state.favorites,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        close: () => dispatch(storeActions.closeFavoriteDeleteDialog()),
        delete: () => dispatch(storeActions.requestFavoriteRemoval()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RemoveFavoriteDialog));

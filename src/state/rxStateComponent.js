// referenced from https://github.com/MichalZalecki/connect-rxjs-to-react
// Copyright (c) MichalZalecki
// Released under the MIT license

import Rx from "rxjs";
import React, { Component } from "react";
import PropTypes from "prop-types";

export const connect = (selector = state => state) => {
    console.log("connect");
    return (WrappedComponent) => {
        return class Connect extends Component {
            static contextTypes = {
                state$: PropTypes.object.isRequired,
            };

            subscription = null;

            componentWillMount() {
                console.log("connect componentWillMount");
                this.subscription = this.context.state$.
                    map(selector).subscribe(state => this.setState(state));
            }

            componentWillUnmount() {
                this.subscription.unsubscribe();
            }

            render() {
                return (
                    <WrappedComponent {...this.state} {...this.props} />
                );
            }

        }
    };
};

export class RxStateProvider extends Component {
    static propTypes = {
        state$: PropTypes.object.isRequired,
    };

    static childContextTypes = {
        state$: PropTypes.object.isRequired,
    };

    getChildContext() {
        return {
            state$: this.props.state$,
        };
    }

    render() {
        return this.props.children;
    }
}

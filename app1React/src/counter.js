import React from 'react';
import { connect } from 'react-redux';

class Counter extends React.Component {

    increment = () => {
        this.props.dispatch({ type: 'INCREMENT' });
    };

    decrement = () => {
        this.props.dispatch({ type: 'DECREMENT' });
    };

    globalIncrement = () => {
        this.props.globalEventDistributor.dispatch({ type: 'INCREMENT' });
    };

    globalDecrement = () => {
        this.props.globalEventDistributor.dispatch({ type: 'DECREMENT' });
    };

    render() {
        return (
            <div>
                <br />
                <div>
                    <b> Count: {this.props.count}</b><br/><br/>
                    <button onClick={this.increment}>incrément local</button>
                    &nbsp;Envoyez un événement d'incrémentation <b> local </b>. Cela ne fera qu'augmenter le compteur de l'application actuelle. <br/>

                    <button onClick={this.decrement}>décrément local</button>
                    &nbsp;Envoyez un événement de décrémentation <b> local </b>. Cela ne fera que décrémenter le compteur de l'application actuelle. <br/>


                    <button onClick={this.globalIncrement}>incrément global</button>
                    &nbsp;Envoyer un <b> local</b> événement d'incrémentation. Cela augmentera le compteur de l'application actuelle et de tous
                    d'autres applications qui écoutent cet événement. <br/>

                    <button onClick={this.globalDecrement}>décrément global</button>
                    &nbsp;Envoyer un événement de décrémentation <b> global </b>. Cela augmentera le compteur de l'application actuelle et de tous
                    d'autres applications qui écoutent cet événement. <br/>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        count: state.count
    };
}

export default connect(mapStateToProps)(Counter);
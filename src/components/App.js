import React, { Component } from 'react';
import { connect } from 'react-redux';

// アクションクリエイターのインポート
import { increment, decrement } from '../actions'

class App extends Component {
  render() {
    const props = this.props;
    return (
      <React.Fragment>
        <div>value: { props.value }</div>
        <button onClick={props.increment}>+1</button>
        <button onClick={props.decrement}>-1</button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({value: state.count.value})


// dispatch関数 action発生した際に、reducerにtypeに応じた状態遷移を実行させる
const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement())
})
// const mapDispatchToProps = ({ increment, decrement })

// stateとactionをcomponentに紐づける
export default connect(mapStateToProps, mapDispatchToProps)(App);

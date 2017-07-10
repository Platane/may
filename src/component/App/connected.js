import { App as Component } from './index'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    let page = null

    if (!state.me) page = 'gate'
    else if (state.table && state.table.state == 'playing') page = 'table'
    else if (state.table && state.table.state == 'waiting') page = 'waitingRoom'

    return { page }
}

export const App = connect(mapStateToProps)(Component)

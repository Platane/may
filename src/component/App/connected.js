import { App as Component } from './index'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    page: (state.appState.path && state.appState.path[0]) || null,
})

export const App = connect(mapStateToProps)(Component)

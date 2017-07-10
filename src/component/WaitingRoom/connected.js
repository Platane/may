import { Gate as Component } from './index'
import { connect } from 'react-redux'
import { registerUser } from '../../action/thunk/registerUser'

const mapDispatchToProps = dispatch => ({
    submit: user => registerUser(dispatch)(user),
})

export const Gate = connect(null, mapDispatchToProps)(Component)

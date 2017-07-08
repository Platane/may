import { Gate as Component } from './index'
import { connect } from 'react-redux'
import { register } from '../../action/thunk/register'

const mapDispatchToProps = dispatch => ({
    submit: user => register(dispatch)(user, 'default'),
})

export const Gate = connect(null, mapDispatchToProps)(Component)

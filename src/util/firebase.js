/* global firebase */
import { firebase as config } from '../config'

firebase.initializeApp(config)

module.exports = firebase

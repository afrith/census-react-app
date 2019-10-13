import React from 'react'

import { ErrorMessage } from '../presentation/alerts'

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError (error) {
    return { error }
  }

  render () {
    const { error } = this.state
    if (error) {
      return <ErrorMessage message={error.message} />
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary

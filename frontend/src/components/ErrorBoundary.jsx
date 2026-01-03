import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    this.setState({ error, info })
    // You could also log to an external service here
    // console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='p-6 m-3 bg-white text-red-700 rounded-lg shadow'>
          <h3 className='h5 text-red-700'>Something went wrong</h3>
          <div className='mt-2 text-sm text-gray-700'>
            {this.state.error?.message}
          </div>
          <details className='mt-2 text-xs text-gray-500'>
            <summary>Stack trace</summary>
            <pre className='whitespace-pre-wrap'>{this.state.info?.componentStack}</pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

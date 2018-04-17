import React from 'react'
import PropTypes from 'prop-types'

const _ErrorComp = props =>
  <div>
    {props.error}
  </div>

_ErrorComp.propTypes = {
  error: PropTypes.string
}

const lazyLoad = configs => {
  const {
    delay = 500,
    timeout = 10000,
    LoadingComponent = () => <div />,
    ErrorComponent = _ErrorComp
  } = configs

  return class AsyncComponent extends React.Component {
    state = {
      C: null,
      LoadingComponent,
      ErrorComponent,
      delay,
      timeout,
      error: false,
      errorTxt: ''
    }

    _delay = null
    _timeout = null
    _error = { LoadingComponent: this.state.ErrorComponent, error: true }

    async componentDidMount () {
      this._delay = setTimeout(() => this.setState({ LoadingComponent }), this.state.delay)
      this._timeout = setTimeout(
        () => this.setState({ ...this._error, errorTxt: 'Timeout Error' }),
        this.state.timeout
      )
      if (!this.state.C) {
        try {
          const C = await configs.loader()
          !this.state.error && this.setState({ C: C.default })
        } catch (e) {
          this.setState({ ...this._error, errorTxt: e.message || e })
        }
      }
    }

    componentWillUnmount () {
      clearTimeout(this._delay)
      clearTimeout(this._timeout)
    }

    render () {
      const { C, LoadingComponent } = this.state
      return C ? <C {...this.props} /> : <LoadingComponent error={this.errorTxt} {...this.props} />
    }
  }
}

export default config => {
  const routes = {}
  Object.keys(config).forEach(key => {
    if (key === 'options') return
    routes[key] = lazyLoad({ ...config['options'], ...config[key] })
  })
  return routes
}

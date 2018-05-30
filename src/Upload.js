import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AjaxUploader from 'rc-upload/lib/AjaxUploader'
import S3 from 'aws-sdk/clients/s3'

import getS3Requester from './s3request'

const emptyFunc = () => {}

class Upload extends Component {
  state = { requester: null }

  abort() {
    this.uploader.abort()
  }

  initS3 = (credentials) => {
    const s3 = new S3({ credentials: credentials, params: this.props.params })
    this.setState({ requester: getS3Requester(s3) })
  }

  errorHandler = (err) => {
    this.props.onError(err, {}, {})
  }

  componentWillMount() {
    const { credentials } = this.props
    if (typeof(credentials) === 'function') {
      credentials().then(this.initS3, this.errorHandler)
    } else {
      this.initS3(credentials)
    }
  }

  render() {
    const { Loading } = this.props
    return this.state.requester
      ? <AjaxUploader {...this.props}
                      ref={ref => this.uploader = ref}
                      customRequest={this.state.requester} />
      : <div>{Loading || `Loading credentials...`}</div>
  }
}

Upload.defaultProps = {
  component: 'span',
  uploaderComponent: null,
  prefixCls: 'rc-upload',
  data: {},
  headers: {},
  name: 'file',
  multipart: false,
  onProgress: emptyFunc,
  onReady: emptyFunc,
  onStart: emptyFunc,
  onError: emptyFunc,
  onSuccess: emptyFunc,
  supportServerRender: false,
  multiple: false,
  beforeUpload: null,
  credentials: null,
  params: null,
  withCredentials: false,
}

Upload.propTypes = {
  component: PropTypes.string,
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  accept: PropTypes.string,
  children: PropTypes.any,
  onStart: PropTypes.func,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
  headers: PropTypes.object,
  beforeUpload: PropTypes.func,
  credentials: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
  params: PropTypes.object,
  withCredentials: PropTypes.bool,
}

export default Upload

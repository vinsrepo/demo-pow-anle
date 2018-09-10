import React, { Component } from 'react'

export default class VinModal extends Component {
    state = {
        visible: false
    }

    open() {
        this.setState({ visible: true })
    }

    close() {
        this.setState({ visible: false })
    }

    render() {
        return (
            <div>
                {
                    this.state.visible &&
                    <div class="modal-dialog" role="document" >
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Thông tin cá nhân</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => this.close()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                {this.props.content()}
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => this.close()}>Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => this.props.hanldeChange(this)}>Save changes</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
  }
}

import React from 'react'
import { Link, Icon, Navs, Heading } from 'components'

import './footer'
export default class Footer extends React.Component {
  constructor() {
    super()

    this.items = [
      {
        "name": "home",
        "to": "/",
        "disabled": false
      },
      {
        "name": "sample",
        "to": "/sample",
        "disabled": false
      }
    ]

    this.startYear = 2017;
  }

  copyrightYear() {
    const currYear = new Date().getFullYear();
    return this.startYear === currYear ? this.startYear : `${this.startYear} - ${currYear}`;
  }

  render() {
    return (
      <React.Fragment>
        <div className="container py-4">
          <div className="row">
            <div className="col-3">
            </div>
          </div>
        </div>

        <div className="sub-footer">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-4 text-center text-sm-left">
                <p className="copyright-text">Copyright &copy; {this.copyrightYear()}</p>
              </div>

              <div className="col-12 col-sm-8">
                <Navs className="justify-content-center justify-content-sm-end" items={this.items}></Navs>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
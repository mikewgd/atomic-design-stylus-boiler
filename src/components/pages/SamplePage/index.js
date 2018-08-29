import React from 'react'

import { PageTemplate, Header, Footer, TextBlock } from 'components'
import api from 'services/api'

export default class SamplePage extends React.Component {
  constructor() {
    super();

    this.state = {
      response: {status: 'making request'}
    }
  }

  componentDidMount() {
    api.get('/status')
      .then(data => {
        this.setState({
          response: data
        })
      })
  }

  render() {
    return (
      <PageTemplate header={<Header />} footer={<Footer />}>
        <div className="container">
          <TextBlock
            title="Header"
            copy="Copy copy "
          />
          <p>{JSON.stringify(this.state.response)}</p>
        </div>
      </PageTemplate>
    )
  }
}
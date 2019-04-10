import React from 'react'
import styled from 'styled-components'

import Sparkline from './Sparkline'

const SingleValue = styled.div`
  font-family: "Open Sans", "Noto Sans JP", Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: 72px;
`;

const SingleValueSmall = styled.div`
  font-size: 50px;
`

const SingleValueLarge = styled.div`
  font-size: 72px;
`

export default class Hello extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    if (!this.props.done) {
      return <div>Loading...</div>
    }

    let firstRow = this.props.data[0];
    const firstCellValue = firstRow[this.props.queryResponse.fields.measures[0].name].rendered
    const dataToRender = this.props.data.map(d => {
      return d[this.props.queryResponse.fields.measures[0].name].value
    })

    const FontSizeWrapper = this.props.config.font_size === 'small' ? SingleValueSmall : SingleValueLarge
    return (
      <div>
        <Sparkline
          color={this.props.config.sparkline_color}
          config={this.props.config}
          data={dataToRender}
        />

        <SingleValue>
          <FontSizeWrapper>
            {firstCellValue}
          </FontSizeWrapper>
        </SingleValue>
      </div>
    )
  }
}
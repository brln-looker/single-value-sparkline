import SingleValueSparkline from './components/SingleValueSparkline'
import React from 'react'
import ReactDOM from 'react-dom'

looker.plugins.visualizations.add({
  options: {
    font_size: {
      type: "string",
      label: "Font Size",
      values: [
        {"Large": "large"},
        {"Small": "small"}
      ],
      display: "radio",
      default: "large"
    },
    sparkline_color: {
      type: "array",
      label: "Sparkline Color",
      display: "color",
      default: "#5b5d9a"
    }

  },

  create: function(element, config) {
    element.innerHTML = `
      <style>
        .sparkline-single-value {
          /* Vertical centering */
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .highcharts-container {
          margin: 0 auto;
        } 
        
      </style>
    `;

    let container = element.appendChild(document.createElement("div"));
    container.className = "sparkline-single-value";

    this._textElement = container.appendChild(document.createElement("div"));

    this.chart = ReactDOM.render(
      <SingleValueSparkline
        done={false}
      />,
      this._textElement
    );

  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();
    if (queryResponse.fields.dimensions.length == 0) {
      this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
      return;
    }

    this.chart = ReactDOM.render(
      <SingleValueSparkline
        config={config}
        data={data}
        done={done}
        queryResponse={queryResponse}
      />,
      this._textElement
    );

    done()
  }
});
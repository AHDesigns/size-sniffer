import React, { Component } from 'react';

import { SizeSniffer, WindowWatcher, Comp, Expand, constants } from 'atoms';

const Sniffed = ({ children, cssClassName, colorIdx, watchWindow }) => (
  <SizeSniffer>
    {props => (
      <Comp {...{ ...props, cssClassName: 'u-padding', colorIdx, watchWindow }}>
        {cprops => children(cprops)}
      </Comp>
    )}
  </SizeSniffer>
);

export class App extends Component {
  state = {
    page: true
  };

  componentDidMount() {
    fetch(`${constants.baseURL}/graphql`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: '{"query":"{ hello }"}'
    })
      .then(res => {
        res
          .json()
          .then(d => {
            console.log(d);
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => {
        console.log(e);
      });
  }

  toggle = () => {
    this.setState(({ page }) => ({ page: !page }));
  };

  render() {
    return (
      <WindowWatcher>
        <button onClick={this.toggle}>page toggle</button>
        {!this.state.page && (
          <React.Fragment>
            <div className="layout-wrapper">
              <div style={{ flexGrow: '1' }}>
                <Sniffed>{() => {}}</Sniffed>
              </div>
              <Expand growStyle="transition" />
            </div>
            <div className="layout-wrapper">
              <div style={{ flexGrow: '1' }}>
                <Sniffed>{() => {}}</Sniffed>
              </div>
              <Expand growStyle="animation" />
            </div>
          </React.Fragment>
        )}
        {this.state.page && (
          <div className="App">
            <Sniffed>
              {props => (
                <Sniffed {...props}>
                  {props => (
                    <Sniffed {...{ ...props, watchWindow: true }}>
                      {props => <Sniffed {...props}>{() => {}}</Sniffed>}
                    </Sniffed>
                  )}
                </Sniffed>
              )}
            </Sniffed>
          </div>
        )}
      </WindowWatcher>
    );
  }
}

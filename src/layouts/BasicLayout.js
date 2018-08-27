import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import { connect } from 'dva';

class BasicLayout extends PureComponent {
  render() {
    const { getRouteData } = this.props;
  
    return (
      <div>
        <Switch>
          <Redirect from="/" to="/login" exact={true}/>
          {
            getRouteData('BasicLayout').map(item =>
              (
                <Route
                  exact={item.exact}
                  key={item.path}
                  path={item.path}
                  component={item.component}
                />
              )
            )
          }
          <Route component={() => import('../routes/Result')} />
        </Switch>
      </div>  
    )
  }
}
export default connect(state => state)(BasicLayout);
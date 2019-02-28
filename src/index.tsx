import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import { IPage, Service, ICharacters } from './service';
import { List, Avatar } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

interface AppProps { }
interface AppState {
  data: IPage;
  loading: boolean;
}

class App extends Component<AppProps, AppState> {
  service: Service;
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true
    };
    this._init();
    this.paginate = this.paginate.bind(this);
  }

  private _init() {
    this.service = new Service();
    this.paginate(1);
  }

  paginate(page: number) {
    this.setState(Object.assign(this.state, { loading: true }));
    this.service.getCharacters(page)
    .then(data => {
      this.setState(Object.assign(this.state, { data, loading: false }))
    })
    .catch( err => {
      console.warn('Error Obteniendo episodios')
    });
  }

  render() {
    if (!this.state.data) {
      return <div>Viendo Episodios</div>;
    }
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
          </Menu>
        </Header>
       <Content style={{ padding: '0 50px', marginTop: 64, marginBottom: 30 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        </Breadcrumb>
        <List
          loading={this.state.loading}
          itemLayout="horizontal"
          pagination={{
            onChange: (page) => {
              this.paginate(page);
            },
            total: this.state.data ? this.state.data.info.count : 0,
            pageSize:  20,
          }}
          dataSource={this.state.data.results}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={<a href={item.url}>{item.name}</a>}
                description={item.status}
              />
            </List.Item>)}
        />
      </Content>
  </Layout>
    );
  }
}

render(<App />, document.getElementById('root'));

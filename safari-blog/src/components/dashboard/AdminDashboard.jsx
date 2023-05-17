import React, { useContext } from 'react';
import { Layout, Menu } from 'antd';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from 'react-router-dom';
import { HomeOutlined, FundOutlined, CoffeeOutlined, ReadOutlined } from '@ant-design/icons';
import SafariList from '../safaris/SafariList';
import AddSafari from '../safaris/AddSafari';
import RoomList from '../rooms/RoomList';
import AddRoom from '../rooms/AddRoom';
import FoodList from '../foods/FoodList';
import AddFood from '../foods/AddFood';
import ActivityList from '../activities/ActivityList';
import AddActivity from '../activities/AddActivity';
import LoadingContext from '../../contexts/LoadingContext';
import Loading from '../common/Loading,';
import BookingList from '../bookings/BookingList';

const { Header, Content, Sider } = Layout;

function AdminDashboard() {

  const [state,dispatch] = useContext(LoadingContext)

  if(state.loading){
    return <Loading/>
  }

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.SubMenu key="safaris" icon={<FundOutlined />} title="Safaris">
              <Menu.Item key="1">
                <Link to="safaris">Safari List</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="safaris/new">Add Safari</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="rooms" icon={<HomeOutlined />} title="Rooms">
              <Menu.Item key="3">
                <Link to="rooms">Room List</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="rooms/new">Add Room</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="foods" icon={<CoffeeOutlined />} title="Foods">
              <Menu.Item key="5">
                <Link to="foods">Food List</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="foods/new">Add Food</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="activities" icon={<ReadOutlined />} title="Activities">
              <Menu.Item key="7">
                <Link to="activities">Activity List</Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to="activities/new">Add Activity</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="9">
                <Link to="bookings/">Bookings</Link>
              </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path="/" element={<h1>Welcome to Admin Dashboard</h1>} />
                <Route path="/safaris" element={<SafariList />} />
                <Route path="/safaris/new" element={<AddSafari />} />
                <Route path="/rooms" element={<RoomList />} />
                <Route path="/rooms/new" element={<AddRoom />} />
                <Route path="/foods" element={<FoodList />} />
                <Route path="/foods/new" element={<AddFood />} />
                <Route path="/activities" element={<ActivityList />} />
                <Route path="/activities/new" element={<AddActivity />} />
                <Route path="/bookings" element={<BookingList />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default AdminDashboard;

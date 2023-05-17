import { SafariProvider } from './contexts/SafariContext';
import { RoomProvider } from './contexts/RoomContext';
import { FoodProvider } from './contexts/FoodContext';
import { ActivityProvider } from './contexts/ActivityContext';
import { LoadingProvider } from './contexts/LoadingContext';
import AdminDashboard from './components/dashboard/AdminDashboard';
import 'antd/dist/reset.css';
function App() {


  return (
    <LoadingProvider>
      <RoomProvider>
        <FoodProvider>
          <ActivityProvider>
            <SafariProvider>
              <AdminDashboard />
            </SafariProvider>
          </ActivityProvider>
        </FoodProvider>
      </RoomProvider>
    </LoadingProvider>
  )
}

export default App

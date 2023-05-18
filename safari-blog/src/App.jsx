import { SafariProvider } from './contexts/SafariContext';
import { RoomProvider } from './contexts/RoomContext';
import { FoodProvider } from './contexts/FoodContext';
import { ActivityProvider } from './contexts/ActivityContext';
import { LoadingProvider } from './contexts/LoadingContext';
import AdminDashboard from './components/dashboard/AdminDashboard';
import 'antd/dist/reset.css';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCb7Yo6jbsA30D0P8eQEtWLkrNAMeuQw4U",
  authDomain: "marioblog-ad8e5.firebaseapp.com",
  projectId: "marioblog-ad8e5",
  storageBucket: "marioblog-ad8e5.appspot.com",
  messagingSenderId: "134259039673",
  appId: "1:134259039673:web:d7b32a238ef0492bbeea68"
};

// Initialize Firebase
initializeApp(firebaseConfig);

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

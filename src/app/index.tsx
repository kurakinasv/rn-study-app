import App from '@screens/App';
import { RootProvider } from '@stores/RootStore/context';

const StartPage = () => (
  <RootProvider>
    <App />
  </RootProvider>
);

export default StartPage;

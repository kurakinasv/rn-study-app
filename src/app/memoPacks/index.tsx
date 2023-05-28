import { Redirect } from 'expo-router';

import { routes } from '@config/routes';

const MemoPacks = () => {
  return <Redirect href={routes.memo} />;
};

export default MemoPacks;

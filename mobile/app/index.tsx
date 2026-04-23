import { Redirect } from 'expo-router';

/**
 * Root index - redirects to home tab
 */
export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}

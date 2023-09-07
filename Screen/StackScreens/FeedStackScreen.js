import { createStackNavigator } from '@react-navigation/stack';
import CommunityScreen from '../FeedStackScreens/CommunityScreen';
import CommunityDetail from '../FeedStackScreens/CommunityDetail';
import WriteCommunity from '../FeedStackScreens/WriteCommunity';
const Stack = createStackNavigator();

function App() {
  return (
      <Stack.Navigator initialRouteName="Community">
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="CommunityDetail" component={CommunityDetail} />
        <Stack.Screen name="WriteCommunity" component={WriteCommunity} />
      </Stack.Navigator>
  );
}

export default App;

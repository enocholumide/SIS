import { StackNavigator } from "react-navigation";

import People from "./People.js";
import Person from "./Person.js";

export default PeopleScreen = StackNavigator(
    {
      People: {
        screen: People,
        navigationOptions: { header: false }
       },
       Person: {
         screen: Person,
         navigationOptions: { header: false }
        }
    },
    {
        headerMode: 'screen',
    }
);

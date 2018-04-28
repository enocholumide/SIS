import { StackNavigator } from "react-navigation";

import Exams from "./Exams.js";

export default LecturesScreen = StackNavigator(
    {
        Exams: {
            screen: Exams,
            navigationOptions: { header: false }
        },
    },
    {
        headerMode: 'screen',
    }
);

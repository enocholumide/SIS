import { StackNavigator } from "react-navigation";
import GradesSummary from "./GradesSummary.js";
import GradesDetails from "./GradesDetails.js";

export default LecturesScreen = StackNavigator(
    {
        GradesSummary: {
            screen: GradesSummary,
            navigationOptions: { header: false }
        },
        GradesDetails: {
            screen: GradesDetails,
            navigationOptions: { header: false }
        },
    },
    {
        headerMode: 'screen',
    }
);

import { StackNavigator } from "react-navigation";

import Lectures from "./Lectures.js";
import SavedCourses from "./SavedCourses.js";
import CourseList from "./CourseList.js"

export default LecturesScreen = StackNavigator(
    {
      Lectures: {
        screen: Lectures,
        navigationOptions: { header: false }
       },
       SavedCourses: {
         screen: SavedCourses,
         navigationOptions: { header: false }
        },
        CourseList: {
        screen: CourseList,
        navigationOptions: { header: false }
      },
    },
    {
        headerMode: 'screen',
    }
);

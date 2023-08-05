import {createBrowserRouter} from "react-router-dom";
import Demo from "./components/Demo";
import Client from "./pages/Client";

const App = createBrowserRouter([
    {
        element: <Demo />,
        children: [
            { path: "client", element: <Client /> }
        ],
    },
])

export default App;
import React from 'react';
import './App.css';

import customMessage from "remote-mf/customMessage";
const CustomButton = React.lazy(() => import("remote-mf/CustomButton"));

const Loading = () => <div>loading...</div>;

function App() {
  return (
    <div className="App">
      <div>
        Container Component
      </div>
      <React.Suspense fallback={<Loading />}>
        <CustomButton text={"Test button"} onClick={() => customMessage()} />
      </React.Suspense>
    </div>
  );
}

export default App;

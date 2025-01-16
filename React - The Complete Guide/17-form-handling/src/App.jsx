import Header from './components/Header.jsx';
import LoginUsingRef from './components/LoginUsingRef.jsx';
import LoginUsingState from './components/LoginUsingState.jsx';
import Signup from './components/Signup.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <Signup />
        {/* <LoginUsingRef /> */}
        {/* <LoginUsingState /> */}
      </main>
    </>
  );
}

export default App;

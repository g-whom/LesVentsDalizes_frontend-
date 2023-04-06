import App from "./App";
function FormInscription() {
    return (
      <form>
        <label>Enter your name:
          <input type="text" />
        </label>
        <App >/
      </form>
    )
  }
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<FormInscription />);
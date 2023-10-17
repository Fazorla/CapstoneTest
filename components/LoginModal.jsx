import { useState } from "react";

const LoginModal = () => {
  const [Modal, setModal] = useState(false);

  const openModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className="modal">
        <div className="overlay">
          <div className="modal-content">
            <h1>Login</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
              quisquam.
            </p>
            <button onClick={openModal}>Close</button>
            <button>Login</button>
            <button>Register</button>
            <button>Forgot Password</button>
            <button>Terms & Conditions</button>
            <button>Privacy Policy</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;

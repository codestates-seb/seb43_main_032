import React, { FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import { useRef } from 'react';

const Contact = ({
  setIsModal,
}: {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_g91d6yg',
        'template_w79vaql',
        formRef.current!,
        'ZLhPCzSgNFcEpnglg'
      )
      .then(
        (result) => {
          console.log(result.text);
          setIsModal(false);
        },
        (error) => {
          console.log(error.text);
        }
      );
    // e.target.reset();
  };

  return (
    <Container>
      <section className="box-container">
        <h1 className="nanum-bold">Contact me</h1>
        <div className="exit" onClick={() => setIsModal(false)}>
          &times;
        </div>
        <form ref={formRef} onSubmit={sendEmail} className="form-control">
          <input
            type="text"
            name="user_name"
            placeholder="Full name"
            required
          />
          <input type="email" name="user_email" placeholder="Email" required />
          <input type="text" name="subject" placeholder="Subject" required />
          <textarea
            name="message"
            cols={30}
            rows={10}
            style={{ marginTop: '20px' }}
            placeholder="message"
          ></textarea>
          <button type="submit" className="btn" style={{ marginTop: '20px' }}>
            Send Message
          </button>
        </form>
      </section>
    </Container>
  );
};

export default Contact;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 500px;
  background-color: #f2c7f1;
  background-position: center;
  background-size: cover;
  border-radius: 10px;

  h1 {
    margin-top: 50px;
    text-align: center;
  }

  .exit {
    position: absolute;
    font-size: 32px;
    width: 32px;
    height: 32px;
    line-height: 26px;
    background-color: transparent;
    cursor: pointer;
    display: flex;
  }

  form {
    margin: 25px 85px 75px 100px;
    display: flex;
    flex-direction: column;
  }

  input {
    width: 300px;
    height: 30px;
    border-radius: 5px;
    margin-top: 20px;
    outline: none;
  }

  button {
    width: 300px;
    height: 30px;
    border-radius: 10px;
  }

  textarea {
    border-radius: 5px;
    outline: none;
  }
`;

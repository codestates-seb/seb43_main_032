import React, { FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import { useRef } from 'react';
import Message from './Message';

const Contact = ({ closeContact }: { closeContact: () => void }) => {
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
      .then(() => {
        closeContact();
      })
      .catch(() => <Message>잠시 후에 다시 시도해주세요.</Message>);
  };

  return (
    <Container>
      <div className="nanum-bold title">Contact me</div>
      <div className="exit" onClick={closeContact}>
        &times;
      </div>
      <form ref={formRef} onSubmit={sendEmail} className="form-control">
        <input type="text" name="user_name" placeholder="Full name" required />
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
          <span className="transition"></span>
          <span className="gradient"></span>
          <span className="label">Message</span>
        </button>
      </form>
    </Container>
  );
};

export default Contact;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 40%;
  max-height: 500px;
  background: linear-gradient(170deg, #efefef, #e4e4e4, #b8b8b8);
  border-radius: 15px;

  .title {
    margin-top: 50px;
    text-align: center;
    font-weight: 500;
  }

  .exit {
    position: absolute;
    font-size: 32px;
    width: 32px;
    top: 8px;
    right: 8px;
    height: 32px;
    line-height: 26px;
    background-color: transparent;
    cursor: pointer;
    display: flex;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    margin-top: 20px;
    outline: none;
    border: none;
    padding: 0 10px;

    ::placeholder {
      color: #7d7d7d;
    }
  }

  button {
    height: 30px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }

  textarea {
    box-sizing: border-box;
    border-radius: 5px;
    outline: none;
    border: none;
    padding: 10px;

    ::placeholder {
      font-family: 'Pretendard';
    }
  }

  button {
    font-family: 'Pretendard';
    font-size: 17px;
    padding: 1em 2.7em;
    font-weight: 500;
    background: #1f2937;
    color: white;
    border: none;
    position: relative;
    overflow: hidden;
    border-radius: 0.6em;
    margin-bottom: 24px;
  }

  .gradient {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 0.6em;
    margin-top: -0.25em;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
  }

  .label {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 400;
  }

  .transition {
    width: 120%;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transition-duration: 500ms;
    background-color: #4412e7;
    width: 0;
    height: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  button:hover .transition {
    width: 120%;
    height: 120%;
  }

  button:active {
    transform: scale(0.97);
  }
`;

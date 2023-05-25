import Image from 'next/image';
import emailjs from '@emailjs/browser';
import Message from './Message';
import { FormEvent, useRef, useState } from 'react';
import icon from '../public/images/icon.svg';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isContactState } from '@/recoil/atom';
import { useForm } from 'react-hook-form';
import { Form } from '@/types/types';

const Contact = () => {
  const [isContact, setIsContact] = useRecoilState(isContactState);
  const [isHovered, setIsHovered] = useState(false);
  const { register, reset } = useForm<Form>();

  const contactHandler = () => {
    setIsContact(!isContact);
  };

  const closeContact = () => {
    setIsContact(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
        reset();
      })
      .catch(() => <Message>잠시 후에 다시 시도해주세요.</Message>);
  };
  return (
    <>
      <IconBox>
        <Image
          src={icon}
          onClick={contactHandler}
          alt="chat-icon"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={
            isHovered
              ? 'animate__animated animate__bounce animate__infinite animate-duration-2'
              : ''
          }
        />
      </IconBox>
      <AskBox isVisible={isContact}>
        <EmailBox>
          <div className="nanum-bold title">Contact me</div>
          <div className="exit" onClick={closeContact}>
            &times;
          </div>
          <form ref={formRef} onSubmit={sendEmail} className="form-control">
            <input
              {...register('user_name')}
              placeholder="Full name"
              required
            />
            <input {...register('user_email')} placeholder="Email" required />
            <input {...register('subject')} placeholder="Subject" required />
            <textarea
              {...register('message')}
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
        </EmailBox>
      </AskBox>
    </>
  );
};
export default Contact;

const IconBox = styled.div`
  transition: all 1s ease-in-out;
  bottom: 20px;
  right: 20px;
  position: fixed;
  cursor: pointer;
  z-index: 999;
`;

const AskBox = styled.div<{ isVisible: boolean }>`
  min-width: 300px;
  max-height: 500px;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  bottom: ${({ isVisible }) => (isVisible ? '20px' : '-100%')};
  right: 20px;
  position: fixed;
  transition: all 0.3s ease-in-out;
  z-index: 999;
  position: fixed;
`;

const EmailBox = styled.div`
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
  box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.5);

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

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

type FormData = {
  name: string;
  email: string;
};

export default function PostAddPageContent() {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" ref={register({ required: true })} />
        {errors.name && <span>This field is required</span>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span>Please enter a valid email address</span>}
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 500px;
`;

import { Tech } from '@/types/project';
import { api } from '@/util/api';
import { mergeData, updateData } from '@/util/user';
import React, { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import styled from 'styled-components';
import EditInput from './EditInput';
import SelectStack from '../stack/SelectStack';

const ImgWrapper = styled.div`
  flex-shrink: 0;
  margin: 20px;
  display: flex;
  position: relative;
  flex-direction: column;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 80px;
  margin-top: 30px;
  background-color: #cbcbcb;

  div {
    position: absolute;
    bottom: 10px;
    width: 100%;
    height: 20px;
  }
  input {
    display: none;
  }
  label {
    display: flex;
    justify-content: center;
    font-size: 20px;
    padding: 5px;
    width: 100%;
    border: none;
    background-color: skyblue;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ProfileBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  .nameBox {
    width: 100%;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
const Button = styled.button.attrs({ className: 'nanum-bold' })`
  padding: 20px;
  /* padding-bottom: 0px; */
  border: none;
  border-radius: 10px;
  background-color: skyblue;
`;
const Label = styled.p.attrs({ className: 'nanum-bold' })`
  padding-top: 20px;
  padding-bottom: 10px;
`;
export default function UserEditForm({ user }: { user: any }) {
  const { register, handleSubmit, watch } = useForm();
  const [imgPreview, setImgPreview] = useState<string>('');
  const [stacks, setStacks] = useState<Tech[]>([]);
  const image = watch('image');

  const onValid = async (data: any) => {
    await mergeData(data, image, stacks);
    const updatedData = updateData(user, data);
    console.log('change to ', updatedData);

    return;
    api
      .patch('/members', updatedData) //
      .then((res) => console.log(res));
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  useEffect(() => {
    if (image && image.length > 0) {
      setImgPreview(URL.createObjectURL(image[0]));
      console.log(image);
    }
  }, [image]);
  return (
    <Form onSubmit={handleSubmit(onValid, onInValid)}>
      <ProfileBox>
        <ImgWrapper>
          <img src={imgPreview} />
          <div>
            <label htmlFor="image">change file</label>
            <input
              {...register('image')}
              id="image"
              type="file"
              accept="image/*"
            />
          </div>
        </ImgWrapper>
        <div className="nameBox">
          <EditInput
            label="NAME"
            placeholder={user.name}
            register={register('name')}
          />
          <EditInput
            label="Year Of Develop"
            register={register('yearOfDev', {
              pattern: {
                value: /^[0-9]*$/,
                message: 'Please enter only numbers',
              },
            })}
            placeholder={`${user.yearOfDev} 년차`}
          />
        </div>
      </ProfileBox>
      <Label>Stacks</Label>
      <SelectStack //
        stacks={stacks}
        setStacks={setStacks}
      />
      <EditInput
        label="About Me"
        placeholder={user.aboutMe}
        register={register('aboutMe')}
      />
      <EditInput
        label="Position"
        placeholder={user.position}
        register={register('position')}
      />
      <EditInput
        label="Location"
        placeholder={user.location}
        register={register('location')}
      />
      <EditInput
        label="Phone Number"
        placeholder={user.phone}
        register={register('phone')}
      />
      <ButtonBox>
        <Button>Submit</Button>
      </ButtonBox>
    </Form>
  );
}

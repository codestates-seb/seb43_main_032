import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import styled from 'styled-components';
import useUser from '@/hooks/react-query/useUser';
import EditInput from '@/components/authAction/EditInput';
import { api } from '@/util/api';
import Btn from '@/components/button/Btn';
import GridBox from '@/components/GridBox';
import uploadFile from '@/util/api/uploadFile';

const SideBar = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  @media (max-width: 960px) {
    display: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0;
  padding-bottom: 0;
`;
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

const dummyUser = {
  aboutMe: 'string',
  email: 'string',
  location: 'string',
  memberId: 0,
  name: 'string',
  phone: 'string',
  position: 'string',
  profileImageUrl: 'string',
  techList: [
    {
      tech: 'string',
    },
  ],
  totalStar: 0,
  yearOfDev: 0,
};
export default function Edit() {
  const user = dummyUser;
  // const {
  //   getMyInfo: { data: user },
  // } = useUser({});
  const { register, handleSubmit, watch } = useForm();
  const [imgPreview, setImgPreview] = useState('');
  const image = watch('image');

  const onValid = async (data: any) => {
    if (image && image.length > 0) {
      const profileImageUrl = (await uploadFile(data.image[0]))[0];
      data.profileImageUrl = profileImageUrl;
    }
    delete data.image;

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        return !(value === '' || (Array.isArray(value) && value.length === 0));
      })
    );

    const updatedData = {
      ...data,
      ...filteredData,
    };
    console.log(updatedData);

    api
      .patch('/members', updatedData) //
      .then((res) => console.log(res));
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 670,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);
  useEffect(() => {
    if (image && image.length > 0) {
      setImgPreview(URL.createObjectURL(image[0]));
      console.log(image);
    }
  }, [image]);

  return (
    <GridBox>
      <SideBar></SideBar>
      <Wrapper>
        {user && (
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
            <EditInput
              label="Stack"
              placeholder="Stack 선택 컴포넌트로 대체"
              register={register('Stack')}
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
        )}
      </Wrapper>
    </GridBox>
  );
}

import { Tech } from '@/types/project';
import { api } from '@/util/api';
import { mergeData, updateData } from '@/util/user';
import React, { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import styled from 'styled-components';
import EditInput from './EditInput';
import SelectStack from '../stack/SelectStack';
import { useRouter } from 'next/router';
import { POSITIONS, POST_COMMUNITY_CATEGORY } from '@/constant/constant';
import { FilterButton } from '@/pages/users';
import { User } from '@/types/user';
import useUser from '@/hooks/react-query/useUser';

export default function UserEditForm({ user }: { user: User }) {
  const { updateUser } = useUser({});
  const initialPosition = Object.keys(POST_COMMUNITY_CATEGORY).find(
    (key) => POST_COMMUNITY_CATEGORY[key] === user.position
  );
  const index = initialPosition ? POSITIONS.indexOf(initialPosition) : -1;

  const { register, handleSubmit, watch } = useForm();
  const [imgPreview, setImgPreview] = useState<string>('');
  const [stacks, setStacks] = useState<Tech[]>(user.techList);
  const [filter, setFilter] = useState(index);
  const [submitLoading, setSubmitLoading] = useState(false);
  const filterHandler = (idx: number) => {
    if (filter === idx) {
      return setFilter(-1); //다시 한 번 필터가 눌렸을 땐, 전체 카드가 조회되기위해
    }
    setFilter(idx);
  };
  const image = watch('image');
  const router = useRouter();

  const onValid = async (data: any) => {
    setSubmitLoading(true);
    data.position = POST_COMMUNITY_CATEGORY[POSITIONS[filter]];
    await mergeData(data, image, stacks);
    const updatedData = updateData(user, data);

    updateUser.mutate(updatedData, {
      onSuccess: () => {
        alert('정보가 수정 되었습니다.');
        router.push('/users/me');
      },
      onError: (error) => {
        console.error(error);
        alert('정보 수정에 실패했습니다.');
        setSubmitLoading(false);
      },
    });
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  useEffect(() => {
    if (image && image.length > 0) {
      setImgPreview(URL.createObjectURL(image[0]));
    }
  }, [image]);

  return (
    <Form onSubmit={handleSubmit(onValid, onInValid)}>
      <ProfileBox>
        <ImgWrapper>
          <img src={imgPreview ? imgPreview : user.profileImageUrl} />
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

      <Label>Position </Label>
      <PositionBox>
        {POSITIONS.map((position, idx) => (
          <FilterButton
            type="button"
            idx={idx}
            filter={filter}
            onClick={() => filterHandler(idx)}
            key={position}
          >
            {position}
          </FilterButton>
        ))}
      </PositionBox>
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
        <Button disabled={submitLoading}>
          {submitLoading ? 'Loading..' : 'Submit'}
        </Button>
      </ButtonBox>
    </Form>
  );
}

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
const PositionBox = styled.div`
  display: flex;
  gap: 5px;
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

type FilterButtonProps = {
  idx: number;
  filters: number[];
};

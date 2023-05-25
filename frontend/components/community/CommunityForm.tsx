import React, { useEffect, useState } from 'react';
import MainPost from '../MainPost';
import { Form } from '@/types/types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Community } from '@/types/community';
import Message from '../Message';
import { useCommunity } from '@/hooks/react-query/community/useCommunity';
import TagBox from '../project/TagBox';
import { FiledTag } from '@/types/project';
import GridBox from '../common_box/GridBox';
import { POST_COMMUNITY_CATEGORY } from '@/constant/constant';
import { confirmAlert, errorAlert } from '../alert/Alert';

export default function CommunityForm() {
  const router = useRouter();
  const id = router.query.id;
  const address = `/articles/${id}`;
  const queryKey = ['article', 'post', id];
  const { communityQuery, postArticle, editArticle } = useCommunity<Community>({
    address,
    queryKey,
  });
  const data = communityQuery.data?.data;

  useEffect(() => {
    if (data) {
      const techList = data.techList.map((item) => ({ field: item.tech }));
      setTags([...techList]);
      setEditor(data.content);
    }
  }, [communityQuery.isLoading]);

  const { register, watch, reset } = useForm<Form>();
  const [editor, setEditor] = useState('');
  const changeContent = (value: string) => {
    setEditor(value);
  };

  //해시태그 값 상태
  const [tags, setTags] = useState<FiledTag[]>([]);

  //해시태그 키 다운
  const tagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trim = watch().tagVal.trim();
    if ((e.key === 'Enter' || e.key === ' ') && trim !== '') {
      addTag(trim);
      reset({
        ...watch(),
        tagVal: '',
      });
    }
  };

  const addTag = (tag: string) => {
    // 중복 태그 확인
    const isDuplicate = tags.some((t) => t.field === tag);
    if (!isDuplicate) {
      // 중복이 아닌 경우에만 태그 추가
      return setTags([...tags, { field: tag }]);
    }
    return errorAlert('동일한 태그는 추가할 수 없습니다.', '태그 추가');
  };

  // 해시태그 삭제
  const deleteTag = (idx: number) => {
    setTags([...tags.slice(0, idx), ...tags.slice(idx + 1)]);
  };

  //글 제출 이벤트
  const postCommunity = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (watch().title === '') {
      return errorAlert('제목을 입력해주세요.', '프로젝트 작성');
    }
    if (editor === '') {
      return errorAlert('내용을 입력해주세요.', '프로젝트 작성');
    }

    const category = POST_COMMUNITY_CATEGORY[watch().position];
    const data = {
      title: watch().title,
      content: editor,
      techList: tags.map((tag) => tag.field),
      category,
    };

    if (router.route.includes('edit')) {
      confirmAlert('정말 글을 수정하시겠습니까?', '글 수정이').then(() =>
        editArticle.mutate(data)
      );
    }
    if (router.route.includes('create')) {
      confirmAlert('정말 글을 작성하시겠습니까?', '글 작성이').then(() =>
        postArticle.mutate(data)
      );
    }
  };

  if (communityQuery.error)
    return <Message>잠시 후에 다시 시도해주세요.</Message>;
  if (communityQuery.isLoading) return <Message>로딩중입니다.</Message>;

  return (
    <GridBox>
      <TagBox
        tags={tags}
        deleteTag={deleteTag}
        tagKeyDown={tagKeyDown}
        register={register}
      />
      <MainPost
        register={register}
        changeContent={changeContent}
        postProject={postCommunity}
        data={
          data && {
            title: data.title,
            content: data.content,
            position: data.category,
          }
        }
      />
    </GridBox>
  );
}

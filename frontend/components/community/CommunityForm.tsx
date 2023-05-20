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
import GridBox from '../GridBox';
import { POST_COMMUNITY_CATEGORY } from '@/constant/constant';

export default function CommunityForm() {
  const router = useRouter();
  const id = router.query.id;
  const address = `/articles/${id}`;
  const queryKey = ['article', 'post', id];
  const { communityQuery, postArticle, editArticle, refetch } =
    useCommunity<Community>({
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

  // 해시태그 업데이트
  const addTag = (tag: string) => {
    setTags([...tags, { field: tag }]);
  };

  // 해시태그 삭제
  const deleteTag = (idx: number) => {
    setTags([...tags.slice(0, idx), ...tags.slice(idx + 1)]);
  };

  //글 제출 이벤트
  const postCommunity = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const category = POST_COMMUNITY_CATEGORY[watch().position];
    const data = {
      title: watch().title,
      content: editor,
      techList: tags.map((tag) => tag.field),
      category,
    };

    if (
      router.route.includes('edit') &&
      confirm('정말 글을 수정하시겠습니까?')
    ) {
      return editArticle.mutate(data);
    }
    if (
      router.route.includes('create') &&
      confirm('정말 글을 작성하시겠습니까?')
    ) {
      return postArticle.mutate(data);
    }
  };

  if (communityQuery.isLoading) return <Message>로딩중입니다.</Message>;
  if (communityQuery.error)
    return <Message>잠시 후 다시 시도해주세요.</Message>;

  return (
    <GridBox>
      <TagBox
        type="community"
        tags={tags}
        deleteTag={deleteTag}
        tagKeyDown={tagKeyDown}
        register={register}
      />
      <MainPost
        type={2}
        register={register}
        changeContent={changeContent}
        postProject={postCommunity}
        data={
          data && {
            title: data.title,
            content: data.content,
            position: '백엔드',
          }
        }
      />
    </GridBox>
  );
}

import styled from 'styled-components';
import EiditorSkeleton from '@/components/skeleton/EiditorSkeleton';
import dynamic from 'next/dynamic';
import { COMMUNITY_EX, PROJECT_EX } from '@/constant/constant';
import { DefaultObj } from '@/types/types';
import { UseFormRegister } from 'react-hook-form';
import Btn from './Btn';
const Editor = dynamic(() => import('@/components/editor/Editor'), {
  ssr: false,
  loading: () => <EiditorSkeleton />,
});

type Props = {
  type: number;
  register: UseFormRegister<DefaultObj>;
  changeContent: (value: string) => void;
  postProject: (e: { preventDefault: () => void }) => void;
};

const MainPost = ({ register, changeContent, type, postProject }: Props) => {
  return (
    <Main>
      {type === 1 ? PROJECT_EX : COMMUNITY_EX}
      <form onSubmit={postProject}>
        <div className="nanum-bold">
          <div className="position-box">
            <div>나의 포지션</div>
            <div>
              <input
                {...register('position')}
                type="text"
                placeholder="포지션을 입력해주세요."
              />
            </div>
          </div>
          <div>
            <Btn>작성 완료</Btn>
          </div>
        </div>
        <div className="title">
          <input
            placeholder="제목을 등록해주세요."
            type="text"
            {...register('title')}
          />
        </div>
        <div>
          <Editor changeContent={changeContent} />
        </div>
      </form>
    </Main>
  );
};

export default MainPost;

const Main = styled.div`
  padding: var(--padding-2);
  input {
    width: 100%;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #d0d3d2;
    box-shadow: var(--box-shadow);
    border-radius: var(--radius-def);
    padding-left: 8px;
  }
  .explanation-box {
    width: 100%;
    border: 1px solid black;
    padding: var(--padding-2);
    border: 1px solid #d0d3d2;
    box-shadow: var(--box-shadow);
    border-radius: var(--radius-def);
    display: flex;
    flex-direction: column;
    gap: 16px;
    > .title {
      font-size: 18px;
    }
    > .sub {
      font-size: 13px;
    }
    ul {
      padding: var(--padding-2);
      display: flex;
      flex-direction: column;
      gap: 16px;
      li {
        font-size: 12px;
        list-style: disc;
      }
    }
  }
  form {
    > div:first-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin: 24px 0px;
      button {
        &:hover {
          box-shadow: var(--box-shadow);
        }
      }
    }
    > div:last-child {
      margin-top: 16px;
      font-size: 16px;
    }
    .position-box {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }
`;

// import styled from 'styled-components';
// import EiditorSkeleton from '@/components/editor/EiditorSkeleton';
// import dynamic from 'next/dynamic';
// import { COMMUNITY_EX, PROJECT_EX } from '@/constant/constant';
// import { DefaultObj } from '@/types/types';
// import { UseFormRegister } from 'react-hook-form';
// const Editor = dynamic(() => import('@/components/editor/Editor'), {
//   ssr: false,
//   loading: () => <EiditorSkeleton />,
// });

// type Props = {
//   type: number;
//   register: UseFormRegister<DefaultObj>;
//   changeEditor: (value: any) => void;
// };

// const MainPost = ({ register, changeEditor, type }: Props) => {
//   return (
//     <Main>
//       {type === 1 ? PROJECT_EX : COMMUNITY_EX}
//       <form action="#">
//         <div className="nanum-bold">
//           <div className="nanum-bold position-box">
//             <div>나의 포지션</div>
//             <div className="position-select">
//               <label htmlFor="frontend" className="noto-regular-12">
//                 프론트엔드
//                 <input
//                   {...register('position')}
//                   type="radio"
//                   id="frontend"
//                   name="position"
//                   value="frontend"
//                 />
//               </label>
//               <label htmlFor="backend" className="noto-regular-12">
//                 백엔드
//                 <input
//                   {...register('position')}
//                   type="radio"
//                   id="backend"
//                   name="position"
//                   value="backend"
//                 />
//               </label>
//               <label htmlFor="ux" className="noto-regular-12">
//                 UX/UI
//                 <input
//                   {...register('position')}
//                   type="radio"
//                   id="ux"
//                   name="position"
//                   value="ux"
//                 />
//               </label>
//             </div>
//           </div>
//         </div>
//         <div className="title">
//           <input
//             placeholder="제목을 등록해주세요."
//             type="text"
//             {...register('title')}
//             className="title"
//           />
//         </div>
//         <div>
//           <Editor changeEditor={changeEditor} />
//         </div>
//       </form>
//     </Main>
//   );
// };

// export default MainPost;

// const Main = styled.div`
//   padding: var(--padding-2);

//   .title {
//     width: 100%;
//     padding: 12px;
//     font-size: 14px;
//     border: 1px solid #d0d3d2;
//     box-shadow: var(--box-shadow);
//     border-radius: var(--radius-def);
//     padding-left: 8px;
//   }

//   .position-box {
//     display: flex;
//     flex-direction: row !important;

//     .position-select {
//       margin-left: 16px;

//       > label {
//         margin: 0 8px;

//         > input {
//           vertical-align: middle;
//           margin-left: 4px;
//         }
//       }
//     }
//   }

//   .explanation-box {
//     width: 100%;
//     border: 1px solid black;
//     padding: var(--padding-2);
//     border: 1px solid #d0d3d2;
//     box-shadow: var(--box-shadow);
//     border-radius: var(--radius-def);
//     display: flex;
//     flex-direction: column;
//     gap: 16px;
//     > .title {
//       font-size: 18px;
//     }
//     > .sub {
//       font-size: 13px;
//     }
//     ul {
//       padding: var(--padding-2);
//       display: flex;
//       flex-direction: column;
//       gap: 16px;
//       li {
//         font-size: 12px;
//         list-style: disc;
//       }
//     }
//   }
//   form {
//     > div:first-child {
//       display: flex;
//       align-items: center;
//       gap: 16px;
//       margin: 24px 0px;
//     }
//     > div:last-child {
//       margin: 16px 0px;
//       font-size: 14px;
//     }
//   }
// `;

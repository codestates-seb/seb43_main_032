import React from 'react';
import styled from 'styled-components';

export default function BannerText({ activeSlide }: { activeSlide: number }) {
  
  
    return <Container>BannerText</Container>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 100;
`;

// <div className={`${size < 768 ? 'centerBox' : 'rightBox'}`}>
//         <div className="textBox">
//           <span>함께 배우고 성장하는</span>
//           <span>사이드퀘스트</span>
//         </div>
//         <button onClick={() => router.push('/community')}>
//           <span className="text">커뮤니티 둘러보기</span>
//         </button>
//       </div>

//     > button {
//         position: absolute;
//         top: 70%;
//         font-size: 21px;
//         padding: 0.7em 1.7em;
//         border-radius: 0.5em;
//         transition: all 0.5s ease;
//         border: none;
//         cursor: pointer;
//         letter-spacing: 3px;
//         background-color: hsl(261deg 80% 48%);
//         color: hsl(0, 0%, 100%);
//         box-shadow: rgb(93 24 220) 0px 7px 15px 0px;

//         > .text {
//           color: #f2f2f2;
//           font-weight: 600;
//         }
//       }
//       button:active {
//         letter-spacing: 3px;
//         background: linear-gradient(-45deg, #c28aff, #9f4afa, #6333ff);
//         color: hsl(0, 0%, 100%);
//         box-shadow: rgb(93 24 220) 0px 0px 0px 0px;
//         transform: translateY(1px);
//         transition: 50ms;
//       }
//     }

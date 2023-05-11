import React, { useState } from 'react';
import styled from 'styled-components';

// item 리스트 필터 버튼
export default function CustomSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('최신순');

  const options = [
    { value: 'sorted', label: '최신순' },
    { value: 'star', label: '스크랩순' },
    { value: 'view', label: '조회수순' },
    { value: 'comment', label: '댓글순' },
  ];

  const handleSelect = (option: any) => {
    setSelected(option.label);
    setIsOpen(false);
  };

  return (
    <CustomSelectWrapper onClick={() => setIsOpen(!isOpen)}>
      <CustomSelectButton>
        {selected} <span className="icon">▼</span>
      </CustomSelectButton>
      <CustomSelectOptions className={isOpen ? 'open' : ''}>
        {options.map((option) => (
          <CustomSelectOption
            key={option.value}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </CustomSelectOption>
        ))}
      </CustomSelectOptions>
    </CustomSelectWrapper>
  );
}

const CustomSelectWrapper = styled.div`
  width: 100px;
  display: flex;
  position: relative;
  display: inline-block;
  top: 0;
  font-size: 14px;
  margin-left: 12px;
  z-index: 10;
  border-radius: 4px;
  background: #96bfff;
  padding: 10px 10px;
  outline: none;
  border: none;
  cursor: pointer;
`;

const CustomSelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;
  background: none;
  color: white;
  font-size: 14px;
  border: none;

  .icon {
    margin-left: 5px;
  }
`;

const CustomSelectOptions = styled.ul`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 100px;
  border-radius: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease-in-out;

  &.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const CustomSelectOption = styled.li`
  width: 100%;
  height: 20px;
  padding: 0 8px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

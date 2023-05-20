import { useState } from 'react';
import styled from 'styled-components';

type Props = {
  filter: string;
  selectFilter: (filter: string) => void;
  filterData: { [key: string]: string }[];
};

const Filter = ({ filter, selectFilter, filterData }: Props) => {
  const [isFilter, setIsFilter] = useState(false);
  const filterHandler = () => {
    setIsFilter(!isFilter);
  };

  const filterName = filterData.find((x) => x.value === filter)?.label;
  return (
    <ContentBottomFilter onClick={filterHandler}>
      <CustomSelectButton>
        {filterName} <span className="icon">▼</span>
      </CustomSelectButton>
      <CustomSelectOptions isFilter={isFilter}>
        {filterData.map((option) => (
          <CustomSelectOption
            key={option.value}
            onClick={() => selectFilter(option.value)}
          >
            {option.label}
          </CustomSelectOption>
        ))}
      </CustomSelectOptions>
    </ContentBottomFilter>
  );
};

export default Filter;

const ContentBottomFilter = styled.div`
  min-width: 104px;
  display: flex;
  position: relative;
  display: inline-block;
  top: 0;
  font-size: 14px;
  z-index: 2;
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
  cursor: pointer;
  font-size: 14px;
  border: none;
  .icon {
    margin-left: 5px;
  }
`;

type CustomProps = {
  isFilter: boolean;
};

const CustomSelectOptions = styled.ul<CustomProps>`
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
  opacity: ${(props) => (props.isFilter ? '1' : '0')};
  visibility: ${(props) => (props.isFilter ? 'visible' : 'hidden')};
  transform: ${(props) =>
    props.isFilter ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease-in-out;
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

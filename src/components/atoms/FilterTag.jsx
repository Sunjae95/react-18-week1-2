import { SettingFrameItem } from 'components/atoms';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function FilterTag({ selectedTag, setSelectedTag }) {
  const tags = [
    {
      id: 1,
      name: '베스트',
    },
    {
      id: 2,
      name: '베베',
    },
    {
      id: 3,
      name: '베나라',
    },
    {
      id: 4,
      name: '구아바',
    },
    {
      id: 5,
      name: '구아아',
    },
    {
      id: 6,
      name: 'tag1',
    },
    {
      id: 7,
      name: 'tag2',
    },
    {
      id: 8,
      name: 'tagg',
    },
  ];

  const [search, setSearch] = useState('');
  const [onFocus, setOnFocus] = useState(false);
  const inputRef = useRef();

  const deleteTag = (id) => {
    const filtered = selectedTag.filter((tag) => tag.id !== id);
    setSelectedTag(filtered);
  };

  const selectTag = (id, name) => {
    const isSame = selectedTag.some((tag) => tag.name === name);
    if (isSame) {
      return;
    }
    setSelectedTag([
      ...selectedTag,
      {
        id,
        name,
      },
    ]);
  };

  return (
    <Wrap>
      <SettingFrameItem title="필터 태그">
        <Content>
          <InputWrap>
            <input
              placeholder="필터태그를 검색해 주세요."
              ref={inputRef}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setOnFocus(true)}
            />
            <button type="button">검색</button>
          </InputWrap>
          <TagList isOpen={onFocus}>
            {tags.filter((tag) => tag.name.includes(search)).length !== 0 ? (
              tags
                .filter((tag) => tag.name.includes(search))
                .map(({ id, name }) => (
                  <TagItem key={id} onClick={() => selectTag(id, name)}>
                    <span>{name}</span>
                  </TagItem>
                ))
            ) : (
              <p>검색 결과 없음</p>
            )}
          </TagList>
          <SelectedTagList>
            {selectedTag?.map(({ id, name }) => (
              <SelectedTagItem key={id}>
                <span>{name}</span>
                <button type="button" onClick={() => deleteTag(id)}>
                  X
                </button>
              </SelectedTagItem>
            ))}
          </SelectedTagList>
        </Content>
      </SettingFrameItem>
    </Wrap>
  );
}

export default FilterTag;

FilterTag.propTypes = {
  selectedTag: PropTypes.arrayOf(PropTypes.array).isRequired,
  setSelectedTag: PropTypes.func.isRequired,
};

const Wrap = styled.div`
  position: relative;
`;

const Content = styled.div`
  padding: 20px;
`;

const InputWrap = styled.div`
  position: relative;
  button {
    position: absolute;
    right: 10px;
    top: 5px;
    border-radius: 5px;
    border: 1px solid rgba(31,19,101);
    padding: 5px 10px;
    cursor: pointer;
  }
  input {
    padding: 10px 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    border-radius: 5px;
  }
`;

const TagList = styled.ul`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-wrap: wrap;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  height: 100px;
  overflow-y: scroll;
  padding: 20px;
  margin-top: 10px;
`;

const TagItem = styled.li`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  background-color: rgba(234,247,216);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px 5px;
`;

const SelectedTagList = styled.ul`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const SelectedTagItem = styled(TagItem)``;

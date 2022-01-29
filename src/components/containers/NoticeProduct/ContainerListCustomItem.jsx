/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import Button from 'components/atoms/Button';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import isSavedState, { registerFormState } from 'utils/globalState';
import NoticeInput from './NoticeInput';

function ContainerListCustomItem({
  productKey, productList,
  setProductList,
}) {
  let filteredProductList;
  const isSaved = useRecoilValue(isSavedState);
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);
  const [customList, setCustomList] = useState([
    { productKey, customTitle: '', customDescription: '' },
  ]);

  const saveData = (key, value) => {
    setRegisterForm({
      ...registerForm,
      [key]: value,
    });
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...customList];
    list[index][name] = value;
    setCustomList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...customList];
    list.splice(index, 1);
    setCustomList(list);
  };

  const handleAddClick = () => {
    setCustomList([...customList, { productKey, customTitle: '', customDescription: '' }]);
  };

  // 하위 옵션 취함된 데이터를 위에서 합치기
  useEffect(() => {
    filteredProductList = productList.filter((item) => item.productKey === productKey);
    filteredProductList[0].customList = { ...customList };
  }, [customList]);

  useEffect(() => {
    console.log(filteredProductList);
  }, [isSaved]);

  return (
    <>
      {customList.map((item, index) => (
        <CustomItemList key={productKey + index}>
          <NoticeInput placeholder="항목 제목 자유 입력" value={item.customTitle} name="customTitle" onChange={(event) => handleInputChange(event, index)} />
          <NoticeInput placeholder="내용을 입력해주세요." value={item.customDescription} name="customDescription" onChange={(event) => handleInputChange(event, index)} />
          <Button
            text="삭제"
            color="red"
            borderRadius={0}
            height="100%"
            width="100%"
            onClick={() => handleRemoveClick(index)}
          />
        </CustomItemList>
      ))}
      <div style={{ marginTop: '27px' }}>
        <Button
          text="+ 항목 추가"
          width="150px"
          height="43px"
          onClick={handleAddClick}
        />
      </div>
    </>
  );
}

const CustomItemList = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 0px 27px;
  grid-template-columns: 3fr 4fr 1fr;
  margin: 14px 0 14px 0;
`;

ContainerListCustomItem.propTypes = {
  productKey: PropTypes.string.isRequired,
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setProductList: PropTypes.func.isRequired,

};

export default ContainerListCustomItem;

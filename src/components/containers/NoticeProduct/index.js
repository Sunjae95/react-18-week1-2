/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-closing-bracket-location */
import { SettingFrame } from 'components/atoms';
import Button from 'components/atoms/Button';
import React, { useState } from 'react';
import styled from 'styled-components';
import ContainerListCustomItem from './ContainerListCustomItem';
import ContainerListItem from './ContainerListItem';

function NoticeProduct() {
  const [productList, setProductList] = useState([
    {
      productName: '',
      fromProduct: '',
      grade: '',
      howStock: '',
      foodCategory: '',
      productKey: `${(+new Date()).toString(36)}`,
      customList: [],
    },
  ]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...productList];
    list[index][name] = value;
    setProductList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...productList];
    list.splice(index, 1);
    setProductList(list);
  };

  const handleAddClick = () => {
    setProductList([
      ...productList,
      {
        productName: '',
        fromProduct: '',
        grade: '',
        howStock: '',
        productKey: `${(+new Date()).toString(36)}`,
        foodCategory: '',
        customList: [],
      },
    ]);
  };

  return (
    <SettingFrame title="상품 정보 고시" isBackground>
      <ContainerOuterBox>
        {productList.map((info, index) => (
          <ContainerInnerBox key={info.productKey}>
            <ContainerHeader>
              <div>
                정보고시
                <span>{index + 1}</span>
              </div>
              <div>
                <Button
                  text="삭제"
                  color="#a0a0a0"
                  borderRadius={3}
                  onClick={() => handleRemoveClick(index)}
                />
              </div>
            </ContainerHeader>
            <ContainerList>
              <ContainerListItem
                title="제품명 / 중량"
                placeholder="제품명 / 중량을 입력해 주세요."
                name="productName"
                value={info.productName}
                onChange={(event) => handleInputChange(event, index)}
              />
              <ContainerListItem
                title="원산지 / 원재료 함량"
                placeholder="원산지 / 원재 함량을 입력해 주세요."
                name="fromProduct"
                value={info.fromProduct}
                onChange={(event) => handleInputChange(event, index)}
              />
              <ContainerListItem
                title="등급"
                placeholder="등급 (근내지방도 수치)를 입력해 주세요."
                name="grade"
                value={info.grade}
                onChange={(event) => handleInputChange(event, index)}
              />
              <ContainerListItem
                title="보관"
                placeholder="보관 방식을 입력해 주세요."
                name="howStock"
                value={info.howStock}
                onChange={(event) => handleInputChange(event, index)}
              />
              <ContainerListItem
                title="식품 유형"
                placeholder="식품 유형을 입력해 주세요. (ex) 포장육."
                name="foodCategory"
                value={info.foodCategory}
                onChange={(event) => handleInputChange(event, index)}
              />
              <ContainerListCustomItem
                productKey={info.productKey}
                productList={productList}
                setProductList={setProductList}
              />
            </ContainerList>
          </ContainerInnerBox>
        ))}
        <Button
          width="100%"
          text="+ 정보고시 추가"
          height="45px"
          onClick={handleAddClick}
        />
      </ContainerOuterBox>
    </SettingFrame>
  );
}

const ContainerOuterBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 18px 10px 18px 10px;
`;

const ContainerInnerBox = styled.div`
  background-color: white;
  padding: 30px 20px 30px 45px;
  margin-bottom: 25px;
`;

const ContainerHeader = styled.div`
  width: 100%;
  display: flex;
  padding-right: 15px;
  justify-content: space-between;
`;

const ContainerList = styled.div`
  height: 100%;
  padding: 15px;
`;

export default NoticeProduct;

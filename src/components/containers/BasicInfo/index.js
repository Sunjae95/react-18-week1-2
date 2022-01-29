import SettingFrame from 'components/atoms/SettingFrame';
import Category from 'components/molecules/BasicInfo/Category';
import MainImg from 'components/molecules/BasicInfo/MainImg';
import ProductCode from 'components/molecules/BasicInfo/ProductCode';
import ProductInfo from 'components/molecules/BasicInfo/ProductInfo';
import ProductName from 'components/molecules/BasicInfo/ProductName';
import Thumbnail from 'components/molecules/BasicInfo/Thumbnail';
import TotalStock from 'components/molecules/BasicInfo/TotalStock';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import isSavedState, { registerFormState } from 'utils/globalState';
import FilterTags from 'components/molecules/BasicInfo/FilterTags';

function BasicInfo() {
  const isSaved = useRecoilValue(isSavedState);
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);
  const [basicInfo, setBasicInfo] = useState({});

  const handleBasicInfo = (key, input) => {
    setBasicInfo({
      ...basicInfo,
      [key]: input,
    });
  };

  const saveData = (key, value) => {
    setRegisterForm({
      ...registerForm,
      [key]: value,
    });
  };

  useEffect(() => {
    console.log(basicInfo);
  }, [basicInfo]);

  useEffect(() => {
    saveData('basicInfo', basicInfo);
  }, [isSaved]);

  return (
    <SettingFrame title="상품기본정보">
      <Category handleBasicInfo={handleBasicInfo} title="selectedCategory" />
      <FilterTags handleBasicInfo={handleBasicInfo} title="filterTag" />
      <SettingFramItemWrapper>
        <SettingFramItemContainer>
          <ProductName handleBasicInfo={handleBasicInfo} title="productName" />
        </SettingFramItemContainer>
        <SettingFramItemContainer>
          <ProductCode handleBasicInfo={handleBasicInfo} title="productCode" />
        </SettingFramItemContainer>
      </SettingFramItemWrapper>
      <ProductInfo handleBasicInfo={handleBasicInfo} title="productInfo" />
      <Thumbnail handleBasicInfo={handleBasicInfo} title="thumbnail" />
      <MainImg handleBasicInfo={handleBasicInfo} title="mainImg" />
      <TotalStock handleBasicInfo={handleBasicInfo} title="totalStock" />
    </SettingFrame>
  );
}

const SettingFramItemWrapper = styled.div`
  display: flex;
`;

const SettingFramItemContainer = styled.div`
  flex-basis: 50%;
`;

export default BasicInfo;

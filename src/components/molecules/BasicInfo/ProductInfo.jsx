import { Input, SettingFramItem } from 'components/atoms';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function ProductInfo({ handleBasicInfo, title }) {
  const onInput = (e) => {
    handleBasicInfo(title, e);
  };

  return (
    <SettingFramItem title="상품 구성 소개 정보*">
      <InputContainer>
        <Input placeholder="상품 구성 소개 정보를 입력해 주세요." setInputData={onInput} />
      </InputContainer>
    </SettingFramItem>
  );
}

ProductInfo.propTypes = {
  title: PropTypes.string.isRequired,
  handleBasicInfo: PropTypes.func.isRequired,
};

const InputContainer = styled.div`
  padding: ${({ theme }) => theme.padding.small};
`;

export default ProductInfo;

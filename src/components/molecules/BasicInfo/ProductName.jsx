import { Input, SettingFramItem } from 'components/atoms';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function ProductName({ handleBasicInfo, title }) {
  const onInput = (e) => {
    handleBasicInfo(title, e);
  };

  return (
    <Wrapper>
      <SettingFramItem title="상품명*">
        <InputContainer>
          <Input setInputData={onInput} placeholder="상품명을 입력해주세요." />
        </InputContainer>
      </SettingFramItem>
    </Wrapper>
  );
}

ProductName.propTypes = {
  title: PropTypes.string.isRequired,
  handleBasicInfo: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  height: 100%;
`;

const InputContainer = styled.div`
  /* height: 100%; */
  padding: ${({ theme }) => theme.padding.small};
  /* padding: 0.8rem 0.5rem 0.8rem 0.5rem; */
`;

export default ProductName;

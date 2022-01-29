import BasicInfo from 'components/containers/BasicInfo';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import isSavedState, { registerFormState } from 'utils/globalState';
import Button from 'components/atoms/Button';
import styled from 'styled-components';
import ProductOption from 'components/containers/ProductOption';

function App() {
  const [isSaved, setIsSaved] = useRecoilState(isSavedState);
  const registerForm = useRecoilValue(registerFormState);

  const checkRequiredValue = () => {
    if (isSaved && Object.keys(registerForm).length) {
      const basicInform = registerForm.basicInfo;
      if (
        !basicInform.selectedCategory ||
        !basicInform.productName ||
        !basicInform.productInfo ||
        !basicInform.totalStock > 0
        // && option
      ) {
        alert('필수 항목을 입력하세요');
      } else {
        alert('저장되었습니다');
        console.log(registerForm);
      }
    }
  };
  const onSave = () => {
    setIsSaved((c) => c + 1);
  };

  useEffect(() => {
    checkRequiredValue();
    console.log(registerForm);
  }, [registerForm]);

  return (
    <RegisterForm>
      <TitleWrapper>
        <p>등록</p>
        <Button
          width="80px"
          height="30px"
          text="저장하기"
          color="purple"
          constrast="true"
          borderRadius="10"
          onClick={onSave}
        />
      </TitleWrapper>
      <BasicInfo />
      <ProductOption />
    </RegisterForm>
  );
}

const RegisterForm = styled.div`
  padding: ${({ theme }) => theme.padding.medium};
`;

const TitleWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.padding.medium};
  padding: ${({ theme }) => theme.padding.small};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export default App;

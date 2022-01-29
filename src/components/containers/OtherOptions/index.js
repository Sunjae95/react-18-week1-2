import { SettingFrame, SettingFramItem } from 'components/atoms';
import ToggleBtn from 'components/atoms/ToggleBtn';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import isSavedState, { registerFormState } from 'utils/globalState';

function OtherOptions() {
  const isSaved = useRecoilValue(isSavedState);
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);

  const [optionsStatus, setOptionsStatus] = useState({ thanksCard: false });

  function onCheckedChange() {
    setOptionsStatus({ thanksCard: !optionsStatus.thanksCard });
  }

  const saveData = (key, value) => {
    setRegisterForm({
      ...registerForm,
      [key]: value,
    });
  };

  useEffect(() => {
    saveData('thanksCard', optionsStatus.thanksCard);
  }, [isSaved]);

  return (
    <SettingFrame title="상품 혜택 허용 설정">
      <SettingFramItem title="마일리지 적립">
        <ToggleBtn
          isToggle={optionsStatus.thanksCard}
          onChange={() => onCheckedChange()}
        />
      </SettingFramItem>
    </SettingFrame>
  );
}

export default OtherOptions;

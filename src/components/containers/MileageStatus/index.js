import { SettingFrame, SettingFramItem } from 'components/atoms';
import ToggleBtn from 'components/atoms/ToggleBtn';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import isSavedState, { registerFormState } from 'utils/globalState';

function MileageStatus() {
  const isSaved = useRecoilValue(isSavedState);
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);
  const [mileageStatus, setMileageStatus] = useState({ mileageStatus: true });

  function onCheckedChange() {
    setMileageStatus({ mileageStatus: !mileageStatus.mileageStatus });
  }

  const saveData = (key, value) => {
    setRegisterForm({
      ...registerForm,
      [key]: value,
    });
  };

  useEffect(() => {
    saveData('MileageStatus', mileageStatus);
  }, [isSaved]);

  return (
    <SettingFrame title="상품 혜택 허용 설정">
      <SettingFramItem title="마일리지 적립">
        <ToggleBtn
          checked={mileageStatus.mileageStatus}
          onChange={() => onCheckedChange()}
        />
      </SettingFramItem>
    </SettingFrame>
  );
}

export default MileageStatus;
